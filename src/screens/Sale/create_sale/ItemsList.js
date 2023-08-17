import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {color} from '../../../styles/Styles';
import RenderItem from './RenderItem';

const ItemsList = ({
  passedData,
  handleRemoveAll,
  navigation,
  handleDeleteItem,
  handleQtyDecrement,
  handleQtyIncrement,
  handleQuantityInput,
  handleEventOnBlur
}) => {
  return (
    <View
      style={{
        // flex: 1,
        marginTop: 0,
        backgroundColor: color.lightGray,
        paddingTop: 15,
        paddingBottom: 15,
        paddingHorizontal: 20,
        // borderWidth: 1,
      }}>
      {/* Items and Remove All Bar Component */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
          }}>
          <View>
            <Text style={{fontSize: 20, fontWeight: '600'}}>Items</Text>
          </View>
          <View
            style={{
              display: passedData?.length > 0 ? 'flex' : 'none',
              width: 28,
              height: 28,
              backgroundColor: color.primary,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontWeight: '500',
                fontSize: 17,
                lineHeight: 22,
              }}>
              {passedData?.length > 8 ? '+9' : passedData.length}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => handleRemoveAll()}>
          {passedData?.length > 0 && (
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: color.primary,
              }}>
              Remove All
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        nestedScrollEnabled={true}
        style={[
          styles.gustureScrollArea,
          passedData?.length > 0 && styles.guestureHoldingData,
        ]}>
        <View
          style={{
            gap: 10,
            marginVertical: passedData?.length > 0 ? 15 : 0,
          }}>
          {passedData.map((item, index) => {
            return (
              <RenderItem
                item={item}
                handleDeleteItem={handleDeleteItem}
                handleQtyDecrement={handleQtyDecrement}
                handleQtyIncrement={handleQtyIncrement}
                handleQuantityInput={handleQuantityInput}
                handleEventOnBlur={handleEventOnBlur}
                key={item._id}
              />
            );
          })}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={{marginTop: passedData?.length > 0 ? 15 : 0, paddingBottom: 15, paddingTop: 5}}
        onPress={() => navigation.navigate('select-product')}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            color: color.secondary,
          }}>
          Select Products
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  gustureScrollArea: {
    maxHeight: 270,
  },
  guestureHoldingData: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'lightgray',
  },
});

export default ItemsList;