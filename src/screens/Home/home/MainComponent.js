import { View, FlatList } from 'react-native'
import React from 'react'
import { color, textStyles } from '../../../styles/Styles'
import ProductCard from '../../../components/card/ProductCard'
import ProductHead from './ProductHead'



const MainComponent = ({data, CurrentProduct, setCurrentProduct, ProductStore, search, handleQtyDecrement, handleQtyIncrement, handleQuantityInput, handleMakeSale, activeMakeSale }) => {
  return (
    <View style={{flex: 1}}>
              {/* Product Top Bar */}
              <ProductHead
                CurrentProduct={CurrentProduct}
                setCurrentProduct={setCurrentProduct}
                activeMakeSale={activeMakeSale}
                handleMakeSale={handleMakeSale}
              />

              {/* Product List */}
              <FlatList
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  marginHorizontal: 5,
                  gap: 15,
                }}
                contentContainerStyle={{
                  marginTop: 10,
                  gap: 15,
                  paddingBottom: 80,
                  borderWidth: 0,
                  borderColor: 'red',
                  animated: true,
                }}
                data={
                  CurrentProduct === 'All'
                    ? ProductStore.filter(product =>
                        new RegExp(search, 'gi').test(product.name),
                      )
                    : ProductStore.filter(
                        item =>
                          item.category === CurrentProduct.toLowerCase() &&
                          new RegExp(search, 'gi').test(item.name),
                      )
                }
                numColumns={2}
                renderItem={({item}) => (
                  <ProductCard
                    item={item}
                    handleQtyDecrement={handleQtyDecrement}
                    handleQtyIncrement={handleQtyIncrement}
                    handleQuantityInput={handleQuantityInput}
                  />
                )}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
              />
            </View>
  )
}

export default MainComponent