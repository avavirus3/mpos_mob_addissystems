export const customerSchema = {
  name: 'Customer',
  properties: {
    _id:"int",
    name: 'string',
    email: {type: 'string', optional: true},
    phone: {type: 'string',dial_code:'sting', optional: true},
    address: {type: 'string', optional: true},
    _tin: 'int',
  },
  primaryKey: '_id',
};
