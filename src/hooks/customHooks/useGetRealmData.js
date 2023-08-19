import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {setCHANGE} from '../../reduxToolkit/features/change/trackChangeSlice';
import realm from '../../database';

const useGetRealmData = schemaName => {
  const [fetchedData, setFetchedData] = useState([]);
  const changeTracker = useSelector(state => state.change.change);
  const dispatch = useDispatch();

  useEffect(() => {
    const getRealmData = () => {
      try {
        const data = realm.objects(schemaName);
        setFetchedData(data);
      } catch (err) {
        console.log('Error while retriving realmDatabase:', err);
      }
    };

    getRealmData();
    dispatch(setCHANGE('Unchanged!'));
  }, [changeTracker]);

  return fetchedData;
};

export default useGetRealmData;
