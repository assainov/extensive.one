import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';

import { IPureHeaderProps, IHeaderProps, IQuery } from './contracts';
import styles from './styles.module.scss';
import { isMobileSSR } from '../../utils/device-detect';
import ThemeSwitcher from '../theme-switcher';

export const ChangeTheme = (
  <li className={styles.topItem}>
    <span className={styles.topLink}>
      <ThemeSwitcher />
    </span>
  </li>
);

export const PureHeader: React.FC<IPureHeaderProps> = ({
  title,
  categories,
  menuOpen,
  toggleMenu,
  location,
}) => (
  <header
    className={styles.header}
    style={{
      marginBottom:
        !isMobileSSR && location && location.pathname !== '/' ? '10rem' : '0',
    }}
  >
    <div className="container">
      <div className={styles.logo}>
        <Link to="/">{title.toLowerCase()}</Link>
      </div>
      <nav className={styles.navigation}>
        <ul>
          <li className={styles.topItem}>
            <Link className={styles.topLink} to="/">
              Home
            </Link>
          </li>
          <li className={styles.topItem}>
            <span>Categories</span>
            <ul className={styles.dropdownList}>
              {categories.map(category => (
                <li key={category.fieldValue}>
                  <Link to={`/categories/${kebabCase(category.fieldValue)}/`}>
                    {category.fieldValue}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className={styles.topItem}>
            <Link className={styles.topLink} to="/reading-list">
              Reading List
            </Link>
          </li>
          <li className={styles.topItem}>
            <a
              className={styles.topLink}
              href="mailto:iliyas.assainov@gmail.com"
            >
              Get In Touch
            </a>
          </li>
          {ChangeTheme}
        </ul>
      </nav>
      <div
        className={`${styles.menuButton} ${menuOpen ? styles.open : ''}`}
        onClick={toggleMenu}
      >
        <span />
      </div>
    </div>
  </header>
);

const Header: React.FC<IHeaderProps> = ({ menuOpen, toggleMenu, location }) => {
  const data = useStaticQuery<IQuery>(graphql`
    query HeaderData {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___categories) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  const { title } = data.site.siteMetadata;
  const { group: categories } = data.allMarkdownRemark;

  return (
    <PureHeader
      menuOpen={menuOpen}
      toggleMenu={toggleMenu}
      title={title}
      categories={categories}
      location={location}
    />
  );
};

export default Header;
