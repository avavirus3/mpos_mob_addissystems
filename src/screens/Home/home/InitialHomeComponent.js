import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { color, textStyles } from '../../../styles/Styles';

const InitialButtons = ({label, icon, onPress}) => {
    return (
      <TouchableOpacity style={styles.mainButton} onPress={onPress}>
        {icon}
        <Text style={[textStyles.text_normal, {textAlign: 'center'}]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

const InitialHomeComponent = ({navigation}) => {
  return (
    <View style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
        <View
          style={{
            marginTop: 30,
            marginBottom: 15,
            flexDirection: 'row',
            gap: 15,
            borderWidth: 0,
            borderColor: 'red',
          }}>
          <InitialButtons
            label={'Add New Product'}
            icon={
              <Ionicons name="pricetag" size={33} color={color.secondary} />
            }
          />
          <InitialButtons
            label={'Create New Sale'}
            onPress={() => navigation.navigate('Sale', {screen: 'create-sale'})}
            icon={<Ionicons name="cart" size={38} color={color.secondary} />}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <InitialButtons
            label={'Add New Customer'}
            icon={
              <FontAwesome5 name="user-alt" size={32} color={color.secondary} />
            }
          />
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
    mainButton: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        flex: 1,
        maxWidth: 180,
        // minHeight: 130,
        borderWidth: 1,
        borderColor: color.secondary,
        padding: 20,
        // margin: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        ...Platform.select({
          ios: {
            shadowColor: 'black',
            shadowOffset: [{width: 2, height: 3}],
            shadowOpacity: 4,
            shadowRadius: 4,
          },
          android: {
            shadowColor: 'rgba(0,0,0,0.5)',
            elevation: 8,
          },
        }),
      },
})

export default InitialHomeComponent