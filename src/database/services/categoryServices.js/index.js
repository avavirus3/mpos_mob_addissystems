import realm from '../..';
import {CategoryList} from '../../schema/schemas';

export const getCategory = () => {
  const category = realm.objects('Category');
  if (category) {
    return category;
  }

  return '0'; // Return 0 if the category object doesn't exist or the amount is not set
};

export const addCategory = name => {
  realm.write(() => {
    realm.create('Category', {name});
  });
};

export const updateCategoryName = (prevName, newName) => {
  realm.write(() => {
    let categoryName = realm.objectForPrimaryKey('Category', prevName);
    if (categoryName) {
      categoryName.name = newName ? newName : prevName;
    }
  });
};

export const deleteCategory = name => {
  realm.write(() => {
    let category = realm.objectForPrimaryKey('Category', name);
    if (category) {
      realm.delete(category);
    }
  });
};
