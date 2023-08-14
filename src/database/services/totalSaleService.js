import {StyleSheet} from 'react-native';
import realm from '../index';

export const getTotalSaleAmount = () => {

  const totalSale = realm.objects('Total_Sale')[0];
  if (totalSale) {
    return totalSale.amount;
  }

  return '0'; // Return 0 if the totalSale object doesn't exist or the amount is not set
};

export const updateTotalSale = async newValue => {

  realm.write(() => {
    let totalSale = realm.objects('Total_Sale')[0];
    if (!totalSale) {
      totalSale = realm.create('Total_Sale', {amount: 0});
    }
    totalSale.amount += parseFloat(newValue);
  });
};

export const resetTotalSale = async () => {

  realm.write(() => {
    let totalSale = realm.objects('Total_Sale')[0];
    if (!totalSale) {
      totalSale = realm.create('Total_Sale', {amount: 0});
    }
    totalSale.amount = 0;
  });
};
