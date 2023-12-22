import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext({
  organizacion: '',
  setOrganizacion: (() => { }) as React.Dispatch<React.SetStateAction<string>>,
  currentPage: 0,
  setCurrentPage: (() => { }) as React.Dispatch<React.SetStateAction<number>>,
});

export const SearchProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [organizacion, setOrganizacion] = useState('lemoncode');
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <SearchContext.Provider value={{
      organizacion,
      setOrganizacion,
      currentPage,
      setCurrentPage
    }}>
      {children}
    </SearchContext.Provider>
  )
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
