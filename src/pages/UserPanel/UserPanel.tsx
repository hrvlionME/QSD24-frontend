import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UPUserDataPage from "./UPUserDataPage/UPUserDataPage";
import Footer from "../../components/Footer/Footer";
import { useTranslation } from "react-i18next";
import styles from "./UserPanel.module.css";
import UPEditProfilePage from "./UPEditProfilePage/UPEditProfilePage";
import UPChangePasswordPage from "./UPChangePasswordPage/UPChangePasswordPage";
import UPMyOrdersPage from "./UPMyOrdersPage/UPMyOrdersPage";
import UPFavoritesPage from "./UPFavoritesPage/UPFavoritesPage";

const componentsMap: { [key: string]: React.ComponentType } = {
    "edit": UPEditProfilePage,
    "change-password": UPChangePasswordPage,
    "my-orders": UPMyOrdersPage,
    "favorites": UPFavoritesPage
};

export default function UserPanel() {
    const { category } = useParams<{ category: string }>();
    const Component = componentsMap[category || "users"] || UPUserDataPage;
    const [activePage, setActivePage] = useState("");
    const { t } = useTranslation();

    useEffect(() => {
        if (category === "edit") setActivePage("2");
        else if (category === "change-password") setActivePage("3");
        else if (category === "my-orders") setActivePage("4");
        else if (category === "favorites") setActivePage("5");
        else setActivePage("1");
    }, [category]);

    return (
        <div style={{ backgroundColor: "var(--primary-color-2)" }}>
            <div className={styles.title}>{t("myAccount")}</div>;
            <div className={styles.page}>
                <div className={styles.nav}>
                    <div className={styles.listTitle}>USER PANEL</div>
                    <ul className={styles.list}>
                        <li className={activePage === "1" && styles.active}>
                            <Link to="/profile" className={styles.link}>{t("userData")}</Link>
                        </li>
                        <li className={activePage === "2" && styles.active}>
                            <Link to="/profile/edit" className={styles.link}>{t("editProfile")}</Link>
                        </li>
                        <li className={activePage === "3" && styles.active}>
                            <Link to="/profile/change-password" className={styles.link}>{t("change_password")}</Link>
                        </li>
                        <li className={activePage === "4" && styles.active}>
                            <Link to="/profile/my-orders" className={styles.link}>{t("myOrders")}</Link>
                        </li>
                        <li className={activePage === "5" && styles.active}>
                            <Link to="/profile/favorites" className={styles.link}>{t("favorites")}</Link>
                        </li>
                    </ul>
                </div>
                <Component />
            </div>
            <Footer />
        </div>
    )
}
