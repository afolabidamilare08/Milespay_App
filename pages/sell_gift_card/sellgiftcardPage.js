import { ActivityIndicator, Dimensions, FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Feather } from '@expo/vector-icons';
import AmazonCard from '../../assets/images/amazon_logo.png';
import GoogleCard from '../../assets/images/google1.png';
import AppleCard from '../../assets/images/apple1.png';
import SteamCard from '../../assets/images/steam1.png';
import EbayCard from '../../assets/images/ebay_card.png';
import BestCard from '../../assets/images/best_card.png';
import XboxCard from '../../assets/images/xbox1.png';
import WallCard from '../../assets/images/wallmart1.jpg';
import Bg from '../../assets/images/dax.jpg';
import Gift_bg from '../../assets/images/gift_id.png';
import colors from "../../config/colors";
import { SimpleHeader } from "../../components/layoutComponents";
import fonts from "../../config/fonts";
import { useState, useEffect } from "react";
import Axios from "axios";
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';
// import {LinearGradient} from 'expo-linear-gradient';

export const SellGiftcardHome = ({navigation}) => {

    const [ Gbrand, setGbrand ] = useState(null)
    const [ isLoading, setisLoading ] = useState(false)


    useEffect(() => {
        setisLoading(true)
        Axios.get('gift_card/get_gbrands')
            .then( (response) => {
                setisLoading(false)
                setGbrand(response.data)
            } )
            .catch( e => {
                setisLoading(false)
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'WARNING',
                    textBody: e.response.data.error_message,
                })
            } )
    }, [])
    

    const GiftCard = ({image,name,item}) => {

        return <ImageBackground source={Gift_bg} style={[styles.button,{
            // backgroundColor:"white",
            // padding:30,
            justifyContent:"center",
            alignItems:"center",
            borderRadius:9,
            width:200,
            height:200,
            borderRadius:4000,
            marginRight:30, 
            marginLeft:30, 
            // backgroundColor:colors.lightBlue
        }]}>

            <TouchableOpacity onPress={ () => navigation.navigate("SubmitGiftCard",{id:item}) } >
                <Image source={{uri:image}} resizeMethod={"resize"} resizeMode={"contain"} style={{
                    width:100,
                    height:100,
                    alignSelf:"center",
                }} />

                <Text style={{
                    textAlign:"center",
                    marginTop:20,
                    fontFamily:fonts.ManropeSemiBold,
                    fontSize:14,
                    color:"white"
                }} > {name} </Text>
            </TouchableOpacity>

        </ImageBackground>

    }

    return <ScrollView style={styles.container} >

        <ImageBackground source={Bg} style={{
            minHeight: Dimensions.get('window').height
        }} >

        <View style={{
            padding:30
        }} >

            <SimpleHeader
                text={"Giftcards"}
                action={ () => navigation.goBack() }
            />

            <View style={{
                marginTop:50
            }} >

                <View style={{
                    // backgroundColor:"#EAF0FB",
                    padding:10,
                    borderColor:colors.lightBlue,
                    borderWidth:1,
                    borderRadius:10,
                    marginTop:25,
                    flexDirection:"row",
                    justifyContent:"center",
                    alignItems:"center"
                }} >

                    <Feather name="search" size={18} color="#686869" />

                    <TextInput placeholder="Search for giftcard" style={{
                        marginLeft:10,
                        // borderColor:"red",
                        // borderWidth:1,
                        width:"90%",
                        fontSize:14,
                        color:"#686869"
                    }} />

                </View>
            </View>   

        </View>

        { Gbrand ?
        
            <FlatList
            data={Gbrand}
            keyExtractor={ (well) => well.Gbrand_name }
            horizontal
            contentContainerStyle={{
                justifyContent:"center",
                // alignItems:"center"
            }}
            // pagingEnabled
            style={{
                // padding:30,
                marginTop:100,
                // height:200
            }}
            renderItem={ ({item}) => {
                return <GiftCard image={ item.Gbrand_image.url } item={item._id} name={item.Gbrand_name} />
            } }
        />
        
        : isLoading ? <ActivityIndicator /> : <></> }

        </ImageBackground>

    </ScrollView>

}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white"
    },
    // button: {
  
    //     // cross-platform css
    
    //     ...Platform.select({
    //       ios: {
    //         shadowColor: "rgba(0,0,0)",
    //         shadowOpacity: 0.5,
    //         shadowRadius: 5
    //       },
    //       android: {
    //         elevation: 5
    //       },
    //     }),
    //   }
})