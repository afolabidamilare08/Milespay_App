import { useContext, useEffect, useState } from "react";
import { Dimensions, ImageBackground, Text, TextInput, View, ScrollView } from "react-native";
import { CustomButton} from "../../components/inputsButtonsComponents";
import { SimpleHeader, ViewDefault } from "../../components/layoutComponents";
import DImag from "../../assets/images/dax.jpg";
import {SelectList} from 'react-native-dropdown-select-list';
import fonts from "../../config/fonts";
import AppContext from "../../context/Appcontext";
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';
import Axios from "axios";



export const TradeBitcoinPage1 = ({navigation}) => {

    const { UserBasicDetails } = useContext(AppContext)

    const [ BitcoinAmount, setBitcoinAmount ] = useState('')
    const [ Wallet_type, setWallet_type ] = useState(null)
    const [ isLoading, setisLoading ] = useState(false)
    const [ CryptoList, setCryptoList ] = useState(null)

    useEffect( () => {

        setisLoading(true)
        Axios.get('/crypto')
            .then( (response) => {
                setisLoading(false)
                setCryptoList(response.data)
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
        {key:'1',value:'Blockchain'},
        {key:'2',value:'Coinbase'},
        {key:'3',value:'Binance'},
        {key:'4',value:'Cashapp'},
        {key:'5',value:'Trust wallet'},
        {key:'6',value:'Paxful'},
    ];
    
    
    const HandleMoveForward = () => {

        setisLoading(true)

        if ( !Wallet_type || BitcoinAmount == '' ) {
            setisLoading(false)
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'WARNING',
                textBody: "Wallet and BTC amount cannot be left empty",
            })
            return
        }

        const find = CryptoList.find( (e) => e.crypto_symbol === "BTC"  )

        if ( !find ) {
            setisLoading(false)
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'WARNING',
                textBody: `Sorry we do not trade ${"Btc"} at the moment`,
            })
            return
        }

        navigation.navigate("TradeBitcoin_2",{
            amountTotrade:BitcoinAmount,
            Wallet_type: Wallet_type,
            crypto: "BTC",
            crypto_id: find._id
        })
        setisLoading(false)

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
                    text={"Bitcoin"}
                    action={ () => navigation.goBack() }
                />

                    <>

                        <SelectList setSelected={(e) => {
                            const find = data.find( (ele) => ele.key == e )
                            setWallet_type(find.value)
                        } } inputStyles={{
                                fontFamily:fonts.ManropeRegular,
                                fontSize:14,
                            }} placeholder="Wallet Type" search={false} boxStyles={{
                                borderColor:"black",
                                borderWidth:0,
                                width:"40%",
                                // marginTop:30
                            }} data={data} onSelect={(e) => console.log("e") } />

                        <Text style={{
                            marginTop:20,
                            fontSize:14,
                            fontFamily:fonts.ManropeRegular,
                            textAlign:"center"
                        }} >Enter Bitcoin Amount </Text>

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
                            }} placeholder="0" textAlign="center" value={BitcoinAmount} onChangeText={ (e) => setBitcoinAmount(e) } keyboardType="number-pad" />

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


                        {/* <View style={{
                            marginTop:30,
                            flexDirection:"row",
                            justifyContent:"space-evenly"
                        }} >

                            { data4.map( (well,index) => {
                                return <TouchableOpacity key={index} style={{
                                            backgroundColor:"lightgray",
                                            padding:8,
                                            borderRadius:15,
                                            // marginLeft:10
                                        }} >
                                            <Text style={{
                                                fontFamily:fonts.ManropeRegular,
                                            }} >{well.key} %</Text>
                                    </TouchableOpacity>
                            } ) }

                        </View> */}

                        <View style={{
                            marginTop:"40%"
                        }} >

                        </View>

                    </>
                

                <View style={{
                    alignItems:"center",
                    marginTop:20,
                    marginBottom:70
                }} >
                    <CustomButton isloading={ isLoading } disabled={isLoading} onpress={ HandleMoveForward } title={"Sell Bitcoin"} />
                    
                </View>

                </ImageBackground>

            </ScrollView>

        </Root>
    );

}