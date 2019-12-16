import * as React from 'react';

import styles from './styles.module.scss';

const Canvas: React.FC = props => (
  <div className={styles.main}>
    <main className={styles.paper + ' container'}>{props.children}</main>
  </div>
);

export default Canvas;
