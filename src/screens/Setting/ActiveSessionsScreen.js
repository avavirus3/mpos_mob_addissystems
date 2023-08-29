import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar'
import { scale, verticalScale } from 'react-native-size-matters'
import { Iconify } from 'react-native-iconify'
import { theme } from '../../styles/stylesheet'
import { useState } from 'react'
import {DoneModals,ComfirmationModal}from '../../components/modal/Modals'
import { fonts } from '../../styles/unistyle'

const ActiveSessionsScreen = ({ navigation }) => {
    const [comfirm, setcomfirm] = useState(false)
    const [done, setdone] = useState(false)
    const phone = [{
        ip: '127.0.0.1',
        name: 'iPhone 14 Pro Max',
        city: 'Addis Ababa Ethiopia',
        online: true
    },
    {
        ip: '138.154.15.251',
        name: 'Samsung Galaxy S8',
        city: 'Hawassa Ethiopia',
        online: false
    },
    {
        ip: '192.168.2.251',
        name: 'Samsung Galaxy J6+',
        city: 'Gondar Ethiopia',
        online: false
    }]
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <DoneModals modalVisible={done} setModalVisible={setdone} message={"terminated!"} />
        <ComfirmationModal modalVisible={comfirm} setComfirm={setdone} setModalVisible={setcomfirm} message={"are you sure to terminate?"} />
            <View style={{ paddingHorizontal: scale(20), }}>
                <TopNavigationBar backIcon={true} onPressBack={() => navigation.goBack()} middleLabel={"Active Session"} />
                <View>
                    <Text style={[{color:theme.color.gray,marginVertical:16},fonts.h3]}>THIS DEVICE</Text>
                    <View style={{borderRadius:scale(10), paddingVertical: verticalScale(15), paddingHorizontal: scale(10), flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme.color.lighterGray, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Iconify icon='fluent:phone-24-filled' size={20} />
                            <View style={{ paddingLeft: scale(5) }}><Text style={[fonts.ptext]}>{phone[0].name}
                            </Text>
                                <Text style={[{ color: "#A8A8A8", },fonts.smText]}>{phone[0].ip}  {phone[0].city}</Text>
                            </View>
                        </View>
                        <View>{phone[0].online ? <Text style={{ color: theme.color.green }}>online</Text> : <View>
                        <Text style={[{ color: "#A8A8A8", },fonts.smText]}>thu</Text>
                            <Iconify icon='material-symbols:logout' color={theme.color.primary} size={24}/>
                        </View>}</View>
                    </View>
                    <Text style={[{color:theme.color.gray,marginVertical:16},fonts.h3]}>Active Sessions</Text>
                    {phone.map((i)=>(<View key={i.name} style={{marginBottom:15,borderRadius:scale(10), paddingVertical: verticalScale(15), paddingHorizontal: scale(10), flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme.color.lighterGray, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Iconify icon='fluent:phone-24-filled' size={20} />
                            <View style={{ paddingLeft: scale(5) }}><Text style={[fonts.ptext]}>{i.name}
                            </Text>
                                <Text style={[{ color: "#A8A8A8",},fonts.smText]}>{i.ip}  {i.city}</Text>
                            </View>
                        </View>
                        <View>{!phone[0].online ? <Text style={{ color: theme.color.green }}>online</Text> : <View>
                        <Text style={[{ color: "#A8A8A8",},fonts.smText]}>thu</Text>
                           <Pressable onPress={()=>setcomfirm(true)}><Iconify icon='material-symbols:logout' color={theme.color.primary} size={24}/></Pressable>
                        </View>}</View>
                    </View>))}
                </View>
            </View>

        </View>
    )
}

export default ActiveSessionsScreen

const styles = StyleSheet.create({})