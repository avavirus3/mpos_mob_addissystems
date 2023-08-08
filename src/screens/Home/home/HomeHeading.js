import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import {color, textStyles} from '../../../styles/Styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const HomeHeading = ({navigation, user, sale}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{marginTop: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={textStyles.heading_bold}>Home</Text>
          <TouchableOpacity
            style={{borderWidth: 0, padding: 3}}
            onPress={() => console.log('Navigate to Notification')}>
            <FontAwesome name="bell" size={24} color="black" />
            <View
              style={{
                width: 12,
                height: 12,
                backgroundColor: color.primary,
                borderRadius: 50,
                position: 'absolute',
                right: 2,
                top: 3,
              }}></View>
          </TouchableOpacity>
        </View>
        <Text style={textStyles.text_sm_gray}>{user}</Text>
        <View
          style={{
            marginTop: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={textStyles.text_normal}>Total Sale Today</Text>
          <Text style={textStyles.heading_blue}>{sale} ETB</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeHeading;
