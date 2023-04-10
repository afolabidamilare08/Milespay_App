import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PowerImg from '../assets/images/power.jpg';
import Bp from '../assets/images/bp.png';
import curve from '../assets/images/curve.png';
import chart from '../assets/images/chart.png';
import ethers from '../assets/images/ethers.png';
import tilted from '../assets/images/tilted.png';
import { MaterialCommunityIcons, Octicons, FontAwesome5, Foundation } from '@expo/vector-icons';
import fonts from "../config/fonts";
import colors from "../config/colors";
import { SimpleHeader } from "../components/layoutComponents";

export const MainTradeScreen = ({navigation}) => {

    var links = [
        { text:"Giftcards", bgcolor:"#76BEEC", mid:Bp, icon: <Octicons name="credit-card" size={35} color="white" />, to:"GiftCardHome" },
        { text:"Bitcoins", spcolor:colors.primary, bgcolor:"rgba(255, 255, 255, 0.94)", mid:curve, icon: <FontAwesome5 name="bitcoin" size={35} color={colors.primary} />, to:"TradeBitcoin" },
        { text:"USDT", bgcolor:colors.primary, mid:chart, icon: <Foundation name="dollar" size={35} color="white" />, to:"TradeAltcoin" },
        { text:"ETH & ALTs", bgcolor:"#00D4FF", mid:tilted, icon: <Image source={ethers} />, to:"TradeAltcoin" },
    ]

    return <ScrollView style={{
        flex:1,
        backgroundColor:"white"
    }} >

        <ImageBackground source={PowerImg} style={{
            flex:1,
            padding:30,
            minHeight:800,
        }} >

            <SimpleHeader
                text={ "Start Trading Today" }
                action={ () => navigation.goBack() }
            />

            { links.map( (link,index) => {
                return <TouchableOpacity key={index} style={[styles.links,{
                    backgroundColor:link.bgcolor
                }]} onPress={ link.to ? () => navigation.navigate(link.to) : null } >

                            <View>  
                                <Text style={{
                                    fontFamily:fonts.ManropeBold,
                                    color:link.spcolor ? link.spcolor : "white",
                                    fontSize:18,
                                }} > {link.text} </Text>
                                <View style={{
                                    marginTop:15,
                                    padding:6,
                                    borderRadius:4,
                                    backgroundColor:"white"
                                }} >
                                    <Text style={{
                                        textAlign:"center",
                                        fontFamily:fonts.ManropeSemiBold,
                                        color:colors.primary,
                                    }} >Trade Now</Text>
                                </View>
                            </View>

                            <Image source={link.mid} />

                            {link.icon}

                        </TouchableOpacity>
            } ) }
            
        </ImageBackground>

    </ScrollView>

}


const styles = StyleSheet.create({
    links:{
        width:"100%",
        // height:100,
        alignSelf:"center",
        borderRadius:5,
        alignItems:"center",
        padding:15,
        justifyContent:"space-between",
        flexDirection:"row",
        marginTop:40,
        ...Platform.select({
            ios: {
            shadowColor: "rgba(0,0,0)",
            shadowOpacity: 0.5,
            shadowRadius: 5
            },
            android: {
            elevation: 5
            },
        }),
    }
})