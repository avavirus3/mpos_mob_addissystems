import {View, Modal, TouchableWithoutFeedback} from 'react-native';
import React from 'react';

const CustomModal = ({modalVisibility, setModalVisibility, innerModal}) => {
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
            {innerModal ? (
              innerModal
            ) : (
              <View
                style={{
                  width: '100%',
                  maxWidth: 250,
                  minHeight: 300,
                  backgroundColor: '#fff',
                }}></View>
            )}
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModal;
