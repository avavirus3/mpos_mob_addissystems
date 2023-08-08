
export const itemSchema = {
    name: 'Items',
    properties: {
      name: 'string',
      _id: 'int',
      price: 'float',
      quantity: 'int',
      image: 'string',
      category: 'string'
    },
    primaryKey: '_id'
  };
  