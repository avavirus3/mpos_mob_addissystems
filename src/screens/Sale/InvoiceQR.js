import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
  FlatList,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Linking
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { color, textStyles, containerStyles } from "../../styles/Styles";
import InvoiceButtons from "../../components/InvoiceButtons";
import TopNavigationBar from "../../components/top_navigation/TopNavigationBar";

const { width, height } = Dimensions.get("window");

/* Main Component */
const InvoiceQR = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false)
  const data = route.params;
  const handleQRResult = () => {
    navigation.navigate("payment");
  };

  console.log("Recieved data in Qr Screen:", data);

  const renderItem = () => {
    // console.log("item", item);
    return (
      <View style={styles.tableItemContainer}>
        <Text style={[styles.itemText, { width: "100%", maxWidth: 100 }]}>
          iPhone 12
        </Text>
        <Text style={[styles.itemText, {}]}>2</Text>
        <Text style={[styles.itemText, {}]}>10,000</Text>
        <Text style={[styles.itemText, {}]}>20,000</Text>
      </View>
    );
  };

  const TOTAL_PRODUCT_PRICE =
    data?.length > 0 &&
    data
      .map((item) => item.qty * item.price)
      .reduce((acc, cur) => acc + cur)
      .toFixed(2);
  const TOTAL_VAT_VALUE = (TOTAL_PRODUCT_PRICE * 0.15).toFixed(2);
  const TOTAL_VAT_INCLUSIVE = (TOTAL_PRODUCT_PRICE * 1.15).toFixed(2);

  const PAYMENT_LINK_DATA = [
    {
      name: "Message",
      link: "sms",
      image: require("../../assets/images/sms.png"),
    },
    {
      name: "Facebook",
      link: "fb",
      image: require("../../assets/images/facebook.png"),
    },
    {
      name: "Instagram",
      link: "ig",
      image: require("../../assets/images/instagram.png"),
    },
    {
      name: "Linkedin",
      link: "linkedin",
      image: require("../../assets/images/linkedin.png"),
    },
    {
      name: "SnapChat",
      link: "",
      image: require("../../assets/images/snapchat.png"),
    },
    {
      name: "Twitter",
      link: "",
      image: require("../../assets/images/twitter.png"),
    },
    {
      name: "Telegram",
      link: "tg",
      image: require("../../assets/images/telegram.png"),
    },
    {
      name: "Viber",
      link: "",
      image: require("../../assets/images/viber.png"),
    },
    {
      name: "WhatsApp",
      link: "whatsapp",
      image: require("../../assets/images/whatsapp.png"),
    },
    {
      name: "Email",
      link: "email",
      image: require("../../assets/images/email.png"),
    },
    {
      name: "Copy URL",
      link: "",
      image: require("../../assets/images/link.png"),
    },
    {
      name: "",
      link: "",
      // image: require("../../assets/images/link.png"),
    },
  ];

  const handleCopy = async (textTobeCopied) => {
    await Clipboard.setString(textTobeCopied)
    ToastAndroid.show('Copied!', ToastAndroid.SHORT);
  };

  const handleOpenApps = async (link, app) => {
    const encodedLink = encodeURIComponent(link);
    let appURL, fallbackURL;
    switch (app) {
      case "Message":
        appURL = `sms:?body=${encodedLink}`;
        break;
      case "Facebook":
        appURL = `fb://facewebmodal/f?href=${encodedLink}`;
        fallbackURL = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
        break;
      case "Instagram":
        appURL = `whatsapp://send?text=Hello&phone=`;
        fallbackURL = "";
        break;
      case "Linkedin":
        appURL = `linkedin://shareArticle?mini=true&url=${encodedLink}`;
        fallbackURL = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`;
        break;
      case "SnapChat":
        appURL = `whatsapp://send?text=Hello&phone=`;
        fallbackURL = "";
        break;
      case "Twitter":
        appURL = `whatsapp://send?text=Hello&phone=`;
        fallbackURL = "";
        break;
      case "Telegram":
        appURL = `tg://msg?text=${encodedLink}`;
        fallbackURL = `https://telegram.me/share/url?url=${encodedLink}`;
        break;
      case "Viber":
        appURL = `whatsapp://send?text=Hello&phone=`;
        fallbackURL = "";
        break;
      case "WhatsApp":
        appURL = `whatsapp://send?text=${encodedLink}`;
        fallbackURL = "";
        break;
      case "Email":
        appURL = `whatsapp://send?text=${encodedLink}`;
        fallbackURL = "";
        break;
      default:
        break;
    }
    app !== "Copy URL"
      ? Linking.canOpenURL(appURL).then((supported) => {
          if (supported) {
            Linking.openURL(appURL);
          } else {
            Linking.openURL(fallbackURL);
          }
        })
      : handleCopy(encodedLink)
    // Perform any additional actions after copying the text, if needed
  };

  const linkItem = ({ item }) => {
    const { name, image } = item;
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          width: '100%',
          // maxWidth: 100,
          alignItems: "center",
          paddingVertical: 5,
          justifyContent: "center",
          // borderWidth: 1,
        }}
        key={name}
        onPress={() => handleOpenApps("I_am_Coppied_Text_from_react_native_project", item.name)}
      >
        {image && <Image source={image} />}
        <Text style={{ fontSize: 18, marginTop: 10 }}>{name}</Text>
      </TouchableOpacity>
    );
  };

  const PaymentLinkComponent = () => {
    return (
      <View>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Payment Link
        </Text>
        <FlatList
          columnWrapperStyle={{
            // borderWidth: 1,
            flex: 1,
            justifyContent: "flex-start",
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
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* Inner Modal Part  */}
            <TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: "white",
                  // minHeight: 250,
                  width: "100%",
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  shadowColor: "#000",
                  elevation: 15,
                  padding: 25,
                }}
              >
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
    <View style={styles.mainContainer}>
      <PaymentModal />
      <TopNavigationBar backIcon={true} middleLabel={"Invoice"}  />
      {/* <TopNavBack middleLabel={"Invoice"} /> */}
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        {/* Top Invoice Componsnt */}
        <View style={{ marginBottom: 15, marginTop: 5 }}>
          <InvoiceButtons onSharePress={() => setModalVisible(true)} />
        </View>

        {/* Qr Container  */}
        <TouchableOpacity style={styles.qrContainer} onPress={handleQRResult}>
          <Image
            style={{
              maxHeight: 250,
              maxWidth: 250,
            }}
            source={require("../../assets/images/qr-sample.png")}
          />
        </TouchableOpacity>

        {/* Table Head */}
        <View style={styles.tableHead}>
          <Text style={styles.tableHeadText}>Description</Text>
          <Text style={styles.tableHeadText}>Qty</Text>
          <Text style={styles.tableHeadText}>Price</Text>
          <Text style={styles.tableHeadText}>Amount</Text>
        </View>
        {/* Table Content Container */}
        <View
          style={{ backgroundColor: color.lightGray, paddingVertical: 5 }}
        >
          {/* Table Content */}
          {data.map((item) => {
            return (
              <View style={styles.tableItemContainer} key={item.id}>
                <Text
                  style={[styles.itemText, { width: "100%", maxWidth: 100 }]}
                >
                  {item.name}
                </Text>
                <Text style={[styles.itemText, {}]}>{item.qty}</Text>
                <Text style={[styles.itemText, {}]}>{item.price}</Text>
                <Text style={[styles.itemText, {}]}>
                  {(item.qty * item.price).toFixed(2)}
                </Text>
              </View>
            );
          })}
        </View>

        <View
          style={{
            backgroundColor: color.lightGray,
            marginTop: 15,
            paddingHorizontal: 10,
            paddingVertical: 8,
            gap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16 }}>TXBL 1</Text>
            <Text style={{ fontSize: 16 }}>{TOTAL_PRODUCT_PRICE}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16 }}>TXBL 15%</Text>
            <Text style={{ fontSize: 16 }}>{TOTAL_VAT_VALUE}</Text>
          </View>
        </View>
        <View style={[styles.tableHead, { marginBottom: 80 }]}>
          <Text style={[styles.tableHeadText, { fontWeight: "600" }]}>
            Total
          </Text>
          <Text style={[styles.tableHeadText, { fontWeight: "600" }]}>
            {TOTAL_VAT_INCLUSIVE}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: "white",
    // borderWidth: 1,
    // alignSelf: 'center',
    borderColor: "red",
  },
  qrContainer: {
    marginTop: 15,
    //   borderWidth: 2,
    borderColor: "gray",
    borderRadius: 8,
    padding: 5,
    overflow: "hidden",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 1)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: 5,
          width: 5,
        },
      },
      android: {
        elevation: 10,
        shadowColor: "rgba(0, 0, 0, 0.8)",
        backgroundColor: "rgba(255, 255, 255, 1)",
      },
    }),
  },
  tableHead: {
    backgroundColor: color.lightBlue,
    marginTop: 25,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableHeadText: { color: color.secondary, fontSize: 18 },
  tableItemContainer: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: 'center'
  },
  itemText: {
    color: "black",
    fontSize: 16,
    // borderWidth: 1,
    // textAlign: "center",
  },
});

export default InvoiceQR;
