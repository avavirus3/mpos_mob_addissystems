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
const CostomerListCard=({name,number,onPressDelete})=>{
    return(
        <View style={{flexDirection:'row',width:"100%",justifyContent:'space-between',marginBottom:15,paddingVertical:verticalScale(16),borderRadius:10,paddingHorizontal:scale(30),backgroundColor:'#F9F7F7',alignItems:"center"}}>
            <View><Text style={{fontSize:20,fontWeight:500}}>{name}</Text>
            <Text style={{fontSize:18,fontWeight:500,color:theme.color.gray}}>{number}</Text></View>
            <Pressable onPress={()=>onPressDelete(true)}><Iconify icon="fluent:delete-24-filled" size={35} color={theme.color.primary} /></Pressable>
          </View>
    )
}

const Customer = ({ navigation }) => {
    const [onDelete,setDelete]=useState(false)
    const [comfirm,setComfirm] = useState(false)

    const [customersData,setCustomerData]= useState([
        {name:'abe kebede',number:123987654},
        {name:'abeb kebede',number:123987654},
        {name:'abeba kebede',number:123987654},
        {name:'abebu kebede',number:123987654},
        {name:'abeby kebede',number:123987654},
        {name:'abebech kebede',number:123987654},
         {name:'abebachew kebede',number:123987654},
         {name:'abebawle kebede',number:123987654},
         {name:'abebawlee kebede',number:123987654},
         {name:'abebawn kebede',number:123987654},
    ])
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
    <ComfirmationModal message={"Are You sure?"} setComfirm={setComfirm} setModalVisible={setDelete} modalVisible={onDelete}/>
    <DoneModals message={"deleted"} setModalVisible={setComfirm} modalVisible={comfirm}/>
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
          {customersData.map(({name,number}) => (<CostomerListCard name={name} number={number} key={name} onPressDelete={setDelete} />))}
        </View>
      </ScrollView>
      </View>
    </View>
  );
};

export default Customer;

const styles = StyleSheet.create({});
