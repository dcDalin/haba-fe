import { Responsive } from 'semantic-ui-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getWidth = (): any => {
  const isSSR = typeof window === 'undefined';

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

export default getWidth;
