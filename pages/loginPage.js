import { View, Image, Text, TouchableOpacity, ScrollView,ImageBackground, Dimensions  } from "react-native";
import FaceId from '../assets/images/iconoir_face-id.png';
import { CustomButton, CustomInput, PasswordInput } from "../components/inputsButtonsComponents";
import colors from "../config/colors";
import Side from '../assets/images/Loginwell.jpg';
import Logo from '../assets/images/MainLogo.png';
import fonts from "../config/fonts";
import { useContext, useState } from "react";
import Axios from "axios";
import AppContext from "../context/Appcontext";
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';


export const LoginPage = ({navigation}) => {

    const [ email, setemail ] = useState('')
    const [ password, setpassword ] = useState('')
    const [ error, seterror ] = useState(false)
    const [isLoading, setisLoading] = useState(false)

    const { LoginHandler } = useContext(AppContext)


    const LoginHandlerFunction = () => {

        setisLoading(true)

        const datatosend = {
            email:email.replace(' ', ''),
            password:password.replace(' ','')
        }

        Axios.post('auth/login',datatosend)
            .then( (response) => {
                const { token, ...others } = response.data
                
                if ( response.data.isVerified ) {
                    LoginHandler( "token", response.data.Token, others )
                }else{
                    Axios.post('auth/send_user_otp', {email:response.data.email,user_id:response.data._id} )
                        .then( (response) => {
                            setisLoading(false)
                            navigation.navigate('VerifyOtpCodePage',{email:response.data.email,user_id:response.data.user_id})
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

            } )
            .catch( (e) => {
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

    return(
        <Root>
            <ScrollView style={{
                backgroundColor:"white"
            }} >
                    <ImageBackground source={Side} resizeMode="stretch" style={{
                        paddingTop:160,
                        minHeight:Dimensions.get('window').height,
                        justifyContent:"center"
                    }} >

                        <View style={{
                            marginTop:30,
                            padding:30,
                            paddingBottom:0,
                            flexDirection:"row",
                            alignItems:"center"
                        }} >
                            <Image source={Logo} style={{
                                width:40,
                                height:40,
                            }} />
                            <Text style={{fontSize:20,marginLeft:8,fontFamily:fonts.Regular}} >MilesPay</Text>
                        </View>

                        <View style={{
                            padding:30,
                            paddingTop:18,
                            paddingBottom:10
                        }} >
                            <Text style={{
                                width:"100%",
                                fontSize:20,
                                fontFamily:fonts.ManropeBold,
                                textAlign:"left"
                            }} >Welcome Back </Text>
                            <Text style={{
                                width:"100%",
                                fontSize:13,
                                marginTop:4,
                                fontFamily:fonts.ManropeRegular,
                                textAlign:"left",
                            }}>Let’s kick off from where you left off</Text>
                        </View>

                        <View style={{
                            padding:30,
                            paddingTop:0
                        }} > 
                            <CustomInput
                                title={"Email Address"}
                                value={ email }
                                error={ error ? 
                                    
                                    error.error_message.includes("email") ? error.error_message :
                                    false
                                    : false }
                                onChange={ (e) => setemail(e) }
                                placeholder="E.g afolabidamilare08@gmail.com"
                            />

                            <PasswordInput
                                title={"Password"}
                                value={ password }
                                error={ error ? 
                                    
                                    error.error_message.includes("password") ? error.error_message :
                                    false
                                    : false }
                                onChange={ (e) => setpassword(e) }
                            />

                            <TouchableOpacity style={{
                                alignSelf:"flex-end",
                                marginTop:6
                            }} onPress={ () => navigation.navigate("ForgotPassword1") } >
                                <Text style={{
                                    fontSize:12,
                                    color:colors.lightBlue
                                }} >Forget Password?</Text>
                            </TouchableOpacity>

                            <CustomButton
                                title={"Login"}
                                isloading={isLoading}
                                styles={{
                                    alignSelf:"center"
                                }}
                                onpress={
                                    // () => navigation.navigate("HomeNavigation")
                                    () => LoginHandlerFunction()
                                }
                            />

                            <Image source={FaceId} style={{
                                marginTop:20,
                                alignSelf:"center"
                            }} />

                            <Text style={{
                                fontSize:13,
                                marginTop:10,
                                paddingBottom:10,
                                alignSelf:"center",
                                fontFamily:fonts.ManropeRegular
                            }} > New User?
                                    <Text style={{
                                        color:colors.lightBlue,
                                        fontFamily:fonts.ManropeBold
                                    }} onPress={ () => navigation.navigate("RegisterPage") } > Sign Up</Text>
                            </Text>

                        </View>

                    </ImageBackground>

            </ScrollView>
        </Root>
    );

}