import { useContext, useEffect, useState } from "react";
import { Dimensions, ImageBackground, Text, TextInput, ScrollView, View, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { AnotherInput, CustomButton, CustomButton20, CustomInput } from "../../components/inputsButtonsComponents";
import { SimpleHeader, ViewDefault } from "../../components/layoutComponents";
import DImag from "../../assets/images/dax.jpg";
import fonts from "../../config/fonts";
import { AntDesign,Ionicons,Feather } from '@expo/vector-icons';
import colors from "../../config/colors";
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';
import Axios  from "axios";
import AppContext from "../../context/Appcontext";



export const CryptoHistoryDetail = ({navigation,route}) => {

    const [ OrderDetails, setOrderDetails ] = useState(null)
    const [ isLoading, setisLoading ] = useState(false)
    const { UserBasicDetails } = useContext(AppContext)


    useEffect( () => {

        setisLoading(true)
        Axios.get(`crypto_order/crypto_order_detail/${route.params.order_id}`)
        .then( (response) => {
            setisLoading(false)
            setOrderDetails(response.data)
        } )
        .catch( (e) => {
            setisLoading(false)
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'WARNING',
                textBody: e.response.data.error_message,
            })

        } )

    }, [] )
    

    if ( OrderDetails ) {
        
        var Dcolor;

        if ( OrderDetails.order_status === 'Pending' ) {
            Dcolor = "orange"
        }

        if ( OrderDetails.order_status === 'Success' ) {
            Dcolor = "rgba(3, 228, 107, 0.47)"
        }

        if ( OrderDetails.order_status === 'Failed' ) {
            Dcolor = "tomato"
        }

    }

    return (

        <Root>

            <ScrollView style={{
                backgroundColor:"white"
            }} >
                
                <ImageBackground source={DImag} resizeMode={"stretch"} style={{
                    padding:30,
                    minHeight:Dimensions.get('window').height
                }} >

                <SimpleHeader
                    text={"Transaction Details"}
                    action={ () => navigation.goBack() }
                />

                { isLoading ? <ActivityIndicator/> : 
                
                <>

                    <Text style={{
                        fontFamily:fonts.ManropeRegular,
                        fontSize:15,
                        color:"#686869",
                        marginTop:50
                    }} > Wallet address </Text>
        
        
                    <View style={{
                        marginTop:10,
                        flexDirection:"row",
                        justifyContent:"space-between",
                        alignItems:"center",
                        borderBottomColor:"lightgray",
                        borderBottomWidth:1,
                        paddingBottom:18
                    }} >
        
                        <Text style={{
                            fontFamily:fonts.ManropeRegular,
                            width:"75%",
                            fontSize:12
                        }} > { OrderDetails ? OrderDetails.crypto_details.crypto_address : "Nil" } </Text>
        
                        {/* <TouchableOpacity style={{
                            // backgroundColor:"#EAF0FB",
                            padding:15,
                            borderRadius:8
                        }} >
                            <Text style={{
                                color:colors.primary,
                                fontFamily:fonts.ManropeRegular,
                                fontSize:12
                            }} >Copy</Text>
                        </TouchableOpacity> */}
        
                    </View>
        
                    
                    <View style={{
                        marginTop:29,
                        flexDirection:"row",
                        justifyContent:"space-between",
                        // alignItems:"center",
                        borderBottomColor:"lightgray",
                        borderBottomWidth:1,
                        paddingBottom:30
                    }} >
        
                        <View>
        
                            <Text style={{
                                fontFamily:fonts.ManropeRegular,
                                fontSize:14,
                                color:"#686869"
                            }} >Amount to be credited</Text>
        
                            <Text style={{
                                fontFamily:fonts.ManropeSemiBold,
                                fontSize:14,
                                marginTop:5,
                                color:"#686869"
                            }} >₦ { OrderDetails ? OrderDetails.crypto_total_price : '' }</Text>
        
                        </View>
        
                        <View style={{
                            width:"45%"
                        }} >
        
                            <Text style={{
                                fontFamily:fonts.ManropeRegular,
                                fontSize:14,
                                color:"#686869"
                            }} >{ OrderDetails ? OrderDetails.crypto_details.crypto_name : "Nil" } Value</Text>
        
                            <Text style={{
                                fontFamily:fonts.ManropeSemiBold,
                                fontSize:14,
                                marginTop:5,
                                color:"#686869",
                            }} > { OrderDetails ? OrderDetails.crypto_amount_received : "Nil" } </Text>
        
                        </View>
        
                    </View>
        
                    <View style={{
                        marginTop:29,
                        flexDirection:"row",
                        justifyContent:"space-between",
                        // alignItems:"center",
                        borderBottomColor:"lightgray",
                        // borderBottomWidth:1,
                        paddingBottom:30
                    }} >
        
                        <View style={{
                            width:"45%"
                        }}>
        
                            <Text style={{
                                fontFamily:fonts.ManropeRegular,
                                fontSize:14,
                                color:"#686869"
                            }} >Wallet to credit </Text>
        
                            <Text style={{
                                fontFamily:fonts.ManropeSemiBold,
                                fontSize:14,
                                marginTop:5,
                                color:"#686869"
                            }} >Miles Pay Wallet </Text>
        
                            <Text style={{
                                fontFamily:fonts.ManropeRegular,
                                fontSize:12,
                                marginTop:5,
                                color:"#686869",
                                textTransform:"uppercase"
                            }} >{UserBasicDetails.full_name}</Text>
        
                        </View>
        
                        <View style={{
                            width:"45%"
                        }} >
        
                            <Text style={{
                                fontFamily:fonts.ManropeRegular,
                                fontSize:14,
                                color:"#686869"
                            }} >Transaction Status </Text>
        
                            <Text style={{
                                fontFamily:fonts.ManropeRegular,
                                fontSize:14,
                                marginTop:5,
                                color:Dcolor,
                            }} > { OrderDetails ? OrderDetails.order_status : "" } </Text>
        
                        </View>
        
                    </View>
        
                    <Text style={{
                        fontFamily:fonts.ManropeSemiBold,
                        fontSize:14,
                        marginTop:5,
                        marginBottom:10,
                        color:"#686869"
                    }} > Proof of payment </Text>

                    { OrderDetails ? 
                    
                        OrderDetails.crypto_payment_proof ?

                            <Image resizeMethod="scale" resizeMode="contain" source={{
                                uri: OrderDetails.crypto_payment_proof.url ? OrderDetails.crypto_payment_proof.url : 'https://joadre.com/wp-content/uploads/2019/02/no-image.jpg' 
                            }} style={{
                                width:"100%",
                                height:200,
                            }} />

                        : <Text>Nil</Text>
                    
                    : <Text>Nil</Text> }

                    <Text style={{
                        fontFamily:fonts.ManropeSemiBold,
                        marginTop:5,
                        marginBottom:10,
                        fontSize:15,
                        color:"#686869",
                    }} > Transaction Details </Text>

                    <Text style={{
                        fontFamily:fonts.ManropeRegular,
                        fontSize:12,
                        marginTop:5,
                        color:"#686869",
                    }} > { OrderDetails ? OrderDetails.crypto_transaction_details : "Nil" } </Text>

                </>

                }

                {/* { isLoading ? <></> :
                
                    <View style={{
                        alignItems:"center",
                        marginTop:20,
                        marginBottom:70
                    }} >
                        { OrderDetails ? <CustomButton onpress title={"Go to Transactions"} /> : <></> }
                        
                    </View>

                } */}

                </ImageBackground>

            </ScrollView>

        </Root>

    );

}