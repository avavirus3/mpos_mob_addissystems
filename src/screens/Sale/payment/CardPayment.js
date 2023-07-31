import {View, Text, Image} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CardPayment = () => {
  return (
    <View>
      <Text style={{textAlign: 'center', fontSize: 20, fontWeight: '500'}}>
        Tap the back of the phone to pay
      </Text>
      <View style={{borderWidth: 0, alignItems: 'center', marginVertical: 15}}>
      <MaterialIcons name="nfc" size={40} color="black" />
      </View>
      <View style={{marginTop: 10, paddingLeft: 10}}>
        <Image
          source={require('../../../assets/images/card_payment_image.png')}
        />
      </View>
    </View>
  );
};

export default CardPayment;
