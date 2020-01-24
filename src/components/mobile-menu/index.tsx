import * as React from 'react';
import Helmet from 'react-helmet';
import { Link, useStaticQuery, graphql, navigate } from 'gatsby';

import kebabCase from 'lodash/kebabCase';

import styles from './styles.module.scss';
import { config } from '../../../content/website/config';
import { IProps, MenuItem, IQuery } from './contracts';
import ThemeSwitcher from '../theme-switcher';
import { isMobileSSR } from '../../utils/device-detect';

const MobileMenu: React.FC<IProps> = ({ menuOpen, toggleMenu }) => {
  const data = useStaticQuery<IQuery>(graphql`
    query MobileMenuData {
      allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___categories) {
          fieldValue
        }
      }
    }
  `);

  const menuItems: MenuItem[] = [
    {
      title: 'Home',
      url: '/',
      external: false,
    },
    {
      title: 'Categories',
      url: '',
      children: data.allMarkdownRemark.group.map(category => ({
        title: category.fieldValue,
        url: `/categories/${kebabCase(category.fieldValue)}/`,
      })),
      external: false,
    },
    {
      title: 'Reading List',
      url: '/reading-list',
      external: false,
    },
    {
      title: 'Get In Touch',
      url: `mailto:${config.email}`,
      external: true,
    },
  ];

  const [activeIndex, setActiveIndex] = React.useState<number | null>();

  const handleSubmenuItemClick = (index: number): void => {
    setActiveIndex(index !== activeIndex ? index : null);
  };

  const navigateTo = (url: string, isExternal: boolean): void => {
    toggleMenu();
    if (isExternal) {
      window.open(url);
      return;
    }
    navigate(url);
  };

  return (
    <div
      className={styles.onCanvas}
      style={{ pointerEvents: menuOpen ? 'initial' : 'none' }}
    >
      {menuOpen && (
        <Helmet>
          <style type="text/css">
            {`
                body {
                    overflow: hidden;
                }
            `}
          </style>
        </Helmet>
      )}
      <div
        className={styles.mobileMenu}
        style={{ transform: menuOpen ? `translateX(0)` : `translateX(100%)` }}
      >
        <div className="container">
          <nav>
            <ul>
              {menuItems.map(({ title, url, children, external }, index) => {
                return (
                  <li
                    key={title}
                    className={styles.topItem}
                    onClick={(): void => handleSubmenuItemClick(index)}
                  >
                    {url ? (
                      <span
                        onClick={(): void => navigateTo(url, external)}
                        className={styles.topLink}
                      >
                        {title}
                        {children && (
                          <span
                            className={styles.arrowIcon}
                            style={{
                              transform: `rotate(${
                                index === activeIndex ? 180 : 0
                              }deg)`,
                            }}
                          />
                        )}
                      </span>
                    ) : (
                      <span className={styles.topLink}>
                        {title}
                        {children && (
                          <span
                            className={styles.arrowIcon}
                            style={{
                              transform: `rotate(${
                                index === activeIndex ? 180 : 0
                              }deg)`,
                            }}
                          />
                        )}
                      </span>
                    )}
                    {children && (
                      <ul
                        className={styles.dropdownList}
                        style={{
                          height:
                            index === activeIndex
                              ? `${children.length * 3}em`
                              : '0',
                        }}
                      >
                        {children.map(({ title, url }) => (
                          <li key={title}>
                            <Link to={url}>{title}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
              {isMobileSSR && ( // Bug with Theme switcher not working with two instances (so load one per device)
                <li className={styles.topItem}>
                  <span className={styles.topLink}>
                    <ThemeSwitcher />
                  </span>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
