import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import CustomModal from '../../../components/modal/CustomModal';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {color} from '../../../styles/Styles';
import Button from '../../../components/button/Button';

const StockModal = ({
  data,
  modalVisibility,
  setModalVisibility,
  handleSave,
  handleCancel,
  setUpdatedQuantity,
}) => {
  const [inputValue, setInputValue] = useState(0);

  function handleIncrement() {
    setInputValue(cur => cur + 1);
    setUpdatedQuantity(cur => cur + 1);
  }

  function handleDecrement() {
    if (inputValue > 0) {
      setInputValue(cur => cur - 1);
      setUpdatedQuantity(cur => cur - 1);
    }
  }

  return (
    <CustomModal
      innerModal={
        <View
          style={{
            // minWidth: 250,
            // minHeight: 250,
            borderRadius: 10,
            padding: 20,
            backgroundColor: '#fff',
          }}>
          <View style={{alignItems: 'center', gap: 5}}>
            <Text style={{fontSize: 18, fontWeight: '500'}}>{data?.name}</Text>
            <Text style={{fontSize: 16}}>Stock In/Out</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: 15,
            }}>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={handleDecrement}>
              <Entypo name="minus" size={28} color={color.secondary} />
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: color.lightBlue,
                marginHorizontal: 10,
                width: 100,
                borderRadius: 5,
              }}>
              <TextInput
                style={{fontSize: 24, fontWeight: '500', textAlign: 'center'}}
                value={inputValue.toString()}
              />
            </View>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={handleIncrement}>
              <Entypo name="plus" size={28} color={color.secondary} />
            </TouchableOpacity>
          </View>
          <View style={{marginVertical: 20}}>
            <Text style={{color: color.gray, fontSize: 16}}>Total Stock</Text>
            <View style={styles.arrowBoxContainer}>
              <Text style={{fontSize: 20, fontWeight: '500'}}>
                {data?.quantity}
              </Text>
              <AntDesign name="arrowright" size={24} color="black" />
              <Text style={{fontSize: 20, fontWeight: '500'}}>
                {data?.quantity + inputValue}
              </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', gap: 10}}>
            <View style={{flex: 1}}>
              <Button
                theme={'primary'}
                label={'Save'}
                height={50}
                onPress={() => {
                  handleSave(), setInputValue(0);
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <Button
                theme={'secondary'}
                label={'cancel'}
                height={50}
                onPress={handleCancel}
              />
            </View>
          </View>
        </View>
      }
      modalVisibility={modalVisibility}
      setModalVisibility={setModalVisibility}
    />
  );
};

const styles = StyleSheet.create({
  circleButton: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: color.lightBlue,
  },

  arrowBoxContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: color.lightGray,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
});

export default StockModal;
