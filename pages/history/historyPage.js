import { StatusBar, Text, TouchableOpacity, Alert, Modal, View, StyleSheet, ImageBackground, ScrollView, Dimensions, Image, ActivityIndicator } from "react-native";
import colors from "../../config/colors";
import { Ionicons,AntDesign,MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { CustomButton } from "../../components/inputsButtonsComponents";
import fonts from "../../config/fonts";
import HeaderImg from "../../assets/images/Transaction.png";
import Google from "../../assets/images/google1.png";
import Amazon from "../../assets/images/amazon_logo.png";
import BestBuy from "../../assets/images/best_card.png";
import Steam from "../../assets/images/steam1.png";
import Apple from "../../assets/images/apple1.png";
import Axios from "axios";
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';
import { ModalSection } from "../../components/modal";



export const HistoryPage = ({navigation}) => {

    const [ whotoshow, setwhotoshow ] = useState(1)

    const [modalVisible, setModalVisible] = useState(false);

    const [ CryptoisLoading, setCryptoisLoading ] = useState(false)
    const [ CryptoOrders, setCryptoOrders ] = useState(null)

    const [ WithdrawalisLoading, setWithdrawalisLoading ] = useState(false)
    const [ WithdrawalList, setWithdrawalList ] = useState(null)

    const [ giftCardisLoading, setgiftCardisLoading ] = useState(false)
    const [ giftCardList, setgiftCardList ] = useState(null)

    const [ openGiftDetail, setopenGiftDetail ] = useState(false)
    const [ GiftDetailShow, setGiftDetailShow ] = useState(null)

    useEffect( () => {
        
        setCryptoisLoading(true)
        Axios.get('/crypto_order/my_crypto_orders/')
            .then( (response) => {
                setCryptoisLoading(false)
                setCryptoOrders(response.data)
            } )
            .catch( (e) => {

                setCryptoisLoading(false)
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'WARNING',
                    textBody: e.response.data.error_message,
                })

            } )

            setWithdrawalisLoading(true)
            Axios.get('auth/my_withdrawals')
            .then( (response) => {
                setWithdrawalisLoading(false)
                setWithdrawalList(response.data)
            } )
            .catch( (e) => {

                setWithdrawalisLoading(false)
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'WARNING',
                    textBody: e.response.data.error_message,
                })

            } )

            setgiftCardisLoading(true)    
            Axios.get('gift_order/all_myorders')
            .then( (response) => {
                setgiftCardisLoading(false)
                setgiftCardList(response.data)
            } )
            .catch( (e) => {
                setgiftCardisLoading(false)
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'WARNING',
                    textBody: e.response.data.error_message,
                })

            } )

    }, [] )

 
    const theData = [

        {type:"Pending",color:"orange",amount:300,id:"ffffff",name:"Amazon", img:Amazon },
        {type:"Pending",color:"orange",amount:1000,id:"ffffe",name:"Google", img:Google},
        {type:"Success",color:"rgba(3, 228, 107, 0.47)",amount:500,id:"fffdssa",name:"Best Buy", img:BestBuy},
        {type:"Success",color:"rgba(3, 228, 107, 0.47)",amount:900,id:"fffdsdsaa",name:"Steam", img:Steam},
        {type:"Success",color:"rgba(3, 228, 107, 0.47)",amount:400,id:"fffgkgli",name:"Amazon", img:Amazon},
        {type:"Failed",color:"red",amount:50,id:"ffflfkfns",name:"Google", img:Google},
        {type:"Success",color:"rgba(3, 228, 107, 0.47)",amount:100,id:"bnbnbnb",name:"Apple", img:Apple},
    ]


    const Withdraw = [

        {type:"Pending",color:"orange",amount:250,id:"ffffff",name:"Afolabi - Zenith Bank"},
        {type:"Pending",color:"orange",amount:1000,id:"ffffe",name:"Afolabi - Zenith Bank"},
        {type:"Success",color:"rgba(3, 228, 107, 0.47)",amount:500,id:"fffdssa",name:"Afolabi - Access Bank"},
    ]

    const TopLinks = [
        { text:"Giftcards", number: 1 },
        { text:"Cryptos", number: 2 },
        // { text:"Altcoin", number: 4 },
        { text:"Withdrawals", number: 3 },
    ]

    const CryptoMapping = () => {

        return (

            <>
            
                { CryptoisLoading ? <ActivityIndicator color={colors.lightBlue} size={20} /> : 
                
                    CryptoOrders ?
                    
                        CryptoOrders.length < 1 ? 
                        
                            <Text style={{
                                textAlign:"center",
                                marginTop:20
                            }} >
        
                                You have not made any crypto transactions yet
        
                            </Text>

                        :

                        CryptoOrders.map( (data,index) => {

                            if ( data.order_status === 'Pending' ) {
                                var TheColor = "orange"
                                var img = <FontAwesome5 name="exchange-alt" size={17} color={"orange"} /> 
                            }

                            if ( data.order_status === 'Success' ) {
                                TheColor = "rgba(3, 228, 107, 0.47)"
                                img = <MaterialIcons name="send" size={17} color={"rgba(3, 228, 107, 0.47)"} style={[{},{
                                    transform: [{rotate:"150deg"}]
                                }]} /> 
                            }

                            if ( data.order_status === 'Failed' ) {
                                TheColor = "tomato"
                                img = <MaterialIcons name="send" size={17} color={"tomato"} style={[{},{
                                    transform: [{rotate:"150deg"}]
                                }]} /> 
                            }


                            return (

                                <TouchableOpacity onPress={ () => navigation.navigate('Crypto_transaction_detail',{order_id:data._id}) } key={index}>

                                    <View style={{
                                        paddingBottom:15,
                                        paddingTop:15,
                                        flexDirection:"row",
                                        // alignItems:"center",
                                        justifyContent:"space-between"
                                    }} >
                        
                                        <View style={{
                                            flexDirection:"row",
                                            alignItems:"center",
                                        }} >
                        
                                            <View style={{
                                                width:30,
                                                height:30,
                                                justifyContent:"center",
                                                alignItems:"center",
                                                borderRadius:400,
                                                borderColor:TheColor,
                                                borderWidth:2,
                                                marginRight:14
                                            }} >
                                                { img}
                                            </View>
                        
                                            <View>
                                                <Text style={{
                                                    fontFamily:fonts.ManropeRegular,
                                                    fontSize:12
                                                }} >{data.crypto_transaction_details}</Text>
                                                <Text style={{
                                                    fontFamily:fonts.ManropeRegular,
                                                    fontSize:11,
                                                    marginTop:5,
                                                    color:"gray"
                                                }} >Status: <Text style={{
                                                    color:TheColor
                                                }} > {data.order_status} </Text> </Text>
                                            </View>
                        
                                        </View>
                        
                                        <View style={{
                        
                                        }} >
                        
                                            <Text style={{
                                                fontFamily:fonts.ManropeRegular,
                                                textAlign:"right",
                                                color:"gray",
                                                fontSize:12
                                            }} >{data.crypto_amount_received} {data.crypto_details.crypto_symbol}</Text>
                        
                                        </View>
                        
                                    </View>

                                </TouchableOpacity>

                            );
                
                        } )
                        
                    :
                    
                    <Text style={{
                        textAlign:"center",
                        marginTop:20
                    }} >

                       Something went wrong while getting transactions

                    </Text>

                }

            </>

        )
    }

    const WithdrawalMapping = () => {

        return (

            <>
            
                { WithdrawalisLoading ? <ActivityIndicator color={colors.lightBlue} size={20} /> : 
                
                    WithdrawalList ?
                    
                        WithdrawalList.length < 1 ? 
                        
                            <Text style={{
                                textAlign:"center",
                                marginTop:20
                            }} >
        
                                You have not withdrawn yet
        
                            </Text>

                        :

                        WithdrawalList.map( (data,index) => {

                            if ( data.withdrawal_status === 'Pending' ) {
                                var TheColor = "orange"
                            }

                            if ( data.withdrawal_status === 'Success' ) {
                                TheColor = "rgba(3, 228, 107, 0.47)"
                            }

                            if ( data.withdrawal_status === 'Failed' ) {
                                TheColor = "tomato"
                            }

                            const date = new Date(data.createdAt)
                            let dateFormat =  `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}`

                            return (

                                <View key={data._id} style={{
                                    borderBottomColor:"lightgray",
                                    borderBottomWidth:1,
                                    paddingBottom:15,
                                    paddingTop:15,
                                    flexDirection:"row",
                                    alignItems:"center",
                                    justifyContent:"space-between"
                                }} >
                
                                    <View style={{
                                        flexDirection:"row",
                                        alignItems:"center",
                                    }} >
                
                                        <View style={{
                                            width:30,
                                            height:30,
                                            justifyContent:"center",
                                            alignItems:"center",
                                            borderRadius:400,
                                            backgroundColor:TheColor,
                                            marginRight:14
                                        }} >
                                            <MaterialCommunityIcons name="bank" size={20} color="white" />
                                        </View>
                
                                        <View>
                                            <Text style={{
                                                fontFamily:fonts.QuickBold,
                                                fontSize:12
                                            }} >{data.bank.bank_name}</Text>
                                            <Text style={{
                                                    fontFamily:fonts.ManropeRegular,
                                                    fontSize:11,
                                                    marginTop:5,
                                                    color:"gray"
                                                }} >Account Number: <Text style={{
                                                    color:"black"
                                                }} > {data.bank.account_number} </Text> </Text>
                                                <Text style={{
                                                    fontFamily:fonts.ManropeRegular,
                                                    fontSize:11,
                                                    marginTop:5,
                                                    color:"gray"
                                                }} >Status: <Text style={{
                                                    color:TheColor
                                                }} > {data.withdrawal_status} </Text> </Text>
                                            <Text style={{
                                                color:"gray",
                                                fontSize:10,
                                                fontFamily:fonts.QuickRegular
                                            }} >{dateFormat}</Text>
                                        </View>
                
                                    </View>
                
                                    <View style={{
                
                                    }} >
                
                                        <Text style={{
                                            fontFamily:fonts.QuickSemiBold,
                                            textAlign:"right",
                                            fontSize:12,
                                        }} >₦ {data.amount_withdraw}</Text>
                                        <Text style={{
                                            color:data.color,
                                            fontSize:10,
                                            fontFamily:fonts.QuickRegular
                                        }} >{data.type}</Text>
                
                                    </View>
                
                                </View>

                            );
                
                        } )
                        
                    :
                    
                    <Text style={{
                        textAlign:"center",
                        marginTop:20
                    }} >

                       Something went wrong while getting Withdrawals

                    </Text>

                }

            </>

        )
    }

    const GiftMapping = () => {

        return (

            <>
            
                { giftCardisLoading ? <ActivityIndicator/> : 
                
                
                    giftCardList ? 

                        giftCardList.length < 1 ?

                            <Text style={{
                                textAlign:"center",
                                marginTop:20
                            }} >
        
                                You have not made any giftcard transaction yet
        
                            </Text>

                        :

                        giftCardList.map( (data,index) => {

                            if ( data.order_status === 'Pending' ) {
                                var TheColor = "orange"
                            }

                            if ( data.order_status === 'Success' ) {
                                TheColor = "rgba(3, 228, 107, 0.47)"
                            }

                            if ( data.order_status === 'Failed' ) {
                                TheColor = "tomato"
                            }

                            const date = new Date(data.createdAt)
                            let dateFormat =  `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}`

                            return <TouchableOpacity onPress={ () => {
                                setGiftDetailShow(data)
                                setopenGiftDetail(true)
                            } } key={index} style={{
                                borderBottomColor:"lightgray",
                                borderBottomWidth:1,
                                paddingBottom:15,
                                paddingTop:15,
                                flexDirection:"row",
                                alignItems:"center",
                                justifyContent:"space-between"
                            }} >
            
                                <View style={{
                                    flexDirection:"row",
                                    alignItems:"center",
                                }} >
            
                                    <View style={{
                                        justifyContent:"center",
                                        alignItems:"center",
                                        borderRadius:400,
                                        backgroundColor:"white",
                                        padding:10,
                                        marginRight:14
                                    }} >
                                        
                                        <Image source={{uri:data.Gift_card_brand.Gbrand_image.url}} style={{
                                            width:30,
                                            height:30
                                        }} />

                                    </View>
            
                                    <View>
                                        <Text style={{
                                            fontFamily:fonts.QuickBold,
                                            fontSize:12
                                        }} >{data.order_message}</Text>
                                        <Text style={{
                                            color:"gray",
                                            fontSize:10,
                                            fontFamily:fonts.QuickRegular
                                        }} >{dateFormat}</Text>
                                    </View>
            
                                </View>
            
                                <View style={{
            
                                }} >
            
                                    <Text style={{
                                        fontFamily:fonts.QuickSemiBold,
                                        textAlign:"right",
                                        fontSize:12
                                    }} >${data.amountToreceive}</Text>
                                    <Text style={{
                                        color:TheColor,
                                        fontSize:10,
                                        fontFamily:fonts.QuickRegular
                                    }} >{data.order_status}</Text>
            
                                </View>
            
                            </TouchableOpacity>

                        } ) 
                        
                    
                        :

                        <Text style={{
                            textAlign:"center",
                            marginTop:20
                        }} >
    
                           Something went wrong while getting transactions
    
                        </Text>

                }

            </>

        )

    }

    return(

        <ScrollView style={{
            padding:0,
            backgroundColor:"white"
        }} >

            <StatusBar backgroundColor={colors.primary} />

                <ImageBackground source={HeaderImg} style={{
                    flexDirection:"row",
                    // marginTop:25,
                    // paddingTop:40,
                    padding:30,
                    height:Dimensions.get('window').height * 0.2,
                    justifyContent:"space-between",
                }} >

                    <TouchableOpacity onPress={() => setModalVisible(true)} >
                        <Ionicons name="options" size={20} color={colors.transparent} />
                    </TouchableOpacity>

                    <Text style={{
                        color:"white",
                        fontFamily:fonts.ManropeBold,
                        fontSize:16
                    }} >Transaction</Text>

                    <TouchableOpacity onPress={() => setModalVisible(true)} >
                        <Ionicons name="options" size={20} color="white" />
                    </TouchableOpacity>

                </ImageBackground>
 
                <View style={{
                    backgroundColor:"white",
                    // padding:3,
                    marginTop:10,
                    marginBottom:10,
                    borderBottomColor:"lightgray",
                    borderStyle:"dotted",
                    borderBottomWidth:1,
                    paddingBottom:30,
                    borderRadius:10,
                    flexDirection:"row",
                    justifyContent:"space-evenly"
                }} >

                    { TopLinks.map( (linkit,index) => {
                        return <TouchableOpacity key={index} onPress={() => setwhotoshow(linkit.number)} style={{
                                }} >
                                    <Text style={{
                                        color:whotoshow === linkit.number ? "black" : "gray",
                                        fontFamily:fonts.ManropeBold,
                                        textAlign:"center",
                                        fontSize:14,
                                    }} >{linkit.text}</Text>
                                </TouchableOpacity>
                    } ) }

                </View>

                <View style={{
                    padding:20,
                    // marginTop:10
                }} >

                    { whotoshow == 1 ? 
                    
                        <GiftMapping/>

                        :
                    
                        whotoshow == 2 || whotoshow == 4 ?

                        <CryptoMapping/>

                        : whotoshow == 3 ? 
                        
                        <WithdrawalMapping/>

                        : <View></View>

                    }

                </View>

                <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                        }}
                    >

                        <View style={styles.centeredView}>

                            <ScrollView contentContainerStyle={{
                                alignItems:"center"
                            }} style={styles.modalView}>

                                <View style={{
                                    alignItems:"flex-end",
                                    width:"100%",
                                }} >
                                    <TouchableOpacity onPress={ () => setModalVisible(!modalVisible) } >
                                        <AntDesign name="close" size={19} color="black" />
                                    </TouchableOpacity>
                                </View>
                                
                                <Text style={{
                                    textAlign:"center",
                                    fontFamily:fonts.ManropeBold,
                                    fontSize:12,
                                    marginTop:10,
                                    width:"60%"
                                }} >Filter Gift Cards</Text>

                                <View style={{
                                    width:"100%",
                                    marginTop:30,
                                    borderBottomColor:"gray",
                                    borderBottomWidth:1,
                                    paddingBottom:30
                                }} >

                                    <TouchableOpacity style={{
                                        width:"100%",
                                        flexDirection:"row",
                                        justifyContent:"space-between",
                                        alignItems:"center"
                                    }} >
                                        <Text style={{
                                            fontFamily:fonts.ManropeRegular,
                                            fontSize:12,
                                        }} >All Date</Text>
                                        <View style={{
                                            width:15,
                                            height:15,
                                            backgroundColor:"blue",
                                            borderRadius:400
                                        }} ></View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{
                                        width:"100%",
                                        flexDirection:"row",
                                        justifyContent:"space-between",
                                        alignItems:"center",
                                        marginTop:20
                                    }} >
                                        <Text style={{
                                            fontFamily:fonts.ManropeRegular,
                                            fontSize:12,
                                        }} >Last Week</Text>
                                        <View style={{
                                            width:15,
                                            height:15,
                                            borderColor:"blue",
                                            borderWidth:1,
                                            borderRadius:400
                                        }} ></View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{
                                        width:"100%",
                                        flexDirection:"row",
                                        justifyContent:"space-between",
                                        alignItems:"center",
                                        marginTop:20
                                    }} >
                                        <Text style={{
                                            fontFamily:fonts.ManropeRegular,
                                            fontSize:12,
                                        }} >Last 30 days</Text>
                                        <View style={{
                                            width:15,
                                            height:15,
                                            borderColor:"blue",
                                            borderWidth:1,
                                            borderRadius:400
                                        }} ></View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{
                                        width:"100%",
                                        flexDirection:"row",
                                        justifyContent:"space-between",
                                        alignItems:"center",
                                        marginTop:20
                                    }} >
                                        <Text style={{
                                            fontFamily:fonts.ManropeRegular,
                                            fontSize:12,
                                        }} >Custom Date</Text>
                                        <View style={{
                                            width:15,
                                            height:15,
                                            borderColor:"blue",
                                            borderWidth:1,
                                            borderRadius:400
                                        }} ></View>
                                    </TouchableOpacity>

                                </View>

                                <View style={{
                                    width:"100%",
                                    marginTop:40,
                                    paddingBottom:10
                                }} >

                                    <TouchableOpacity style={{
                                        width:"100%",
                                        flexDirection:"row",
                                        justifyContent:"space-between",
                                        alignItems:"center"
                                    }} >
                                        <Text style={{
                                            fontFamily:fonts.ManropeRegular,
                                            fontSize:12,
                                        }} >All</Text>
                                        <View style={{
                                            width:15,
                                            height:15,
                                            backgroundColor:"blue",
                                            borderRadius:400
                                        }} ></View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{
                                        width:"100%",
                                        flexDirection:"row",
                                        justifyContent:"space-between",
                                        alignItems:"center",
                                        marginTop:20
                                    }} >
                                        <Text style={{
                                            fontFamily:fonts.ManropeRegular,
                                            fontSize:12,
                                        }} >Success</Text>
                                        <View style={{
                                            width:15,
                                            height:15,
                                            borderColor:"blue",
                                            borderWidth:1,
                                            borderRadius:400
                                        }} ></View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{
                                        width:"100%",
                                        flexDirection:"row",
                                        justifyContent:"space-between",
                                        alignItems:"center",
                                        marginTop:20
                                    }} >
                                        <Text style={{
                                            fontFamily:fonts.ManropeRegular,
                                            fontSize:12,
                                        }} >Pending</Text>
                                        <View style={{
                                            width:15,
                                            height:15,
                                            borderColor:"blue",
                                            borderWidth:1,
                                            borderRadius:400
                                        }} ></View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{
                                        width:"100%",
                                        flexDirection:"row",
                                        justifyContent:"space-between",
                                        alignItems:"center",
                                        marginTop:20
                                    }} >
                                        <Text style={{
                                            fontFamily:fonts.ManropeRegular,
                                            fontSize:12,
                                        }} >Failed</Text>
                                        <View style={{
                                            width:15,
                                            height:15,
                                            borderColor:"blue",
                                            borderWidth:1,
                                            borderRadius:400
                                        }} ></View>
                                    </TouchableOpacity>

                                </View>

                                <CustomButton title={"Apply Filter"} />

                            </ScrollView>


                        </View>

                </Modal>

                <ModalSection
                    modalVisible={openGiftDetail}
                    content={

                        <>
                        
                        <Text style={{
                            fontFamily:fonts.QuickBold
                        }} >Transaction Detail</Text>

                        <View style={{
                                    width:"100%",
                                    padding:10,
                                    flexWrap:"wrap",
                                    flexDirection:"row",
                                    justifyContent:"space-between"
                                }} >

                                    <View style={{
                                        marginTop:20,
                                        width:"50%"
                                    }} >
                                        <Text style={{
                                            fontSize:12,
                                            color:"gray",
                                            fontFamily:fonts.ManropeBold,
                                            color:"gray"
                                        }} >Card Brand</Text>
                                        <Text style={{
                                            fontSize:14,
                                            fontFamily:fonts.ManropeRegular,
                                            marginTop:5
                                        }} > { GiftDetailShow ? GiftDetailShow.Gift_card_brand.Gbrand_name : '' } </Text>
                                    </View>

                                    <View style={{
                                        marginTop:20,
                                        width:"50%"
                                    }} >
                                        <Text style={{
                                            fontSize:12,
                                            fontFamily:fonts.ManropeBold,
                                            color:"gray"
                                        }} >Card Country</Text>
                                        <Text style={{
                                            fontSize:14,
                                            fontFamily:fonts.ManropeRegular,
                                            marginTop:5
                                        }} > { GiftDetailShow ? GiftDetailShow.Gift_card.Giftcard_country : '' } </Text>
                                    </View>

                                    <View style={{
                                        marginTop:20,
                                        width:"50%"
                                    }} >
                                        <Text style={{
                                            fontSize:12,
                                            fontFamily:fonts.ManropeBold,
                                            color:"gray"
                                        }} >Card Type</Text>
                                        <Text style={{
                                            fontSize:14,
                                            fontFamily:fonts.ManropeRegular,
                                            marginTop:5
                                        }} > { GiftDetailShow ? GiftDetailShow.Gift_card.Giftcard_type : '' } </Text>
                                    </View>

                                    <View style={{
                                        marginTop:20,
                                        width:"50%"
                                    }} >
                                        <Text style={{
                                            fontSize:12,
                                            fontFamily:fonts.ManropeBold,
                                            color:"gray"
                                        }} >Card Vakue</Text>
                                        <Text style={{
                                            fontSize:14,
                                            fontFamily:fonts.ManropeRegular,
                                            marginTop:5
                                        }} >${ GiftDetailShow ? GiftDetailShow.giftcard_value : '' }</Text>
                                    </View>

                                    <View style={{
                                        marginTop:20,
                                        width:"50%"
                                    }} >
                                        <Text style={{
                                            fontSize:12,
                                            fontFamily:fonts.ManropeBold,
                                            color:"gray"
                                        }} >Rates</Text>
                                        <Text style={{
                                            fontSize:14,
                                            fontFamily:fonts.ManropeRegular,
                                            marginTop:5
                                        }} >{ GiftDetailShow ? GiftDetailShow.Gift_card.Giftcard_price_per_dollar : '' }/$</Text>
                                    </View>

                                    <View style={{
                                        marginTop:20,
                                        width:"50%"
                                    }} >
                                        <Text style={{
                                            fontSize:12,
                                            fontFamily:fonts.ManropeBold,
                                            color:"gray"
                                        }} >Amount to Receive</Text>
                                        <Text style={{
                                            fontSize:14,
                                            fontFamily:fonts.ManropeRegular,
                                            marginTop:5
                                        }} >₦{ GiftDetailShow ? GiftDetailShow.amountToreceive : '' }</Text>
                                    </View>


                                </View>
                        
                            <Text style={{
                                marginTop:30,
                                fontFamily:fonts.QuickBold
                            }} >Proof of payment</Text>

                            { GiftDetailShow.order_image ?
                            
                                <Image resizeMethod="scale" resizeMode="contain" source={{ uri: GiftDetailShow.order_image.url }} style={{
                                    width:300,
                                    height:300,
                                    marginTop:15,
                                    alignSelf:'center'
                                }} />
                            
                            : <></> }

                        </>

                    }
                    closeModal={ () => setopenGiftDetail(false) }
                />

        </ScrollView>

    );

}





const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      marginTop: 22,
      backgroundColor:"rgba(2, 2, 2, 0.59)"
    },
    modalView: {
        padding:30,
        position:"absolute",
        bottom:0,
        // alignItems:"center",
        backgroundColor:"white",
        width:"100%",
        height:"80%",
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    //   margin: 20,
    //   backgroundColor: "white",
    //   borderRadius: 20,
    //   padding: 35,
    //   alignItems: "center",
    //   shadowColor: "#000",
    //   shadowOffset: {
    //     width: 0,
    //     height: 2
    //   },
    //   shadowOpacity: 0.25,
    //   shadowRadius: 4,
    //   elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });