import { ImageBackground, Text, View, StyleSheet,Platform, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons,Ionicons,AntDesign,Entypo,FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import ImageIt from '../assets/images/profile.png';
import DashB from '../assets/images/dash.png';
import fonts from "../config/fonts";
import colors from "../config/colors";
import { useContext, useEffect,useState } from "react";
import AppContext from "../context/Appcontext";
import Axios from "axios";


export const HomePage = ({navigation}) => {
    

    const Todo = [
        // {url:"edit_account",text:"Update your profile"},
        {url:"changePinPage",text:"Create transaction PIN"},
        {url:"BankHome",text:"Add your Bank account"},
    ]

    const [ My_banks, setMy_banks ] = useState(null)
    const [ showBalance, setshowBalance ] = useState(false)

    const { UserBasicDetails, UpdateUserBasicDetails } = useContext(AppContext)

    useEffect( () => {
        
        if (!UserBasicDetails.my_banks) {
            Axios.get('banks/my_banks')
            .then( (response) => {
                setMy_banks(response.data)
                UpdateUserBasicDetails({
                    ...UserBasicDetails,
                    my_banks:response.data
                })
            } )
            .catch( (e) => {
            } )
        }

    }, [] )

    
    const [ CryptoisLoading, setCryptoisLoading ] = useState(false)
    const [ CryptoOrders, setCryptoOrders ] = useState(null)

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

    }, [] )


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

    return(

        <ScrollView style={{
            backgroundColor:"white",
            flex:1
        }} >

            <ImageBackground source={DashB} style={{
                // height:330
            }} >

                <View style={{
                    padding:20,
                    marginTop:26,
                    flexDirection:"row",
                    justifyContent:"space-between"
                }} >

                    <View style={{ flexDirection:"row" }} >
                        <Image source={ImageIt} style={{
                            width:36,
                            height:36,
                            borderRadius:20,
                            marginRight:10
                        }} />

                        <View>
                            <Text style={{
                                fontSize:13,
                                fontFamily:fonts.ManropeRegular,
                                color:"#BEBEBE"
                            }} >Hello!</Text>
                            <Text style={{
                                fontSize:15,
                                marginTop:2,
                                color:"white",
                                fontFamily:fonts.ManropeBold
                            }}> { UserBasicDetails ? UserBasicDetails.full_name : "" } </Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={ () => navigation.navigate('Notifications') } > 
                        <MaterialCommunityIcons name="bell-badge-outline" size={25} color={colors.lightBlue} />
                    </TouchableOpacity>
                    

                </View>

                <View style={{
                    width:"90%",
                    height:160,
                    marginTop:20,
                    borderRadius:10,
                    alignSelf:"center",
                }} >

                        { showBalance ? 
                        
                            <TouchableOpacity onPress={ () => setshowBalance(!showBalance) } >
                                <Ionicons name="eye-sharp" color={"white"} size={24} style={{
                                    position:"absolute",
                                    right:0,
                                    top:16,
                                }}/>
                            </TouchableOpacity>
                        
                        : 
                        
                            <TouchableOpacity onPress={ () => setshowBalance(!showBalance) } >
                                <Ionicons name="ios-eye-off-sharp" color={"white"} size={24} style={{
                                    position:"absolute",
                                    right:0,
                                    top:16,
                                }} />
                            </TouchableOpacity>
                        
                        }

                        <View style={{
                            padding:20
                        }} >
                            <Text style={{
                                color:"rgba(255, 255, 255, 0.78)",
                                fontFamily:fonts.ManropeBold,
                                fontSize:20,
                                textAlign:"center"
                            }} > Wallet Balance </Text>
                            <TouchableOpacity onPress={ () => navigation.navigate('WalletPage') } >

                                <Text style={{
                                    marginTop:7,
                                    fontSize:30,
                                    color:"white",
                                    textAlign:"center",
                                    fontFamily:fonts.QuickBold
                                }}>{ UserBasicDetails ? showBalance ? "******" : `₦ ${UserBasicDetails.wallet_balance}` : "" }</Text>

                            </TouchableOpacity>
                        </View>

                </View>

                <View style={{
                    width:"90%",
                    alignSelf:"center",
                    position:"relative"
                }} >

                    <View style={[styles.slight_slant,{
                        height:50,
                        position:"absolute",
                        right:10
                    },{
                        transform: [{rotate:"-5.51deg"}]
                    }]} >

                    </View>

                    <View style={[styles.slight_slant,{
                        height:50,
                        position:"absolute",
                        left:10
                    },{
                        transform: [{rotate:"5.51deg"}]
                    }]} >

                    </View>

                    <View style={[styles.slight_slant,{
                        height:100,
                        position:"absolute",
                        width:"100%",
                    },{
                    }]} >

                    </View>

                    <TouchableOpacity style={styles.main_slat} onPress={ () => navigation.navigate("MainTrade_page") } >

                        <Text style={{
                            fontFamily:fonts.ManropeSemiBold
                        }} > MilesPay </Text>

                        <View style={{
                            marginTop:10,
                            flexDirection:"row",
                            alignItems:"center",
                            justifyContent:"space-between"
                        }} >
                            <Text style={{
                                fontFamily:fonts.ManropeBold,
                                fontSize:18
                            }} > Start Trading Today </Text>
                            <AntDesign name="arrowright" size={17} color={colors.primary} />
                        </View>

                    </TouchableOpacity>

                </View>

            </ImageBackground>

            <View style={{
                padding:20,
                marginTop:30
            }} >

                { UserBasicDetails.my_banks ? Todo.map( (list,index) => {

                    if ( list.url === "changePinPage" ) {
                        
                        if ( UserBasicDetails.transaction_pin ) {
                            return null
                        }else{
                            return <TouchableOpacity onPress={ () => navigation.navigate(list.url) } key={index} style={{
                                padding:20,
                                flexDirection:"row",
                                alignItems:"center",
                                borderWidth:1,
                                borderColor:colors.lightBlue,
                                borderRadius:10,
                                marginTop:15
                            }} >
    
                                <View style={{
                                    width:20,
                                    height:20,
                                    borderWidth:1,
                                    borderColor:"black",
                                    borderRadius:400,
                                    marginRight:20
                                }} >
            
                                </View>
            
                                <Text style={{
                                    fontFamily:fonts.Bold
                                }} >{list.text}</Text>
            
                            </TouchableOpacity>
                        }

                    }

                    if ( list.url === "BankHome" ) {
                        
                        if ( UserBasicDetails.my_banks && UserBasicDetails.my_banks.length > 0 ) {
                            return null
                        }else{
                            return <TouchableOpacity onPress={ () => navigation.navigate(list.url) } key={index} style={{
                                padding:20,
                                flexDirection:"row",
                                alignItems:"center",
                                borderWidth:1,
                                borderColor:colors.lightBlue,
                                borderRadius:10,
                                marginTop:15
                            }} >
    
                                <View style={{
                                    width:20,
                                    height:20,
                                    borderWidth:1,
                                    borderColor:"black",
                                    borderRadius:400,
                                    marginRight:20
                                }} >
            
                                </View>
            
                                <Text style={{
                                    fontFamily:fonts.Bold
                                }} >{list.text}</Text>
            
                            </TouchableOpacity>
                        }

                    }                    

                    return <TouchableOpacity onPress={ () => navigation.navigate(list.url) } key={index} style={{
                                padding:20,
                                flexDirection:"row",
                                alignItems:"center",
                                borderWidth:1,
                                borderColor:colors.lightBlue,
                                borderRadius:10,
                                marginTop:15
                            }} >
    
                                <View style={{
                                    width:20,
                                    height:20,
                                    borderWidth:1,
                                    borderColor:"black",
                                    borderRadius:400,
                                    marginRight:20
                                }} >
            
                                </View>
            
                                <Text style={{
                                    fontFamily:fonts.Bold
                                }} >{list.text}</Text>
            
                            </TouchableOpacity>
                        } ) : <></> }

            </View>

            <View style={{
                padding:20,
                marginBottom:80
            }} >
                
                <View style={{
                        flexDirection:"row",
                        alignItems:"center",
                        justifyContent:"space-between"
                    }} >

                    <Text style={{
                        marginBottom:10,
                        fontSize:16,
                        fontFamily:fonts.ManropeSemiBold,
                        color:"#080F1D"
                    }}>Transactions</Text>

                    {/* <View style={{
                        flexDirection:"row",
                        alignItems:"center"
                    }} >
                        <Text style={{
                        marginBottom:10,
                        fontSize:16,
                        fontFamily:fonts.ManropeRegular,
                        color:"#080F1D"
                    }} >All</Text>
                        <Entypo name="chevron-small-down" size={30} color="gray" style={{ marginTop:-9}} />
                    </View> */}

                </View>

                <View>

                    <CryptoMapping/>

                </View>
            </View>


        </ScrollView>

    );

}

const styles = StyleSheet.create({        
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
    },
    slight_slant:{
        backgroundColor:"rgba(255, 255, 255, 1.85)",
        width:"80%",
        alignSelf:"center", 
        height:50,
        backgroundColor:colors.lightBlue,
        borderRadius:6,
        width:"50%",
    },
    main_slat:{
        ...Platform.select({
            ios: {
            shadowColor: "rgba(0,0,0)",
            shadowOpacity: 0.5,
            shadowRadius: 5
            },
            android: {
            elevation: 20
            },
        }),
        backgroundColor:"#D9F9FF",
        width:"100%",
        alignSelf:"center", 
        borderRadius:6,
        height:90,
        marginTop:10,
        padding:15,
    }
  })