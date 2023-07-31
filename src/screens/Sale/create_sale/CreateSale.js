import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {color, textStyles} from '../../../styles/Styles';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import Button from '../../../components/button/Button';
import {AuthContext} from '../../../hooks/useContext/AuthContext';
import moment from 'moment/moment';
import RenderItem from './RenderItem';
import DiscountModal from './DiscountModal';
import SuccessFailModal from '../../../components/modal/SuccessFailModal';

/* Main Function */
const CreateSale = ({route}) => {
  const {data, setData} = useContext(AuthContext);
  const navigation = useNavigation();
  const incomingData = route.params;
  const [passedData, setPassedData] = useState([]);
  const [customer, setCustomer] = useState({name: 'Guest'});
  const [incomingDraftIndex, setIncomingDraftIndex] = useState(null);
  const [transactionModal, setTransactionModal] = useState(false)
  const [draftModal, setDraftModal] = useState(false)
  const [discountModal, setDiscountModal] = useState(false);
  const [discount, setDiscount] = useState(0);
  const currentTime = new Date();

  function isEqual(obj1, obj2) {
    return obj1.id === obj2.id;
  }

  useEffect(() => {
    const newUpcomingProduct =
      !incomingData?.hasOwnProperty('selectedCustomer') &&
      !incomingData?.hasOwnProperty('draftData') &&
      incomingData?.filter(
        obj2 => !passedData.some(obj1 => isEqual(obj1, obj2)),
      );
    // console.log("new Coming Data:", newUpcomingProduct);

    try {
      incomingData &&
      !incomingData?.hasOwnProperty('draftData') &&
      !incomingData?.hasOwnProperty('selectedCustomer')
        ? setPassedData(passedData.concat(newUpcomingProduct))
        : incomingData?.hasOwnProperty('draftData')
        ? (setPassedData(incomingData.draftData.items),
          setCustomer(incomingData.draftData.customerData),
          setIncomingDraftIndex(incomingData.index))
        : setCustomer(incomingData.selectedCustomer || customer);
    } catch (error) {
      console.log('Error Message:', error);
    }
  }, [incomingData]);

  const handleSaveSale = () => {
    const newDraftData = data;
    {
      incomingDraftIndex != null
        ? (data.draft[incomingDraftIndex] = {
            customerData: customer === 'Guest' ? {name: customer} : customer,
            items: passedData,
            totalPrice: TOTAL_PRODUCT_PRICE,
            time: moment(currentTime).format('h:mm:ss a'),
          })
        : (newDraftData.draft = [
            ...data.draft,
            {
              customerData: customer === 'Guest' ? {name: customer} : customer,
              items: passedData,
              totalPrice: TOTAL_PRODUCT_PRICE,
              time: moment(currentTime).format('h:mm:ss a'),
            },
          ]);
    }

    setData(newDraftData);
    setDraftModal(true);
    setTimeout(() => {
      setDraftModal(false);
      navigation.navigate('sale-home');
    }, 1500);
  };

  const handleQuantityInput = (id, num) => {
    const updatedProduct = passedData?.filter(item => item.id == id)[0];
    updatedProduct.qty = num == '' ? 0 : num;
    console.log('OnPress Output:', updatedProduct);
    console.log(num);
    setPassedData([...passedData]);
  };

  const handleQtyIncrement = id => {
    const updatedProduct = passedData?.filter(item => item.id == id)[0];
    updatedProduct.qty += 1;
    console.log('OnPress Output:', updatedProduct);
    setPassedData([...passedData]);
  };

  const handleQtyDecrement = id => {
    const updatedProduct = passedData?.filter(item => item.id == id)[0];
    updatedProduct.qty = updatedProduct.qty - 1;
    setPassedData([...passedData]);
  };

  const handleDeleteItem = id => {
    const updatedProduct = passedData?.filter(item => item.id != id);
    console.log(updatedProduct);
    setPassedData(updatedProduct);
  };

  const handleRemoveAll = () => {
    setPassedData([]);
  };

  const handleTransaction = () => {
    setTransactionModal(true);
    
    setTimeout(() => {
      navigation.navigate('invoice-qr', passedData);
      setTransactionModal(false);
    }, 1000);
  };

  const TOTAL_PRODUCT_PRICE =
    passedData?.length > 0 &&
    passedData
      .map(item => item.qty * item.price)
      .reduce((acc, cur) => acc + cur) - (discount || 0).toFixed(2);
  const TOTAL_VAT_VALUE = (TOTAL_PRODUCT_PRICE * 0.15).toFixed(2);
  const TOTAL_VAT_INCLUSIVE = (TOTAL_PRODUCT_PRICE * 1.15).toFixed(2);

  const InnerScrollView = () => {
    return (
      <ScrollView
        nestedScrollEnabled={true}
        style={[
          styles.gustureScrollArea,
          passedData?.length > 0 && styles.guestureHoldingData,
        ]}>
        <View
          style={{
            gap: 35,
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
                key={item.id}
              />
            );
          })}
        </View>
      </ScrollView>
    );
  };

  /* Main Return */
  return (
    <View style={styles.mainContainer}>
      {/* Top Bar */}
      <View style={{paddingHorizontal: 12}}>
        <TopNavigationBar
          backIcon={true}
          middleLabel={'Create Sale'}
          thirdLabel={'Save'}
          onPressBack={() => navigation.goBack()}
          onPressGo={() => passedData?.length > 0 && handleSaveSale()}
          onGoCondition={passedData?.length > 0}
        />
      </View>
      {/* <TransactionModal /> */}
      <SuccessFailModal modalVisibility={transactionModal} setModalVisibility={setTransactionModal} message={"Transaction Successful!"}  />
      <SuccessFailModal modalVisibility={draftModal} setModalVisibility={setDraftModal} message={"Draft Saved!"}  />
      <DiscountModal
        discount={discount}
        setDiscount={setDiscount}
        showModal={discountModal}
        setShowModal={setDiscountModal}
      />
      {/* Body Container */}
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}>
        <View style={styles.bodyContainer}>
          <View
            style={{
              // flex: 1,
              marginTop: 5,
              backgroundColor: color.lightGray,
              paddingTop: 15,
              paddingBottom: 25,
              paddingHorizontal: 15,
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

            <InnerScrollView />

            <TouchableOpacity
              style={{marginTop: passedData?.length > 0 ? 15 : 0}}
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
          <View
            style={{
              // flex: 1,
              backgroundColor: color.lightGray,
              paddingTop: 15,
              paddingBottom: 25,
              paddingHorizontal: 15,
              // borderWidth: 1,
            }}>
            {console.log('Customer:', customer)}
            <Text style={{fontSize: 20, fontWeight: '600'}}>Customer</Text>
            {customer?.name !== 'Guest' ? (
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{gap: 5}}
                  onPress={() => navigation.navigate('customer-list')}>
                  <Text style={{fontSize: 18, fontWeight: '500'}}>
                    {customer?.name}
                  </Text>
                  <Text style={{fontSize: 18, color: color.gray}}>
                    {customer?.tin}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCustomer()}>
                  <Ionicons name="trash" size={30} color={color.primary} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('customer-list')}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                  }}>
                  Guest
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: color.lightBlue,
                    borderRadius: 50,
                    padding: 2,
                  }}
                  onPress={() => navigation.navigate('customer-list')}>
                  <Entypo name="plus" size={28} color={color.secondary} />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          </View>

          {/* Payment */}
          <View
            style={{
              // flex: 1,
              backgroundColor: color.lightGray,
              paddingTop: 15,
              paddingBottom: 25,
              paddingHorizontal: 15,
              // borderWidth: 1,
            }}>
            <Text style={{fontSize: 20, fontWeight: '600'}}>Payment</Text>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 5,
              }}>
              <TouchableOpacity onPress={() => setDiscountModal(true)}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                    color: color.secondary,
                  }}>
                  Add Discount
                </Text>
              </TouchableOpacity>
              {discount ? (
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                  <Text style={{fontSize: 18}}>ETB {discount?.toFixed(2)}</Text>
                  <TouchableOpacity onPress={() => setDiscountModal(true)}>
                    <MaterialIcons
                      name="edit"
                      size={24}
                      color={color.primary}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: color.lightBlue,
                    borderRadius: 50,
                    padding: 2,
                  }}
                  onPress={() => setDiscountModal(true)}>
                  <Entypo name="plus" size={28} color={color.secondary} />
                </TouchableOpacity>
              )}
            </View>
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
                <Text style={{fontSize: 18}}>
                  ETB {TOTAL_VAT_INCLUSIVE || 0.0}
                </Text>
              </View>
            </View>

            {/* Transaction Button */}
            <View style={{marginTop: 25}}>
              <Button
                btnBG={passedData?.length > 0 ? color.primary : color.gray}
                label={'Procced Transaction'}
                onPress={() => passedData?.length > 0 && handleTransaction()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // paddingHorizontal: 12,
    backgroundColor: 'white',
    borderColor: 'red',
  },
  bodyContainer: {
    flex: 1,
    gap: 15,
  },

  gustureScrollArea: {
    maxHeight: 270,
  },
  guestureHoldingData: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'lightgray',
  },
});

export default CreateSale;