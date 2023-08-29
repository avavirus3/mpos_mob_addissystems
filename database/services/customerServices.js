import {initializeRealm} from '../index';

export const getCustomers = async () => {
  const realm = await initializeRealm();

  const customers = realm.objects('Customer');
//   realm.close()
  return customers;
};

export const addCustomer = async newCustomer => {
  const realm = await initializeRealm();

  realm.write(() => {
    realm.create('Customer', newCustomer);
  });
};

export const updateCustomer = async (_Tin, newCustomerObject) => {
  const realm = await initializeRealm();

  realm.write(() => {
    const customerTobeUpdated = realm.objectForPrimaryKey('Customer', _Tin);
    if (customerTobeUpdated) {
      customerTobeUpdated._tin = newCustomerObject?.hasOwnProperty("_tin")
        ? newCustomerObject._tin
        : customerTobeUpdated._tin;
      customerTobeUpdated.name = newCustomerObject?.hasOwnProperty("name")
        ? newCustomerObject.name
        : customerTobeUpdated.name;
      customerTobeUpdated.email = newCustomerObject?.hasOwnProperty("email")
        ? newCustomerObject.email
        : customerTobeUpdated.email;
      customerTobeUpdated.phone = newCustomerObject?.hasOwnProperty("phone")
        ? newCustomerObject.phone
        : customerTobeUpdated.phone;
      customerTobeUpdated.address = newCustomerObject?.hasOwnProperty("address")
        ? newCustomerObject.address
        : customerTobeUpdated.address;
    }
  });
};

export const deleteCustomer = async customerTin => {
  const realm = await initializeRealm();

  realm.write(() => {
    const customerToBeDeleted = realm.objectForPrimaryKey('Customer', customerTin);
    if (customerToBeDeleted) {
      realm.delete(customerToBeDeleted);
    }
  });
};
