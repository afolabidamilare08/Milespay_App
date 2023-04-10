import { ImageBackground, ScrollView, Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { CustomButton } from "../components/inputsButtonsComponents";
import colors from "../config/colors";
import BGIMG from "../assets/images/well.jpg";
import fonts from "../config/fonts";
import { useRef, useState } from "react";
import Axios from "axios";
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';





export const EnterCodeResetPassword = ({ navigation, route }) => {


    const [isLoading, setisLoading] = useState(false)
    const [error, seterror] = useState(false)
    const [Countdown, setCountdown] = useState(600000)

    const pin1Ref = useRef(null)
    const pin2Ref = useRef(null)
    const pin3Ref = useRef(null)
    const pin4Ref = useRef(null)

    const [pin1, setPin1] = useState(null)
    const [pin2, setPin2] = useState(null)
    const [pin3, setPin3] = useState(null)
    const [pin4, setPin4] = useState(null)

    const [ ThePin, setThePin ] = useState('')



    const HandlePinSubmit = () => {

        setisLoading(true)

        if (ThePin === '' ) {
            setisLoading(false)
            return
        }

        const dataTosend = {
            email: route.params.email,
            otp: ThePin
        }

        Axios.put('auth/verify_forgotpass', dataTosend)
            .then((response) => {
                setisLoading(false)
                seterror(false)
                navigation.navigate("changePasswordPage",{email:route.params.email})
            })
            .catch(e => {
                setisLoading(false)
                seterror(e.response.data)
                if (e.response.data.error_message.includes("Server")) {
                    Toast.show({
                        type: ALERT_TYPE.WARNING,
                        title: 'WARNING',
                        textBody: "Something wrong please try again",
                    })
                } else {
                    Toast.show({
                        type: ALERT_TYPE.WARNING,
                        title: 'WARNING',
                        textBody: e.response.data.error_message,
                    })
                }
            })

    }


    const resetCodeHandler = () => {

        setisLoading(true)

        Axios.post('auth/forgot_pass_email', {email:route.params.email})
        .then( (response) => {

            setCountdown(600000),
            setisLoading(false)

        } ) 
        .catch( e => {
            setisLoading(false)
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


    setTimeout(() => {

        if (Countdown < 1000) {
            // return 
        } else {
            setCountdown(Countdown - 1000)
        }

    }, 1000);

    const minn = Math.floor(Countdown / 60000) % 60;
    const secc = Math.floor(Countdown / 1000) % 60;

    return (

        <Root>
            <ScrollView style={{
                backgroundColor: "white"
            }} >

                <ImageBackground source={BGIMG} style={{
                    padding: 30,
                    paddingBottom: 130
                }} >

                    <AntDesign name="arrowleft" color={"white"} size={25} style={{
                        marginTop: 20
                    }} onPress={() => navigation.goBack()} />

                    <Text style={{
                        marginTop: 30,
                        fontSize: 24,
                        fontFamily: fonts.ManropeSemiBold,
                        color: "white"
                    }} >We just sent you a
                        recovery code</Text>
                    <Text style={{
                        marginTop: 10,
                        fontSize: 15,
                        color: "white",
                        fontFamily: fonts.ManropeRegular
                    }} >Enter the 4 digit code sent to <Text style={{
                        fontFamily: fonts.ManropeRegular,
                        color: colors.lightBlue
                    }} > {route.params.email}  </Text></Text>

                </ImageBackground>

                <View style={{
                    padding: 30
                }} >

                    <View style={{
                        marginTop: 80,
                        flexDirection: "row",
                        justifyContent: "space-evenly"
                    }} >

                            <TextInput
                                style={{
                                    borderBottomColor:"gray",
                                    borderBottomWidth:1,
                                    width:"50%",
                                    padding:9,
                                    textAlign:"center",
                                    alignSelf:"center",
                                    letterSpacing:20,
                                    fontWeight:"800",
                                    fontSize:18,
                                }} placeholder="****" keyboardType="phone-pad" value={ThePin} onChangeText={ (e) => setThePin(e) } maxLength={4} 
                            />

                    </View>


                        { Countdown < 1000 ?
                        
                        <TouchableOpacity onPress={ () => resetCodeHandler() } style={{
                            marginTop: 140,
                            alignItems: "center",
                        }} >  
                            <Text style={{
                            fontFamily: "Rubik-Bold",
                            color: colors.lightBlue
                            }} >Resend Code</Text> 
                        </TouchableOpacity>
                    
                        : 
                        
                            <Text style={{
                                marginTop: 140,
                                textAlign: "center",
                                fontSize: 14,
                            }} > Resend Code in <Text style={{
                                fontFamily: "Rubik-Bold",
                                color: colors.lightBlue
                            }} > {minn}:{secc}s</Text> </Text>

                        }


                    <View style={{
                        alignItems: "center",
                        width: "100%",
                    }} >
                        <CustomButton
                            isloading={isLoading}
                            disabled={isLoading}
                            title={"Reset password"}
                            onpress={
                                () => HandlePinSubmit()
                            }
                        />
                    </View>

                </View>

            </ScrollView>
        </Root>
    );

}


const styles = StyleSheet.create({
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
});