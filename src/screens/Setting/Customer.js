import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import Search from "../../components/search/Search";
import React, { useEffect, useState } from "react";
import { verticalScale, scale } from "react-native-size-matters";
import { Iconify } from "react-native-iconify";
import { theme,color } from "../../styles/stylesheet";
import TopNavigationBar from "../../components/top_navigation/TopNavigationBar";
import { ComfirmationModal, DoneModals } from "../../components/modal/Modals";
import { getCustomers } from "../../database/services/customerServices";
import realm from "../../database/index";
import { loadCredentials } from "../../auth/token/Token";
import { useFocusEffect } from "@react-navigation/native";
const CostomerListCard=({name,number,onPressDelete,id})=>{
    return(
        <View style={{flexDirection:'row',width:"100%",justifyContent:'space-between',marginBottom:15,paddingVertical:verticalScale(16),borderRadius:10,paddingHorizontal:scale(30),backgroundColor:'#F9F7F7',alignItems:"center"}}>
            <View><Text style={{fontSize:20,fontWeight:500}}>{name}</Text>
            <Text style={{fontSize:18,fontWeight:500,color:theme.color.gray}}>{number}</Text></View>
            <Pressable onPress={onPressDelete}><Iconify icon="fluent:delete-24-filled" size={30} color={theme.color.primary} /></Pressable>
          </View>
    )
}

const Customer = ({ navigation }) => {
    const [onDelete,setDelete]=useState(false)
    const [comfirm,setComfirm] = useState(false)
    const [first, setfirst] = useState()
    const [onSuccess, setonSuccess] = useState(false)
    const [profiledata, setProfiledata] = useState()

    // const [customersData,setCustomerData]= useState([])
   const [customersData,setCustomersData]=useState()
    //getCustomers=()=> setCustomerData(realm.objects('Customer'))
    useEffect(() => {
      loadCredentials().then((r)=>r?setProfiledata(r):null)
     }, []);
     useFocusEffect(
      React.useCallback(() => {
        loadCredentials().then(r => (r ? setProfiledata(r) : null));
    
        return () => loadCredentials().then(r => (r ? setProfiledata(r) : null));
      }, []),
    );
     useEffect(()=>{
      const customer = realm.objects("Customer")
      if(customer.length>=0 && profiledata)setCustomersData(customer?customer.filter(d=>d.profileId==profiledata[0]._id):null)

     },[profiledata,comfirm])
     
const deleteCustomers=()=> realm.write(() => {
  console.log(`id:${first}`)
  const t=realm.objects("Customer")
  const taskToDelete= t.filter(d=>d._id==first)[0]
  setComfirm(false);
 if (taskToDelete) {
  realm.delete(taskToDelete);
  const customer = realm.objects("Customer")
  if(customer.length>=0 && profiledata)setCustomersData(customer?customer.filter(d=>d.profileId==profiledata[0]._id):null)
//console.log(taskToDelete,comfirm)
}
setfirst('')
setonSuccess(true)
})
//console.log(customersData.length,comfirm,first?first:null)
   useEffect(()=>{if(comfirm)deleteCustomers();},[comfirm])
  //  useEffect(()=>{if(!comfirm)},[comfirm])

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
    <ComfirmationModal message={"Are You sure?"} setComfirm={setComfirm} setModalVisible={setDelete} modalVisible={onDelete} />
    <DoneModals message={"deleted"} setModalVisible={setonSuccess} modalVisible={onSuccess}/>
      <View style={{ paddingHorizontal: scale(20) }}>
        <TopNavigationBar
        onPressBack={()=>navigation.goBack()}
        backIcon={"back"}
        middleLabel={"Customers"}
          onGoCondition={theme.color.primary}
          thirdIcon={"plus"}
          onPressGo={() => navigation.navigate("AddCustomer")} />
      </View>
      <Search placeholder="Search for customer" />
      <View style={{backgroundColor:'#fff',flex:1}}>
      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        <View style={{width:"100%",alignItems:'center',paddingHorizontal:scale(25),marginBottom:50}}>
          
          {customersData!=undefined?customersData.map(({fullname,phone,phonecode,_id}) => <CostomerListCard key={_id} name={fullname} number={phonecode+phone}  onPressDelete={()=>{setDelete(true);setfirst(_id)}} id={_id} />):null}
        </View>
      </ScrollView>
      </View>
    </View>
  );
};

export default Customer;

const styles = StyleSheet.create({});
