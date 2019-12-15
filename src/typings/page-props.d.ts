import * as React from 'react';
import { WindowLocation } from '@reach/router';

export interface IPageProps {
  location: WindowLocation;
  children: React.ReactChildren;
}
