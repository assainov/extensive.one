import * as React from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { isMobileSSR } from '../../utils/device-detect';
import Button from '../button';
import styles from './styles.module.scss';
import CategoryLinks from '../category-links';
import truncate from '../../utils/truncate';
import { IArticle } from '../../pages';
import { saveToReadingList } from '../../utils/reading-list-actions';
import { IDefaultAction } from '../../state/reducer';

interface IDispatchProps {
  addArticle: () => {};
  notifyPostExists: () => {};
}

interface IOwnProps {
  articles: IArticle[];
}

class Hero extends React.Component<IOwnProps & IDispatchProps> {
  settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  addToReadingList = (article: IArticle): void => saveToReadingList.call(this, article);

  render(): JSX.Element {
    const maxTitleChars = isMobileSSR ? 50 : 70;
    const { articles } = this.props;

    return (
      <div className={styles.hero}>
        <Slider {...this.settings}>
          {articles.map(({ title, abstract, link, author, categories, date }) => (
            <div key={title}>
              <div className="container">
                <article className={styles.slide}>
                  <h2 className={styles.title}>{truncate(title, maxTitleChars, true)}</h2>
                  <small>
                    By {author} / {date} / In <CategoryLinks categories={categories}></CategoryLinks>
                  </small>
                  <div className={styles.panel}>
                    <Button type="link" to={link} className={styles.actionPrimary}>
                      Read on
                    </Button>
                    <Button
                      type="button"
                      onClick={(): void => this.addToReadingList({ title, abstract, link, author, categories, date })}
                      className={styles.actionSecondary}
                    >
                      Read later
                    </Button>
                  </div>
                  <div className={styles.letter}>{title[0].toUpperCase()}</div>
                </article>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => {
  return {
    addArticle: (): IDefaultAction => dispatch({ type: 'ADD_POST_START' }),
    notifyPostExists: (): IDefaultAction => dispatch({ type: 'POST_ALREADY_EXISTS' }),
  };
};

export default connect(null, mapDispatchToProps)(Hero);
