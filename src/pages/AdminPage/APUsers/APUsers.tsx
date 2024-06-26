import { useEffect, useState } from 'react';
import styles from './APUsers.module.css';
import { LuTrash } from 'react-icons/lu';
import APAddEditModal from '../APAddEditModal/APAddEditModal';
import APDeleteModal from '../APDeleteModal/APDeleteModal';
import RoleChangeModal from './RoleChangeModal/RoleChangeModal';
import { getUsers, deleteUser, updateRole, banUser } from '../../../services/users';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

type User = {
  id: number;
  email: string;
  created_at: string;
  role: string;
  status: number;
};

export default function APUsers() {
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRoleChangeModal, setShowRoleChangeModal] = useState(false);
  const [data, setData] = useState<User[]>([]);
  const [operation, setOperation] = useState("");
  const [tempId, setTempId] = useState(0);
  const [tempValue, setTempValue] = useState("");
  const [tempRole, setTempRole] = useState<User['role']>("customer");
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roles = ['Superadmin', 'Admin', 'Customer', 'Delivery'];
  const loggedUser = useSelector((state: RootState) => state.user);


  const fetchData = async () => setData(await getUsers());

  useEffect(() => {
    try {
      fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    try {
      fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  }, [refresh]);

  async function formSubmit(inputValue: string) {
    if (operation === 'delete') {
      try {
        await deleteUser(tempId);
      } catch (err: any) {
        setError(err.message);
      }
    }
    fetchData();
  }

  console.log(data)
  const toggleActivation = async (user: User) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === user.id ? { ...item, status: item.status === 1 ? 0 : 1 } : item
      )
    );

    const payload = {
      id: user.id
    }

    await banUser(payload);
  };

  const isButtonDisabled = (userRole: string) => {
      if(loggedUser.role === "1" && userRole === "1") {
        return true;
      } else if(loggedUser.role === "2" && userRole === "2") {
        return true;
      }
      else if (loggedUser.role === "2" && userRole === "1") {
        return true;
      } else 
      return false;
  };

  function formatDate(date: string) {
    const d = new Date(date);
    return `${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}.${(d.getMonth() < 9) ? `0${d.getMonth() + 1}` : d.getMonth() + 1}.${d.getFullYear()} ${d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()}:${d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()}`;
  }

  const handleRoleChange = async (newRole: string) => {
    const payload = {
      id: tempId,
      role: newRole
    };
    setRefresh(!refresh);
    await updateRole(payload)
  };

  return (
    <>
      <div className={styles.table}>
        <div className={styles.row} style={{ fontWeight: "700" }}>
          <div className={styles.cellId}>ID</div>
          <div className={styles.cell} style={{ marginLeft: "25px" }}>Email</div>
          <div className={styles.cell} style={{ marginLeft: "-15px" }}>Created at</div>
          <div className={styles.cell} style={{ marginLeft: "-5px" }}>Role</div>
          <div className={styles.cell} style={{ marginLeft: "-5px" }}>Activate/Deactivate</div>
          <div className={styles.cell}>Options</div>
        </div>
        {data.map((item) => (
          <div className={styles.row} key={item.id}>
            <div className={styles.cellId}>{item.id}</div>
            <div className={styles.cell} style={{ marginLeft: "25px" }}>{item.email}</div>
            <div className={styles.cell} style={{ marginLeft: "-15px" }}>{formatDate(item.created_at)}</div>
            <div className={styles.cell} style={{ marginLeft: "-5px" }}>
              <button
                className={styles.adminButton}
                onClick={() => { setShowRoleChangeModal(true); setTempId(item.id); setTempRole(item.role); }}
                disabled={isButtonDisabled(item.role)}
              >
                {roles[parseInt(item.role) - 1]}
              </button>
            </div>
            <div className={styles.cell} style={{ marginLeft: "-5px" }}>
              <button
                className={styles.adminButton}
                onClick={() => toggleActivation(item)}
                disabled={isButtonDisabled(item.role)}
              >
                {item.status === 1 ? 'Deactivate' : 'Activate'}
              </button>
            </div>
            <div className={`${styles.cell} ${styles.cellButtons}`} style={{ marginLeft: "-5px" }}>
              <button className={styles.actionButton} style={{ backgroundColor: "red" }} onClick={() => { setShowDeleteModal(true); setOperation("delete"); setTempId(item.id); }} disabled={isButtonDisabled(item.role)}>
                <div className={styles.buttonIcon} style={{ color: "red" }}><LuTrash /></div>
                <div className={styles.buttonText}>Delete</div>
              </button>
            </div>
          </div>
        ))}
      </div>
      {(showAddEditModal || showDeleteModal || showRoleChangeModal) && <div className={styles.blockContent}></div>}
      {showAddEditModal && <APAddEditModal value={tempValue} operation={operation} formSubmit={formSubmit} setShowModal={setShowAddEditModal} />}
      {showDeleteModal && <APDeleteModal formSubmit={formSubmit} setShowModal={setShowDeleteModal} />}
      {showRoleChangeModal && <RoleChangeModal currentRole={tempRole} onClose={() => setShowRoleChangeModal(false)} onRoleChange={handleRoleChange} />}
    </>
  );
}
