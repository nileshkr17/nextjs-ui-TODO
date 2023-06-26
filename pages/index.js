import Todo from '../components/Todo';
import styles from '../styles/Home.module.css';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.todoContainer}>
          <Todo />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
