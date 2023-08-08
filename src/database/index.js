import Realm from 'realm';
import schemas from './schema/schemas';

export const initializeRealm = () => {
  return Realm.open({
    schema: schemas,
    deleteRealmIfMigrationNeeded: true,
  });
};
