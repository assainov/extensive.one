import * as React from 'react';
import { Provider } from 'react-redux';

import configureStore from './src/state/store';
// prismjs theme
import './src/styles/prism-theme.css';

// wrap the app with redux provider
export const wrapRootElement: React.FC<any> = ({ element }) => {
  const store = configureStore();

  return <Provider store={store}>{element}</Provider>;
};
