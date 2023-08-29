import { StyleSheet, Text, View, Pressable,TouchableOpacity,Image } from 'react-native'
import React,{useState} from 'react'
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar'
import { scale, verticalScale } from 'react-native-size-matters'
import { theme } from '../../styles/stylesheet'
import { Iconify } from 'react-native-iconify'
import { MySvgComponent } from './Notification'
import { ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fonts } from '../../styles/unistyle'

const RadioButton = ({ name, state, setState,width,icon }) => {
  //console.log(flag)
  return (
    <Pressable
      onPress={() => setState(name)}
      style={{
        marginHorizontal: 25,
        backgroundColor: "#F9F7F7",
        height: 61,
        //width: "100%",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 32,
        justifyContent: "space-between",
        marginBottom:verticalScale(10),
        width:width,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={icon} style={{height:40,width:40}} resizeMode='contain' />
        <Text style={[{paddingLeft: 10 },fonts.h3]}>{name}</Text>
      </View>
      {state == name ? (
        <Iconify
          icon="ic:outline-radio-button-checked"
          color={theme.color.primary}
        />
      ) : (
        <Iconify
          icon="ic:round-radio-button-unchecked"
          color={theme.color.gray}
        />
      )}
    </Pressable>
  );
};

const Payment = ({ navigation }) => {
  const[value,setValue]=useState("name")
  const [first, setFirst] = useState('')
  const retrieveData = async () => {
    try {
      const values = await AsyncStorage.getItem('bank');
      if (values !== null) {
        // We have data!!
        setFirst(values);
      }
      if(!values) {console.log('null')}
    } catch (error) {
      // Error retrieving data
      console.log(error)
    }
  };

  React.useEffect(()=>{retrieveData()},[])
  const BANKS = [
    {
      name: 'Abyssinia',
      logo:require("../../assets/images/abisinia.png"),
    },

  ];
  return !first ? (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ paddingHorizontal: scale(20) }}>
        <TopNavigationBar onPressBack={() => navigation.goBack()} backIcon={true} middleLabel={"Payment"} />
      </View>
      <View>
        <Pressable
          onPress={() => navigation.navigate("ChooseBank")}
          style={{
            backgroundColor: '#fff',
            height: verticalScale(50),
            marginHorizontal: scale(25),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderColor: theme.color.lightGray,
            borderBottomWidth: 1,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 35, height: 35, marginLeft: -10, backgroundColor: 'white' }}>
              <MySvgComponent width={30} height={30} />
            </View>
            <View style={{ paddingHorizontal: scale(0), }}>
              <Text style={[fonts.h3]}>
                Payment
              </Text>
            </View>
          </View>
          <View>
            <Iconify icon="ion:chevron-forward-outline" size={20} />
          </View>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Payment")}
          style={{
            backgroundColor: '#fff',
            height: verticalScale(50),
            marginHorizontal: scale(25),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderColor: theme.color.lightGray,
            borderBottomWidth: 1,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Iconify
              icon="mdi:cellphone-nfc"
              size={21}
              color="#000"
            />
            <View style={{ paddingHorizontal: scale(10) }}>
              <Text style={[fonts.h3]}>
                NFC
              </Text>
            </View>
          </View>
          <View>
            <Iconify icon="ion:chevron-forward-outline" size={20} />
          </View>
        </Pressable>
      </View>
    </View>
  ) : (<View style={{ flex: 1, backgroundColor: '#fff' }}>
    <View style={{ paddingHorizontal: 20 }}><TopNavigationBar backIcon={true} onPressBack={() => navigation.goBack()} middleLabel={"payment"} /></View>
    <View style={{ alignItems: 'center',paddingHorizontal:20 ,marginTop:15}}>
    <TouchableOpacity onPress={()=>navigation.navigate("ChooseBank")} style={{ flexDirection: 'row', alignItems: 'center', width:'100%', gap: 10, borderWidth: 1,justifyContent:'center',borderRadius:10,paddingVertical:10,borderColor:theme.color.blue,elevation:3,backgroundColor:'#fff' }}>
    <Iconify size={22} color={theme.color.blue} icon='material-symbols:payments-rounded' />
    <Text style={[{color:theme.color.blue},fonts.ptext]}>Add Another Account</Text>
    </TouchableOpacity>
    </View>
    <View style={{width:"100%",marginVertical:verticalScale(25),flex:1}}>
    <ScrollView>
      <View style={{marginBottom:50}}>{BANKS.map(({name,logo})=><RadioButton name={name} icon={logo} setState={setValue} state={value} key={name} />)}</View>
      </ScrollView>
    </View>
  </View>)
}

export default Payment

const styles = StyleSheet.create({})