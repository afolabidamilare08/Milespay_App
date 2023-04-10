import { View, Image, Text, ScrollView,ImageBackground, Dimensions } from "react-native";
import { CustomButton, CustomInput, PasswordInput } from "../components/inputsButtonsComponents";
import colors from "../config/colors";
import fonts from "../config/fonts";
import Side from '../assets/images/Login.jpg';
import Logo from '../assets/images/MainLogo.png';
import { useState } from "react";
import Axios from 'axios';
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';


export const RegisterPage = ({navigation}) => {

    const [ full_name, setfull_name ] = useState('')
    const [ email, setemail ] = useState('')
    const [ phone_number, setphone_number ] = useState('')
    const [ password, setpassword ] = useState('')
    const [ confirm_password, setconfirm_password ] = useState('')
    const [ isloading, setisloading ] = useState(false)
    const [ error, seterror ] = useState(false)


    const SubmitRegisterHandler =  () => {

        setisloading(true)

        if ( confirm_password !== password ) {
            seterror({
                error_message: "Password and Confirm password has to be the same",
                special_message: null})
                setisloading(false)
            return    
        }

        const datatosend = {
            full_name:full_name,
            email:email.replace(" ",""),
            phone_number:phone_number.replace(" ",""),
            password:password.replace(" ",""),
            // confirm_password:confirm_password.replace(" ",""),
        }


        Axios.post('auth/register',datatosend)
            .then( (response) => {
                // Dialog.show({
                //     type: ALERT_TYPE.SUCCESS,
                //     title: 'Registration Successfull',
                //     textBody: 'You will be redirected to the login page',
                //     button: 'Veify',
                //     onPressButton: () => {
                //       navigation.navigate('LoginPage')
                //     }
                //   })
                console.log(response.data)
                  Axios.post('auth/send_user_otp', {email:response.data.email,user_id:response.data._id} )
                        .then( (response) => {
                            setisloading(false)
                            navigation.navigate('VerifyOtpCodePage',{email:response.data.email,user_id:response.data.user_id})
                        } )
                        .catch( (e) => {
                            setisloading(false)
                            console.log(e.response.data)
                            Toast.show({
                                type: ALERT_TYPE.WARNING,
                                title: 'WARNING',
                                textBody: e.response.data.error_message,
                            })      
                    } )
                setisloading(false)
            } )
            .catch( (e) => {
                seterror( e.response.data )
                setisloading(false)
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

                    <ImageBackground source={Side} resizeMode="stretch"  style={{
                        minHeight: Dimensions.get('window').height ,
                        justifyContent:"center",
                        paddingTop:200,
                    }} >

                            <View style={{
                                // marginTop:30,
                                padding:30,
                                paddingBottom:0,
                                flexDirection:"row",
                                alignItems:"center"
                            }} >
                                <Image source={Logo} style={{
                                    width:35,
                                    height:35,
                                }} />
                                <Text style={{fontSize:16,marginLeft:8,fontFamily:fonts.ManropeSemiBold}} >MilesPay</Text>
                            </View>

                            <View style={{
                                padding:10,
                                paddingLeft:30
                            }} >
                                    <Text style={{
                                        width:"100%",
                                        fontSize:20,
                                        fontFamily:fonts.Bold,
                                        textAlign:"left"
                                    }} >Let’s get you Started </Text>
                                    <Text style={{
                                        width:"100%",
                                        fontSize:13,
                                        marginTop:4,
                                        fontFamily:fonts.Regular,
                                        textAlign:"left",
                                    }}>Fill in the form below, correctly</Text>
                            </View>

                            <View style={{
                                padding:30,
                                paddingTop:0
                            }} > 

                                <CustomInput
                                    title={"Full Name"}
                                    placeholder="Afolabi Damilare"
                                    value={full_name}
                                    onChange={ e => setfull_name(e) }
                                    error={ error ? 
                                        
                                        error.error_message.includes("full name") ? error.error_message :
                                        false
                                        : false }
                                />

                                <CustomInput
                                    title={"Email Address"}
                                    placeholder="E.g afolabidamilare08@gmail.com"
                                    value={email}
                                    onChange={ e => setemail(e) }
                                    error={ error ? 
                                        
                                        error.error_message.includes("email") ? error.error_message :
                                        false
                                        : false }
                                />

                                <CustomInput
                                    title={"Phone Number"}
                                    placeholder="090355563898"
                                    value={phone_number}
                                    onChange={ e => setphone_number(e) }
                                    error={ error ? 
                                        
                                        error.error_message.includes("phone number") ? error.error_message :
                                        false
                                        : false }
                                />

                                <PasswordInput
                                    title={"Password"}
                                    value={password}
                                    onChange={ e => setpassword(e) }
                                    error={ error ? 
                                        
                                        error.error_message.includes("password") ? error.error_message :
                                        false
                                        : false }
                                />

                                <PasswordInput
                                    title={"Confirm Password"}
                                    value={confirm_password}
                                    onChange={ e => setconfirm_password(e) }
                                    error={ error ? 
                                        
                                        error.error_message.includes("Confirm password") ? error.error_message :
                                        false
                                        : false }
                                />


                                <View style={{
                                    alignItems:"center"
                                }} >
                                    <CustomButton
                                        title={"Sign Up"}
                                        isloading={isloading}
                                        onpress={ () => SubmitRegisterHandler() }
                                    />
                                </View>

                                <Text style={{
                                    fontSize:13,
                                    marginTop:20,
                                    width:"100%",
                                    textAlign:"center",
                                    fontFamily:fonts.ManropeRegular
                                }} > Have an account?
                                    <Text style={{
                                        color:colors.lightBlue,
                                        fontFamily:fonts.ManropeBold
                                    }} onPress={ () => navigation.navigate("LoginPage") } > Sign In</Text>
                                </Text>                            

                            </View>

                    </ImageBackground>

            </ScrollView>
        </Root>
    );

}