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

  const [ProductStore, setProductStore] = useState([
    {
      id: 'mob1',
      name: 'iPhone',
      price: 34940,
      qty: 10,
      image: require('../../assets/images/phone-2.jpg'),
      category: 'phone',
    },
    {
      id: 'mob2',
      name: 'Samsung S9+',
      price: 16400,
      qty: 5,
      image: require('../../assets/images/phone-3.jpg'),
      category: 'phone',
    },
    {
      id: 'mob3',
      name: 'iPhone 5',
      price: 9541,
      qty: 2,
      image: require('../../assets/images/phone-4.jpg'),
      category: 'phone',
    },
    {
      id: 'mob4',
      name: 'HTC 4',
      price: 64134,
      qty: 2,
      image: require('../../assets/images/phone-5.jpg'),
      category: 'phone',
    },
    {
      id: 'mob5',
      name: 'Samsung S9+',
      price: 16400,
      qty: 3,
      image: require('../../assets/images/phone-6.jpg'),
      category: 'phone',
    },
    {
      id: 'mob6',
      name: 'iPhone 5',
      price: 9541,
      qty: 6,
      image: require('../../assets/images/phone-7.jpg'),
      category: 'phone',
    },
    {
      id: 'mob7',
      name: 'HTC 4',
      price: 64134,
      qty: 18,
      image: require('../../assets/images/phone-8.jpg'),
      category: 'phone',
    },
    {
      id: 'lap1',
      name: 'Hp Pavilion',
      price: 120000,
      qty: 8,
      image: require('../../assets/images/laptop-1.jpg'),
      category: 'laptop',
    },
    {
      id: 'lap2',
      name: 'Mac 15',
      price: 260000,
      qty: 6,
      image: require('../../assets/images/laptop-2.jpg'),
      category: 'laptop',
    },
    {
      id: 'lap3',
      name: 'Omen Gaming',
      price: 135000,
      qty: 1,
      image: require('../../assets/images/laptop-3.jpg'),
      category: 'laptop',
    },
    {
      id: 'lap4',
      name: 'Dell Inspire',
      price: 87000,
      qty: 4,
      image: require('../../assets/images/laptop-4.jpg'),
      category: 'laptop',
    },
    {
      id: 'lap5',
      name: 'Samsung Tablet',
      price: 35000,
      qty: 2,
      image: require('../../assets/images/tablet-1.jpeg'),
      category: 'tablet',
    },
    {
      id: 'tab1',
      name: 'Mini Tablet',
      price: 15000,
      qty: 7,
      image: require('../../assets/images/tablet-2.jpg'),
      category: 'tablet',
    },
    {
      id: 'tab2',
      name: 'Tablet A03',
      price: 35000,
      qty: 3,
      image: require('../../assets/images/tablet-3.jpg'),
      category: 'tablet',
    },
    {
      id: 'tab3',
      name: 'iPad Tablet',
      price: 35000,
      qty: 4,
      image: require('../../assets/images/tablet-4.jpeg'),
      category: 'tablet',
    },
    {
      id: 'mous1',
      name: 'Gaming Mouse',
      price: 3200,
      qty: 10,
      image: require('../../assets/images/mouse-1.jpg'),
      category: 'mouse',
    },
    {
      id: 'mous2',
      name: 'Wired Mouse',
      price: 999,
      qty: 32,
      image: require('../../assets/images/mouse-2.jpg'),
      category: 'mouse',
    },
    {
      id: 'mous3',
      name: 'Gaming Mouse',
      price: 4500,
      qty: 7,
      image: require('../../assets/images/mouse-3.jpg'),
      category: 'mouse',
    },
    {
      id: 'mous4',
      name: 'Wireless Mouse',
      price: 3200,
      qty: 21,
      image: require('../../assets/images/mouse-4.jpeg'),
      category: 'mouse',
    },
    {
      id: 'charg1',
      name: 'Wireless Charger',
      price: 3200,
      qty: 13,
      image: require('../../assets/images/charger-1.jpg'),
      category: 'charger',
    },
    {
      id: 'charg2',
      name: 'Micro Mini',
      price: 3200,
      qty: 94,
      image: require('../../assets/images/charger-2.jpg'),
      category: 'charger',
    },
    {
      id: 'charg3',
      name: 'Type C Charger',
      price: 3200,
      qty: 78,
      image: require('../../assets/images/charger-3.jpg'),
      category: 'charger',
    },
    {
      id: 'charg4',
      name: 'Original Samsung',
      price: 3200,
      qty: 30,
      image: require('../../assets/images/charger-4.jpg'),
      category: 'charger',
    },
    {
      id: 'charg5',
      name: 'Data Cable',
      price: 3200,
      qty: 48,
      image: require('../../assets/images/charger-5.jpeg'),
      category: 'charger',
    },
  ]);

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
        ProductStore,
        setProductStore,
        logout,
        data,
        setData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
