import {initializeRealm} from '../index';

export const getItems = async () => {
  const realm = await initializeRealm();

  const items = realm.objects('Items');
  return items;
};

export const addItem = async item => {
  const realm = await initializeRealm();

  realm.write(() => {
    realm.create('Items', item);
  });
};

export const updateItem = async (itemId, updatedItem) => {
  const realm = await initializeRealm();

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
      itemTobeUpdated.quantity = updatedItem.quantity
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

export const deleteItem = async itemId => {
  const realm = await initializeRealm();

  realm.write(() => {
    const itemToBeDeleted = realm.objectForPrimaryKey('Items', itemId);
    if (itemToBeDeleted) {
      realm.delete(itemToBeDeleted);
    }
  });
};
