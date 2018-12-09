import styles from './index.css';
import Link from "umi/link";

export default function() {
  return (
    <div className={styles.normal}>
      {/*<div className={styles.welcome} />*/}
      <ul className={styles.list}>
        {/*<li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>*/}
        {/*<li><a href="https://umijs.org/guide/getting-started.html">Getting Started</a></li>*/}
        <li><Link to='/pools'>Network pools</Link></li>
        <li><Link to='/networks'>Networks</Link></li>
        {/*<h1>TEST = {process.env.TEST }</h1>*/}
      </ul>
    </div>
  );
}
