import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import HeadSelector from '../../../components/HeadSelector';
import SearchBar from '../../../components/search/SearchBar';
import {AuthContext} from '../../../hooks/useContext/AuthContext';
import {color} from '../../../styles/Styles';
import { useSelector, useDispatch } from 'react-redux';

const Draft = ({navigation}) => {
  const DRAFT = useSelector(state => state.draftItem.draft)
  const {data} = useContext(AuthContext);
  const [localDraft, setLocalDraft] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedHead, setSelectedHead] = useState('Sales in Invoice');

  useEffect(() => {
    try {
      setLocalDraft(data.draft);
    } catch (error) {
      console.log(error);
    }
  });

  const SALES_INVOICE = [
    {
      name: 'Abebe Kebede',
      id: 1,
      time: '12:45:06 AM',
      qty: 14,
      price: 74100,
    },
    {
      name: 'Elyas Kebede',
      id: 2,
      time: '11:48:06 AM',
      qty: 29,
      price: 81900,
    },
    {
      name: 'Habtom Kebede',
      id: 3,
      time: '02:51:06 PM',
      qty: 5,
      price: 57100,
    },
    {
      name: 'Habtom Kebede',
      id: 4,
      time: '02:51:06 PM',
      qty: 5,
      price: 57100,
    },
    {
      name: 'Habtom Kebede',
      id: 6,
      time: '02:51:06 PM',
      qty: 14,
      price: 34100,
    },
    {
      name: 'Habtom Kebede',
      id: 7,
      time: '02:51:06 PM',
      qty: 14,
      price: 34100,
    },
    {
      name: 'Habtom Kebede',
      id: 8,
      time: '02:51:06 PM',
      qty: 16,
      price: 32100,
    },
  ];

  const handleDraft = (index, item) => {
    if (item.transaction_completed) {
      navigation.navigate('invoice-qr', {
        transaction_draft: data.draft[index],
        index,
      });
    } else {
      navigation.navigate('create-sale', {
        draftData: data.draft[index],
        index,
      });
    }
  };

  const PAID_INVOICE = SALES_INVOICE.filter(
    invoice => invoice.status === 'Paid',
  );
  const DRAFT_INVOICE = SALES_INVOICE.filter(
    invoice => invoice.status === 'Draft',
  );

  const dataSwitcher = () => {
    switch (selectedHead) {
      case 'Paid':
        return PAID_INVOICE;
        break;
      case 'Draft':
        return DRAFT_INVOICE;
        break;
      default:
        break;
    }
  };

  const renderData = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          marginTop: 0,
          backgroundColor: color.lightGray,
          padding: 15,
          borderRadius: 10,
          gap: 5,
        }}
        onPress={() => handleDraft(index, item)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 19,
              fontWeight: '600',
              color: color.normal,
            }}>
            {item.customerData.name}
          </Text>
          <Text style={{fontSize: 16, fontWeight: '600', color: color.gray}}>
            {item.time}
          </Text>
        </View>
        <Text style={{fontSize: 17, color: color.gray, fontWeight: '500'}}>
          {item.items.length} Items
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 19,
              fontWeight: '600',
              color: color.normal,
            }}>
            {item.totalPrice}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: item.transaction_completed ? color.green : color.primary,
            }}>
            {item.transaction_completed ? 'On Transaction' : 'Draft'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  /* Main Component Return */
  return (
    <View style={styles.mainContainer}>
      <TopNavigationBar
        backIcon={true}
        middleLabel={'Draft'}
        thirdIcon={true}
        onPressBack={() => navigation.goBack()}
        onPressGo={() => navigation.navigate('create-sale')}
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <HeadSelector
          label={'Sales in Invoice'}
          state={selectedHead}
          setState={setSelectedHead}
        />
        <HeadSelector
          label={'Orders'}
          state={selectedHead}
          setState={setSelectedHead}
        />
      </View>
      <View style={{marginVertical: 15}}>
        <SearchBar
          placeholder={'Search for sales'}
          search={search}
          setSearch={setSearch}
        />
      </View>
      <HeadSelector
        label={'Saturday May 26, 2023'}
        state={'Saturday May 26, 2023'}
        py={10}
      />
      <View style={{marginTop: 15, flex: 1, paddingBottom: 10}}>
        <FlatList
          contentContainerStyle={{gap: 12, marginTop: 5, paddingBottom: 50}}
          data={
            DRAFT
            // filter((invoice) =>
            // new RegExp(search, "gi").test(invoice.name))
          }
          renderItem={renderData}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderColor: 'red',
  },
});

export default Draft;
