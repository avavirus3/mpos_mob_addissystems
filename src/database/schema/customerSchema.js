export const customerSchema = {
  name: 'Customer',
  properties: {
    name: 'string',
    email: {type: 'string', optional: true},
    phone: {type: 'string', optional: true},
    address: {type: 'string', optional: true},
    _tin: 'int',
  },
  primaryKey: '_tin',
};
