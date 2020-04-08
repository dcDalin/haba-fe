import React from 'react';
import AuthModalState from '../../context/AuthModalContext/authModalState';
import DesktopContainer from './DesktopContainer';
import MobileContainer from './MobileContainer';

export interface Props {
  children: React.ReactNode;
}

const ResponsiveContainer: React.FC<Props> = (props: Props) => {
  const { children } = props;
  return (
    <AuthModalState>
      <DesktopContainer>{children}</DesktopContainer>
      <MobileContainer>{children}</MobileContainer>
    </AuthModalState>
  );
};

export default ResponsiveContainer;
