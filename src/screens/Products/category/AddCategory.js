import {
  View,
  Text,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {containerStyles} from '../../../styles/Styles';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import CustomTextInput from '../../../components/input/CustomTextInput';
import Button from '../../../components/button/Button';
import useGetRealmData from '../../../hooks/customHooks/useGetRealmData';
import {addCategory} from '../../../database/services/categoryServices.js';
import SuccessFailModal from '../../../components/modal/SuccessFailModal';
import {useDispatch} from 'react-redux';
import {setCHANGE} from '../../../reduxToolkit/features/change/trackChangeSlice';

const AddCategory = ({navigation}) => {
  const [categoryName, setCategoryName] = useState('');
  const categoryData = useGetRealmData('Category');
  const [successModal, setSuccessModal] = useState(false);
  const [successFailMessage, setSuccessFailMessage] = useState('');
  const [isFailModal, setisFailModal] = useState(false);
  const dispatch = useDispatch();

  function handleAddCategory() {
    const pattern = /^[A-Za-z]{2,}$/g;
    const trimmedName = categoryName.trim();
    const validateCategoryName = pattern.test(trimmedName);
    const isPreAdded = categoryData.some(
      category => category.name.toLowerCase() == categoryName.toLowerCase(),
    );
    if (validateCategoryName && !isPreAdded) {
      addCategory(trimmedName);
      dispatch(setCHANGE('Changed!'));
      setisFailModal(false)
      setSuccessFailMessage('Successfully Added!');
      setSuccessModal(true);
      setTimeout(() => {
        setSuccessModal(false);
        navigation.navigate('category-list');
      }, 1200);
    } else if (isPreAdded) {
      setisFailModal(true)
      setSuccessFailMessage('Name Already Added!');
      setSuccessModal(true);
    }
  }

  console.log('Category Data:', categoryData);
  return (
    <View style={containerStyles.mainContainer}>
      <SuccessFailModal
        fail={isFailModal}
        modalVisibility={successModal}
        setModalVisibility={setSuccessModal}
        message={successFailMessage}
      />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={containerStyles.bodyContainer}>
          <TopNavigationBar
            backIcon
            middleLabel={'Add Category'}
            onPressBack={() => navigation.goBack()}
          />

          <View style={{}}>
            <CustomTextInput
              label={'Category Name'}
              placeholder={'Category Name'}
              input={categoryName}
              setInput={setCategoryName}
            />

            <View style={{marginTop: 35}}>
              <Button
                theme={'primary'}
                label={'Save'}
                onPress={handleAddCategory}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddCategory;
