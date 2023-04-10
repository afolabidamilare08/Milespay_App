import { Image, Alert, Modal, StyleSheet, Text, ScrollView, View, ImageBackground, Dimensions } from "react-native";
import {SelectList} from 'react-native-dropdown-select-list';
import React, { useContext, useEffect, useState } from "react";
import { SimpleHeader, ViewDefault } from "../../components/layoutComponents";
import BGIMG from "../../assets/images/dax.jpg";
import BAnkImagesha from '../../assets/images/BankImage.png';
import { AnotherInput, CustomButton, CustomButton20 } from "../../components/inputsButtonsComponents";
import colors from "../../config/colors";
import fonts from "../../config/fonts";
import Axios from 'axios';
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';
import AppContext from "../../context/Appcontext";


export const AddBAnkAccount = ({navigation}) => {


    const [modalVisible, setModalVisible] = useState(false);
    const [Banks,setBanks] = useState([])
    const [refresh,setrefresh] = useState(true)
    const [ isLoading, setisLoading ] = useState(false)
    const [ SelectedBank, setSelectedBank ] = useState(null)
    const [ AccountNumber, setAccountNumber ] = useState('')
    const [ error, seterror ] = useState(false)
    const [ VerifiedBankDetails, setVerifiedBankDetails ] = useState(null)
    const { UserBasicDetails ,UpdateUserBasicDetails } = useContext(AppContext)

    const service = Axios.create({
        baseURL: 'https://api.paystack.co',
    })

    service.defaults.headers.common['token'] = 'Bearer ' + 'sk_live_e37acb4d5159d4b8474d9bb8ad72f5a625ff05de'

    useEffect( () => {

        setisLoading(true)

        service({
            method:"get",
            url:"/bank",
        }).then( (response) => {
            let newArray = response.data.data.map((item) => {
                return {key: item.code, value: item.name }
              })
            setBanks(newArray)
            setisLoading(false)
        } )
        .catch( err => {
            console.log(err)
            setisLoading(false)
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Something went wrong',
                textBody: "Something went wrong",
              })
        } )

    }, [refresh] )


    const HandleCHeckAccountNumber = () => {

        const paystack = Axios.create({
            baseURL: 'https://api.paystack.co',
            headers:{
                Authorization: 'Bearer sk_live_e37acb4d5159d4b8474d9bb8ad72f5a625ff05de'
            }
        })
    
        paystack.defaults.headers.common['token'] = 'Bearer ' + 'sk_live_e37acb4d5159d4b8474d9bb8ad72f5a625ff05de'
    

        setisLoading(true)

        if( AccountNumber.length !== 10 ){
            seterror({
                error_message:"Your Account number shuld be 10 digit"
            })
            setisLoading(false)
            return
        }

        if ( !SelectedBank ) {
            seterror({
                error_message:"Please select a bank"
            })
            setisLoading(false)
            return
        }


        paystack({
            method:"get",
            url:`/bank/resolve?account_number=${AccountNumber}&bank_code=${SelectedBank}`,
        }).then( (response) => {
            setisLoading(false)
            setVerifiedBankDetails(response.data.data)
            // console.log(response.data.data)
            seterror(false)
            setisLoading(false)
        } )
        .catch( err => {
            setisLoading(false)
            setVerifiedBankDetails(false)
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Something went wrong',
                textBody: err.response.data.message.includes("Could not resolve account name") ? "Invalid Account Number" : "Something went wrong" ,
              })
        } )

    }


    const AddBankAccountToBackEnd = () => {

        setisLoading(true)

        if ( !VerifiedBankDetails ) {
            setisLoading(false)
            return
        }

        const BankName = Banks.find( (obj) => obj.key === SelectedBank )

        const datatosend = {
            account_number:AccountNumber,
            account_name:VerifiedBankDetails.account_name,
            bank_name:BankName.value,
            bank_id:SelectedBank
        }

        Axios.post( 'banks/add_bank', datatosend )
            .then( (response) => {
                setisLoading(false)
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: "Your bank details was successfully added" ,
                  })
                  console.log(response.data)
                  UpdateUserBasicDetails({
                        ...UserBasicDetails,
                        my_banks:[
                            ...UserBasicDetails.my_banks,
                            response.data
                        ]
                  })
            } )
            .catch( (err) => {
                setisLoading(false)
                Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Something went wrong',
                    textBody: err.response.data.error_message,
                  })
            } )

    }


    return (

        <Root>

            <ScrollView style={{
                backgroundColor:"white"
            }} >
                    
                    <ImageBackground source={BGIMG} style={{
                        padding:30,
                        minHeight: Dimensions.get('window').height
                    }} >

                    <SimpleHeader
                        text={"Add Account"}
                        action={ () => navigation.goBack() }
                    />

                    <View style={{
                        alignItems:"center"
                    }} >
                        <Image source={BAnkImagesha} style={{
                            marginTop:65,
                        }} />
                    </View>

                    <Text style={{
                        fontSize:18,
                        fontFamily:fonts.ManropeSemiBold,
                        marginTop:24,
                        textAlign:"center"
                    }} > Add a bank account </Text>

                    <Text style={{
                        textAlign:"center",
                        marginTop:10,
                        fontFamily:fonts.ManropeRegular,
                        color:"#686869",
                        fontSize:12,
                        marginBottom:40
                    }} > Please add your Nigerian Bank Account to recieve funds from your transactions  </Text>

                    <SelectList setSelected={ (e) => setSelectedBank(e) } inputStyles={{
                        fontFamily:fonts.ManropeSemiBold,
                        fontSize:14
                    }} placeholder="Select bank" search={true} boxStyles={{
                        borderColor: error ? error.error_message.includes("bank") ? "tomato" :
                        colors.lightBlue : colors.lightBlue ,
                        width:"100%"
                    }} data={ Banks }  onSelect={()=>{console.log("working")}} />

                    { error ?
                            
                            error.error_message.includes('bank') ? 
                            
                            <Text style={{
                                fontFamily:fonts.ManropeRegular,
                                marginTop:5,
                                marginLeft:5,
                                color:"tomato"
                            }} > {error.error_message} </Text> 
                            
                            : <></>

                    : <></> } 

                    <AnotherInput styles={{
                        borderColor:colors.lightBlue
                        }} 
                        placeholder={"Account Number"}
                        value={AccountNumber}
                        keyboardType={"phone-pad"}
                        onChange={ e => setAccountNumber(e) }
                        error={ error ? 
                                            
                            error.error_message.includes("Account number") ? error.error_message :
                            false
                            : false }
                    />

                    { VerifiedBankDetails ?
                    
                        <View style={{
                            backgroundColor:colors.lightBlue,
                            marginTop:20,
                            borderRadius:5,
                            padding:10
                        }} >
                            
                            <Text style={{
                                fontFamily:fonts.ManropeSemiBold
                            }} > Account Name </Text>
                            <Text style={{
                                fontFamily:fonts.ManropeRegular
                            }} > {VerifiedBankDetails.account_name} </Text>

                        </View>
                    
                    : <></> }

                    <View style={{
                        alignItems:"center"
                    }} >
                        <CustomButton isloading={isLoading} title={"Verify Bank Account"} onpress={ () => HandleCHeckAccountNumber() } />
                    </View>

                    { VerifiedBankDetails ?
                    
                    <View style={{
                        alignItems:"center"
                    }} >
                        <CustomButton isloading={isLoading} title={"Add Bank Account"} onpress={ () => AddBankAccountToBackEnd() } />
                    </View>

                    : <></> }

                    </ImageBackground>

            </ScrollView>

        </Root>


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
        alignItems:"center",
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