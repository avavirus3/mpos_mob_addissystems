import realm from '../index';

export const getItems = () => {
  const items = realm.objects('Items');
  return items;
};

export const addItem = item => {
  realm.write(() => {
    realm.create('Items', item);
  });
};

export const updateItem = (itemId, updatedItem) => {
  realm.write(() => {
    const itemTobeUpdated = realm.objectForPrimaryKey('Items', itemId);
    if (itemTobeUpdated) {
      itemTobeUpdated._id = updatedItem._id
        ? updatedItem._id
        : itemTobeUpdated._id;
      itemTobeUpdated.name = updatedItem.name
        ? updatedItem.name
        : itemTobeUpdated.name;
      itemTobeUpdated.price = updatedItem.price
        ? updatedItem.price
        : itemTobeUpdated.price;
      itemTobeUpdated.quantity = updatedItem?.hasOwnProperty('quantity')
        ? updatedItem.quantity
        : itemTobeUpdated.quantity;
      itemTobeUpdated.image = updatedItem.image
        ? updatedItem.image
        : itemTobeUpdated.image;
      itemTobeUpdated.category = updatedItem.category
        ? updatedItem.category
        : itemTobeUpdated.category;
    }
  });
};

export const deleteItem = itemId => {
  realm.write(() => {
    const itemToBeDeleted = realm.objectForPrimaryKey('Items', itemId);
    if (itemToBeDeleted) {
      realm.delete(itemToBeDeleted);
    }
  });
};
