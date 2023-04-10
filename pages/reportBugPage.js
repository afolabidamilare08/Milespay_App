import { Dimensions, ImageBackground, ScrollView, Text, Image, TextInput, View,TouchableOpacity } from "react-native"
import { SimpleHeader, ViewDefault } from "../components/layoutComponents";
// import { Feather } from '@expo/vector-icons';
import { CustomButton, WellInput } from "../components/inputsButtonsComponents";
import colors from "../config/colors";
import BGIMG from "../assets/images/dax.jpg";
import { useState } from "react";
import fonts from "../config/fonts";
import { AntDesign,Ionicons,Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';
import Axios from "axios";


export const ReportBugPage = ({navigation}) => {

    const [ ReportImage, setReportImage ] = useState(null)
    const [ Report_message, setReport_message ] = useState('')
    const [ isLoading, setisLoading ] = useState(false)

    const PickReportImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
            });

            if (!result.cancelled) {

            setReportImage(result) 
             
            }else{
            
            }

    }
    

    const HandlePostReport = () => {

        setisLoading(true)

        const FordItSha = new FormData();

        if ( Report_message === '' ) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'WARNING',
                textBody: "Report Message cannot be left empty",
            })
            setisLoading(false)
            return
        }

        if ( ReportImage ) {
            let localUri = ReportImage.uri

            let filename = localUri.split('/').pop();
    
            let match = /\.(\w+)$/.exec(filename);
    
            let type = match ? `image/${match[1]}` : `image`   
            
            FordItSha.append('report_image',{ uri: localUri, name: filename, type})
        }

        
        FordItSha.append('report_message',Report_message)


        Axios({
            method: "post",
            url: "/bug/create_bug",
            data: FordItSha,
            headers: { "Content-Type": "multipart/form-data", "boundry": "boundry" }
          }).then((response) => {
            setisLoading(false)
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: "Report was received, we would get back to you",
            })
          }).catch( (e) => {
            setisLoading(false)
            // console.log(e.response)
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'WARNING',
                textBody: e.response.data.error_message,
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
                            minHeight:Dimensions.get('window').height
                        }} >

                            <SimpleHeader
                                text={"Report a Bug"}
                                action={ () => navigation.goBack() }
                            />

                            <Text style={{
                                textAlign:"center",
                                fontSize:14,
                                fontFamily:fonts.ManropeRegular,
                                marginTop:70
                            }} >Take a screenshot to report a problem and suggest an improvement</Text>

                            { ReportImage ?
                                
                                <>
                                
                                    <Image resizeMethod="scale" resizeMode="contain" source={{
                                        uri: ReportImage.uri 
                                    }} style={{
                                        width:"100%",
                                        height:200,
                                        marginTop:30,
                                        marginBottom:30,
                                    }} />  

                                    <TouchableOpacity style={{
                                        backgroundColor:"lightgray",
                                        padding:10,
                                        borderRadius:9
                                    }} onPress={ () => PickReportImage() } >
                                        <Text style={{
                                            textAlign:"center"
                                        }} > Change Image </Text>
                                    </TouchableOpacity>                      

                                </>

                            : 
                            
                                <TouchableOpacity onPress={ () => PickReportImage() } style={{
                                    marginTop:40,
                                    borderRadius:10,
                                    flexDirection:"row",
                                    alignItems:"center",
                                    // justifyContent:"center"
                                }} >

                                    <Ionicons name="image" size={20} color="gray" style={{marginRight:20}} />
                                    <Text style={{
                                        fontFamily:fonts.ManropeRegular,
                                        fontSize:14
                                    }} >Upload Proof of Payment</Text> 

                                </TouchableOpacity>  
                            
                            }  

                            <Text style={{
                                marginTop:40,
                                fontSize:14,
                                fontFamily:fonts.ManropeRegular,
                                color:"gray",
                                // marginLeft:10
                            }} > Your Message </Text>

                            <TextInput style={{
                                borderColor:"lightgray",
                                borderWidth:1,
                                marginTop:10,
                                borderRadius:10,
                                padding:20
                            }} multiline={true} value={Report_message} onChangeText={ (e) => setReport_message(e) } />

                            <View style={{
                                alignItems:"center"
                            }} >
                                <CustomButton onpress={HandlePostReport} disabled={isLoading} isloading={isLoading} title={"Send Report"} />
                            </View>

                        </ImageBackground>


            </ScrollView>

        </Root>

    );

}