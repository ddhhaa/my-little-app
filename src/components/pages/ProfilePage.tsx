import styles from "../styles/ProfilePage.module.scss";
import Header from "../ui/Header";
import Button from "../ui/Button";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const statuses = useSelector(
    (state: RootState) => state.books.statuses
  );

  const stats = {
    reading: 0,
    planned: 0,
    finished: 0,
  };

  Object.values(statuses).forEach((status) => {
    switch (status) {
      case "Читаю":
        stats.reading++;
        break;

      case "В планах":
        stats.planned++;
        break;

      case "Прочитано":
        stats.finished++;
        break;
    }
  });

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
                <strong>{stats.reading}</strong>
              </div>


              <div className={styles.status}>
                <img src="/clock.svg"></img>
                <p>В планах</p>
                <strong>{stats.planned}</strong>
              </div>


              <div className={styles.status}>
                <img src="/book-closed.svg"></img>
                <p>Прочитано</p>
                <strong>{stats.finished}</strong>
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