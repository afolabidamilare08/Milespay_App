import { Image, ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import BGIMG from "../../assets/images/power.jpg";
import Profile_true from "../../assets/images/profile.png";
import { Entypo, AntDesign,MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import colors from "../../config/colors";
import fonts from "../../config/fonts";
import { useContext } from "react";
import AppContext from "../../context/Appcontext";

export const ProfileHomePage = ({navigation}) => {

    const { LogoutHandler, UserBasicDetails } = useContext(AppContext)

    const Links = [

        {
            icon: <AntDesign name="user" size={21} color="black" />,
            text: "My Account",
            to: () => navigation.navigate("edit_account")
        },
        {
            icon: <MaterialCommunityIcons name="bank" size={21} color="black" />,
            text: "Banks",
            to: () => navigation.navigate("BankHome")
        },
        {
            icon: <AntDesign name="lock1" size={21} color="black" />,
            text: "Security",
            to: () => navigation.navigate("SecurityHome")
        },
        {
            icon: <MaterialIcons name="bug-report" size={21} color="black" />,
            text: "Report a bug",
            to: () => navigation.navigate("Report_Bug") 
        },
        {
            icon: <MaterialIcons name="contact-support" size={21} color="black" />,
            to: () => navigation.navigate("ContactUs") ,
            text: "Support",
        },
        {
            icon: <Entypo name="open-book" size={21} color="black" />,
            text: "Terms of use",
            to: () => navigation.navigate("LegalPolicyPage") 
        }

    ]

    return <SafeAreaView style={{
        backgroundColor:"white",
        flex:1,
    }} >

        <ScrollView>

        <StatusBar backgroundColor={colors.primary} />
        

        <ImageBackground source={BGIMG} style={{
            padding:30,
            paddingTop:120
        }} >

        <Image source={Profile_true} style={{
                width:100,
                height:100,
                borderRadius:400,
                alignSelf:"center",
                marginTop:-50
        }} />

        <Text style={{
            alignSelf:"center",
            textAlign:"center",
            fontFamily:fonts.ManropeBold,
            fontSize:16,
            marginTop:10,
            color:"white"
        }} >
            { UserBasicDetails ? UserBasicDetails.full_name : "" }
        </Text>

        <Text style={{
            alignSelf:"center",
            textAlign:"center",
            fontFamily:fonts.ManropeRegular,
            fontSize:12,
            marginTop:6,
            color:"white"
        }} >
            { UserBasicDetails ? UserBasicDetails.email : "" }
        </Text>

        <ScrollView style={{
            marginTop:90,
            // padding:30,
        }} >

            { Links.map( ( link ) => {

                return <TouchableOpacity key={link.text} onPress={link.to} style={{
                            flexDirection:"row",
                            alignItems:"center",
                            justifyContent:"space-between",
                            borderBottomColor:"rgba(104, 104, 105, 0.55)",
                            borderBottomWidth:1,
                            paddingBottom:18,
                            marginTop:18
                        }} >
    
                            <View style={{
                                flexDirection:"row",
                                alignItems:"center",
                            }}>
            
                                {link.icon}
            
                                <Text style={{
                                    marginLeft:20,
                                    color:"black",
                                    fontFamily:fonts.ManropeSemiBold,
                                    fontSize:13
                                }} > {link.text} </Text>
            
                            </View>
    
                            <AntDesign name="right" size={16} color="#686869" />
            
                        </TouchableOpacity>

            } ) }

                        <TouchableOpacity onPress={ () => LogoutHandler() } style={{
                            flexDirection:"row",
                            alignItems:"center",
                            justifyContent:"space-between",
                            paddingBottom:18,
                            marginTop:18
                        }} >
    
                            <View style={{
                                flexDirection:"row",
                                alignItems:"center",
                            }}>
            
                                <AntDesign name="logout" size={21} color="#D83D3D" />
            
                                <Text style={{
                                    marginLeft:20,
                                    color:"#D83D3D",
                                    fontFamily:fonts.ManropeSemiBold,
                                    fontSize:13
                                }} > Log Out </Text>
            
                            </View>
            
                        </TouchableOpacity>

        </ScrollView>

        </ImageBackground>

        </ScrollView>

    </SafeAreaView>

}