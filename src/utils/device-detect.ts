import { isMobileOnly } from 'react-device-detect';

export const isMobileSSR = typeof isMobileOnly !== 'undefined' && isMobileOnly;
