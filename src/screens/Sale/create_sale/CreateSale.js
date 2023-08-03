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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import Button from '../../../components/button/Button';
import {AuthContext} from '../../../hooks/useContext/AuthContext';
import moment from 'moment/moment';
import RenderItem from './RenderItem';
import DiscountModal from './DiscountModal';
import SuccessFailModal from '../../../components/modal/SuccessFailModal';
import CustomerComponent from './CustomerComponent';
import SubTotal from './SubTotal';
import ItemsList from './ItemsList';
import {G} from 'react-native-svg';

/* Main Function */
const CreateSale = ({route}) => {
  const {data, setData, ProductStore, setProductStore} =
    useContext(AuthContext);
  const navigation = useNavigation();
  const incomingData = route.params;
  const [passedData, setPassedData] = useState([]);
  const [customer, setCustomer] = useState({name: 'Guest'});
  const [incomingDraftIndex, setIncomingDraftIndex] = useState(null);
  const [transactionModal, setTransactionModal] = useState(false);
  const [draftModal, setDraftModal] = useState(false);
  const [discountModal, setDiscountModal] = useState(false);
  const [discount, setDiscount] = useState(0);
  const currentTime = new Date();

  // console.log('incomingData:', incomingData);

  function isEqual(obj1, obj2) {
    return obj1.id === obj2.id;
  }

  useEffect(() => {
    const newUpcomingProduct =
      incomingData?.hasOwnProperty('passed_selected_product') &&
      incomingData?.passed_selected_product.filter(
        obj2 => !passedData.some(obj1 => isEqual(obj1, obj2)),
      );

    try {
      incomingData && incomingData?.hasOwnProperty('passed_selected_product')
        ? setPassedData(passedData.concat(newUpcomingProduct))
        : incomingData?.hasOwnProperty('selected_Customer')
        ? setCustomer(incomingData.selected_Customer || customer)
        : incomingData?.hasOwnProperty('draftData')
        ? (setPassedData(incomingData.draftData.items),
          setCustomer(incomingData.draftData.customerData),
          setIncomingDraftIndex(incomingData.index))
        : null;
    } catch (error) {
      console.log('Error Message at useEffect, error msg:', error);
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
            transaction_completed: false,
          })
        : (newDraftData.draft = [
            ...data.draft,
            {
              customerData: customer === 'Guest' ? {name: customer} : customer,
              items: passedData,
              totalPrice: TOTAL_PRODUCT_PRICE,
              time: moment(currentTime).format('h:mm:ss a'),
              transaction_completed: false,
            },
          ]);
    }

    setData(newDraftData);
    setDraftModal(true);
    setTimeout(() => {
      setDraftModal(false);
      navigation.navigate('sale-home');
      setPassedData([]);
      setCustomer({name: 'Guest'});
      setDiscount(0);
    }, 1500);
  };

  const handleQtyIncrement = id => {
    const Prev_Item_Qty = ProductStore.filter(item => item.id === id && item)[0]
      .qty;
    const Sale_Item = passedData.filter(item => item.id == id)[0];

    if (Prev_Item_Qty - (Sale_Item.qty + 1) >= 0) {
      Sale_Item.qty += 1;
      setPassedData([...passedData]);
    }
  };

  const handleQtyDecrement = id => {
    const updatedProduct = passedData?.filter(item => item.id == id)[0];
    updatedProduct.qty = updatedProduct.qty - 1;
    setPassedData([...passedData]);
  };

  const handleQuantityInput = (id, num) => {
    const inputNum = parseInt(num);
    const Prev_Item_Qty = ProductStore.filter(item => item.id === id && item)[0]
      .qty;
    const Sale_Item = passedData.filter(item => item.id == id)[0];

    if (Prev_Item_Qty - (Sale_Item.qty + inputNum) >= 0) {
      console.log('Can be Deducted!');
      Sale_Item.qty = inputNum;
    } else if (inputNum > Prev_Item_Qty) {
      console.log("Item Can't Set!");
      Sale_Item.qty = Prev_Item_Qty;
    } else {
      Sale_Item.qty = '';
    }

    console.log('num', num);

    setPassedData([...passedData]);
  };

  const handleEventOnBlur = id => {
    const Sale_Item = passedData.filter(item => item.id == id)[0];

    if(Sale_Item.qty === '') {
      Sale_Item.qty = 0
      setPassedData([...passedData])
    }
  };

  console.log("Passed Data", passedData)

  const handleDeleteItem = id => {
    const updatedProduct = passedData?.filter(item => item.id != id);
    // console.log(updatedProduct);
    setPassedData(updatedProduct);
  };

  const handleRemoveAll = () => {
    setPassedData([]);
  };

  const handleTransaction = () => {
    const deductedProducts = ProductStore.map(item => {
      const saleItem = passedData.find(sale => sale.id === item.id);
      if (saleItem) {
        return {...item, qty: item.qty - saleItem.qty};
      }
      return item;
    });

    const selected_data_deduct = deductedProducts.filter(obj2 =>
      passedData.some(obj1 => isEqual(obj1, obj2)),
    );

    console.log('Deducted Products:', selected_data_deduct);
    setProductStore(deductedProducts);

    const newDraftData = data;

    incomingDraftIndex != null
      ? (data.draft[incomingDraftIndex] = {
          customerData: customer === 'Guest' ? {name: customer} : customer,
          items: passedData,
          totalPrice: TOTAL_PRODUCT_PRICE,
          time: moment(currentTime).format('h:mm:ss a'),
          transaction_completed: true,
        })
      : (newDraftData.draft = [
          ...data.draft,
          {
            customerData: customer === 'Guest' ? {name: customer} : customer,
            items: passedData,
            totalPrice: TOTAL_PRODUCT_PRICE,
            time: moment(currentTime).format('h:mm:ss a'),
            transaction_completed: true,
          },
        ]);

    setData(newDraftData);

    // console.log("Initial Data:",deductedProducts)
    console.log('Product Store:', ProductStore);
    // console.log("Selected Data:", passedData)
    setTransactionModal(true);

    setTimeout(() => {
      navigation.navigate('invoice-qr', passedData);
      setTransactionModal(false);
      setPassedData([]);
      setCustomer({name: 'Guest'});
      setDiscount(0);
    }, 1000);
  };

  /* Product Sum Calculation Constants */
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
                handleEventOnBlur={handleEventOnBlur}
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
      <SuccessFailModal
        modalVisibility={transactionModal}
        setModalVisibility={setTransactionModal}
        message={'Transaction Successful!'}
      />
      <SuccessFailModal
        modalVisibility={draftModal}
        setModalVisibility={setDraftModal}
        message={'Draft Saved!'}
      />
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
          <ItemsList
            passedData={passedData}
            navigation={navigation}
            handleDeleteItem={handleDeleteItem}
            handleQtyDecrement={handleQtyDecrement}
            handleQtyIncrement={handleQtyIncrement}
            handleQuantityInput={handleQuantityInput}
            handleRemoveAll={handleRemoveAll}
            handleEventOnBlur={handleEventOnBlur}
          />
          <CustomerComponent
            customer={customer}
            setCustomer={setCustomer}
            navigation={navigation}
          />

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

            {/* Sub Total Component */}
            <SubTotal
              TOTAL_PRODUCT_PRICE={TOTAL_PRODUCT_PRICE}
              TOTAL_VAT_VALUE={TOTAL_VAT_VALUE}
              TOTAL_VAT_INCLUSIVE={TOTAL_VAT_INCLUSIVE}
            />

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
    backgroundColor: 'white',
    borderColor: 'red',
  },
  bodyContainer: {
    flex: 1,
    gap: 15,
  },
});

export default CreateSale;
