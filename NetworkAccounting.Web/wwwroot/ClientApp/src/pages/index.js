import styles from './index.css';
import Link from "umi/link";

export default function() {
  return (
    <div className={styles.normal}>
      {/*<div className={styles.welcome} />*/}
      <ul className={styles.list}>
        <li><Link to='/networks'>Сети</Link></li>
        <li><Link to='/pools'>Типы сетей</Link></li>
        {/*<h1>TEST = {process.env.TEST }</h1>*/}
      </ul>
    </div>
  );
}
