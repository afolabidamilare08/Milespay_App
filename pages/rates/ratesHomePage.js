import { Text, View,Alert, Modal,StyleSheet,TouchableOpacity,ScrollView, ImageBackground, Dimensions, ActivityIndicator } from "react-native";
import {SelectList} from 'react-native-dropdown-select-list';
import { AnotherInput, CustomButton, CustomButton20 } from "../../components/inputsButtonsComponents";
import { TheRatesHeader, ViewDefault } from "../../components/layoutComponents";
// import { Ionicons,AntDesign,MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import DImag from "../../assets/images/dax.jpg";
import colors from "../../config/colors";
import fonts from "../../config/fonts";
import Axios from 'axios';
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';



export const RateHomePage = ({navigation}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [ isLoading, setisLoading ] = useState(false)
    const [ error, seterror ] = useState(false)
    // const [dsert, setdsert] = useState(false);
    const [ ViewToShow, setViewToShow ] = useState(1)

    const [ SelectCrypto, setSelectCrypto ] = useState(false)
    const [ EstimatedValue, setEstimatedValue ] = useState(false)
    const [ InputValue, setInputValue ] = useState('')

    const [ CryptoShat, setCryptoShat ] = useState(null)
    const [ cryptoLoading, setcryptoLoading ] = useState(false)


    const [ AllGiftcard, setAllGiftcard ] = useState(null)
    const [ GiftLoading, setGiftLoading ] = useState(false)
    const [ Countries, setCountries ] = useState([])
    const [ cardTypes, setcardTypes ] = useState([])
    const [ currentBrand, setcurrentBrand ] = useState(null)
    const [ Giftamount, setGiftamount ] = useState('')
    const [ Result, setResult  ] = useState(null)

    const Range = [
        {key:'$25 -$50',value:'$25 -$50'},
        {key:'$100 - $150',value:'$100 - $150'},
        {key:'$200 - $500',value:'$200 - $500'}
    ];
   
    
    const getAllCrypto = () => {

        setcryptoLoading(true)

        Axios.get('/crypto')
        .then( (response) => {
            setcryptoLoading(false)
            setCryptoShat(response.data)

            let Dcrypto = []

            for (let j = 0; j < response.data.length; j++) {
                const element = response.data[j];
                
                if ( element.crypto_symbol.includes('ETH') || element.crypto_symbol.includes('BTC') || element.crypto_symbol.includes('ALT') ) {
                   
                }else{
                    Dcrypto.push({
                        key: element._id,
                        value: element.crypto_name,
                        ...element
                    })
                }

            }

            setSelectCrypto(Dcrypto)

        } )
        .catch( (e) => {
            setcryptoLoading(false)
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'WARNING',
                textBody: e.response.data.error_message,
            })
        } )

    }


    const getAllGiftcard = () => {

        setGiftLoading(true)

        Axios.get('gift_card/gbrand_cards')
            .then( (response) => {
                let DGiftcards = []
                for (let p = 0; p < response.data.length; p++) {
                    const element = response.data[p];
                    if (element.giftcards.length > 0) {
                        DGiftcards.push({
                            key: element._id,
                            value: element.Gbrand_name,
                            ...element
                        })
                    }
                }

                setAllGiftcard(DGiftcards)
                setGiftLoading(false)

            } )
            .catch( (e) => {
                console.log(e)
                setGiftLoading(false)
                if ( e.response ) {
                    Toast.show({
                        type: ALERT_TYPE.WARNING,
                        title: 'WARNING',
                        textBody: e.response.data.error_message,
                    })
                }else{
                    Toast.show({
                        type: ALERT_TYPE.WARNING,
                        title: 'WARNING',
                        textBody: "Something went wrong",
                    })
                }
            } )

    }

    useEffect( () => {
        getAllCrypto()
        getAllGiftcard()
    }, [] )
    
    const NavigationTop = () => {
        
        const WEd = [
            {key:1,value:'Giftcard'},
            {key:2,value:'Bitcoin'},
            {key:3,value:'ETH'},
            {key:4,value:'ALT'},
        ];
    

        return <View style={{
            // backgroundColor:"white",
            marginBottom:10,
            borderRadius:10,
            flexDirection:"row",
            justifyContent:"space-evenly"
        }} >

            { WEd.map( (linkit,index) => {
                return <TouchableOpacity key={index} onPress={() => {
                    setViewToShow(linkit.key);
                    
                    const findIt = CryptoShat.find( element => element.crypto_name == linkit.value || element.crypto_symbol == linkit.value )

                    if ( findIt ) {
                        
                        setEstimatedValue({
                            ...findIt,
                            estimatedvalue:0
                        })

                    }

                }} style={{
                            padding:15,
                        }} >
                            <Text style={{
                                color:ViewToShow === linkit.key ? "black" : "gray",
                                fontFamily:fonts.ManropeBold,
                                textAlign:"center",
                                fontSize:12,
                            }} >{linkit.value}</Text>
                        </TouchableOpacity>
            } ) }

        </View>

    }


    const SelectCard = (e) => {

        setCountries([])
        setcardTypes([])
        let CardCOuntries = []
        let CardThypes = []
        const Brand = AllGiftcard.find( (bran) => bran._id == e )

        const { giftcards, Gbrand_image, ...others } = Brand

        setcurrentBrand(others)

        for (let d = 0; d < Brand.giftcards.length; d++) {
            const element = Brand.giftcards[d];
            
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
        

    }

    const SubmitCard = () => {

        setisLoading(true)

        if ( !currentBrand ) {
            setisLoading(false)
            return
        }

        if ( !currentBrand.selected_cardtype || Giftamount == '' ) {
            setisLoading(false)
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'WARNING',
                textBody: "Please fill all fields",
            })
            return
        }

        // console.log(currentBrand)

        if (currentBrand.selected_country) {
            var datatosend = {
                Giftcard_brand:currentBrand._id,
                Giftcard_type: currentBrand.selected_cardtype,
                Giftcard_amount: Giftamount,
                Giftcard_country: currentBrand.selected_country
            }
        }else{
            datatosend = {
                Giftcard_brand:currentBrand._id,
                Giftcard_type: currentBrand.selected_cardtype,
                Giftcard_amount: Giftamount,
            }
        }


        Axios.post('gift_order/tease_giftOrder',datatosend)
            .then( (response) => {
                setisLoading(false)
                setResult(response.data)
                setModalVisible(true)
            } )
            .catch( (e) => {
                setisLoading(false)
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'WARNING',
                    textBody: e.response.data.error_message,
                })
            } )

    }

    const GiftCardSide = () => {

        return <View>

                    <SelectList setSelected={ (e)=>{SelectCard(e)} } inputStyles={{
                        fontFamily:fonts.ManropeRegular,
                        fontSize:14,
                        color:"gray",
                    }} placeholder={ currentBrand ? currentBrand.Gbrand_name : "Select Card Brand" } search={false} boxStyles={{
                        borderColor:colors.lightBlue,
                        width:"100%"
                    }} data={AllGiftcard} onSelect={()=>{console.log("working")}} />

                    <SelectList setSelected={(e)=>{ setcurrentBrand({
                        ...currentBrand,
                        selected_country:e
                    }) } } inputStyles={{
                        fontFamily:fonts.ManropeRegular,
                        fontSize:14,
                        color:"gray"
                    }} placeholder={ currentBrand ? currentBrand.selected_country ? currentBrand.selected_country : "Select Card Country" : "Select Card Country" } search={false} boxStyles={{
                        borderColor:colors.lightBlue,
                        marginTop:20,
                        width:"100%"
                    }} data={Countries} onSelect={()=>{console.log("working")}} />

                    <SelectList setSelected={(e)=>{ setcurrentBrand({
                        ...currentBrand,
                        selected_cardtype:e
                    }) } } inputStyles={{
                        fontFamily:fonts.ManropeRegular,
                        fontSize:14,
                        color:"gray"
                    }} placeholder={currentBrand ? currentBrand.selected_cardtype ? currentBrand.selected_cardtype : "Select Card Type" : "Select Card Type"} search={false} boxStyles={{
                        borderColor:colors.lightBlue,
                        marginTop:20,
                        width:"100%"
                    }} data={cardTypes} onSelect={()=>{console.log("working")}} />

                    <SelectList setSelected={(e)=>{ setcurrentBrand({
                        ...currentBrand,
                        selected_cardrange:e
                    }) } } inputStyles={{
                        fontFamily:fonts.ManropeRegular,
                        fontSize:14,
                        color:"gray"
                    }} placeholder={currentBrand ? currentBrand.selected_cardrange ? currentBrand.selected_cardrange : "Select Card Range" : "Select Card Range"} search={false} boxStyles={{
                        borderColor:colors.lightBlue,
                        marginTop:20,
                        width:"100%"
                    }} data={Range} onSelect={()=>{console.log("working")}} />

                    <AnotherInput styles={{
                        marginTop:20
                    }} placeholder={"Enter Amount"} 
                        value={Giftamount}
                        onChange={ (e) => setGiftamount(e) }
                    />

                    <View style={{
                        width:"100%",
                        alignItems:"center",
                    }} >
                        <CustomButton
                            title={"Check Rate"}
                            isloading={isLoading}
                            disabled={isLoading}
                            onpress={  
                                () => SubmitCard()
                            }
                        />
                    </View>

                </View>

    }


    const CryptoSide = ({CryptoList}) => {


        if ( !CryptoShat ) {
            getAllCrypto() 
        }

        if ( cryptoLoading ) {
            return <ActivityIndicator size={20} />
        }
        

        else{
            return <View>

                    <SelectList 
                        setSelected={(e)=>{
                            const findIt = CryptoShat.find( element => element._id == e )
                            if ( findIt ) {
                                setEstimatedValue({
                                    ...findIt,
                                    estimatedvalue:0
                                })
                            }
                        } } 
                        inputStyles={{
                        fontFamily:fonts.ManropeRegular,
                        fontSize:14
                    }} placeholder={ EstimatedValue ? EstimatedValue.crypto_name : "Select alt coin" } search={false} boxStyles={{
                        borderColor:colors.lightBlue,
                        marginTop:20,
                        width:"100%"
                    }} data={SelectCrypto} />

                    <AnotherInput 
                        placeholder={`Enter ${EstimatedValue.crypto_name} Amount`} 
                        value={ InputValue }
                        keyboardType={"phone-pad"}
                        onChange={ (e) => {
                            setInputValue(e);
                            
                            var crypto_price = parseInt(EstimatedValue.crypto_init_price_per_one)

                            var cryptoAmount_toTrade = e
                            var dollar_price = parseInt(EstimatedValue.crypto_resell_dollar_price)

                            var price = crypto_price * cryptoAmount_toTrade

                            price = price/1

                            price = price * dollar_price

                            setEstimatedValue({
                                ...EstimatedValue,
                                estimatedvalue: price
                            })

                        } }
                    />

                    <Text style={{
                        marginTop:20,  
                        textAlign:"center",
                        fontSize:14,
                        color:"gray",
                        fontFamily:fonts.ManropeRegular
                    }} > Amount you will recieve </Text>

                    <Text style={{
                        fontSize:30,
                        textAlign:"center",
                        fontFamily:"Rubik-Bold",
                        marginTop:20
                    }} > ₦{EstimatedValue.estimatedvalue} </Text>

                    <Text style={{
                        marginTop:20,
                        textAlign:"center",
                        fontSize:14,
                        color:"gray",
                        fontFamily:fonts.ManropeRegular
                    }} > Note: this is an estimated rate actual rate may differ </Text>

                </View>
        }

    }


    return (

        <Root>

            <ScrollView style={{
                padding:0,
                backgroundColor:"white"
            }} >
            
                <TheRatesHeader
                    styles={{
                        padding:30
                    }}
                    text={"Our Rates"}
                />

                {cryptoLoading ? <></> : <NavigationTop/>}

                <View style={{
                    padding:30
                }} >

                { ViewToShow == 1 ? 
                    
                    GiftLoading ? <ActivityIndicator/> : <GiftCardSide/>
                :

                    cryptoLoading ? <ActivityIndicator/> : <CryptoSide />  

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

                    <View style={styles.centeredView} onpress={ () => setModalVisible(false) } >

                        <View style={styles.modalView}>
                            
                            <Text style={{
                                textAlign:"center",
                                fontFamily:"Rubik-Bold",
                                fontSize:17,
                                marginTop:10,
                                width:"80%",
                                marginBottom:20
                            }} >Rate Calculation</Text>


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
                                        }} > { Result ? currentBrand.Gbrand_name : '' } </Text>
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
                                        }} > { Result ? Result.Giftcard_country : '' } </Text>
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
                                        }} > { Result ? Result.Giftcard_type : '' } </Text>
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
                                        }} >${ Result ? Result.giftcard_value : '' }</Text>
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
                                        }} >{ Result ? Result.Giftcard_price_per_dollar : '' }/$</Text>
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
                                        }} >₦{ Result ? Result.amountToreceive : '' }</Text>
                                    </View>


                                </View>


                            <CustomButton title={"Ok"} onpress={ () => setModalVisible(false) } />

                        </View>

                    </View>

                </Modal>
        
            </ScrollView>

        </Root>

    );
 
} 




const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      marginTop: 22,
      backgroundColor:"rgba(2, 2, 2, 0.59)",
      justifyContent:"center",
      alignItems:"center"
    },
    modalView: {
        padding:30,
        // position:"absolute",
        alignItems:"center",
        backgroundColor:"white",
        width:"90%",
        // height:"80%",
        borderRadius:10
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