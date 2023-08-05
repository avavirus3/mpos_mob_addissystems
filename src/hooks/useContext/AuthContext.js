import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState({
    name: '',
    phone: '',
    pass: '',
    isLoggedIn: true,
    saleStarted: false,
  });

  const [data, setData] = useState({
    customerList: [
      {
        name: 'Amanuel Kebede',
        tin: '154004876579',
      },
      {
        name: 'Habtom Abebe',
        tin: '148790046997',
      },
      {
        name: 'Yeshi Amare',
        tin: '317897489546',
      },
      {
        name: 'Samuel Bekele',
        tin: '416578771346',
      },
      {
        name: 'Baye Shumeta',
        tin: '484016746879',
      },
      {
        name: 'Ahmed Mohammad',
        tin: 'TT1016746879',
      },
      {
        name: 'Emmona Takele',
        tin: 'T014016746879',
      },
    ],
    draft: [],
  });

  const login = userData => {
    setUser(userData);
  };

  const logout = () => {
    setUser({
      ...user,
      isLoggedIn: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        data,
        setData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
