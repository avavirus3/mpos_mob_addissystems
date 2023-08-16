import Realm from 'realm';
import {Product, TotalSale, CategoryList, myProfileData,Customer,Image}  from './schema/schemas';
// import {myProfileData,Customer,Image} from './Schema'
// export const initializeRealm = () => {
//   return Realm.open({
//     schema: schemas,
//     deleteRealmIfMigrationNeeded: true,
//   });
// };
const realm = new Realm({
  schema: [Product, TotalSale, CategoryList, Image,myProfileData,Customer],
  deleteRealmIfMigrationNeeded:true
  // Other configuration options (encryption, migration, etc.)
});
export default realm;
