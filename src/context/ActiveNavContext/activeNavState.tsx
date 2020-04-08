import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import ActiveNavContext from './activeNavContext';

interface ActiveNavStateProps {
  children?: React.ReactNode;
}

const ActiveNavState: React.FC = ({ children }: ActiveNavStateProps) => {
  const { pathname } = window.location;

  const path = pathname === '/' ? 'home' : pathname.substr(1);

  const [activeItem, setActiveItem]: any = useState(path);

  const [visible, setVisible]: any = useState();

  const handleItemClick: any = (e: any, { name }: any): any => {
    setActiveItem(name);
  };

  const handleSidebarClick: any = (e: any, { name }: any): any => {
    setActiveItem(name);
    setVisible(false);
  };

  const toggleVisible = (): void => {
    setVisible(!visible);
  };

  const onHide = (): void => {
    setVisible(false);
  };

  return (
    <ActiveNavContext.Provider
      value={{
        activeItem,
        handleItemClick,
        handleSidebarClick,
        visible,
        toggleVisible,
        onHide,
      }}
    >
      {children}
    </ActiveNavContext.Provider>
  );
};

export default withRouter(ActiveNavState);
