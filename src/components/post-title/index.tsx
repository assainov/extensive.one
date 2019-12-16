import React from 'react';
import { Link } from 'gatsby';

import styles from './styles.module.scss';
import CategoryLinks from '../category-links';
import { config } from '../../../content/website/config';

const { author } = config;

interface IProps {
  title: string;
  link?: string;
  date: string;
  categories: string[];
}

const PostTitle: React.FC<IProps> = ({ title, link, date, categories }) => {
  const renderTitle = (): JSX.Element => {
    if (typeof link === 'string') {
      return (
        <Link to={link} className={styles.title}>
          {title}
        </Link>
      );
    }
    return <h1 className={styles.title}>{title}</h1>;
  };

  return (
    <div className={styles.postTitle}>
      {renderTitle()}
      <small>
        By {author} / In <CategoryLinks {...{ title, link, date, categories }} /> / {date}{' '}
      </small>
      <div className={styles.letter}>{title[0].toUpperCase()}</div>
    </div>
  );
};

export default PostTitle;
