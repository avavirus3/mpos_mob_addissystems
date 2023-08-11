import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: []
    //  [
    //     {
    //       id: 'mob1',
    //       name: 'iPhone',
    //       price: 34940,
    //       qty: 4,
    //       image: require('../../../assets/images/phone-2.jpg'),
    //       category: 'phone',
    //     },
    //     {
    //       id: 'mob2',
    //       name: 'Samsung S9+',
    //       price: 16400,
    //       qty: 7,
    //       image: require('../../../assets/images/phone-3.jpg'),
    //       category: 'phone',
    //     },
    //     {
    //       id: 'mob3',
    //       name: 'iPhone 5',
    //       price: 9541,
    //       qty: 9,
    //       image: require('../../../assets/images/phone-4.jpg'),
    //       category: 'phone',
    //     },
    //     {
    //       id: 'mob4',
    //       name: 'HTC 4',
    //       price: 64134,
    //       qty: 2,
    //       image: require('../../../assets/images/phone-5.jpg'),
    //       category: 'phone',
    //     },
    //     {
    //       id: 'mob5',
    //       name: 'Samsung S9+',
    //       price: 16400,
    //       qty: 1,
    //       image: require('../../../assets/images/phone-6.jpg'),
    //       category: 'phone',
    //     },
    //     {
    //       id: 'mob6',
    //       name: 'iPhone 5',
    //       price: 9541,
    //       qty: 6,
    //       image: require('../../../assets/images/phone-7.jpg'),
    //       category: 'phone',
    //     },
    //     {
    //       id: 'mob7',
    //       name: 'HTC 4',
    //       price: 64134,
    //       qty: 12,
    //       image: require('../../../assets/images/phone-8.jpg'),
    //       category: 'phone',
    //     },
    //     {
    //       id: 'lap1',
    //       name: 'Hp Pavilion',
    //       price: 120000,
    //       qty: 6,
    //       image: require('../../../assets/images/laptop-1.jpg'),
    //       category: 'laptop',
    //     },
    //     {
    //       id: 'lap2',
    //       name: 'Mac 15',
    //       price: 260000,
    //       qty: 9,
    //       image: require('../../../assets/images/laptop-2.jpg'),
    //       category: 'laptop',
    //     },
    //     {
    //       id: 'lap3',
    //       name: 'Omen Gaming',
    //       price: 135000,
    //       qty: 5,
    //       image: require('../../../assets/images/laptop-3.jpg'),
    //       category: 'laptop',
    //     },
    //     {
    //       id: 'lap4',
    //       name: 'Dell Inspire',
    //       price: 87000,
    //       qty: 4,
    //       image: require('../../../assets/images/laptop-4.jpg'),
    //       category: 'laptop',
    //     },
    //     {
    //       id: 'lap5',
    //       name: 'Samsung Tablet',
    //       price: 35000,
    //       qty: 3,
    //       image: require('../../../assets/images/tablet-1.jpeg'),
    //       category: 'tablet',
    //     },
    //     {
    //       id: 'tab1',
    //       name: 'Mini Tablet',
    //       price: 15000,
    //       qty: 1,
    //       image: require('../../../assets/images/tablet-2.jpg'),
    //       category: 'tablet',
    //     },
    //     {
    //       id: 'tab2',
    //       name: 'Tablet A03',
    //       price: 35000,
    //       qty: 3,
    //       image: require('../../../assets/images/tablet-3.jpg'),
    //       category: 'tablet',
    //     },
    //     {
    //       id: 'tab3',
    //       name: 'iPad Tablet',
    //       price: 35000,
    //       qty: 2,
    //       image: require('../../../assets/images/tablet-4.jpeg'),
    //       category: 'tablet',
    //     },
    //     {
    //       id: 'mous1',
    //       name: 'Gaming Mouse',
    //       price: 3200,
    //       qty: 15,
    //       image: require('../../../assets/images/mouse-1.jpg'),
    //       category: 'mouse',
    //     },
    //     {
    //       id: 'mous2',
    //       name: 'Wired Mouse',
    //       price: 999,
    //       qty: 7,
    //       image: require('../../../assets/images/mouse-2.jpg'),
    //       category: 'mouse',
    //     },
    //     {
    //       id: 'mous3',
    //       name: 'Gaming Mouse',
    //       price: 4500,
    //       qty: 9,
    //       image: require('../../../assets/images/mouse-3.jpg'),
    //       category: 'mouse',
    //     },
    //     {
    //       id: 'mous4',
    //       name: 'Wireless Mouse',
    //       price: 3200,
    //       qty: 14,
    //       image: require('../../../assets/images/mouse-4.jpeg'),
    //       category: 'mouse',
    //     },
    //     {
    //       id: 'charg1',
    //       name: 'Wireless Charger',
    //       price: 3200,
    //       qty: 35,
    //       image: require('../../../assets/images/charger-1.jpg'),
    //       category: 'charger',
    //     },
    //     {
    //       id: 'charg2',
    //       name: 'Micro Mini',
    //       price: 3200,
    //       qty: 49,
    //       image: require('../../../assets/images/charger-2.jpg'),
    //       category: 'charger',
    //     },
    //     {
    //       id: 'charg3',
    //       name: 'Type C Charger',
    //       price: 3200,
    //       qty: 74,
    //       image: require('../../../assets/images/charger-3.jpg'),
    //       category: 'charger',
    //     },
    //     {
    //       id: 'charg4',
    //       name: 'Original Samsung',
    //       price: 3200,
    //       qty: 12,
    //       image: require('../../../assets/images/charger-4.jpg'),
    //       category: 'charger',
    //     },
    //     {
    //       id: 'charg5',
    //       name: 'Data Cable',
    //       price: 3200,
    //       qty: 28,
    //       image: require('../../../assets/images/charger-5.jpeg'),
    //       category: 'charger',
    //     },
    //   ]
}

export const productListSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
      setPRODUCT: (state, action) => {
        state.items = action.payload;
    },
    }
});


export const { setPRODUCT } = productListSlice.actions;

export default productListSlice.reducer;