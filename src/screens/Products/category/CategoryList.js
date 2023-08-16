import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {containerStyles} from '../../../styles/Styles';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import SearchBar from '../../../components/search/SearchBar';
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../../../styles/Styles';
import {deleteCategory} from '../../../database/services/categoryServices.js';
import {useDispatch} from 'react-redux';
import {setCHANGE} from '../../../reduxToolkit/features/change/trackChangeSlice';
import DecisionModal from '../../../components/modal/DecisionModal';
import SuccessFailModal from '../../../components/modal/SuccessFailModal';

const CategoryList = ({navigation}) => {
  const categoryData = useGetRealmData('Category');
  const [search, setSearch] = useState('');
  const [decisionModal, setDecisionModal] = useState(false);
  const [successFailModal, setSuccessFailModal] = useState(false);
  const [categoryNameTobeDeleted, setCategoryNameTobeDeleted] = useState('');
  const [successFailMessage, setSuccessFailMessage] = useState({
    success: '',
    fail: '',
  });
  const dispatch = useDispatch();

  const handleEditCategory = name => {
    const isThereTheCategory = categoryData.some(item => item.name === name);
    console.log('isThere', isThereTheCategory);
    if (isThereTheCategory) {
      deleteCategory(name);
    }
    console.log('Category name of:' + name + 'is Edited');
  };

  const handleDeleteCategory = name => {
    const isThereTheCategory = categoryData.some(item => item.name === name);
    console.log('isThere', isThereTheCategory);
    if (isThereTheCategory) {
      setCategoryNameTobeDeleted(name);
      setDecisionModal(true);
    }
    console.log('Category name of:' + name + 'is Deleted!');
  };

  function handleModalAccept() {
    // Confirm Item Deletion!
    if (categoryNameTobeDeleted !== '') {
      deleteCategory(categoryNameTobeDeleted);
      dispatch(setCHANGE('Changed!'));
      setDecisionModal(false);
      setSuccessFailModal(true);
      setTimeout(() => {
        setSuccessFailModal(false)
      }, 1200)
    }
  }

  function handleModalReject() {
    // Cancel Item Deletion and clear the Id from the reserved!
    setCategoryNameTobeDeleted('');
    setDecisionModal(false);
  }

  function renderItem({item}, handleEditCategory, handleDeleteCategory) {
    const {name} = item;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 10,
          backgroundColor: color.lightGray,
          borderRadius: 10,
        }}>
        <Text style={{fontSize: 17}}>{name}</Text>
        <View style={{flexDirection: 'row', gap: 15}}>
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => handleEditCategory(name)}>
            <MaterialIcons name="edit" size={28} color={color.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => handleDeleteCategory(name)}>
            <Ionicons name="trash" size={28} color={color.primary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={containerStyles.mainContainer}>
      <View style={containerStyles.bodyContainer}>
        <SuccessFailModal
          modalVisibility={successFailModal}
          setModalVisibility={setSuccessFailModal}
          message={"Successfully Deleted!"}
        />
        <DecisionModal
          modalVisibility={decisionModal}
          setModalVisibility={setDecisionModal}
          modalParam={{
            message: 'Are you sure?',
            accept: 'Yes',
            reject: 'No',
            handleAccept: handleModalAccept,
            handleReject: handleModalReject,
          }}
        />
        <TopNavigationBar
          backIcon
          middleLabel={'Category'}
          thirdIcon
          onPressBack={() => navigation.goBack()}
          onPressGo={() => navigation.navigate('add-category')}
        />
        <SearchBar
          search={search}
          setSearch={setSearch}
          placeholder={'Search for category'}
        />
        <FlatList
          contentContainerStyle={{gap: 10}}
          data={categoryData}
          renderItem={item =>
            renderItem(item, handleEditCategory, handleDeleteCategory)
          }
          keyExtractor={item => item.name}
        />
      </View>
    </View>
  );
};

export default CategoryList;
