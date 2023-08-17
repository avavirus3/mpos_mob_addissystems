import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import { color, containerStyles, textStyles } from '../../../styles/Styles';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SearchBar from '../../../components/search/SearchBar';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import HeadSelector from '../../../components/HeadSelector';
import {AuthContext} from '../../../hooks/useContext/AuthContext';

const SaleHome = ({navigation}) => {
  const {data} = useContext(AuthContext);
  const [draftNumber, setDraftNumber] = useState(0);
  const [currentDisplay, setCurrentDisplay] = useState('Today');

  useEffect(() => {
    try {
      const updatedDraft = data?.draft.length;
      setDraftNumber(updatedDraft);
    } catch (error) {
      console.log(error);
    }
  }, [data]);


  const SALE_DATA = {
    Today: {
      total_sale: 500,
      sale_items: 500,
    },
    '7 Days': {
      total_sale: 2750,
      sale_items: 1200,
    },
    '30 Days': {
      total_sale: 16980,
      sale_items: 3871,
    },
  };

  /* Main Component Return */
  return (
    <View style={containerStyles.mainContainer}>
      <View style={{}}>
        <TopNavigationBar
          backLabel={'Sale'}
          thirdIcon={true}
          onPressGo={() => navigation.navigate('create-sale')}
        />
        <SearchBar placeholder={'Search for sales'} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: color.lightGray,
            paddingVertical: 15,
            marginTop: 15,
            borderRadius: 10,
          }}>
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <HeadSelector
              label={'Today'}
              state={currentDisplay}
              setState={setCurrentDisplay}
            />
            <HeadSelector
              label={'7 Days'}
              state={currentDisplay}
              setState={setCurrentDisplay}
            />
            <HeadSelector
              label={'30 Days'}
              state={currentDisplay}
              setState={setCurrentDisplay}
            />
          </View>
          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
              paddingHorizontal: 15,
              justifyContent: 'space-between',
            }}>
            <View style={{gap: 10}}>
              <Text style={textStyles.text_normal}>Total Sales</Text>
              <Text style={textStyles.heading_normal}>
                {SALE_DATA[currentDisplay].total_sale} birr
              </Text>
            </View>
            <View style={{gap: 10}}>
              <Text style={textStyles.text_normal}>Sale Items</Text>
              <Text style={textStyles.heading_normal}>
                {SALE_DATA[currentDisplay].sale_items}
              </Text>
            </View>
          </View>
        </View>
        <View style={{marginTop: 30, paddingLeft: 5}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              paddingBottom: 10,
            }}
            onPress={() => navigation.navigate('all-sales')}>
            <Entypo name="download" size={24} color="black" />
            <Text style={textStyles.text_normal}>All Sales in Invoice</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              paddingVertical: 10,
              borderTopWidth: 1.5,
              borderBottomWidth: 1.5,
              borderColor: color.lightGray,
            }}
            onPress={() => navigation.navigate('all-orders')}>
            <Entypo name="download" size={24} color="black" />
            <Text style={textStyles.text_normal}>All Order</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
              paddingVertical: 10,
            }}
            onPress={() => navigation.navigate('draft')}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center', gap: 10}}
              onPress={() => navigation.navigate('draft')}>
              <MaterialIcons name="drafts" size={25} color="black" />
              <Text style={textStyles.text_normal}>Draft</Text>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: color.lightPrimary,
                borderRadius: 50,
                width: 35,
                height: 35,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: color.primary, fontSize: 18}}>
                {draftNumber}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
});

export default SaleHome;
