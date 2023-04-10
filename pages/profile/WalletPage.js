import { useContext, useEffect, useState } from "react";
import { Dimensions, ImageBackground, ScrollView, Text, TextInput, View, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { AnotherInput, CustomButton, CustomButton20, CustomInput } from "../../components/inputsButtonsComponents";
import { SimpleHeader, ViewDefault } from "../../components/layoutComponents";
import DImag from "../../assets/images/dax.jpg";
import fonts from "../../config/fonts";
import { AntDesign,Ionicons,Feather } from '@expo/vector-icons';
import colors from "../../config/colors";
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';
import Axios  from "axios";
import AppContext from "../../context/Appcontext";
import DashB from '../../assets/images/grtt.png';
import {SelectList} from 'react-native-dropdown-select-list';
import { ModalSection } from "../../components/modal";




export const WalletPage = ({navigation,route}) => {


    const [ OpenTransactionPin, setOpenTransactionPin ] = useState(false)

    const { UserBasicDetails, UpdateUserBasicDetails } = useContext(AppContext)

    const [ isLoading, setisLoading ] = useState(false)
    const [ Mybanks, setMybanks ] = useState([])

    const [ selectedBank, setselectedBank ] = useState(false)
    const [AmountTowithdraw, setAmountTowithdraw]  = useState('')

    const [ TransactionPin, setTransactionPin ] = useState('')
    const [ pinLoading, setpinLoading ] = useState(false)
    const [ pinError, setpinError ] = useState(null)


    useEffect( () => {

        setisLoading(true)

        Axios.get('banks/my_banks')
            .then( (response) => {
                // setMybanks(response.data)
                setisLoading(false)
                let Thebanks = []
                for (let k = 0; k < response.data.length; k++) {
                    const element = {...response.data[k],value:`${response.data[k].bank_name}: ${response.data[k].account_number}`};
                    Thebanks.push(element)
                }
                setMybanks(Thebanks)
            } )
            .catch( (e) => {
                setisLoading(false)
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Something went wrong',
                    textBody: 'Someting went wrong while geting your banks',
                  })
            } )

    }, [] )


    const SubmitWithrawal = () => {

        if ( !selectedBank || AmountTowithdraw === '' ) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error',
                textBody: 'All fileds should be filled',
              })
              return
        }


        if ( AmountTowithdraw > UserBasicDetails.wallet_balance ) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error',
                textBody: 'Insufficient Balance',
              })
              return
        }

        if ( AmountTowithdraw < 1000 ) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Error',
                textBody: `You can't withdraw less than ₦1,000`,
              })
              return
        }

        setisLoading(true)

        Axios.put('auth/wallet_withdrawal',{
            withdrawal_amount:AmountTowithdraw,
            account_number:selectedBank.account_number
        })
            .then( (response) => {
                setisLoading(false)
                UpdateUserBasicDetails(response.data)
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: 'Withdrawal was successful',
                  })
                // setselectedBank(null)
                setAmountTowithdraw('')
            } )
            .catch( (e) => {
                setisLoading(false)
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Something went wrong',
                    textBody: 'Someting went wrong ',
                  })
            } )

    }


    const CheckPin = () => {

        setpinError(null)

        if ( TransactionPin === '' ) {
            return
        }

        setpinLoading(true)

        Axios.post('/auth/confirm_transaction_pin',{pin:TransactionPin})
            .then( (response) => {

                setOpenTransactionPin(false)
                setpinLoading(false)
                SubmitWithrawal()
                setTransactionPin("")

            } )
            .catch( (err) => {

                setpinLoading(false)
                if ( err.response ) {
                   setpinError(err.response.data.error_message) 
                }else{
                    setpinError("Something went wrong")
                }

            } )
        
    }


    return (

        <Root>

            <ScrollView style={{
                backgroundColor:"white"
            }} >
                
                <ImageBackground source={DashB} resizeMode={"stretch"} style={{
                    padding:30,
                    minHeight:Dimensions.get('window').height*0.4
                }} >

                <SimpleHeader
                    text={"Wallet"}
                    action={ () => navigation.goBack() }
                />

                            <Text style={{
                                color:"rgba(255, 255, 255, 0.78)",
                                fontFamily:fonts.ManropeBold,
                                fontSize:20,
                                textAlign:"center"
                            }} > Wallet Balance </Text>

                                <Text style={{
                                    marginTop:7,
                                    fontSize:30,
                                    color:"white",
                                    textAlign:"center",
                                    fontFamily:fonts.QuickBold
                                }}> ₦ { UserBasicDetails ? UserBasicDetails.wallet_balance : "" } </Text>


                </ImageBackground>

                {/* <View style={{
                    height:50,
                    width:"90%",
                    alignSelf:"center",
                    marginTop:-35,
                    backgroundColor:"white",
                    borderRadius:8
                }} >

                </View> */}

                <View style={{
                    padding:30
                }} >

                    <AnotherInput 
                        placeholder={"Enter Amount to withdraw"}
                        value={AmountTowithdraw}
                        onChange={ (e) => setAmountTowithdraw(e) }
                        keyboardType="number-pad"
                     />

                    <SelectList setSelected={(e) => {
                        const PickedBank = Mybanks.find( (ele) => e.includes(ele.account_number) )
                        setselectedBank(PickedBank)
                    } } inputStyles={{
                        fontFamily:fonts.ManropeRegular,
                        fontSize:14
                    }} placeholder="Select Bank" search={false} boxStyles={{
                        borderColor:colors.lightBlue,
                        marginTop:20,
                        width:"100%"
                    }} data={Mybanks} />

                    <TouchableOpacity onPress={ () => navigation.navigate('add_bank_account') } style={{
                        marginTop:10,
                        marginLeft:10
                    }} >
                        <Text style={{
                            color:"gray"
                        }} > Add new bank account </Text>
                    </TouchableOpacity>

                    <View style={{
                            width:"100%",
                            alignItems:"center",
                        }} >
                            <CustomButton
                                title={"Withdraw"}
                                isloading={ isLoading }
                                disabled={ isLoading }
                                onpress={ () => {

                                    if ( AmountTowithdraw == '' || !selectedBank ) {
                                        return
                                    }else{
                                        setOpenTransactionPin(true)
                                    }

                                } }
                            />
                    </View>

                </View>

            </ScrollView>

            <ModalSection
                closeModal={ () => setOpenTransactionPin(false) }
                modalVisible={OpenTransactionPin}
                
                content={ <>
                
                    <Text style={{
                        textAlign:"center",
                        fontFamily:fonts.QuickBold,
                        fontSize:17
                    }} >Enter Pin</Text>

                   { pinError ?  <Text style={{
                        textAlign:"center",
                        fontFamily:fonts.QuickRegular,
                        fontSize:15,
                        marginTop:10,
                        marginBottom:10,
                        color:"tomato"
                    }} >
                        {pinError}
                    </Text>

                    : <></> }

                        <TextInput style={{
                            borderBottomColor:"gray",
                            borderBottomWidth:1,
                            width:"50%",
                            padding:9,
                            textAlign:"center",
                            alignSelf:"center",
                            letterSpacing:20,
                            fontWeight:"800",
                            fontSize:18,
                        }} placeholder="****" keyboardType="phone-pad" value={TransactionPin} onChangeText={ (e) => setTransactionPin(e) } maxLength={4} />                    

                        <CustomButton
                            title={"Submit"}
                            isloading={ pinLoading }
                            disabled={ pinLoading }
                            onpress={ () => CheckPin() }
                        />

                </> }

            />

        </Root>

    );

}