import * as React from 'react';
import { Link } from 'gatsby';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import styles from './styles.module.scss';
import { IState, IDefaultAction } from '../../state/reducer';

interface IStateToProps {
  isHidden: boolean;
  newPostAdded: boolean;
}

interface IDispatchToProps {
  hideNotification: () => {};
}

const Notification: React.FC<IStateToProps & IDispatchToProps> = ({ isHidden, hideNotification, newPostAdded }) => {
  React.useEffect(() => {
    if (!isHidden) {
      setTimeout(() => {
        hideNotification();
      }, 3000);
    }
  }, [isHidden]);

  return (
    <div className={`${styles.notification} ${isHidden ? styles.hidden : ''}`}>
      {newPostAdded && (
        <div>
          Saved new article to <Link to="/reading-list">reading list</Link>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: IState): IStateToProps => {
  return {
    isHidden: !state.addedPost,
    newPostAdded: state.addedPost,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchToProps => {
  return {
    hideNotification: (): IDefaultAction => dispatch({ type: 'ADD_POST_FINISH' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
