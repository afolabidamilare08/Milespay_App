import { useContext, useEffect, useState } from "react";
import { Dimensions, ImageBackground, Image, Text, TextInput, View, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { AnotherInput, CustomButton, CustomButton20, CustomInput } from "../../components/inputsButtonsComponents";
import { SimpleHeader, ViewDefault } from "../../components/layoutComponents";
import DImag from "../../assets/images/dax.jpg";
import {SelectList} from 'react-native-dropdown-select-list';
import fonts from "../../config/fonts";
import { AntDesign,Ionicons,Feather } from '@expo/vector-icons';
import colors from "../../config/colors";
import AppContext from "../../context/Appcontext";
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';
import Axios  from "axios";
import * as Clipboard from 'expo-clipboard';
import * as ImagePicker from 'expo-image-picker';


export const TradeBitcoinPage2 = ({navigation,route}) => {

    const { UserBasicDetails } = useContext(AppContext)

    const [ OrderDetails, setOrderDetails ] = useState(null)
    const [ isLoading, setisLoading ] = useState(false)
    const [ ProofOFpayment, setProofOFpayment ] = useState(null)


    useEffect( () => {

        setisLoading(true)
        Axios.post('crypto_order/tease2nd_order',{
            crypto_id: route.params.crypto_id ,
            crypto_amount_received: route.params.amountTotrade ,
            crypto_wallet_type:route.params.Wallet_type,
        }).then( (response) => {
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
    

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(OrderDetails.crypto_details.crypto_address);
        Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Wallet Address',
            textBody: "Wallet Address was successfully copied",
        })
    };

    const PickProofImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
          });

        //   console.log(result);

          if (!result.cancelled) {

            setProofOFpayment(result) 
            // console.log(result.assets)         
          
            }else{
            
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
                    text={OrderDetails ? OrderDetails.crypto_details.crypto_name : ""}
                    action={ () => navigation.goBack() }
                />

                { isLoading ? <ActivityIndicator/> : <View>
                    
                    <View style={{
                        borderColor:colors.lightBlue,
                        borderWidth:1,
                        width:"75%",
                        alignSelf:"center",
                        padding:10,
                        borderRadius:8,
                        backgroundColor:"#F7FAFE"
                    }} >

                        <Text style={{
                            textAlign:"center",
                            marginBottom:20,
                            fontFamily:fonts.ManropeRegular
                        }} >Amount you will recieve</Text>
                        <Text style={{
                            textAlign:"center",
                            fontSize:29,
                            fontFamily:fonts.ManropeBold
                        }} > ₦ { OrderDetails ? OrderDetails.amount_to_receive_Innaira : 0 } </Text>

                    </View>

                    <Text style={{
                        marginTop:38,
                        fontSize:14,
                        fontFamily:fonts.ManropeSemiBold,
                        marginBottom:12
                    }} >
                        Wallet to Pay:
                    </Text>

                    <Text style={{
                        fontFamily:fonts.ManropeRegular,
                        fontSize:12,
                        color:"#686869"
                    }} > Tap to copy this address </Text>

                    <Text style={{
                        fontFamily:fonts.ManropeRegular,
                        fontSize:12,
                        color:"#686869",
                        marginTop:5
                    }} > Double tap QR code to save the image. </Text>


                    <Text style={{
                        fontFamily:fonts.ManropeSemiBold,
                        fontSize:15,
                        color:"black",
                        marginTop:20
                    }} > { OrderDetails ? OrderDetails.crypto_details.crypto_name : '' } to send </Text>

                    <Text style={{
                        fontFamily:fonts.ManropeSemiBold,
                        fontSize:15,
                        color:"black",
                        marginTop:10,
                        backgroundColor:"lightgray",
                        padding:10,
                        borderRadius:5
                    }} > { OrderDetails ? OrderDetails.crypto_amount_received : '' } </Text>

                    <View style={{
                        marginTop:39,
                        flexDirection:"row",
                        alignItems:"center",
                        justifyContent:"space-between"
                    }} >

                        <AntDesign name="qrcode" size={30}  color="black" />

                        <View style={{  
                            flexDirection:"row",
                            justifyContent:"space-between",
                            padding:14,
                            alignItems:"center",
                            backgroundColor:"lightgray",
                            borderRadius:10,
                            width:"80%"
                        }} >

                            <Text style={{
                                fontFamily:fonts.Regular,
                                fontSize:10,
                                // width:"40%"
                            }} > { OrderDetails ? OrderDetails.crypto_details.crypto_address : "Nil" } </Text>
                            
                            <TouchableOpacity onPress={ () => copyToClipboard() } >
                                <Text style={{
                                    color:colors.primary,
                                    fontFamily:"Rubik-Bold",
                                    textAlign:"right",
                                    fontSize:10,
                                    marginLeft:20,
                                }} >Copy</Text> 
                            </TouchableOpacity>

                        </View>

                    </View>

                    { ProofOFpayment ?
                    
                        <>
                        
                            <Image resizeMethod="scale" resizeMode="contain" source={{
                                uri: ProofOFpayment.uri 
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
                            marginTop:40,
                            borderRadius:10,
                            flexDirection:"row",
                            alignItems:"center",
                            // justifyContent:"center"
                        }} >

                            <Ionicons name="image" size={20} color="gray" style={{marginRight:20}} />
                            <Text style={{
                                fontFamily:fonts.ManropeRegular,
                                fontSize:14
                            }} >Upload Proof of Payment</Text> 

                        </TouchableOpacity>  
                    
                    }             

                    <View style={{
                        borderBottomColor:"lightgray",
                        borderBottomWidth:1,
                        marginTop:20
                    }} >

                    </View>


                    <Text style={{
                        marginTop:18,
                        fontFamily:fonts.ManropeRegular,
                        fontSize:12,
                        color:"#686869"
                    }} >Your Miles Pay Wallet will recieve the naira equivalent </Text>

                    {/* <SelectList setSelected={()=>{console.log("working")} } inputStyles={{
                        fontFamily:fonts.ManropeRegular,
                        fontSize:14,
                    }} placeholder="Select Account" search={false} boxStyles={{
                        borderColor:"black",
                        borderWidth:0,
                        width:"100%",
                        marginTop:20
                    }} data={Accounts} onSelect={()=>{console.log("working")}} />

                    <TouchableOpacity onPress={ () => navigation.navigate("add_bank_account") } style={{
                            flexDirection:"row",
                            marginTop:20,
                            justifyContent:"center",
                            alignItems:"center",
                    }} >
                        <Feather name="plus" size={15} color={"gray"} />
                        <Text style={{
                            color:"gray",
                            fontFamily:fonts.ManropeRegular,
                            marginLeft:10,
                            fontSize:12
                        }} >Add New Account</Text>
                    </TouchableOpacity> */}

                </View> }

                

                { isLoading ? <></> :
                
                    <View style={{
                        alignItems:"center",
                        marginTop:20,
                        marginBottom:70
                    }} >
                        { OrderDetails ? <CustomButton onpress={ () => {

                            if ( ProofOFpayment ) {
                                navigation.navigate("TradeBitcoin_3",{
                                    amountTotrade: OrderDetails.crypto_amount_received ,
                                    Wallet_type: OrderDetails.crypto_wallet_type,
                                    crypto: OrderDetails.crypto_details.crypto_symbol,
                                    crypto_id: OrderDetails.crypto_details._id,
                                    proof_of_payment: ProofOFpayment
                                })
                            }else{
                                Toast.show({
                                    type: ALERT_TYPE.WARNING,
                                    title: 'Proof of payment',
                                    textBody: "Please upload proof of payment before procceding",
                                })
                            }

                        } } title={`Sell ${ OrderDetails ? OrderDetails.crypto_details.crypto_name : "" }`} /> : <></> }
                        
                    </View>

                }

                </ImageBackground>

            </ScrollView>

        </Root>

    );

}


// let localUri = result.assets[0].uri

// let filename = localUri.split('/').pop();

// let match = /\.(\w+)$/.exec(filename);

// let type = match ? `image/${match[1]}` : `image`


// const FordItSha = new FormData();

// FordItSha.append('profile_picture',{ uri: localUri, name: filename, type})
// FordItSha.append('category',"rice")


// Axios({
//     method: "put",
//     url: "/users/" + user._id,
//     data: FordItSha,
//     headers: { "Content-Type": "multipart/form-data", "boundry": "boundry" }
//   }).then((response) => {

//         setUser_details(response.data)
//         Toast.show({
//             type: ALERT_TYPE.SUCCESS,
//             title: 'Profile Picture Updated',
//             textBody: 'Your Profile Picture were Successfully Updated',
//         })
//         setimageLoading(false)


//   }).catch((err) => {

//     setimageLoading(false)

//     if (err.response) {
//         Toast.show({
//             type: ALERT_TYPE.WARNING,
//             title: 'Warning',
//             textBody: 'An error occured while trying to update your profile picture',
//         })
//     }

//   })