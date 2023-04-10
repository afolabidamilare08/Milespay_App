import { Text, View,Alert, Modal,StyleSheet,TouchableOpacity,ScrollView, ImageBackground, Dimensions, ActivityIndicator } from "react-native";
import {SelectList} from 'react-native-dropdown-select-list';
import { AnotherInput, CustomButton, CustomButton20 } from "../components/inputsButtonsComponents";
import { TheRatesHeader, ViewDefault } from "../components/layoutComponents";
// import { Ionicons,AntDesign,MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import DImag from "../assets/images/dax.jpg";
import colors from "../config/colors";
import fonts from "../config/fonts";
import Axios from 'axios';
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';



export const NotificationsPage = ({navigation}) => {

   
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
                    text={"Notifications"}
                />


                    <Text style={{
                        justifyContent:"center",
                        width:"100%",
                        // borderColor:"red",
                        // borderWidth:1,
                        alignSelf:"center",
                        textAlign:"center"
                    }} >
                        No Notifications
                    </Text>
                
        
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