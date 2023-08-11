import { StyleSheet, Text, View, Switch, ScrollView,Modal,Pressable,Alert } from 'react-native'
import React, { useState } from 'react'
import { scale, verticalScale } from 'react-native-size-matters'
import { theme } from '../../styles/stylesheet'
//import { ScrollView } from "react-native";
import { Image } from 'react-native'
import { Iconify } from 'react-native-iconify'
import useFetchRealm from '../../hooks/customhooks/useFetchRealm'
import { useFocusEffect } from '@react-navigation/native'

const Main = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false)
  const [isEnabled2S, setIsEnabled2S] = useState(true)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState)
  const toggleSwitch2S = () => setIsEnabled2S(previousState => !previousState);
  const [modalVisible, setModalVisible] = useState(false);
  const {data:imgdata,pending:pendingimage} = useFetchRealm({uri:"Image",id:300})
  const {data:profiledata,pending:pendingprofile} = useFetchRealm({uri:"MyProfileData",id:457})

  return (
    <View style={{flex: 1,backgroundColor:"white"}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure?</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                width: '100%',
              }}>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styles.btnInactive, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text
                  style={{
                    color: theme.color.primary,
                    fontSize: 18,
                    fontWeight: 600,
                  }}>
                  No
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff',
          height: verticalScale(66),
          justifyContent: 'space-between',
          paddingHorizontal: scale(25),
          alignItems: 'center',
        }}>
        <Text style={{fontSize: scale(22), fontWeight: 600}}>Setting</Text>
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
          <Text
            style={{
              fontSize: scale(22),
              color: theme.color.primary,
              fontWeight: 600,
            }}>
            Log Out
          </Text>
        </Pressable>
      </View>
      <View style={{}}>
        <ScrollView style={{}} showVerticalScrollIndicator={false} >
          <Pressable
          onPress={()=>navigation.navigate("Profile")}
            style={{
              backgroundColor: '#fff',
              height: verticalScale(89),
              marginHorizontal: scale(25),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderColor: theme.color.lightGray,
              borderBottomWidth: 1,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                 source={{ uri:pendingimage?"https://randomuser.me/api/portraits/women/93.jpg":imgdata?.uri }}
                style={{
                  height: 64,
                  width: 64,
                  borderRadius: 32,
                  borderWidth: 1,
                  borderColor: theme.color.blue,
                  backgroundColor: theme.color.lightGray,
                }}
              />
              <View style={{paddingHorizontal: scale(10)}}>
                <Text style={{fontSize: scale(20), fontWeight: 600,color:theme.color.blue}}>
                {profiledata?.organization}
                </Text>
                <Text
                  style={{
                    fontSize: scale(15),
                    color: theme.color.gray,
                    fontWeight: 500,
                  }}>
                  {profiledata?.phonecode + " " + profiledata?.phone}
                </Text>
              </View>
            </View>
            <View>
              <Iconify
                icon="ion:chevron-forward-outline"
                size={20}
                color={'#000'}
              />
            </View>
          </Pressable>
          <View
            style={{
              marginHorizontal: scale(25),
              height: 50,
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{
                fontSize: scale(22),
                color: theme.color.blue,
                fontWeight: 600,
              }}>
              SECURITY
            </Text>
          </View>
          {/* 
          //lock screen settings bar
          <Pressable
          onPress={()=>navigation.navigate("LockScreen")}
            style={{
              backgroundColor: '#fff',
              height: verticalScale(50),
              marginHorizontal: scale(25),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderColor: theme.color.lightGray,
              borderBottomWidth: 1,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Iconify
                icon="ic:baseline-screen-lock-portrait"
                size={scale(20)}
              />
              <View style={{paddingHorizontal: scale(10)}}>
                <Text style={{fontSize: scale(20), fontWeight: 500}}>
                  Lock Screen
                </Text>
              </View>
            </View>
            <View>
              <Iconify icon="ion:chevron-forward-outline" size={20} />
            </View>
          </Pressable> */}
          <Pressable
          onPress={()=>navigation.navigate("ChangePassword")}
            style={{
              backgroundColor: '#fff',
              height: verticalScale(50),
              marginHorizontal: scale(25),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderColor: theme.color.lightGray,
              borderBottomWidth: 1,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Iconify icon="mdi:password" size={scale(20)} />
              <View style={{paddingHorizontal: scale(10)}}>
                <Text style={{fontSize: scale(20), fontWeight: 500}}>
                  Change Password
                </Text>
              </View>
            </View>
            <View>
              <Iconify icon="ion:chevron-forward-outline" size={20} />
            </View>
          </Pressable>
          <View
            style={{
              backgroundColor: '#fff',
              height: verticalScale(50),
              marginHorizontal: scale(25),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderColor: theme.color.lightGray,
              borderBottomWidth: 1,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Iconify
                icon="carbon:two-factor-authentication"
                size={21}
                color="#000"
              />
              <View style={{paddingHorizontal: scale(10)}}>
                <Text style={{fontSize: scale(20), fontWeight: 500}}>
                  Two-Step Authentication
                </Text>
              </View>
            </View>
            <View>
              <Switch
                trackColor={{false: '#d8d8d8', true: theme.color.green}}
                thumbColor={isEnabled2S ? '#fff' : '#fff'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch2S}
                value={isEnabled2S}
              />
            </View>
          </View>
          <Pressable
          onPress={toggleSwitch}
            style={{
              backgroundColor: '#fff',
              height: verticalScale(50),
              marginHorizontal: scale(25),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderColor: theme.color.lightGray,
              borderBottomWidth: 1,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Iconify icon="eva:sync-fill" size={scale(20)} />
              <View style={{paddingHorizontal: scale(10)}}>
                <Text style={{fontSize: scale(20), fontWeight: 500}}>Sync</Text>
              </View>
            </View>
            {<View>
              <View style={{alignItems:'flex-end'}}><Iconify icon='ic:baseline-wifi' size={16} color={isEnabled?theme.color.primary:theme.color.green}/>
              <View style={{flexDirection:'row',alignItems:'center',gap:10}}><Text>1 sec ago</Text><Iconify icon='eva:sync-fill' size={18} color={isEnabled?theme.color.primary:theme.color.green}  /></View></View>
            </View>}
          </Pressable>
          <View
            style={{
              marginHorizontal: scale(25),
              height: 50,
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{
                fontSize: scale(22),
                color: theme.color.blue,
                fontWeight: 600,
              }}>
              PREFERENCE
            </Text>
          </View>
          <Pressable
          onPress={()=>navigation.navigate("Language")}
            style={{
              backgroundColor: '#fff',
              height: verticalScale(50),
              marginHorizontal: scale(25),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderColor: theme.color.lightGray,
              borderBottomWidth: 1,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Iconify icon="clarity:language-solid" size={21} color="#000" />
              <View style={{paddingHorizontal: scale(10)}}>
                <Text style={{fontSize: scale(20), fontWeight: 500}}>
                  Language
                </Text>
              </View>
            </View>
            <View>
              <Iconify icon="ion:chevron-forward-outline" size={20} />
            </View>
          </Pressable>
          <Pressable
          onPress={()=>navigation.navigate("Currency")}
            style={{
              backgroundColor: '#fff',
              height: verticalScale(50),
              marginHorizontal: scale(25),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderColor: theme.color.lightGray,
              borderBottomWidth: 1,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Iconify icon="ri:currency-fill" size={21} color="#000" />
              <View style={{paddingHorizontal: scale(10)}}>
                <Text style={{fontSize: scale(20), fontWeight: 500}}>
                  Currency
                </Text>
              </View>
            </View>
            <View>
              <Iconify icon="ion:chevron-forward-outline" size={20} />
            </View>
          </Pressable>
          <View
            style={{
              marginHorizontal: scale(25),
              height: 50,
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{
                fontSize: scale(22),
                color: theme.color.blue,
                fontWeight: 600,
              }}>
              CONTENT
            </Text>
          </View>
          {/* Payment onHold */}
          <Pressable
          onPress={()=>navigation.navigate("Payment")}
            style={{
              backgroundColor: '#fff',
              height: verticalScale(50),
              marginHorizontal: scale(25),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderColor: theme.color.lightGray,
              borderBottomWidth: 1,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Iconify
                icon="material-symbols:payments-rounded"
                size={21}
                color="#000"
              />
              <View style={{paddingHorizontal: scale(10)}}>
                <Text style={{fontSize: scale(20), fontWeight: 500}}>
                  Payment
                </Text>
              </View>
            </View>
            <View>
              <Iconify icon="ion:chevron-forward-outline" size={20} />
            </View>
          </Pressable>
          <Pressable
          onPress={()=>navigation.navigate("Customer")}
            style={{
              backgroundColor: '#fff',
              height: verticalScale(50),
              marginHorizontal: scale(25),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderColor: theme.color.lightGray,
              borderBottomWidth: 1,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Iconify icon="fluent:people-32-filled" size={21} color="#000" />
              <View style={{paddingHorizontal: scale(10)}}>
                <Text style={{fontSize: scale(20), fontWeight: 500}}>
                  Customer
                </Text>
              </View>
            </View>
            <View>
              <Iconify icon="ion:chevron-forward-outline" size={20} />
            </View>
          </Pressable>
          <Pressable
          onPress={()=>navigation.navigate("Analytics")}
            style={{
              backgroundColor: '#fff',
              height: verticalScale(50),
              marginHorizontal: scale(25),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderColor: theme.color.lightGray,
              borderBottomWidth: 1,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Iconify icon="carbon:analytics" size={21} color="#000" />
              <View style={{paddingHorizontal: scale(10)}}>
                <Text style={{fontSize: scale(20), fontWeight: 500}}>
                  Analytics
                </Text>
              </View>
            </View>
            <View>
              <Iconify icon="ion:chevron-forward-outline" size={20} />
            </View>
          </Pressable>
          <Pressable
          onPress={()=>navigation.navigate("ActiveSessionScreen")}
            style={{
              backgroundColor: '#fff',
              height: verticalScale(50),
              marginHorizontal: scale(25),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderColor: theme.color.lightGray,
              borderBottomWidth: 1,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Iconify icon="fluent:phone-24-filled" size={21} color="#000" />
              <View style={{paddingHorizontal: scale(10)}}>
                <Text style={{fontSize: scale(20), fontWeight: 500}}>
                  Active Sessions
                </Text>
              </View>
            </View>
            <View>
              <Iconify icon="ion:chevron-forward-outline" size={20} />
            </View>
          </Pressable>
          <Pressable
          onPress={()=>navigation.navigate("Notification")}
            style={{
              backgroundColor: '#fff',
              height: verticalScale(50),
              marginHorizontal: scale(25),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderColor: theme.color.lightGray,
              borderBottomWidth: 1,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Iconify
                icon="clarity:notification-solid"
                size={21}
                color="#000"
              />
              <View style={{paddingHorizontal: scale(10)}}>
                <Text style={{fontSize: scale(20), fontWeight: 500}}>
                  Notifications
                </Text>
              </View>
            </View>
            <View>
              <Iconify icon="ion:chevron-forward-outline" size={20} />
            </View>
          </Pressable>
          <Pressable
          onPress={()=>navigation.navigate("PrinterSettingcreen")}
            style={{
              backgroundColor: '#fff',
              height: verticalScale(50),
              marginHorizontal: scale(25),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderColor: theme.color.lightGray,
              borderBottomWidth: 1,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Iconify icon="mdi:printer" size={21} color="#000" />
              <View style={{paddingHorizontal: scale(10)}}>
                <Text style={{fontSize: scale(20), fontWeight: 500}}>
                  Printer Setting
                </Text>
              </View>
            </View>
            <View>
              <Iconify icon="ion:chevron-forward-outline" size={20} />
            </View>
          </Pressable>
          <Pressable
          onPress={()=>navigation.navigate("PaperWidth")}
            style={{
              backgroundColor: '#fff',
              height: verticalScale(50),
              marginHorizontal: scale(25),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderColor: theme.color.lightGray,
              borderBottomWidth: 1,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Iconify icon="mingcute:paper-fill" size={21} color="#000" />
              <View style={{paddingHorizontal: scale(10)}}>
                <Text style={{fontSize: scale(20), fontWeight: 500}}>
                  Paper Width
                </Text>
              </View>
            </View>
            <View>
              <Iconify icon="ion:chevron-forward-outline" size={20} />
            </View>
          </Pressable>
          <View
            style={{
              backgroundColor: '#fff',
              height: verticalScale(50),
              marginHorizontal: scale(25),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderColor: theme.color.lightGray,
              borderBottomWidth: 1,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Iconify
                icon="material-symbols:privacy-tip"
                size={21}
                color="#000"
              />
              <View style={{paddingHorizontal: scale(10)}}>
                <Text style={{fontSize: scale(20), fontWeight: 500}}>
                  Privacy
                </Text>
              </View>
            </View>
            <View>
              <Iconify icon="ion:chevron-forward-outline" size={20} />
            </View>
          </View>
          <View
            style={{
              height: 235,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <Text
              style={{color: theme.color.gray, fontWeight: 600, fontSize: 17}}>
              Copyright @ 2023 addissystems
            </Text>
            <Text
              style={{color: theme.color.gray, fontWeight: 600, fontSize: 17}}>
              Version 1.0.0
            </Text>
          </View>
          {/* dupli */}
        </ScrollView>
       
      </View>
     
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 22,
    backgroundColor: 'rgba(135, 135, 135,0.3)',
  },
  modalView: {
    marginHorizontal: scale(62),
    backgroundColor: 'white',
    borderRadius: 10,
    height: 197,
    justifyContent: 'center',
    //padding: 38,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    //backgroundColor: 'white',
    borderColor: theme.color.primary,
    borderWidth: 1,
    paddingHorizontal: 36.5,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 1,
  },
  buttonOpen: {
    backgroundColor: theme.color.primary,
  },
  buttonClose: {
    backgroundColor: "white",
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 22,
    color: 'black',
  },
  btnInactive: {
    backgroundColor: 'white',
    borderColor: theme.color.primary,
    borderWidth: 1,
    paddingHorizontal: 36.5,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 1,
  },
});
