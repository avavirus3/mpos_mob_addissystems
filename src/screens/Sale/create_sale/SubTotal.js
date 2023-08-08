import {View, Text} from 'react-native';
import React from 'react';

const SubTotal = ({
  TOTAL_PRODUCT_PRICE,
  TOTAL_VAT_VALUE,
  TOTAL_VAT_INCLUSIVE,
}) => {
  return (
    <View style={{gap: 5, marginTop: 8}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 18}}>Subtotal</Text>
        <Text style={{fontSize: 18}}>
          ETB {TOTAL_PRODUCT_PRICE || (0.0).toFixed(2)}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 18}}>TAX(15%)</Text>
        <Text style={{fontSize: 18}}>ETB {TOTAL_VAT_VALUE || 0.0}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 18}}>Total</Text>
        <Text style={{fontSize: 18}}>ETB {TOTAL_VAT_INCLUSIVE || 0.0}</Text>
      </View>
    </View>
  );
};

export default SubTotal;
