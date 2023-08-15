import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {color} from '../../styles/Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomDropDown = ({data, label, setSelected}) => {
  const [isDroped, setIsDroped] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  function handleOnPress(item) {
    setSelected && setSelected(item);
    setCurrentItem(item);
    setIsDroped(false);
  }

  return (
    <View>
      {label && <Text style={{
          marginVertical: 5,
          marginLeft: 2,
          fontSize: 17,
          color: color.gray,
        }}>{label}</Text>}
      <View
        style={{
          borderWidth: 1,
          borderColor: color.secondary,
          borderRadius: 10,
          paddingHorizontal: 15,
          minHeight: 65,
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={() => setIsDroped(!isDroped)}>
          <Text style={{color: color.gray, fontSize: 16}}>
            {currentItem == null ? 'Select Category' : currentItem}
          </Text>
          <Ionicons name="chevron-down" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {isDroped && (
        <View style={{borderWidth: 1, borderRadius: 10, overflow: 'hidden'}}>
          {data ? (
            <ScrollView style={{maxHeight: 150}} nestedScrollEnabled>
              {data.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      //   backgroundColor: color.lightGray,
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                    }}
                    onPress={() => handleOnPress(item)}>
                    <Text
                      style={{
                        fontSize: 18,
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : (
            <View
              style={{
                minHeight: 80,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: color.primary, fontSize: 15}}>
                No Data is Entered
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default CustomDropDown;
