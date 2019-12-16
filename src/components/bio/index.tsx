import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image, { FixedObject } from 'gatsby-image';

import { config } from '../../../content/website/config';
import styles from './styles.module.scss';

interface IQuery {
  avatar: {
    childImageSharp: {
      fixed: FixedObject | FixedObject[];
    };
  };
}

const Bio: React.FC = () => {
  const data = useStaticQuery<IQuery>(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/ilyas-assainov.jpg/" }) {
        childImageSharp {
          fixed(width: 90, height: 90) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const { author, authorDescription } = config;
  return (
    <div className={styles.bio}>
      <div className={styles.flex}>
        <div>
          <Image
            fixed={data.avatar.childImageSharp.fixed}
            alt={author}
            className={styles.image}
            imgStyle={{
              borderRadius: `50%`,
            }}
          />
        </div>
        <div>
          <h2 className={styles.name}>{author}</h2>
          <div className={styles.text}>
            <p>{authorDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bio;
