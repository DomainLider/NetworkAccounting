import styles from './pools.css';

import PoolList from "./components/PoolList";

const PoolPage = (props)=>{
  return (
    <div className={styles.normal}>
      <h1>Page pools</h1>
      <PoolList/>
    </div>
  );
}

export default PoolPage;
