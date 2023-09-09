import React, { createContext, useContext, ReactNode } from 'react';
import { NavigateFunction } from 'react-router-dom';

type Navigator = NavigateFunction;

const NavigatorContext = createContext<Navigator | undefined>(undefined);

export function useNavigatorContext(): Navigator {
  const navigator = useContext(NavigatorContext);
  if (!navigator) {
    throw new Error('useNavigatorContext must be used within a NavigatorProvider');
  }
  return navigator;
}

interface NavigatorProviderProps {
  children: ReactNode;
  navigator: Navigator;
}

export function NavigatorProvider({ children, navigator }: NavigatorProviderProps) {
  return (
    <NavigatorContext.Provider value={navigator}>
      {children}
    </NavigatorContext.Provider>
  );
}
