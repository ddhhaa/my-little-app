import styles from "../styles/ProfilePage.module.scss";
import Header from "./Header";
import Button from "./Button";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    dispatch(logout());

    navigate("/login");
    }

  return (
    <>
      <Header />

      <main className={styles.profile}>
        <div className={styles["profile-card"]}>

          <div className={styles.avatar}>
            <img 
              src="/profile.jpg" 
              alt="profile"
            />
          </div>

          <h1 className={styles.name}>
            {user?.name}
          </h1>

          <p className={styles.email}>
            {user?.email}
          </p>


          <div className={styles.library}>
            <h2>
              Мои книги
            </h2>

            <div className={styles.statuses}>

              <div className={styles.status}>
                <img src="/book-open.svg"></img>
                <p>Читаю</p>
                <strong>0</strong>
              </div>


              <div className={styles.status}>
                <img src="/clock.svg"></img>
                <p>В планах</p>
                <strong>0</strong>
              </div>


              <div className={styles.status}>
                <img src="/book-closed.svg"></img>
                <p>Прочитано</p>
                <strong>0</strong>
              </div>

            </div>
          </div>


          <div className={styles.logout}>
            <Button onClick={handleLogout}>
                Выйти
            </Button>
          </div>

        </div>
      </main>
    </>
  );
}

export default ProfilePage;