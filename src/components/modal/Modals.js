import { StyleSheet, Text, View,Modal,Alert,Pressable } from 'react-native'
import React,{useEffect} from 'react'
import { theme } from '../../styles/stylesheet';
import { scale,verticalScale } from 'react-native-size-matters';
import { Iconify } from 'react-native-iconify';
export const DoneModals = ({message,modalVisible,setModalVisible}) => {
    const Timer =(comfirm,setComfirm)=>{
        setTimeout(()=> {
          if (comfirm) setComfirm(false);
        }, 1000);
      }
      useEffect(()=>{},[]);
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      //Alert.alert('Modal has been closed.');
      setModalVisible(!modalVisible);
    }}>
    {Timer(modalVisible,setModalVisible)}
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
      <View style={{backgroundColor:'#F9F9F9',padding:15,borderRadius:60}} >
      <View style={{backgroundColor:'rgba(86, 202, 15, 0.10)',padding:12,borderRadius:100}}>
        <Iconify icon='charm:tick' size={45} color={theme.color.green}/>
        </View>
      </View>
        <Text style={[styles.modalText,{marginTop:10}]}>{message}</Text>
      </View>
    </View>
  </Modal>
  )
}
export const ComfirmationModal=({modalVisible,setModalVisible,message,setComfirm,comfirm})=>{
    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{message}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                width: '100%',
              }}>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => {setModalVisible(!modalVisible);setComfirm(true)}}>
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
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      //marginTop: 22,
      paddingHorizontal:scale(65),
      backgroundColor: 'rgba(135, 135, 135,0.3)',
    },
    modalView: {
      marginHorizontal: scale(62),
      width: '100%',
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