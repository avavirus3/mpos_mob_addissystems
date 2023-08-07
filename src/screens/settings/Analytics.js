import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native'
import React, { useState } from 'react'
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar'
import { scale, verticalScale } from 'react-native-size-matters'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { Iconify } from 'react-native-iconify';
import { color } from '../../styles/Styles';
import { theme } from '../../styles/stylesheet';



const Analytics = ({ navigation }) => {
    const [Total, setTotal] = useState("Sales")
    const [activeTime, setActiveTime] = useState('day')

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "jul", "Aug", "Sep", "Oct", 'nov', 'dec'],
        datasets: [
            {
                data: [10, 20, 30, 50, 40, 90, 60, 45, 66, 80, 16, 75],
                colors: [
                    ((opacity = 1) => `${theme.color.blue}`),
                    ((opacity = 1) => `${theme.color.blue}`),
                    ((opacity = 1) => `${theme.color.blue}`),
                    ((opacity = 1) => `${theme.color.blue}`),
                    ((opacity = 1) => `${theme.color.blue}`),
                    ((opacity = 1) => `${theme.color.blue}`),
                    ((opacity = 1) => `${theme.color.blue}`),
                    ((opacity = 1) => `${theme.color.blue}`),
                    ((opacity = 1) => `${theme.color.blue}`),
                    ((opacity = 1) => `${theme.color.blue}`),
                    ((opacity = 1) => `${theme.color.blue}`),
                    ((opacity = 1) => `${theme.color.blue}`),
                ], // optional
                strokeWidth: 2 // optional
            }
        ],
        //legend: ["Rainy Days"] // optional
    };
    const chartConfig = {
        barPercentage: 0.5,
        backgroundColor: "#fff",
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(50, 34, 198, ${1})`,

        //colors: (opacity = 1) => `rgba(50, 34, 198, ${1})`,
        //fromZero:true,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "1",
            strokeWidth: "5",
            stroke: ""
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ paddingHorizontal: scale(20) }}><TopNavigationBar backIcon={true} onPressBack={() => navigation.goBack()} middleLabel={'Analytics'} /></View>
            <View style={{ paddingHorizontal: 20, marginVertical: scale(15), }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#fff', marginVertical: verticalScale(25) }}>
                    <Pressable onPress={() => setTotal('Sales')} style={[{ borderRadius: 10, alignItems: 'center', paddingHorizontal: scale(30), paddingVertical: verticalScale(29) }, Total == 'Sales' ? { backgroundColor: color.primary } : { backgroundColor: "#F9F7F7" }]}>
                        <Iconify icon='mdi:percent-box' size={40} color={Total == 'Sales' ? "#fff" : '#000'} />
                        <Text style={{ color: Total == 'Sales' ? "#fff" : '#000', fontSize: 22 }}>Total Sales</Text></Pressable>
                    <Pressable onPress={() => setTotal('Items')} style={[{ borderRadius: 10, alignItems: 'center', paddingHorizontal: scale(30), paddingVertical: verticalScale(29) }, Total == "Items" ? { backgroundColor: color.primary } : { backgroundColor: "#F9F7F7" }]}>
                        <Iconify icon='mingcute:download-line' size={40} color={Total == 'Items' ? "#fff" : '#000'} />
                        <Text style={{ color: Total == "Items" ? "#fff" : '#000', fontSize: 22 }}>Total Items</Text></Pressable>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, }}>
                    {Total == "Sales" ? <Text style={{ fontSize: 20 }}>Total Sales</Text> : <Text style={{ fontSize: 20 }}>Total Items</Text>}
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Pressable onPress={() => setActiveTime('day')} style={[{ paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 10, }, activeTime == "day" ? { backgroundColor: theme.color.blue } : {}]}>
                            <Text style={[activeTime == "day" ? { color: 'white' } : {}, { fontSize: 17 }]}>Day</Text>
                        </Pressable>
                        <Pressable onPress={() => setActiveTime('month')} style={[{ paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 10, }, activeTime == "month" ? { backgroundColor: theme.color.blue } : {}]}>
                            <Text style={[activeTime == "month" ? { color: 'white' } : {}, { fontSize: 17 }]}>Month</Text>
                        </Pressable>
                        <Pressable onPress={() => setActiveTime('year')} style={[{ paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 10, }, activeTime == "year" ? { backgroundColor: theme.color.blue } : {}]}>
                            <Text style={[activeTime == "year" ? { color: 'white' } : {}, { fontSize: 17 }]}>Year</Text>
                        </Pressable>
                    </View>
                </View>
                {activeTime=='day'?<BarChart
                    //style={graphStyle}
                    data={daydata}
                    width={Dimensions.get("window").width - 40}
                    height={220}
                    yAxisLabel=""
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                    fromZero={true}
                    flatColor={true}
                    withCustomBarColorFromData={true}
                    withInnerLines={false}
                />:null}
                {activeTime=="month"?<LineChart
                    data={monthdata}
                    width={Dimensions.get("window").width - 40}
                    height={220}
                    chartConfig={chartConfig}
                    flatColor={true}
                    fromZero={true}
                    withShadow={false}
                    withInnerLines={false}
                    withOuterLines={false}
                />:null}
                {activeTime=='year'?<BarChart
                    //style={graphStyle}
                    data={yeardata}
                    width={Dimensions.get("window").width - 40}
                    height={220}
                    yAxisLabel=""
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                    fromZero={true}
                    flatColor={true}
                    withCustomBarColorFromData={true}
                    withInnerLines={false}
                />:null}
            </View>
        </View>
    )
}

export default Analytics

const styles = StyleSheet.create({})

export const daydata = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun"],
    datasets: [
        {
            data: [Math.random()*100,Math.random()*100,Math.random()*100, Math.random()*100, Math.random()*100,Math.random()*100, Math.random()*100,],
            colors: [
                ((opacity = 1) => `${theme.color.blue}`),
                ((opacity = 1) => `${theme.color.blue}`),
                ((opacity = 1) => `${theme.color.blue}`),
                ((opacity = 1) => `${theme.color.blue}`),
                ((opacity = 1) => `${theme.color.blue}`),
                ((opacity = 1) => `${theme.color.blue}`),
                ((opacity = 1) => `${theme.color.blue}`),
            ], // optional
            strokeWidth: 2 // optional
        }
    ],
    //legend: ["Rainy Days"] // optional
};
export const monthdata = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "jul", "Aug", "Sep", "Oct", 'nov', 'dec'],
    datasets: [
        {
            data: [Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100],
            colors: [
                ((opacity = 1) => `${theme.color.blue}`),
                ((opacity = 1) => `${theme.color.blue}`),
                ((opacity = 1) => `${theme.color.blue}`),
                ((opacity = 1) => `${theme.color.blue}`),
                ((opacity = 1) => `${theme.color.blue}`),
                ((opacity = 1) => `${theme.color.blue}`),
                ((opacity = 1) => `${theme.color.blue}`),
                ((opacity = 1) => `${theme.color.blue}`),
                ((opacity = 1) => `${theme.color.blue}`),
                ((opacity = 1) => `${theme.color.blue}`),
                ((opacity = 1) => `${theme.color.blue}`),
                ((opacity = 1) => `${theme.color.blue}`),
            ], // optional
            strokeWidth: 2 // optional
        }
    ],
    //legend: ["Rainy Days"] // optional
};
export const yeardata = {
    labels: ['2016', '2017', '2018', '2019', '2020','2021','2022','2023'],
    datasets: [
        {
            data: [Math.random()*1000, Math.random()*1000, Math.random()*1000, Math.random()*1000, Math.random()*1000, Math.random()*1000, Math.random()*1000, Math.random()*1000],
            colors: [
                ((opacity = 1) => `${theme.color.blue}`),
                ((opacity = 1) => `${theme.color.blue}`),
                ((opacity = 1) => `${theme.color.blue}`),
                ((opacity = 1) => `${theme.color.blue}`),
                ((opacity = 1) => `${theme.color.blue}`),
                ((opacity = 1) => `${theme.color.blue}`),
                ((opacity = 1) => `${theme.color.blue}`),
                ((opacity = 1) => `${theme.color.blue}`),
            ], // optional
            strokeWidth: 2 // optional
        }
    ],
    //legend: ["Rainy Days"] // optional
};