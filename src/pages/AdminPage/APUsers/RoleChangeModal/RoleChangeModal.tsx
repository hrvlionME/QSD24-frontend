import React, { useState, useEffect, useRef } from "react";
import styles from "./RoleChangeModal.module.css";
import { IoIosArrowDown } from "react-icons/io";

interface RoleChangeModalProps {
    currentRole: string;
    onClose: () => void;
    onRoleChange: (newRole: string) => void;
}

const roles = ["Superadmin", "Admin", "Customer", "Delivery"];

const RoleChangeModal: React.FC<RoleChangeModalProps> = ({ currentRole, onClose, onRoleChange }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(roles[parseInt(currentRole) - 1]);
    const [selectedRoleName, setSelectedRoleName] = useState(roles[parseInt(currentRole) - 1]);
    const modalRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleRoleClick = (role: string) => {
        setSelectedRoleName(role);
        if(role === "Superadmin") {
            setSelectedRole("1");
        } else if(role === "Admin") {
            setSelectedRole("2");
        }
        else if(role === "Customer") {
            setSelectedRole("3");
        }
        else if(role === "Delivery") {
            setSelectedRole("4");
        }
        setDropdownOpen(false);
    };

    const handleSubmit = () => {
        onRoleChange(selectedRole);
        onClose();
    };

    const handleOutsideClick = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal} ref={modalRef}>
                <h4 style={{ marginTop: "40px" }}>Select new role</h4>
                <div className={styles.dropdownContainer}>
                    <div className={styles.dropdownHeader} onClick={toggleDropdown}>
                        <span className={styles.dropdownSelected}>{selectedRoleName}</span>
                        <span className={styles.dropdownHyphen}>|</span>
                        <span className={styles.dropdownArrow}>
                            <IoIosArrowDown />
                        </span>
                    </div>
                    {dropdownOpen && (
                        <div className={styles.dropdownList}>
                            {roles.map((role, index) => (
                                <div
                                    key={index}
                                    className={styles.dropdownItem}
                                    onClick={() => handleRoleClick(role)}
                                >
                                    {role}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className={styles.modalButtons}>
                    <button className={`${styles.actionButton} ${styles.cancelButton}`} onClick={onClose}>
                        <div className={styles.buttonText}>Cancel</div>
                    </button>
                    <button className={`${styles.actionButton} ${styles.confirmButton}`} onClick={handleSubmit}>
                        <div className={styles.buttonText}>Confirm</div>
                    </button>

                </div>
            </div>
        </div>
    );
};

export default RoleChangeModal;
