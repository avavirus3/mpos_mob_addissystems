import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Keyboard,
  ToastAndroid,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import InvoiceButtons from '../../../components/InvoiceButtons';
import Button from '../../../components/button/Button';
import {RadioButton} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { color } from '../../../styles/Styles';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import SuccessFailModal from '../../../components/modal/SuccessFailModal';

const Payment = ({navigation}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Cash');
  const paymentMethod = ['Cash', 'Bank', 'QR', 'Card'];
  const [modalVisible, setModalVisible] = useState(false);
  const [successFailModal, setSuccessFailModal] = useState(false)
  const [TrNumber, setTrNumber] = useState();
  const [successModal, setSuccessModal] = useState(false);

  const BANKS = [
    {
      name: 'Abyssinia',
      logo: require('../../../assets/images/abisinia.png'),
    },
    {
      name: 'Wegagen',
      logo: require('../../../assets/images/wegagen.png'),
    },
    {
      name: 'Awash',
      logo: require('../../../assets/images/awash.png'),
    },
    {
      name: 'Amhara',
      logo: require('../../../assets/images/amhara.png'),
    },
    {
      name: 'CBE',
      logo: require('../../../assets/images/cbe.png'),
    },
    {
      name: 'Buna',
      logo: require('../../../assets/images/buna.png'),
    },
    {
      name: 'Hibret',
      logo: require('../../../assets/images/hibret.png'),
    },
  ];

  const PAYMENT_LINK_DATA = [
    {
      name: 'Message',
      link: 'sms',
      image: require('../../../assets/images/sms.png'),
    },
    {
      name: 'Facebook',
      link: 'fb',
      image: require('../../../assets/images/facebook.png'),
    },
    {
      name: 'Instagram',
      link: 'ig',
      image: require('../../../assets/images/instagram.png'),
    },
    {
      name: 'Linkedin',
      link: 'linkedin',
      image: require('../../../assets/images/linkedin.png'),
    },
    {
      name: 'SnapChat',
      link: '',
      image: require('../../../assets/images/snapchat.png'),
    },
    {
      name: 'Twitter',
      link: '',
      image: require('../../../assets/images/twitter.png'),
    },
    {
      name: 'Telegram',
      link: 'tg',
      image: require('../../../assets/images/telegram.png'),
    },
    {
      name: 'Viber',
      link: '',
      image: require('../../../assets/images/viber.png'),
    },
    {
      name: 'WhatsApp',
      link: 'whatsapp',
      image: require('../../../assets/images/whatsapp.png'),
    },
    {
      name: 'Copy URL',
      link: '',
      image: require('../../../assets/images/link.png'),
    },
  ];

  const handleRadioCheck = radio => {
    const pattern = /Bank|QR|Payment Link/gi;
    setSelectedPaymentMethod(radio);

    pattern.test(radio) && setModalVisible(true);
  };

  const handlePayment = () => {
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
      navigation.navigate('sale-home');
    }, 1500);
  };

  const handleCopy = async textTobeCopied => {
    await Clipboard.setString(textTobeCopied);
    ToastAndroid.show('Copied!', ToastAndroid.SHORT);
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

  const BankButtonComponent = () => {
    const [showTrInput, setShowTrInput] = useState(false);
    const [localTr, setLocalTr] = useState();
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              justifyContent: 'center',
            }}>
            <FontAwesome name="bank" size={30} color="black" />
            <Text style={{fontSize: 22, fontWeight: '600'}}>
              Bank{showTrInput && 'Reference'}
            </Text>
          </View>
          {!showTrInput && (
            <View style={{marginTop: 35, gap: 10, justifyContent: 'center'}}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <TouchableOpacity
                  style={[styles.bankOptionContainer, {flex: 1}]}>
                  <FontAwesome name="photo" size={28} color={color.secondary} />
                  <Text style={{fontSize: 20, fontWeight: '600'}}>
                    Add Photo
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.bankOptionContainer, {flex: 1}]}>
                  <AntDesign name="scan1" size={30} color={color.secondary} />
                  <Text style={{fontSize: 20, fontWeight: '600'}}>
                    Scan Photo
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.bankOptionContainer}
                onPress={() => setShowTrInput(true)}>
                <MaterialIcons
                  name="event-note"
                  size={30}
                  color={color.secondary}
                />
                <Text style={{fontSize: 20, fontWeight: '600'}}>
                  Add Bank Reference Number
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {showTrInput && (
            <View style={{marginTop: 25}}>
              <Text style={{fontSize: 17, color: color.gray}}>
                Add Bank Reference Number
              </Text>
              <View
                style={{
                  marginTop: 5,
                  flexDirection: 'row',
                  gap: 8,
                  alignItems: 'center',
                  borderWidth: 1.2,
                  borderColor: color.secondary,
                  borderRadius: 10,
                  padding: 18,
                }}>
                <MaterialIcons name="event-note" size={24} color={color.gray} />
                <TextInput
                  style={{flex: 1, fontSize: 18}}
                  placeholder="Enter Tr.Reference Number"
                  autoCapitalize="characters"
                  keyboardType="default"
                  onChangeText={text => setLocalTr(text)}
                />
              </View>
              <View
                style={{
                  marginTop: 25,
                  maxWidth: 180,
                  alignSelf: 'center',
                  width: '100%',
                }}>
                <Button
                  theme={'primary'}
                  label={'Done'}
                  height={66}
                  onPress={() => {
                    setTrNumber(localTr);
                    setModalVisible(false);
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const linkItem = ({item}) => {
    const {name, image} = item;
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: 'center',
          paddingVertical: 5,
          justifyContent: 'center',
          // borderWidth: 1,
        }}
        key={name}
        onPress={() =>
          handleOpenApps(
            'I_am_Coppied_Text_from_react_native_project',
            item.name,
          )
        }>
        {image && <Image source={image} />}
        <Text style={{fontSize: 18, marginTop: 10}}>{name}</Text>
      </TouchableOpacity>
    );
  };

  const bankItem = ({item}) => {
    const {name, logo} = item;
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: 'center',
          // borderWidth: 1,
          // width: "100%",
          // maxWidth: 150,
          // height: 100,
          paddingVertical: 5,
          justifyContent: 'center',
        }}>
        {logo && <Image style={{resizeMode: 'contain', width: '100%'}} source={logo} />}
      </TouchableOpacity>
    );
  };

  const PaymentLinkComponent = () => {
    return (
      <View>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '600',
            textAlign: 'center',
          }}>
          Payment Link
        </Text>
        <FlatList
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginHorizontal: 5,
            gap: 15,
          }}
          contentContainerStyle={{
            gap: 15,
            marginTop: 25,
            paddingBottom: 20,
          }}
          data={PAYMENT_LINK_DATA}
          numColumns={3}
          renderItem={linkItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  const QRMethodComponent = () => {
    return (
      <View>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '600',
            textAlign: 'center',
          }}>
          Choose Bank
        </Text>
        <FlatList
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginHorizontal: 5,
            gap: 15,
          }}
          contentContainerStyle={{
            gap: 15,
            marginTop: 25,
            paddingBottom: 20,
          }}
          data={BANKS}
          numColumns={3}
          renderItem={bankItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  const PaymentModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //   null;
        // }}
      >
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
                {payment_Method_Switcher(selectedPaymentMethod)}
                {/* <QRMethodComponent /> */}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  const payment_Method_Switcher = input => {
    switch (input) {
      case 'Bank':
        return <BankButtonComponent />;
        break;
      case 'Payment Link':
        return <PaymentLinkComponent />;
        break;
      case 'QR':
        return <QRMethodComponent />;
        break;
      default:
        return null;
        break;
    }
  };

  /* Main Component Return */
  return (
    <View style={styles.mainContainer}>
      {/* Top Navigation */}
      <TopNavigationBar backIcon={true} middleLabel={'Payment'} onPressBack={() => navigation.goBack()} />
      <InvoiceButtons />
      <PaymentModal />
      <SuccessFailModal modalVisibility={successFailModal} setModalVisibility={setSuccessFailModal} message={"Payment Successfull!"}/>
      <View style={{marginTop: 35}}>
        <Text style={{fontSize: 20, fontWeight: '600'}}>Payment Method</Text>
        <View>
          <View style={styles.paymentContainer}>
            {paymentMethod.map(payment => {
              return (
                <TouchableOpacity
                  style={styles.radioRow}
                  key={payment}
                  onPress={() => handleRadioCheck(payment)}>
                  <RadioButton
                    color={color.primary}
                    value={payment}
                    status={
                      selectedPaymentMethod == payment ? 'checked' : 'unchecked'
                    }
                    onPress={() => handleRadioCheck(payment)}
                  />
                  <Text style={{fontSize: 20}}>{payment}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
      <View
        style={{
          display: TrNumber ? 'flex' : 'none',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: color.lightBlue,
          padding: 15,
          borderRadius: 10,
          marginTop: 15,
        }}>
        <View></View>
        <Text
          style={{
            color: color.secondary,
            fontSize: 18,
            fontWeight: '500',
          }}>
          {TrNumber}
        </Text>
        <TouchableOpacity onPress={() => setTrNumber()}>
          <AntDesign name="minuscircle" size={24} color={color.primary} />
        </TouchableOpacity>
      </View>

      {/* Payment Method */}
      <View style={{marginVertical: 35}}>
        <Button
          label={'Payment'}
          theme={'primary'}
          btnBG={
            selectedPaymentMethod !== 'Cash' && !TrNumber
              ? color.gray
              : color.primary
          }
          onPress={() =>
            (selectedPaymentMethod == 'Cash' || TrNumber) && handlePayment()
          }
        />
      </View>
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
  paymentContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankOptionContainer: {
    // flex: 1,
    alignItems: 'center',
    borderWidth: 1.5,
    gap: 10,
    borderColor: color.secondary,
    backgroundColor: color.lightGray,
    borderRadius: 10,
    padding: 20,
    // width: '100%',
    // minWidth: 250,
  },
});

export default Payment;
