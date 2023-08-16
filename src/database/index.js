import Realm from 'realm';
import {Product, TotalSale,myProfileData,Customer,Image,Profile}  from './schema/schemas';
// import {myProfileData,Customer,Image} from './Schema'
// export const initializeRealm = () => {
//   return Realm.open({
//     schema: schemas,
//     deleteRealmIfMigrationNeeded: true,
//   });
// };
const realm = new Realm({
  schema: [Product, TotalSale,Image,myProfileData,Customer,Profile],
  deleteRealmIfMigrationNeeded:true
  // Other configuration options (encryption, migration, etc.)
});
export default realm;
