import Realm from 'realm';
import {myProfileData} from './Schema'

const realm = new Realm({
  schema: [myProfileData],
  // Other configuration options (encryption, migration, etc.)
});

export default realm;