import Realm from 'realm';
import {myProfileData,Customer,Image} from './Schema'

const realm = new Realm({
  schema: [Image,myProfileData,Customer],
  // Other configuration options (encryption, migration, etc.)
});

export default realm;