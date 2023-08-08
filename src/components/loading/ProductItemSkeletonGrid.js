import {View} from 'react-native';
import React from 'react';
import ProductItemSkeletonLoader from './ProductSkeletonLoader';

const ProductItemSkeletonGrid = () => {
  return (
    <View style={{gap: 25, marginTop: 15}}>
      <View
        style={{
          height: 225,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{width: 180}}>
          <ProductItemSkeletonLoader />
        </View>
        <View style={{width: 180}}>
          <ProductItemSkeletonLoader />
        </View>
      </View>
      <View
        style={{
          height: 225,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{width: 180}}>
          <ProductItemSkeletonLoader />
        </View>
        <View style={{width: 180}}>
          <ProductItemSkeletonLoader />
        </View>
      </View>
    </View>
  );
};

export default ProductItemSkeletonGrid;
