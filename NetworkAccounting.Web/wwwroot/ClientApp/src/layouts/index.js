import styles from './index.css';

function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <h3 className={styles.title}>Network Accounting</h3>
      { props.children }
    </div>
  );
}

export default BasicLayout;
