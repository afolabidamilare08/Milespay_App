import { Image, TouchableOpacity, ScrollView, StyleSheet, Text, View,ImageBackground, Dimensions } from "react-native";
import colors from "../config/colors";
import BgImage from '../assets/images/TheSplash.jpg';
import pictureS from '../assets/images/signin.png';
import fonts from "../config/fonts";


export const AuthMainPage = ({navigation}) => {

    return (
        <ScrollView style={{
            backgroundColor:colors.specialblue
        }} >

            <ImageBackground source={BgImage} style={{
                minHeight:Dimensions.get('window').height,
                justifyContent:"center"
            }} >

                <Image source={pictureS} style={{
                        width:200 ,
                        height:200,
                        alignSelf:"center"
                }} />

                <View style={{
                    alignItems:"center"
                }} >

                    <Text style={style.maintext}>Let’s Get you Started with Miles Pay</Text>

                    <TouchableOpacity 
                        onPress={() => navigation.navigate('RegisterPage')} 
                        style={{
                            backgroundColor:"white",
                            width:"90%",
                            padding:15,
                            marginTop:30,
                            borderRadius:5,
                        }} >
                            <Text style={{
                                textAlign:"center",
                                color:colors.primary,
                                fontSize:13,
                                fontFamily:fonts.ManropeBold
                            }} >Create Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => navigation.navigate('LoginPage')} 
                        style={{
                            borderColor:colors.lightBlue,
                            borderWidth:1,
                            width:"90%",
                            padding:15,
                            marginTop:15,
                            borderRadius:5,
                        }} >
                            <Text style={{
                                textAlign:"center",
                                color:"white",
                                fontSize:13,
                                fontFamily:fonts.ManropeBold
                            }} >Login</Text>
                    </TouchableOpacity>

                    <Text style={{
                        textAlign:"center",
                        marginTop:50,
                        fontSize:12,
                        width:"80%",
                        color:"white",
                        fontFamily:fonts.ManropeRegular,
                        // paddingBottom:120
                    }} > By creating an account, you agree with our <Text style={{
                        color:colors.lightBlue,
                        fontFamily:fonts.ManropeRegular
                    }} >Terms</Text> and <Text style={{
                        color:colors.lightBlue,
                        fontFamily:fonts.ManropeRegular
                    }}>Privacy Policy</Text> </Text>

                </View>

            </ImageBackground>

        </ScrollView>
    );

}

const style = StyleSheet.create({
    main_view:{
        flex:1,
        padding:30,
        backgroundColor:"white",
        alignItems:"center"
    },
    Image:{
        width:250,
        height:250,
        marginTop:50
    },
    maintext:{
        width:"80%",
        fontSize:19,
        padding:10,
        textAlign:"center",
        fontFamily:fonts.ManropeBold,
        color:"white",
        marginTop:30
    }
})