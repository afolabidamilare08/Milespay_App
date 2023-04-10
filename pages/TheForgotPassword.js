import { Dimensions, ImageBackground, ScrollView, Text, TextInput, View } from "react-native";
import {Feather,AntDesign} from '@expo/vector-icons'; 
import { CustomButton } from "../components/inputsButtonsComponents";
import colors from "../config/colors";
import fonts from "../config/fonts";
import BGIMG from "../assets/images/well.jpg";
import { useState } from "react";
import Axios from "axios";
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';



export const TheForgotPasswordSha = ({navigation}) => {


    const [ email_address, setemail_address ] = useState('')
    const [ error, seterror ] = useState(false)
    const [ loading, setloading ] = useState(false)

    const HandleSubmit = () => {

        setloading(true)

        if ( email_address == '' ) {
            setloading(false)
            return 
        }

        Axios.post('auth/forgot_pass_email', {email:email_address})
            .then( (response) => {

                setloading(false)
                navigation.navigate("ForgotPassword2",{email:email_address.replace(' ','')})

            } ) 
            .catch( e => {
                setloading(false)
                seterror(e.response.data)
                if ( e.response.data.error_message.includes("Server") ) {
                    Toast.show({
                        type: ALERT_TYPE.WARNING,
                        title: 'WARNING',
                        textBody: "Something wrong please try again",
                    })
                }
            } )

    }

    return(
        
        <Root>
            <ScrollView style={{
                backgroundColor:"white"
            }} >

                <ImageBackground source={BGIMG} style={{
                    padding:30,
                    paddingBottom:110
                }} >

                    <AntDesign name="arrowleft" size={25} style={{
                        marginTop:20
                    }} color="white" onPress={ () => navigation.goBack() } />

                    <Text style={{
                        marginTop:30,
                        fontSize:24,
                        fontFamily:fonts.ManropeSemiBold,
                        color:"white"
                    }} >Did you forget your 
                    Password</Text>
                    <Text style={{
                        marginTop:10,
                        fontSize:15,
                        color:"white",
                        fontFamily:fonts.ManropeRegular
                    }} >Don’t worry, we will get it soughted out in no time</Text>
                
                </ImageBackground>
                
                <View style={{
                    padding:30
                }} >
                    <Text style={{
                            marginBottom:20,
                            fontSize:15,
                            color:"black",
                            fontFamily:fonts.ManropeRegular
                        }} >Enter Your Email Address</Text>

                    <TextInput style={{
                        borderColor:colors.lightBlue,
                        borderWidth:1,
                        padding:10,
                        borderRadius:10,
                        fontSize:14,
                        fontFamily:fonts.ManropeRegular
                    }} placeholder={"Enter Email Address"} keyboardType={'email-address'} value={email_address} onChangeText={ (e) => setemail_address(e) } />

                    { error ?
                    <Text style={{
                        fontFamily:fonts.ManropeRegular,
                        marginTop:5,
                        marginLeft:5,
                        color:"tomato"
                    }} > {error.error_message} </Text> 
                    : <></> }  

                    <View style={{
                        alignItems:"center",
                        width:"100%",
                        marginTop:70
                    }} >
                        <CustomButton
                            title={"Continue"}
                            onpress={ () => HandleSubmit() }
                            isloading={ loading }
                            disabled={ loading }
                        />
                    </View>
                </View>

            </ScrollView>
        </Root>
    );

}




const Inputit = ({placeholder}) => {
        
    return <TextInput style={{
        borderColor:"red",
        borderBottomColor:"black",
        borderBottomWidth:3,
        width:"15%",
        fontSize:30,
        textAlign:"center"
    }} placeholder={placeholder} />

}