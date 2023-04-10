import { Dimensions, ImageBackground, ScrollView, Text, View } from "react-native";
import { CustomButton, CustomInput, WellInput } from "../../components/inputsButtonsComponents";
import BGIMG from "../../assets/images/dax.jpg";
import { SimpleHeader } from "../../components/layoutComponents";
import fonts from "../../config/fonts";
import { useState } from "react";
import Axios from "axios";
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';


export const ChangePassowrdScreen = ({navigation}) => {

    const [ old_password, setold_password ] = useState('')
    const [ new_password, setnew_password ] = useState('')
    const [ isLoading, setisLoading ] = useState(false)
    const [ error, seterror ] = useState(false)


    const Data = [
        {text:"At least 8 characters"},
        {text:"Special character [e.g @ ?-Z]"},
        {text:"Uppercase letter [A-Z]"},
        {text:"Lowercase letter [A-Z]"},
        {text:"Number [0-9]"},
    ]

    const HandlePasswordReset = () => {

        setisLoading(true)

        const datatosend = {
            old_password:old_password.replace(' ',''),
            new_password:new_password.replace(' ','')
        }

        Axios.put('auth/reset_password',datatosend)
            .then( (response) => {
                setisLoading(false)
                seterror(false)
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: "Your password was reset successfully",
                })
            } )
            .catch( (e) => {
                seterror(e.response.data)
                setisLoading(false)
                if ( e.response.data.error_message.includes("Server") ) {
                    Toast.show({
                        type: ALERT_TYPE.WARNING,
                        title: 'WARNING',
                        textBody: "Something wrong please try again",
                    })
                }
            } )

    }

    return (

        <Root>

            <ScrollView style={{
                backgroundColor:"white",
            }} >
                
                <ImageBackground source={BGIMG} style={{
                    padding:30,
                    minHeight: Dimensions.get('window').height
                }} >

                    <SimpleHeader
                        text={"Change Password"}
                        action={ () => navigation.goBack() }
                    />

                    <Text style={{
                        marginTop:70,
                        fontSize:14,
                        marginBottom:10,
                        textAlign:"center",
                        fontFamily:fonts.ManropeRegular
                    }} >Enter your old Password and your Preferred new password</Text>

                    <WellInput 
                        title={"Old Password"} 
                        value={old_password}
                        onChange={ (e) => setold_password(e) }
                        error={ error ? 
                                                
                            error.error_message.includes("old password") ? error.error_message :
                            false
                            : false }
                    />
                    <WellInput 
                        title={"New Password"} 
                        value={new_password}
                        onChange={ (e) => setnew_password(e) }
                        error={ error ? 
                                                
                            error.error_message.includes("new password") ? error.error_message :
                            false
                            : false }
                    />

                    { Data.map( (txt) => {

                        return <View key={txt.text} style={{
                            flexDirection:"row",
                            alignItems:"center",
                            marginTop:20
                        }} >
            
                            <View style={{
                                width:10,
                                height:10,
                                backgroundColor:"#F6F9FF",
                                borderRadius:10,
                                marginRight:10
                            }} >
            
                            </View>
            
                            <Text style={{
                                fontFamily:fonts.ManropeRegular,
                                fontSize:12
            
                            }} >{txt.text} </Text>
            
                        </View>

                    } ) }

                    <View style={{
                        justifyContent:"center",
                        alignItems:"center",
                        marginTop:50,
                        // paddingBottom:160
                    }} > 
                        <CustomButton isloading={isLoading} onpress={ () => HandlePasswordReset() } title={"Save"} />
                    </View>

                </ImageBackground>

            </ScrollView>

        </Root>

    );

}