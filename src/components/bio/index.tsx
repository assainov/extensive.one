import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

import styles from './styles.module.scss';

const Bio: React.FC = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/ilyas-assainov.jpg/" }) {
        childImageSharp {
          fixed(width: 90, height: 90) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `);

  const { author } = data.site.siteMetadata;
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
            <p>
              I am a full stack developer specializing in designing and implementing scalable JavaScript projects. In
              this blog, I share my insights and solutions on problems that I think might be helpful to other
              developers. If you find my articles valuable, subscribe or add me in social media to always be updated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bio;
