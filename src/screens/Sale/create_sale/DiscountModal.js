import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback, StyleSheet} from 'react-native'
import Button from '../../../components/button/Button';
import { color } from '../../../styles/Styles';

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

  export default DiscountModal