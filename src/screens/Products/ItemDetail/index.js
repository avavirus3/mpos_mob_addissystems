import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color, containerStyles} from '../../../styles/Styles';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import ItemComponent from './itemData';
import realm from '../../../database';
import Button from '../../../components/button/Button';
import StockModal from './StockModal';

const ItemDetail = ({navigation, route}) => {
  const [itemData, setItemData] = useState(null);
  const [stockModal, setStockModal] = useState(true);
  const [updatedQuntitiy, setUpdatedQuantity] = useState(0);

  const readyToPassToCreatSale =
    itemData !== null
      ? [itemData]?.map(
          item =>
            true && {
              name: item.name,
              _id: item._id,
              price: item.price,
              desc: item.desc,
              quantity: 0,
              image: item.image,
              category: item.category,
            },
        )
      : [];

  console.log('ready Item:', readyToPassToCreatSale);

  useEffect(() => {
    const getRealmData = () => {
      try {
        const data = realm.objects('Items');
        setItemData(data.filter(item => item._id == route.params)[0]);
      } catch (err) {
        console.log('Error while retriving realmDatabase:', err);
      }
    };

    getRealmData();
  }, []);

  function handleEdit() {}

  function handleDelete() {}

  function handleMakeSale() {
    navigation.navigate('Sale', {
      screen: 'create-sale',
      params: {passed_selected_product: readyToPassToCreatSale},
    });
  }

  function handleStockInOUt() {
    setStockModal(true);
  }

  function handleStockModalAccept() {}

  function handleStockModalCancel() {
    setStockModal(false);
  }

  console.log('updatedQua', updatedQuntitiy);

  return (
    <View style={containerStyles.mainContainer}>
      <StockModal
        modalVisibility={stockModal}
        setModalVisibility={setStockModal}
        data={itemData}
        handleCancel={handleStockModalCancel}
        handleSave={handleStockModalAccept}
        updatedQuantity={updatedQuntitiy}
        setUpdatedQuantity={setUpdatedQuantity}
      />
      <TopNavigationBar
        backIcon
        middleLabel={'iPhone 14 Pro'}
        edit
        onPressEdit={handleEdit}
        onPressDelete={handleDelete}
        onPressBack={() => navigation.goBack()}
      />
      <ScrollView
        style={{flex: 1, paddingBottom: 80}}
        showsVerticalScrollIndicator={false}>
        <View style={{}}>
          {itemData && <ItemComponent itemData={itemData} />}
          <View style={{marginVertical: 15}}>
            <Button
              theme={'primary'}
              label={'Make Sale'}
              onPress={handleMakeSale}
            />
            <Button
              theme={'secondary'}
              label={'Stock in/out'}
              onPress={handleStockInOUt}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});
export default ItemDetail;
