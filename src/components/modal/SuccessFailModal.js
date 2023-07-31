import { View, Text, TouchableWithoutFeedback, TouchableOpacity, Modal } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { color } from '../../styles/Styles'

const SuccessFailModal = ({modalVisibility = false, setModalVisibility, message, type}) => {
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibility}
        onRequestClose={() => {
          setModalVisibility(!modalVisibility);
        }}>
        {/* Outer Modal Part  */}
        <TouchableWithoutFeedback onPress={() => setModalVisibility(false)}>
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
                      backgroundColor: type === 'fail'
                        ? color.lightPrimary
                        : color.lightGreen,
                      borderRadius: 100,
                    }}>
                    <AntDesign
                      name={type === 'fail' ? 'close' : 'check'}
                      size={45}
                      color={type === 'fail' ? color.primary : color.green}
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
                  {message}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
  )
}

export default SuccessFailModal