import { Text, TouchableOpacity, View, Alert, Modal, StyleSheet, ScrollView, ImageBackground, Dimensions, ActivityIndicator } from "react-native"
import { SimpleHeader, ViewDefault } from "../../components/layoutComponents"
import colors from "../../config/colors";
import {SelectList} from 'react-native-dropdown-select-list';
import React, { useContext, useEffect, useState } from "react";
import BGIMG from "../../assets/images/dax.jpg";
import { MaterialCommunityIcons,AntDesign } from '@expo/vector-icons';
import { AnotherInput, CustomButton, CustomButton20 } from "../../components/inputsButtonsComponents";
import fonts from "../../config/fonts";
import Axios from "axios";
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';
import AppContext from "../../context/Appcontext";



export const BankHomePage = ({navigation}) => {


    const [ Mybanks, setMybanks ] = useState([])
    const [ isLoading, setisLoading ] = useState(false)
    const [ error, seterror ] = useState(false)
    // const [refresh,setrefresh] = useState(true)

    const { UserBasicDetails } = useContext(AppContext)

    useEffect( () => {

            if (!UserBasicDetails.my_banks) {
                setisLoading(true)

                Axios.get('banks/my_banks')
                    .then( (response) => {
                        setMybanks(response.data)
                        // console.log(response.data)
                        setisLoading(false)
                    } )
                    .catch( (e) => {
                        seterror(true)
                        // console.log(e.response.data)
                        setisLoading(false)
                        Toast.show({
                            type: ALERT_TYPE.WARNING,
                            title: 'Something went wrong',
                            textBody: 'Someting went wrong while geting your banks',
                          })
                } )
            }else{
                setMybanks([...UserBasicDetails.my_banks])
            }

    }, [UserBasicDetails] )

    const [modalVisible, setModalVisible] = useState(false);


    return (

        <Root>

            <ScrollView style={{
                backgroundColor:"white"
            }} >

                    <ImageBackground source={BGIMG} style={{
                        padding:30,
                        minHeight: Dimensions.get('window').height ,
                    }} >

                        <SimpleHeader
                            text={"Bank"}
                            action={ () => navigation.goBack() }
                        />

                        <Text style={{
                            textAlign:"center",
                            fontSize:14,
                            fontFamily:fonts.ManropeRegular,
                            marginBottom:30,
                            marginTop:50
                        }} > Add or remove bank accounts. you need at least one bank account to receive withdrawals. </Text>


                        { isLoading ?

                            <ActivityIndicator color={colors.primary} size={40} /> 

                        :
                        
                            !error ?
                            <>
                                <View style={{
                                    // backgroundColor:"red",
                                    minHeight:300
                                }} >
        
                                    {Mybanks.map( (bank) => {
                                        return (
        
                                            <TouchableOpacity key={bank.account_number} style={{
                                                justifyContent:"space-between",
                                                flexDirection:"row",
                                                alignItems:"center",
                                                marginTop:30,
                                                borderBottomColor:"lightgray",
                                                borderBottomWidth:1,
                                                paddingBottom:30
                                            }} >
                                
                                                <View style={{
                                                    flexDirection:"row",
                                                    alignItems:"center"
                                                }} >
                                                    <View style={{
                                                        width:35,
                                                        height:35,
                                                        backgroundColor:colors.primary,
                                                        borderRadius:3000,
                                                        justifyContent:"center",
                                                        alignItems:"center",
                                                        marginRight:10
                                                    }} >
                                
                                                        <MaterialCommunityIcons name="bank" size={20} color="white" />
                                
                                                    </View>
                                
                                                    <View>
                                                        <Text style={{
                                                            fontSize:14,
                                                            fontFamily:fonts.ManropeSemiBold,
                                                        }} > {bank.bank_name} </Text>
                                                        <Text style={{
                                                            marginTop:5,
                                                            fontSize:12,
                                                            color:"#080F1D",
                                                            fontFamily:fonts.ManropeRegular
                                                        }} > {bank.account_number} </Text>
                                                    </View>
                                                </View>
                                
                                                <AntDesign name="arrowright" size={20} color="black" />
                                
                                            </TouchableOpacity> 
        
                                        );
                                    } )}
        
                                </View>
        
                                <View style={{
                                    alignItems:"center",
                                    marginTop:40
                                }} >
                                    <TouchableOpacity style={{
                                        backgroundColor:colors.primary,
                                        padding:20,
                                        width:"90%",
                                        borderRadius:10
                                    }} onPress={ () => navigation.navigate("add_bank_account") } >
                                        <Text style={{
                                            textAlign:"center",
                                            color:"white",
                                            fontSize:12,
                                            fontFamily:fonts.ManropeSemiBold
                                        }} >Add new bank account</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                            :
                            <></>
                        }

                        {/* <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                setModalVisible(!modalVisible);
                                }}>

                                <View style={styles.centeredView}>

                                    <View style={styles.modalView}>

                                        <Text style={{
                                            textAlign:"center",
                                            fontFamily:fonts.ManropeSemiBold,
                                            fontSize:16,
                                            marginTop:50,
                                            width:"60%"
                                        }} >Let’s add your bank account</Text>

                                        <Text style={{
                                            width:"90%",
                                            textAlign:"center",
                                            marginTop:14,
                                            fontSize:14,
                                            fontFamily:fonts.ManropeRegular
                                        }} >Before you withdraw you neeed to link a bank account in your name</Text>

                                        <View style={{
                                            borderWidth:1,
                                            borderColor:colors.specialblue,
                                            width:"100%",
                                            marginTop:27,
                                            padding:10,
                                            borderRadius:10
                                        }} >

                                            <Text style={{
                                                fontFamily:fonts.ManropeSemiBold,
                                                fontSize:12,
                                                marginLeft:19
                                            }} > Bank name </Text>

                                            <SelectList setSelected={()=>{console.log("working")} } inputStyles={{
                                                fontFamily:fonts.ManropeRegular,
                                                fontSize:12,
                                            }} placeholder="Select Bank" search={false} boxStyles={{
                                                borderColor:"white",
                                                width:"100%",
                                            }} data={data} onSelect={()=>{console.log("working")}} />

                                        </View>

                                        <AnotherInput placeholder={"Account Number"} styles={{
                                            width:"100%",
                                            padding:22,
                                            paddingLeft:40
                                        }} />

                                        <CustomButton title={"Check Details"} />

                                        <CustomButton20 onpress={() => setModalVisible(!modalVisible)} title={"Close"} />

                                    </View>


                                </View>

                        </Modal> */}

                    </ImageBackground>


            </ScrollView>

        </Root>
        
    );
    
    
    

}
{/* */}


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