import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {color, textStyles} from '../../styles/Styles';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ScrollView as GestureScrollView} from 'react-native-gesture-handler';
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar';
import Button from '../../components/button/Button';
import {AuthContext} from '../../hooks/useContext/AuthContext';
import moment from 'moment/moment';

const noImage = require('../../assets/images/no-image.jpg');

/* Main Function */
const CreateSale = ({route}) => {
  const {data, setData} = useContext(AuthContext);
  const navigation = useNavigation();
  const incomingData = route.params;
  const [passedData, setPassedData] = useState([]);
  const [customer, setCustomer] = useState({name: 'Guest'});
  const [incomingDraftIndex, setIncomingDraftIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [discountModal, setDiscountModal] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [transactionError, setTransactionError] = useState(false);
  const [transactionMessage, setTransactionMessage] = useState({
    success: 'Transaction Successfull!',
    error: {
      fail: 'Transaction Failed!',
      server: 'Server Error',
      network: 'Network Error',
    },
  });
  const currentTime = new Date();

  // console.log(moment(currentTime).format('h:mm:ss a'))

  console.log('IncomingData:', incomingData);
  console.log('IncomingDataIndex:', incomingDraftIndex);

  console.log('Draft data:', data);
  // console.log("Passed Customer:", customer);

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
      // console.log("Initial Use Effect Console", passedData);
    } catch (error) {
      console.log('Error Message:', error);
    }
  }, [incomingData]);

  // console.log("passedData:", passedData);

  const handleSaveSale = () => {
    // const updatedSave = (data.draft[incomingDraftIndex] = {
    //   customerData: customer === "Guest" ? { name: customer } : customer,
    //   items: passedData,
    //   totalPrice: TOTAL_PRODUCT_PRICE,
    // });
    // console.log("Updated Save:", updatedSave);

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
    setSaveModal(true);
    setTimeout(() => {
      setSaveModal(false);
      navigation.navigate('sale-home');
    }, 1500);
  };

  const handleQuantityInput = (id, num) => {
    const updatedProduct = passedData?.filter(item => item.id == id)[0];
    updatedProduct.qty = num == '' ? 0 : num;
    console.log('OnPress Output:', updatedProduct);
    console.log(num);
    // console.log(passedData)
    setPassedData([...passedData]);
  };

  const handleQtyIncrement = id => {
    const updatedProduct = passedData?.filter(item => item.id == id)[0];
    updatedProduct.qty += 1;
    console.log('OnPress Output:', updatedProduct);
    // console.log(passedData)
    setPassedData([...passedData]);
  };

  const handleQtyDecrement = id => {
    const updatedProduct = passedData?.filter(item => item.id == id)[0];
    updatedProduct.qty = updatedProduct.qty - 1;
    // console.log("OnPress Output:", updatedProduct);
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
    setModalVisible(true);
    setTimeout(() => {
      navigation.navigate('invoice-qr', passedData);
      setModalVisible(false);
    }, 1000);
  };

  const TOTAL_PRODUCT_PRICE =
    passedData?.length > 0 &&
    passedData
      .map(item => item.qty * item.price)
      .reduce((acc, cur) => acc + cur) - (discount || 0).toFixed(2);
  const TOTAL_VAT_VALUE = (TOTAL_PRODUCT_PRICE * 0.15).toFixed(2);
  const TOTAL_VAT_INCLUSIVE = (TOTAL_PRODUCT_PRICE * 1.15).toFixed(2);

  const RenderItem = ({item, index}) => {
    const {name, price, qty, image, category, id} = item;
    return (
      <View style={{flexDirection: 'row', marginVertical: 0}} key={id}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            gap: 10,
          }}>
          <View
            style={{
              backgroundColor: 'gray',
              width: '100%',
              maxWidth: 80,
              height: '100%',
              maxHeight: 80,
              borderRadius: 5,
              overflow: 'hidden',
            }}>
            <Image
              style={{height: '100%', width: '100%', resizeMode: 'cover'}}
              source={image ? image : noImage}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>{name}</Text>
            <Text style={{fontSize: 16, color: color.gray}}>{category}</Text>
            <Text style={{fontSize: 18, fontWeight: '500'}}>
              {qty} X {price} ETB
            </Text>
            <Text style={{fontSize: 18, fontWeight: '500'}}>
              = {qty * price} ETB
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <View
            style={{
              flexDirection: 'row',
              height: 47,
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: color.lightBlue,
              borderRadius: 10,
              marginTop: 5,
              marginBottom: 10,
              paddingHorizontal: 10,
              // borderWidth: 1,
            }}>
            <TouchableOpacity
              style={{}}
              onPress={() => qty > 1 && handleQtyDecrement(id)}>
              <Entypo name="minus" size={28} color={color.secondary} />
            </TouchableOpacity>
            <TextInput
              style={{
                fontSize: 18,
                textAlign: 'center',
                marginHorizontal: 5,
                width: 50,
                borderWidth: 1,
                borderColor: color.gray,
                borderRadius: 5,
              }}
              value={qty ? qty.toString() : '0'}
              onChangeText={num => handleQuantityInput(id, num)}
              keyboardType="number-pad"
            />
            <TouchableOpacity
              style={{}}
              onPress={num => handleQtyIncrement(id, num)}>
              <Entypo name="plus" size={28} color={color.secondary} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{borderWidth: 0, borderColor: 'red', padding: 5}}
            onPress={() => handleDeleteItem(id)}>
            <Ionicons name="trash" size={30} color={color.primary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const itemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '95%',
          alignSelf: 'center',
          backgroundColor: '#A8A8A880',
          marginVertical: 50,
        }}></View>
    );
  };

  // console.log("Discount Amount:", discount);

  const TransactionModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        {/* Outer Modal Part  */}
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            {/* Inner Modal Part  */}
            <TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: 'white',
                  minHeight: 250,
                  // width: "100%",
                  minWidth: 300,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  shadowColor: '#000',
                  elevation: 15,
                  padding: 20,
                }}>
                <View
                  style={{
                    // borderWidth: 1,
                    width: 103,
                    height: 103,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: color.lightGray,
                    borderRadius: 100,
                  }}>
                  <View
                    style={{
                      // borderWidth: 1,
                      height: 70,
                      width: 70,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: transactionError
                        ? color.lightPrimary
                        : color.lightGreen,
                      borderRadius: 100,
                    }}>
                    <AntDesign
                      name={transactionError ? 'close' : 'check'}
                      size={45}
                      color={transactionError ? color.primary : color.green}
                    />
                  </View>
                </View>

                <Text
                  style={{
                    fontSize: 20,
                    marginTop: 20,
                    textAlign: 'center',
                    paddingHorizontal: 5,
                  }}>
                  {transactionMessage.success}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  const DiscountModal = ({discount, setDiscount, showModal, setShowModal}) => {
    const [inputChange, setInputChange] = useState(discount ? discount : 0);

    // console.log(discount);
    // console.log("Type of inputChange:", typeof parseFloat(inputChange));

    const handleDiscount = () => {
      setDiscount(parseFloat(inputChange));
      setShowModal(false);
    };

    const handleCancel = () => {
      setShowModal(false);
    };

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        {/* Outer Modal Part  */}
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            {/* Inner Modal Part  */}
            <TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: 'white',
                  minHeight: 250,
                  width: '100%',
                  minWidth: 300,
                  maxWidth: 320,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: 10,
                  shadowColor: '#000',
                  elevation: 15,
                  padding: 20,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: 'center',
                    paddingHorizontal: 5,
                    fontWeight: '500',
                  }}>
                  Add Discount
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 5,
                  }}>
                  <View
                    style={{
                      width: 130,
                      height: 50,
                      backgroundColor: color.lightBlue,
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TextInput
                      style={{
                        borderWidth: 0,
                        borderColor: 'red',
                        color: color.secondary,
                        fontSize: 20,
                        textAlign: 'center',
                        flex: 1,
                        width: '100%',
                      }}
                      placeholder="Enter here"
                      keyboardType="numeric"
                      value={inputChange?.toString()}
                      onChangeText={setInputChange}
                    />
                  </View>
                  <Text style={{fontSize: 22, fontWeight: '600'}}>Birr</Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    gap: 10,
                    borderWidth: 0,
                  }}>
                  <View style={{flex: 1}}>
                    <Button
                      theme={'primary'}
                      label={'Done'}
                      onPress={() => handleDiscount()}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Button
                      theme={'secondary'}
                      label={'Cancel'}
                      onPress={() => handleCancel()}
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

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
            return <RenderItem item={item} key={item.id} index={index} />;
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
      <TransactionModal />
      {/* <CustomModal
        showModal={saveModal}
        setShowModal={setSaveModal}
        message={"Draft Saved!"}
      /> */}
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
    // paddingTop: 35,
    // borderWidth: 2,
    // alignSelf: 'center',
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
