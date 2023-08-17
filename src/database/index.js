import Realm from 'realm';
import {Product, TotalSale, CategoryList, myProfileData,Customer,Image, Profile}  from './schema/schemas';

const realm = new Realm({
  schema: [Product, TotalSale, CategoryList, Image, myProfileData, Customer, Profile],
  deleteRealmIfMigrationNeeded:true
  // Other configuration options (encryption, migration, etc.)
});
export default realm;
