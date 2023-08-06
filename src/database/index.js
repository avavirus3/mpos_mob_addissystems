import Realm from 'realm';
import {itemSchema} from './schema/itemSchema';

export const initializeRealm = () => {
  return Realm.open({
    schema: [itemSchema],
    // deleteRealmIfMigrationNeeded: true,
  });
};
