import { Dimensions, ImageBackground, ScrollView, Text, View } from "react-native";
import { CustomButton, CustomInput, WellInput } from "../../components/inputsButtonsComponents";
import BGIMG from "../../assets/images/dax.jpg";
import { SimpleHeader } from "../../components/layoutComponents";
import fonts from "../../config/fonts";
import { useContext, useEffect, useState } from "react";
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';
import Axios from "axios";
import AppContext from "../../context/Appcontext";


export const ChangePinScreen = ({navigation}) => {

    const [ old_pin, setold_pin ] = useState('')
    const [ new_pin, setnew_pin ] = useState('')
    const [ confirm_pin, setconfirm_pin ] = useState('')
    const [ error, seterror ] = useState(false)
    const [ isLoading, setisLoading ] = useState(false)

    const { UserBasicDetails, UpdateUserBasicDetails } = useContext(AppContext)

    const HandlePinSubmit = () => {
        
        setisLoading(true)

        if ( new_pin !== confirm_pin ) {
            seterror({
                error_message:"New pin and confirm pin has to be the same"
            })
            setisLoading(false)
            return
        }

        var datatosend ;

        if ( UserBasicDetails.transaction_pin === null ) {
            datatosend = {
                old_pin:"2344",
                new_pin:new_pin.replace(' ',''),
            }
        }


        else{
            datatosend = {
                old_pin:old_pin.replace(' ',''),
                new_pin:new_pin.replace(' ',''),
            }
        }

        Axios.put('auth/update_pin',datatosend)
        .then( (response) => {
            setisLoading(false)
            seterror(false)
            console.log(response.data)
            UpdateUserBasicDetails({
                ...UserBasicDetails,
                transaction_pin:"exist"
            })
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: "Your pin was reset successfully",
            })

        } )
            .catch( (e) => {
                seterror(e.response.data)
                console.log(e.response.data)
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
                    minHeight:Dimensions.get('window').height
                }} >

                    <SimpleHeader
                        text={"Change PIN"}
                        action={ () => navigation.goBack() }
                    />

                    <Text style={{
                        marginTop:70,
                        fontSize:14,
                        marginBottom:20,
                        textAlign:"center",
                        fontFamily:fonts.ManropeRegular
                    }} > Enter your Old PIN and your preferred new PIN </Text>

                    { UserBasicDetails.transaction_pin === null ? 
                    
                        <></>
                    
                    : <WellInput 
                        value={old_pin}
                        onChange={ (e) => setold_pin(e) } 
                        title={"Old Pin"}
                        error={ error ? 
                                                
                            error.error_message.includes("old pin") ? error.error_message :
                            false
                            : false }
                        />
                    }
                    
                    <WellInput 
                        value={new_pin}
                        onChange={ (e) => setnew_pin(e) }
                        title={"New Pin"} 
                        error={ error ? 
                                                
                            error.error_message.includes("new pin") ? error.error_message :
                            false
                            : false }
                    />
                    <WellInput 
                        value={confirm_pin}
                        onChange={ (e) => setconfirm_pin(e) }
                        title={"Confirm New Pin"} 
                        error={ error ? 
                                                
                            error.error_message.includes("confirm pin") ? error.error_message :
                            false
                            : false }
                    />


                    <View style={{
                        justifyContent:"center",
                        alignItems:"center",
                        marginTop:50,
                    }} > 
                        <CustomButton isloading={isLoading} onpress={ () => HandlePinSubmit() } title={"Confirm"} />
                    </View>

                </ImageBackground>

            </ScrollView>

        </Root>

    );

}