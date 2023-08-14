import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {initializeRealm} from '../../database';
import schemas from '../../database/schema/schemas';
import {useDispatch, useSelector} from 'react-redux';
import {setCHANGE} from '../../reduxToolkit/features/change/trackChangeSlice';
import realm from '../../database';

const useGetRealmData = schemaName => {
  const [fetchedData, setFetchedData] = useState([]);
  const changeTracker = useSelector(state => state.change.change);
  const dispatch = useDispatch();

  useEffect(() => {
    const isThereTheSchema = schemas.find(schema => schema.name === schemaName);
    if (isThereTheSchema) {
      const getItem = async () => {
        try {
          const data = realm.objects(schemaName);
          setFetchedData(data);
        } catch (err) {
          console.log('Error while retriving realmDatabase:', err);
        }
      };

      getItem();
      dispatch(setCHANGE('Unchanged!'));
    }
  }, [changeTracker]);

  return fetchedData;
};

export default useGetRealmData;
