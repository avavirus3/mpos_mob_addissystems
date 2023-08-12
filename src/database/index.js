import Realm from 'realm';
import schemas,{myProfileData,Customer,Image}  from './schema/schemas';
// import {myProfileData,Customer,Image} from './Schema'
// export const initializeRealm = () => {
//   return Realm.open({
//     schema: schemas,
//     deleteRealmIfMigrationNeeded: true,
//   });
// };
const realm = new Realm({
  schema: [...schemas,Image,myProfileData,Customer],
  deleteRealmIfMigrationNeeded:true
  // Other configuration options (encryption, migration, etc.)
});
export default realm;
