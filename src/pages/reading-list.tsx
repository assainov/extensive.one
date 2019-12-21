import * as React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Canvas from '../components/canvas';
import AllPosts from '../components/all-posts';
import { IPageProps } from '../typings/page-props';
import { IArticle } from '.';

const ReadingList: React.FC<IPageProps> = props => {
  const [posts, setPosts] = React.useState<IArticle[]>([]);

  React.useEffect(() => {
    const serializedPosts = localStorage.getItem('posts');

    if (!serializedPosts || !serializedPosts.length) {
      return;
    }

    const localPosts = JSON.parse(serializedPosts) as IArticle[];

    setPosts(localPosts);
  }, []);

  const handleRemovePost = (title: string): void => {
    const newPosts = posts.filter(post => post.title !== title);

    setPosts(newPosts);
  };

  return (
    <Layout location={props.location}>
      <SEO title={`Reading List`} />
      <Canvas>
        <AllPosts
          heading={`You have ${posts.length} article${posts.length === 1 ? '' : 's'} to read`}
          isReadingList
          articles={posts}
          onRemovePost={(title): void => handleRemovePost(title)}
        />
      </Canvas>
    </Layout>
  );
};

export default ReadingList;
