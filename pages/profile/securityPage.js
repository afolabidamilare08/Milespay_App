import { Dimensions, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SimpleHeader } from "../../components/layoutComponents";
import { AntDesign } from '@expo/vector-icons';
import colors from "../../config/colors";
import { useState } from "react";
import BGIMG from "../../assets/images/dax.jpg";
import fonts from "../../config/fonts";

export const SecurityPage = ({navigation}) => {

    const [Slide, setSlide] = useState(false)

    return (

        <ScrollView style={{
            backgroundColor:"white"
        }} >

            <ImageBackground source={BGIMG} style={{
                padding:30,
                minHeight:Dimensions.get('window').height,
            }} >

                <SimpleHeader
                    text={"Security"}
                    action={ () => navigation.goBack() }
                />

                <Text style={{
                    textAlign:"center",
                    fontSize:14,
                    fontFamily:fonts.ManropeRegular,
                    marginTop:70
                }} >Manage your password, Pin and general account security</Text>

                <TouchableOpacity style={{
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"space-between",
                    marginTop:30,
                    borderBottomColor:"lightgray",
                    borderBottomWidth:1,
                    paddingBottom:30
                }} onPress={ () => navigation.navigate("changePasswordPage") } >

                    <View>
                        <Text style={{
                            fontSize:14,
                            fontFamily:fonts.ManropeSemiBold
                        }} >Password</Text>
                        <Text style={{
                            marginTop:5,
                            fontSize:12,
                            fontFamily:fonts.ManropeRegular
                        }} >Update your Password</Text>
                    </View>

                    <AntDesign name="right" size={18} color="black" />

                </TouchableOpacity>

                <TouchableOpacity style={{
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"space-between",
                    marginTop:30,
                    borderBottomColor:"lightgray",
                    borderBottomWidth:1,
                    paddingBottom:30
                }} onPress={ () => navigation.navigate("changePinPage") } >

                    <View>
                        <Text style={{
                            fontSize:14,
                            fontFamily:fonts.ManropeSemiBold
                        }} >PIN</Text>
                        <Text style={{
                            marginTop:5,
                            fontSize:12,
                            fontFamily:fonts.ManropeRegular
                        }} >Update your PIN</Text>
                    </View>

                    <AntDesign name="right" size={18} color="black" />

                </TouchableOpacity>

                <View style={{
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"space-between",
                    marginTop:30,
                    paddingBottom:30
                }}>

                    <View>
                        <Text style={{
                            fontSize:14,
                            fontFamily:fonts.ManropeSemiBold
                        }} >Biometrics</Text>
                        <Text style={{
                            marginTop:5,
                            fontSize:12,
                            fontFamily:fonts.ManropeRegular
                        }} >Allow biometrics</Text>
                    </View>

                    <TouchableOpacity style={{
                        width:60,
                        height:30,
                        borderRadius:400,
                        backgroundColor: Slide ? colors.specialblue : "gray" ,
                        justifyContent:"center",
                        padding:5
                    }} onPress={ () => setSlide(!Slide) } >

                        <View style={{
                            width:20,
                            height:20,
                            backgroundColor:"white",
                            borderRadius:400,
                            alignSelf:Slide ? "flex-end" : "flex-start"
                        }} >

                        </View>

                    </TouchableOpacity>

                </View>

            </ImageBackground>

        </ScrollView>

    );

}