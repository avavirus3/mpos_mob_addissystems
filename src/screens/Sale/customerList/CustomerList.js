import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import SearchBar from '../../../components/search/SearchBar';
import {AuthContext} from '../../../hooks/useContext/AuthContext';
import {color, textStyles, containerStyles} from '../../../styles/Styles';
import Button from '../../../components/button/Button';
import { getCustomers } from '../../../database/services/customerServices';

const CustomerList = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [customers, setCustomer] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState([]);

  useEffect(() => {
    const getRealmDbCustomers = async () => {
      try {
        const realmDbCustomer = await getCustomers()
        setCustomer(realmDbCustomer)
      } catch(error) { 
        console.log("Error Retriving Customer Data:", error)
      }
    }
    getRealmDbCustomers()
  }, [])

  console.log('Selected Customer:', selectedCustomer);

  const handleAddCustomer = () => {
    navigation.navigate('create-sale', {selected_Customer: selectedCustomer});
  };

  const renderItem = ({item}) => {
    const {name, _tin} = item;
    return (
      <TouchableOpacity
        style={{
          backgroundColor:
            selectedCustomer?.name === name
              ? 'rgba(50, 34, 198, 0.10)'
              : color.lightGray,
          padding: 15,
          borderRadius: 10,
          gap: 5,
          ...Platform.select({
            ios: {
              shadowColor: 'black',
              shadowOffset: {width: 2, height: 3},
              shadowOpacity: 0.4,
              shadowRadius: 4,
            },
            android: {
              //   shadowColor: "red",
              shadowColor: 'rgba(50, 34, 198, 0.1)',
              //   shadowColor: "rgba(0,0,0, 0.5)",
              elevation: 5,
            },
          }),
        }}
        onPress={() => setSelectedCustomer(item)}>
        <Text style={{fontSize: 20, fontWeight: '500'}}>{name}</Text>
        <Text style={{fontSize: 18, color: color.gray}}>{_tin}</Text>
      </TouchableOpacity>
    );
  };

  /* Main Component Return */
  return (
    <View style={[containerStyles.mainContainer, {paddingHorizontal: 12}]}>
      <TopNavigationBar
        backLabel={'Cancel'}
        middleLabel={'Customers'}
        thirdLabel={'Done'}
        onGoCondition={selectedCustomer}
        onPressGo={() => handleAddCustomer()}
        onPressBack={() => navigation.navigate('create-sale')}
      />
      <View style={{}}>
        <SearchBar
          placeholder={'Search for customers'}
          search={search}
          setSearch={setSearch}
        />
      </View>
      <Button
        theme={'secondary'}
        label={'Add new Customer'}
        onPress={() => navigation.navigate('')}
      />
      <View
        style={{flex: 1, borderTopWidth: 2, borderTopColor: 'rgba(0,0,0,0.2)'}}>
        {customers?.length > 0 ? <FlatList
          contentContainerStyle={{
            gap: 20,
            paddingHorizontal: 2,
            paddingTop: 10,
            paddingBottom: 20,
          }}
          data={customers}
          renderItem={renderItem}
          keyExtractor={item => item._tin}
        /> : null}
      </View>
    </View>
  );
};

export default CustomerList;