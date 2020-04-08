/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

const ActiveNavContext = createContext({
  activeItem: null,
  handleItemClick: () => {},
  handleSidebarClick: () => {},
  visible: false,
  toggleVisible: () => {},
  onHide: () => {},
});

export default ActiveNavContext;
