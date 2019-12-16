import * as React from 'react';

import styles from './styles.module.scss';
import { config } from '../../../content/website/config';

const { siteTitle, author } = config;

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className="container">
      <p>
        {siteTitle} © {new Date().getFullYear()} - by {author}
      </p>
    </div>
  </footer>
);

export default Footer;
