import Todo from '../components/Todo';
import styles from '../styles/Home.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1>Todo App</h1>
      <div className={styles.todoContainer}>
        <Todo />
      </div>
    </div>
  );
};

export default HomePage;
