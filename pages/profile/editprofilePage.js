import { Text, View,Image, ImageBackground } from "react-native"
import { CustomButton, ProfileInput } from "../../components/inputsButtonsComponents";
import { FontAwesome5,MaterialIcons,EvilIcons } from '@expo/vector-icons';
import colors from "../../config/colors";
import BGIMG from "../../assets/images/dax.jpg";
import Profile_true from "../../assets/images/profile.png";
import { SimpleHeader } from "../../components/layoutComponents";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/Appcontext";
import Axios  from "axios";
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';


export const EditProfilePage = ({navigation}) => {

    const { UserBasicDetails, UpdateUserBasicDetails } = useContext(AppContext)

    const [ full_name, setfull_name ] = useState('')
    const [ email, setemail ] = useState('')
    const [ phone_number, setphone_number ] = useState('')

    const [ error, seterror ] = useState(false)
    const [ isLoading, setisLoading ] = useState(false)

    useEffect ( () => {

        if ( UserBasicDetails ) {
            setfull_name(UserBasicDetails.full_name)
            setphone_number(UserBasicDetails.phone_number)
            setemail(UserBasicDetails.email)
        }

    }, [ UserBasicDetails ] )


    const HandleProfileUpdate = () => {

        setisLoading(true)

        const datatosend = {
            full_name:full_name,
            email:email.replace(' ',''),
            phone_number:phone_number.replace(' ',''),
        }

        Axios.put('auth/update',datatosend)
            .then( (response) => {
                setisLoading(false)
                seterror(false)
                UpdateUserBasicDetails(response.data)
                Toast.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: "Your profile was updated successfully",
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

            <View style={{
                    flex:1,
                    backgroundColor:"white"
                }} >

                    <ImageBackground source={BGIMG} style={{
                        minHeight:1200,
                        padding:30,
                        // paddingTop:70,
                    }} >

                    <SimpleHeader
                        text={"My Account"}        
                        action={ () => navigation.goBack() }
                    />

                    <View style={{
                        width:90,
                        height:90,
                        borderRadius:400,
                        alignSelf:"center",
                        // marginTop:-45
                    }} >
                        <Image source={Profile_true} style={{
                            width:"100%",
                            height:"100%",
                            borderRadius:400
                        }} />
                        {/* <EvilIcons name="camera" size={30} color="white" style={{
                            position:"absolute",
                            top:"35%",
                            left:"35%",
                        }} /> */}
                    </View>

                    <View style={{
                        // padding:30,
                        paddingTop:40
                    }}>
                        <ProfileInput
                            placeholder={"Afolabi Damilare Enoch"}
                            icon={
                                <FontAwesome5 name="user" size={16} color={colors.gray} />
                            }
                            value={full_name}
                            onChange={ (e) => setfull_name(e) }
                            error={ error ? 
                                            
                                error.error_message.includes("full name") ? error.error_message :
                                false
                                : false }
                        />

                        <ProfileInput
                            placeholder={"09064664545"}
                            icon={
                                <FontAwesome5 name="phone-alt" size={16} color={colors.gray} />
                            }
                            value={phone_number}
                            onChange={ (e) => setphone_number(e) }
                            error={ error ? 
                                            
                                error.error_message.includes("phone number") ? error.error_message :
                                false
                                : false }
                        />

                        <ProfileInput
                            placeholder={"afodaiieddx@gmail.com"}
                            icon={
                                <MaterialIcons name="email" size={16} color={colors.gray} />
                            }
                            value={email}
                            onChange={ (e) => setemail(e) }
                            error={ error ? 
                                            
                                error.error_message.includes("email") ? error.error_message :
                                false
                                : false }
                        />

                        <View style={{
                            alignItems:"center",
                            marginTop:20
                        }} >
                            <CustomButton isloading={isLoading} title={"Update Account"} onpress={ () => HandleProfileUpdate() } />
                        </View>
                    </View>

                </ImageBackground>

                
            </View>

        </Root>

    );

}