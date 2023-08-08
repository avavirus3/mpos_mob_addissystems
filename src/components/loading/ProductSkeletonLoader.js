import React from 'react';
import {View} from 'react-native';
import ContentLoader, {Rect} from 'react-content-loader/native';

const ProductItemSkeletonLoader = () => {
  return (
    <View style={{flex: 1}}>
      <ContentLoader
        viewBox="0 0 180 223"
        speed={1}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <Rect x="0" y="0" rx="4" ry="4" width="180" height="80" />
        <Rect x="5" y="90" rx="4" ry="4" width="170" height="28" />
        <Rect x="45" y="124" rx="4" ry="4" width="80" height="20" />
        <Rect x="10" y="150" rx="4" ry="4" width="160" height="20" />
        <Rect x="15" y="178" rx="4" ry="4" width="150" height="45" />
      </ContentLoader>
    </View>
  );
};

export default ProductItemSkeletonLoader;
