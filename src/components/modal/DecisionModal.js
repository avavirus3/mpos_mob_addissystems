import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Button from '../button/Button';

const DecisionModal = ({modalVisibility, setModalVisibility, modalParam}) => {
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
            // alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          {/* Inner Modal Part  */}
          <TouchableWithoutFeedback>
            <View style={styles.innerContainer}>
              <Text style={{textAlign: 'center', fontSize: 22, marginTop: 5}}>
                {modalParam.message}
              </Text>
              <View style={{flexDirection: 'row', gap: 15, marginTop: 40}}>
                <View style={{flex: 1}}>
                  <Button
                    theme={'primary'}
                    label={modalParam?.accept}
                    height={55}
                    onPress={modalParam.handleAccept}
                  />
                </View>
                <View style={{flex: 1}}>
                  <Button
                    theme={'secondary'}
                    label={modalParam?.reject}
                    height={55}
                    onPress={modalParam.handleReject}
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

const styles = StyleSheet.create({
  innerContainer: {
    backgroundColor: '#fff',
    maxWidth: 300,
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 30,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
});

export default DecisionModal;
