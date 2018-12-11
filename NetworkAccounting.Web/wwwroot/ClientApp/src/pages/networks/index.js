import styles from './networks.css';
import NetworkTable from './components/NetworkTable';
import LeaseForm from "./components/LeaseForm";

export default function() {
  return (
    <div className={styles.normal}>
      <h1>Page networks</h1>
      <NetworkTable/>
      <LeaseForm/>
    </div>
  );
}
