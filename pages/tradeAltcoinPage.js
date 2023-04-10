import { useState, useEffect, useContext } from "react";
import { ImageBackground, Text, TextInput, View, ScrollView } from "react-native";
import { CustomButton, CustomButton20, } from "../components/inputsButtonsComponents";
import { SliderHeader, ViewDefault } from "../components/layoutComponents";
import DImag from "../assets/images/dax.jpg";
import { FirstPart, SecoundPart, ThirdPart } from "../components/tradeAltcoinComponent";
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';
import Axios from 'axios';
import AppContext from "../context/Appcontext";
import {SelectList} from 'react-native-dropdown-select-list';
import fonts from "../config/fonts";


export const TradeAltcoin = ({navigation}) => {





    const [ CryptoAmount, setCryptoAmount ] = useState('')
    const [ Wallet_type, setWallet_type ] = useState(null)
    const [ isLoading, setisLoading ] = useState(false)
    const [ CryptoList, setCryptoList ] = useState(null)
    const [ Crypto, setCrypto ] = useState(null)
    const {UserBasicDetails} = useContext(AppContext)

    useEffect( () => {

        setisLoading(true)
        Axios.get('/crypto')
            .then( (response) => {
                setisLoading(false)
                var newArray = []

                for (let k = 0; k < response.data.length; k++) {
                    const element = {
                        ...response.data[k],
                        title:response.data[k].crypto_symbol
                    };

                    if ( response.data[k].crypto_symbol === 'ALT' ) {
                        setCrypto(response.data[k])
                    }

                    newArray.push(element)
                }

                setCryptoList(newArray)

            } )
            .catch( e => {
                setisLoading(false)
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'WARNING',
                    textBody: e.response.data.error_message,
                })
            } )

    }, [] )


    const data = [
        {
          title:"Usdt",
        },
        {
          title:"Alts",
        },
        {
          title:"Eth",
        },
    ]

    const Wallet_Types = [
        {key:'1',value:'Blockchain'},
        {key:'2',value:'Coinbase'},
        {key:'3',value:'Binance'},
        {key:'4',value:'Cashapp'},
        {key:'5',value:'Trust wallet'},
        {key:'6',value:'Paxful'},
    ];


    const HandleMoveForward = () => {

        setisLoading(true)

        const newAmount = parseInt(CryptoAmount)

        if ( !Wallet_type || CryptoAmount == '' ) {
            setisLoading(false)
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'WARNING',
                textBody: `Wallet and ${Crypto.crypto_name} amount cannot be left empty`,
            })
            return
        }


        if ( newAmount < 100 ) {
            setisLoading(false)
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'WARNING',
                textBody: `Wallet and ${Crypto.crypto_name} amount cannot be less than $100`,
            })
            return
        }

        // const find = CryptoList.find( (e) => e.crypto_symbol === "BTC"  )

        // if ( !find ) {
        //     setisLoading(false)
        //     Toast.show({
        //         type: ALERT_TYPE.WARNING,
        //         title: 'WARNING',
        //         textBody: `Sorry we do not trade ${"Btc"} at the moment`,
        //     })
        //     return
        // }

        navigation.navigate("TradeBitcoin_2",{
            amountTotrade:CryptoAmount,
            Wallet_type: Wallet_type,
            crypto: Crypto.crypto_symbol,
            crypto_id: Crypto._id
        })
        setisLoading(false)

    }

    return (

        <Root>

            <ScrollView style={{backgroundColor:"white"}} >
                
                <ImageBackground source={DImag} resizeMode={"cover"} style={{
                    padding:30,
                }} >

                <SliderHeader
                    data={ CryptoList ? CryptoList : data }
                    onSlideChange={ CryptoList ?
                        (index) => {
                            setCrypto(CryptoList[index])
                        }
                    : null }
                    action={ () => navigation.goBack()}
                />


                <>

                    <SelectList setSelected={(e) => {
                    const find = Wallet_Types.find( (ele) => ele.key == e )
                    setWallet_type(find.value)
                } } inputStyles={{
                        fontFamily:fonts.ManropeRegular,
                        fontSize:14,
                    }} placeholder="Wallet Type" search={false} boxStyles={{
                        borderColor:"black",
                        borderWidth:0,
                        width:"40%",
                        // marginTop:30
                    }} data={Wallet_Types} onSelect={(e) => console.log("e") } />

                    <Text style={{
                        marginTop:20,
                        fontSize:14,
                        fontFamily:fonts.ManropeRegular,
                        textAlign:"center"
                    }} >Enter { Crypto ? Crypto.crypto_name : '' } Amount </Text>
{/* 
                    <View style={{
                        alignItems:"center",
                        flexDirection:"column",
                        justifyContent:"center",
                        marginTop:25,
                        alignSelf:"center",
                        width:"90%",
                    }} >
                        
                        <TextInput style={{
                            // paddingLeft:10,
                            padding:10,
                            textAlign:"center",
                            fontSize:40,
                            // minWidth:"80%",
                            // width:"90%",
                            borderRadius:13,
                            fontFamily:fonts.ManropeBold
                        }} placeholder="0" textAlign="center" value={CryptoAmount} onChangeText={ (e) => setCryptoAmount(e) } keyboardType="number-pad" />

                        <Text style={{
                            color:"gray",
                            fontSize:20,
                            fontFamily:fonts.ManropeBold,
                        }} > { Crypto ? Crypto.crypto_symbol : '' } </Text>

                    </View> */}


                        <View style={{
                            alignItems:"center",
                            flexDirection:"row",
                            justifyContent:"center",
                            marginTop:25,
                            alignSelf:"center",
                            width:"90%",
                        }} >
                            
                            <Text style={{
                                color:"gray",
                                fontSize:40,
                                fontFamily:fonts.ManropeBold,
                            }} >$</Text>

                            <TextInput style={{
                                // paddingLeft:10,
                                padding:10,
                                // borderColor:"red",
                                // borderWidth:1,
                                textAlign:"center",
                                fontSize:40,
                                // minWidth:"80%",
                                // width:"90%",
                                borderRadius:13,
                                fontFamily:fonts.ManropeBold
                            }} placeholder="0" textAlign="center" value={CryptoAmount} onChangeText={ (e) => setCryptoAmount(e) } keyboardType="number-pad" />

                        </View>

                    <Text style={{
                        marginTop:20,
                        fontSize:14,
                        fontFamily:fonts.ManropeRegular,
                        textAlign:"center"
                    }} >Min $100 - Max $10,00000</Text>  

                    <Text style={{
                        marginTop:20,
                        fontSize:14,
                        fontFamily:fonts.ManropeRegular,
                        textAlign:"center"
                    }} >Current Balance: ₦ {UserBasicDetails.wallet_balance} </Text>  


                    <View style={{
                        marginTop:"40%"
                    }} >

                    </View>

                </>

                

                { Crypto ?
                    <View style={{
                        alignItems:"center",
                        marginTop:20,
                        marginBottom:170
                    }} >
                        <CustomButton onpress={ () => HandleMoveForward() } title={`Sell ${Crypto.crypto_name}`} />

                    </View>
                
                : <></> }

                </ImageBackground>

            </ScrollView>

        </Root>
        
    );

}