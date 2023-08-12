export const myProfileData={
    name:"MyProfileData",
    properties: {
      _id:'int',
      fullname:'string',
      email:'string?',
      phone:'string?',
      license:'string?',
      organization:'string?',
      tin:'string?',
      phonecode:'string?',
    },
    primaryKey:'_id',
}
export const Customer={
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
  primaryKey:'_id',
}
export const Image={
  name:"Image",
  properties: {
    _id:'int',
   name:'string',
    type:'string',
    uri:'string',
  },
  primaryKey:'_id',
}