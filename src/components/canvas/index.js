import React from 'react'

import styles from './styles.module.scss'

export default props => (
    <div className={styles.main}>
        <main className={styles.paper + ' container'}>{props.children}</main>
    </div>
)