import styles from './networks.css';
import NetworkTable from './components/NetworkTable';

export default function() {
  return (
    <div className={styles.normal}>
      <h1>Page networks</h1>
      <NetworkTable/>
    </div>
  );
}
