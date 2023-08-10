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
    name:"Customer",
    properties: {
      _id:'int',
      fullname:'string',
      email:'string?',
      phonecode:'string',
      phone:'string',
      address:'string?',
      tin:'string?',
    },
    primaryKey:'_id',}
];


export default schemas