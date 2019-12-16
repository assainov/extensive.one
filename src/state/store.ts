import { createStore as createReduxStore, Store } from 'redux';
import reducer, { initialState } from './reducer';

const configure: () => Store = () => createReduxStore(reducer, initialState);
export default configure;
