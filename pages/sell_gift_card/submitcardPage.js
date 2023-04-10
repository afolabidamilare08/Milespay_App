import { Image, TouchableOpacity, ScrollView, Text,StyleSheet, View, ImageBackground, Dimensions, ActivityIndicator } from "react-native"
import {SelectList} from 'react-native-dropdown-select-list';
import { StatusBar } from 'expo-status-bar';
import Logo from "../../assets/images/amazon_logo.png"
import CardBg from "../../assets/images/check.png"
import Line from "../../assets/images/line.png"
import BgIMg from "../../assets/images/dax.jpg"
import { AnotherInput, CustomButton } from "../../components/inputsButtonsComponents";
import { AntDesign,Ionicons,Feather } from '@expo/vector-icons';
import colors from "../../config/colors";
import { SimpleHeader } from "../../components/layoutComponents";
import fonts from "../../config/fonts";
import { useEffect, useState } from "react";
import Axios from 'axios';
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';
import * as ImagePicker from 'expo-image-picker';


export const SubmitCardPage = ({navigation,route}) => {

    const [ Gbrand, setGbrand ] = useState(null)
    const [ isLoading, setisLoading ] = useState(false)
    const [ Countries, setCountries ] = useState([])
    const [ cardTypes, setcardTypes ] = useState([])
    const [ Submiting, setSubmiting ] = useState(false)
    const [ Order_details, setOrder_details ] = useState({
        Giftcard_brand:null,
        Giftcard_type:null,
        Giftcard_country: null,
        Giftcard_amount:"",
        order_image:null
    })
    const [ Result, setResult  ] = useState(null)

        const Range = [
            {key:'1',value:'$25 -$50'},
            {key:'2',value:'$100 - $150'},
            {key:'3',value:'$200 - $500'}
        ];


        const PickProofImage = async () => {

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
              });
    
            //   console.log(result);
    
              if (!result.cancelled) {
    
                setOrder_details({
                    ...Order_details,
                    order_image:result
                }) 
                // console.log(result.assets)         
              
                }else{
                
              }
    
        }

        useEffect( () => {

            Axios.get(`/gift_card/gift_card/${route.params.id}`)
                .then( (response) => {

                    setCountries([])
                    setcardTypes([])
                    let CardCOuntries = []
                    let CardThypes = []
                    const Brand = response.data
            
            
                    for (let d = 0; d < Brand.gift_cards.length; d++) {
                        const element = Brand.gift_cards[d];
                        
                        if (element.Giftcard_country) {
            
                            const Tcountry = CardCOuntries.find( (country) => country.value == element.Giftcard_country )
            
                            if ( !Tcountry ) {
                                CardCOuntries.push({key:element.Giftcard_country,value:element.Giftcard_country})
                            }
                        }
            
                        if (element.Giftcard_type) {
            
                            const Tcardtype = CardThypes.find( (type) => type.value == element.Giftcard_type )
            
                            if ( !Tcardtype ) {
                                CardThypes.push({key:element.Giftcard_type,value:element.Giftcard_type})
                            }
                        }
            
                    }
            
                    setCountries(CardCOuntries)
                    setcardTypes(CardThypes)
                    setGbrand(response.data)
                    setOrder_details({
                        ...Order_details,
                        Giftcard_brand:response.data._id
                    })
                    setisLoading(false)

                } )
                .catch( e => {
                    setisLoading(false)
                    Toast.show({
                        type: ALERT_TYPE.WARNING,
                        title: 'WARNING',
                        textBody: e.response.data.error_message,
                    })
                } )

        } ,[] )

        const HandleSubmit = () => {

            setSubmiting(true)

            if ( !Order_details.Giftcard_brand || !Order_details.Giftcard_type || !Order_details.order_image || Order_details.Giftcard_amount == '' ) {
                setSubmiting(false)
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'WARNING',
                    textBody: "Please fill all fields",
                })
                return
            }


            let localUri = Order_details.order_image.uri

            let filename = localUri.split('/').pop();
    
            let match = /\.(\w+)$/.exec(filename);
    
            let type = match ? `image/${match[1]}` : `image`
    
    
            const FordItSha = new FormData();
    
            FordItSha.append('order_image',{ uri: localUri, name: filename, type})
            FordItSha.append('Giftcard_amount',Order_details.Giftcard_amount)
            FordItSha.append('Giftcard_type', Order_details.Giftcard_type)
            FordItSha.append('Giftcard_brand',Order_details.Giftcard_brand)

            if ( Order_details.Giftcard_country ) {
                FordItSha.append('Giftcard_country',Order_details.Giftcard_country)
            }
    
    
            Axios({
                method: "post",
                url: "gift_order/place_giftOrder",
                data: FordItSha,
                headers: { "Content-Type": "multipart/form-data", "boundry": "boundry" }
              }).then((response) => {
                // setSubmiting(false)
                navigation.navigate('History')
              }).catch( (e) => {
                setSubmiting(false)
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'WARNING',
                    textBody: e.response.data.error_message,
                })
    
            } )

        }

    return (

        <Root>

            <ScrollView style={{
                    backgroundColor:"white"
                }} >

                    <ImageBackground source={BgIMg} style={{
                        padding:30,
                        minHeight:Dimensions.get('window').height
                    }} >
                        <StatusBar backgroundColor="#0154FE"  />
                        <SimpleHeader
                            text={"Giftcards"}
                            action={ () => navigation.goBack() }
                        />


                        { Gbrand && !isLoading ? 
                        
                        
                            <>
                                <ImageBackground resizeMode="cover" source={CardBg} style={{
                                    width:343,
                                    height:219,
                                    zIndex:10000,
                                    alignSelf:"center",
                                    marginTop:50,
                                    // padding:15,
                                    justifyContent:"space-between",
                                    paddingTop:20,
                                    paddingBottom:20,
                                }} >

                                    <View style={{
                                        flexDirection:"row",
                                        justifyContent:"space-between",
                                        // borderColor:"red",
                                        // borderWidth:1,
                                        alignSelf:"center",
                                        width:"90%",
                                        paddingRight:20,
                                    }} >

                                        <SelectList setSelected={(e)=>{ setOrder_details({
                                            ...Order_details,
                                            Giftcard_country:e
                                        }) }} inputStyles={{
                                            fontSize:17,
                                            color:"white",
                                            fontFamily:fonts.ManropeBold,
                                        }} placeholder={
                                            Order_details ? Order_details.selected_country ? Order_details.selected_country : "Country" : "Country" 
                                        } search={false} boxStyles={{
                                            borderColor:colors.transparent,
                                            fontFamily:fonts.ManropeBold,
                                        }} data={Countries} onSelect={()=>{console.log("working")}} />

                                        <Image source={{uri: Gbrand.Gbrand_image.url }} resizeMethod={"resize"} resizeMode={"contain"} style={{
                                            width:50,
                                            height:50,
                                        }} />

                                    </View>

                                    <Image source={Line} />

                                    <View style={{
                                        flexDirection:"row",
                                        justifyContent:"space-between",
                                        alignSelf:"center",
                                        width:"90%",
                                        marginTop:20
                                    }} >

                                        <SelectList setSelected={(e)=>{ setOrder_details({
                                            ...Order_details,
                                            Giftcard_type:e
                                        }) }} inputStyles={{
                                            fontFamily:fonts.ManropeSemiBold,
                                            fontSize:17,
                                            color:"white",
                                        }} placeholder={
                                            Order_details ? Order_details.Giftcard_type ? Order_details.Giftcard_type : "Card type" : "Card type" 
                                        } search={false} boxStyles={{
                                            borderColor:colors.transparent,
                                            // width:"40%"
                                        }} data={cardTypes} onSelect={()=>{console.log("working")}} />

                                        <SelectList setSelected={()=>{console.log("working")} } inputStyles={{
                                            fontFamily:fonts.ManropeSemiBold,
                                            fontSize:17,
                                            color:"white",
                                            // backgroundColor:"red"
                                        }} placeholder="Range" search={false} boxStyles={{
                                            borderColor:colors.transparent,
                                            // width:"40%",
                                        }} data={Range} onSelect={()=>{console.log("working")}} />

                                    </View>

                                </ImageBackground>

                                <View style={{
                                    width:"100%",
                                    marginTop:90,
                                    marginBottom:80
                                }}>

{/* 
                                    <View style={{
                                        flexDirection:"row",
                                        marginTop:20,
                                        padding:19,
                                        justifyContent:"space-between",
                                        backgroundColor:"lightgray",
                                        borderRadius:10,
                                        alignItems:"center"
                                    }} >
                                        <Text  style={{
                                            fontSize:14,
                                            fontFamily:"Rubik-Regular"
                                        }}>Upload Card</Text>
                                        <FontAwesome5 name="image" size={24} color="#686869" />
                                    </View> */}


                                    { Order_details.order_image ?
                                                        
                                            <>
                                            
                                                <Image resizeMethod="scale" resizeMode="contain" source={{
                                                    uri: Order_details.order_image.uri 
                                                }} style={{
                                                    width:"100%",
                                                    height:200,
                                                    marginTop:30,
                                                    marginBottom:30,
                                                }} />  

                                                <TouchableOpacity style={{
                                                    backgroundColor:"lightgray",
                                                    padding:10,
                                                    borderRadius:9
                                                }} onPress={ () => PickProofImage() } >
                                                    <Text style={{
                                                        textAlign:"center"
                                                    }} > Change Proof of Payment </Text>
                                                </TouchableOpacity>                      

                                            </>

                                        : 
                                        
                                            <TouchableOpacity onPress={ () => PickProofImage() } style={{
                                                flexDirection:"row",
                                                marginTop:20,
                                                padding:19,
                                                // justifyContent:"space-between",
                                                backgroundColor:"lightgray",
                                                borderRadius:10,
                                                alignItems:"center"
                                                // justifyContent:"center"
                                            }} >

                                                <Ionicons name="image" size={20} color="gray" style={{marginRight:20}} />
                                                <Text style={{
                                                    fontFamily:fonts.ManropeRegular,
                                                    fontSize:14
                                                }} >Upload Proof of Payment</Text> 

                                            </TouchableOpacity>  
                                                    
                                    }    

                                    <AnotherInput styles={{
                                        borderWidth:0,
                                        borderBottomWidth:1,
                                        borderBottomColor:"black"
                                    }} placeholder={"Card Value"} value={Order_details.Giftcard_amount} onChange={ (e) => setOrder_details({
                                        ...Order_details,
                                        Giftcard_amount:e
                                    }) } /> 

                                    <View style={{
                                        width:"100%",
                                        alignItems:"center"
                                    }} >
                                        <CustomButton
                                            title={"Submit Transaction"}
                                            onpress={ () => HandleSubmit() }
                                            isloading={Submiting}
                                            disabled={Submiting}
                                        />
                                    </View>

                                    <Text style={{
                                        marginTop:70,
                                        textAlign:"center",
                                        fontSize:11,
                                        fontFamily:fonts.ManropeRegular,
                                        color:"#686869"
                                    }} >
                                        Please ensure your giftcard are uploaded in the right channel. 
                                        giftcard uploaded in a wrong channel willl be transferred to the 
                                        appropriate channel and treated at the current rate in that channel
                                    </Text>

                                </View>
                            </>

                        : isLoading && !Gbrand ? <ActivityIndicator/> : 
                        
                                <></>
                        
                        }

                    </ImageBackground>

            </ScrollView>

        </Root>

    )

}



const styles = StyleSheet.create({
    container:{
        // flex:1,
        // padding:30,
        // backgroundColor:"white",
    },
    button: {
  
        // cross-platform css
    
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