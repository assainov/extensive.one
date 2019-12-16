export const initialState = {
  addedPost: false,
};

export interface IState {
  addedPost: boolean;
}

export interface IDefaultAction {
  type: string;
}

const reducer = (state = initialState, action: IDefaultAction): IState => {
  switch (action.type) {
    case 'ADD_POST_START': {
      const newState = Object.assign({}, state, { addedPost: true });
      return newState;
    }
    case 'ADD_POST_FINISH': {
      const newState = Object.assign({}, state, { addedPost: false });
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
