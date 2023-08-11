const schemas = [
  {
    name: 'Items',
    properties: {
      name: 'string',
      _id: 'int',
      price: 'float',
      quantity: 'int',
      image: 'string',
      category: 'string',
    },
    primaryKey: '_id',
  },
  {
    name: 'Customer',
    properties: {
      name: 'string',
      _tin: 'string',
      email: {type: 'string', optional: true},
      phone: {type: 'string', optional: true},
      address: {type: 'string', optional: true},
    },
    primaryKey: '_tin',
  },
  {
    name: 'Total_Sale',
    properties: {
      amount: 'float',
    },
  },
];


export default schemas