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
    // dispatch(setCHANGE('Unchanged!'));
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Actions to be performed when the screen comes into focus
      // For example: fetch data, start timers, etc.
      try {
        const data = realm.objects(schemaName);
        setFetchedData(data);
      } catch (err) {
        console.log('Error while retriving realmDatabase:', err);
      }

      console.log('The Screen Is Active!');

      return () => {
        // Actions to be performed when the screen goes out of focus
        // For example: cleanup tasks, stop timers, etc.
        // setFetchedData(data);
        console.log('The screen goes and Inactive!');
      };
    }, []),
  );

  return fetchedData;
};

export default useGetRealmData;
