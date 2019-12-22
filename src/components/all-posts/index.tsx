import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import PostTitle from '../post-title';
import Button from '../button';
import styles from './styles.module.scss';
import truncate from '../../utils/truncate';
import { isMobileSSR } from '../../utils/device-detect';
import { IArticle } from '../../pages';
import { IDefaultAction } from '../../state/reducer';
import { saveToReadingList, deleteFromReadingList } from '../../utils/reading-list-actions';

interface IDispatchProps {
  addArticle: () => {};
  removeArticle: () => {};
  notifyPostExists: () => {};
}

interface IOwnProps {
  articles: IArticle[];
  heading?: string;
  isReadingList?: boolean;
  onRemovePost?: (title: string) => void;
}

class Posts extends React.Component<IOwnProps & IDispatchProps> {
  addToReadingList = (article: IArticle): void => saveToReadingList.call(this, article);

  removeFromReadingList = (title: string): void => deleteFromReadingList.call(this, title);

  render(): JSX.Element {
    const maxAbstractChars = isMobileSSR ? 250 : 300;
    const { articles, isReadingList, heading = 'Latest posts' } = this.props;

    return (
      <div className={styles.allPosts}>
        {articles.length > 0 ? (
          <h2 dangerouslySetInnerHTML={{ __html: heading }} />
        ) : (
          isReadingList && (
            <>
              <h2>No articles in the list...</h2>
              <p className={styles.noResults}>Articles are added when you press Read Later.</p>
            </>
          )
        )}
        {articles.map(post => (
          <article key={post.link}>
            <hr />
            <PostTitle {...post} />
            <div className={styles.abstract}>
              <p>{truncate(post.abstract, maxAbstractChars, true)}</p>
            </div>
            <div className={styles.panel}>
              <Button type="link" to={post.link} className={styles.actionPrimary}>
                Read on
              </Button>
              {isReadingList && (
                <Button
                  type="button"
                  onClick={(): void => this.removeFromReadingList(post.title)}
                  className={styles.actionSecondary}
                >
                  Remove from list
                </Button>
              )}
              {!isReadingList && (
                <Button
                  type="button"
                  onClick={(): void => this.addToReadingList(post)}
                  className={styles.actionSecondary}
                >
                  Read later
                </Button>
              )}
            </div>
          </article>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
  return {
    addArticle: (): IDefaultAction => dispatch({ type: 'ADD_POST_START' }),
    removeArticle: (): IDefaultAction => dispatch({ type: 'REMOVE_POST' }),
    notifyPostExists: (): IDefaultAction => dispatch({ type: 'POST_ALREADY_EXISTS' }),
  };
};

export default connect(null, mapDispatchToProps)(Posts);
