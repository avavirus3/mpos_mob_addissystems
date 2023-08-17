import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import {color, textStyles, containerStyles} from '../../../styles/Styles';
import InvoiceButtons from '../../../components/top_navigation/InvoiceButtons';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import PaymentLinkComponent from '../payment/PaymentLinkComponent';
import QrTableData from './QrTableData';
import {AuthContext} from '../../../hooks/useContext/AuthContext';

const {width, height} = Dimensions.get('window');

/* Main Functional Component */
const InvoiceQR = ({navigation, route}) => {
  const {ProductStore} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [recievedProductData, setRecievedProductData] = useState([]);
  const [passedDiscount, setPassedDiscount] = useState(0)
  const incomingData = route.params;

  useEffect(() => { 
    try {
      setRecievedProductData(incomingData?.passedData);
      setPassedDiscount(incomingData?.discount)
    } catch (err) {
      console.log('Error happende at useEffect with an error msg:', err);
    }
  }, [incomingData]);

  const TOTAL_PRODUCT_PRICE =
    recievedProductData?.length > 0 &&
    recievedProductData
      .map(item => item.quantity * item.price)
      .reduce((acc, cur) => acc + cur)-passedDiscount
      .toFixed(2);
  const TOTAL_VAT_VALUE = (TOTAL_PRODUCT_PRICE * 0.15).toFixed(2);
  const TOTAL_VAT_INCLUSIVE = (TOTAL_PRODUCT_PRICE * 1.15).toFixed(2);

  const handleCopy = async textTobeCopied => {
    await Clipboard.setString(textTobeCopied);
    ToastAndroid.show('Copied!', ToastAndroid.SHORT);
  };

  const handleQRResult = () => {
    navigation.navigate('payment', TOTAL_VAT_INCLUSIVE);
  };

  const handleOpenApps = async (link, app) => {
    const encodedLink = encodeURIComponent(link);
    let appURL, fallbackURL;
    switch (app) {
      case 'Message':
        appURL = `sms:?body=${encodedLink}`;
        break;
      case 'Facebook':
        appURL = `fb://facewebmodal/f?href=${encodedLink}`;
        fallbackURL = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
        break;
      case 'Instagram':
        appURL = `whatsapp://send?text=Hello&phone=`;
        fallbackURL = '';
        break;
      case 'Linkedin':
        appURL = `linkedin://shareArticle?mini=true&url=${encodedLink}`;
        fallbackURL = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`;
        break;
      case 'SnapChat':
        appURL = `whatsapp://send?text=Hello&phone=`;
        fallbackURL = '';
        break;
      case 'Twitter':
        appURL = `whatsapp://send?text=Hello&phone=`;
        fallbackURL = '';
        break;
      case 'Telegram':
        appURL = `tg://msg?text=${encodedLink}`;
        fallbackURL = `https://telegram.me/share/url?url=${encodedLink}`;
        break;
      case 'Viber':
        appURL = `whatsapp://send?text=Hello&phone=`;
        fallbackURL = '';
        break;
      case 'WhatsApp':
        appURL = `whatsapp://send?text=${encodedLink}`;
        fallbackURL = '';
        break;
      case 'Email':
        appURL = `whatsapp://send?text=${encodedLink}`;
        fallbackURL = '';
        break;
      default:
        break;
    }
    app !== 'Copy URL'
      ? Linking.canOpenURL(appURL).then(supported => {
          if (supported) {
            Linking.openURL(appURL);
          } else {
            Linking.openURL(fallbackURL);
          }
        })
      : handleCopy(encodedLink);
    // Perform any additional actions after copying the text, if needed
  };

  const PaymentModal = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        {/* Outer Modal Part  */}
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(false);
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            {/* Inner Modal Part  */}
            <TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: 'white',
                  // minHeight: 250,
                  width: '100%',
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  shadowColor: '#000',
                  elevation: 15,
                  padding: 25,
                }}>
                <PaymentLinkComponent />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  /* Main Component Return */
  return (
    <View style={containerStyles.mainContainer}>
      <PaymentModal />
      <TopNavigationBar
        backIcon={true}
        middleLabel={'Invoice'}
        onPressBack={() => navigation.goBack()}
      />
      {/* <TopNavBack middleLabel={"Invoice"} /> */}
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        {/* Top Invoice Componsnt */}
        <View style={{marginBottom: 15, marginTop: 5}}>
          <InvoiceButtons onSharePress={() => setModalVisible(true)} />
        </View>

        {/* Qr Container  */}
        <TouchableOpacity style={styles.qrContainer} onPress={handleQRResult}>
          <Image
            style={{
              maxHeight: 250,
              maxWidth: 250,
            }}
            source={require('../../../assets/images/qr-sample.png')}
          />
        </TouchableOpacity>

        {/* Table Component */}
        <QrTableData
          recievedProductData={recievedProductData}
          TOTAL_PRODUCT_PRICE={TOTAL_PRODUCT_PRICE}
          TOTAL_VAT_VALUE={TOTAL_VAT_VALUE}
          TOTAL_VAT_INCLUSIVE={TOTAL_VAT_INCLUSIVE}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderColor: 'red',
  },
  qrContainer: {
    marginTop: 15,
    //   borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 5,
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: 5,
          width: 5,
        },
      },
      android: {
        elevation: 10,
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        backgroundColor: 'rgba(255, 255, 255, 1)',
      },
    }),
  },
  tableHead: {
    backgroundColor: color.lightBlue,
    marginTop: 25,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  tableHeadText: {color: color.secondary, fontSize: 18},
});

export default InvoiceQR;
