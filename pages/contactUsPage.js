import { Dimensions, ImageBackground, ScrollView, Text, TextInput, View } from "react-native"
import { SimpleHeader, ViewDefault } from "../components/layoutComponents";
import { Feather,MaterialCommunityIcons,AntDesign } from '@expo/vector-icons';
import BGIMG from "../assets/images/dax.jpg";
import fonts from "../config/fonts";

export const ContactUsPage = ({navigation}) => {

    return <ScrollView style={{
        backgroundColor:"white"
    }}>

        <ImageBackground source={BGIMG} style={{
            padding:30,
            minHeight:Dimensions.get('window').height
        }} >

            <SimpleHeader
                text={"Contact Us"}
                action={ () => navigation.goBack() }
            />

            <Text style={{
                marginTop:40,
                fontFamily:fonts.ManropeSemiBold,
                fontSize:14
            }} >Got questions? </Text>

            <Text style={{
                marginTop:10,
                fontFamily:fonts.ManropeRegular,
                fontSize:12
            }} >
                You can reach us via the following channels
            </Text>

            <View style={{
                marginTop:50,
                flexDirection:"row",
                // backgroundColor:"#F6F9FF",
                padding:15,
                alignItems:"center",
                borderRadius:16
            }} >
                <Feather name="phone" size={18} color="black" style={{
                    marginRight:20
                }} />
                <View>
                    <Text style={{
                        fontFamily:fonts.ManropeSemiBold,
                        fontSize:14
                    }} >WhatsApp Number</Text>
                    <TextInput placeholder="+234 6768867676" style={{
                        fontSize:12,
                        marginTop:4
                    }} />
                </View>
            </View>

            <View style={{
                marginTop:20,
                flexDirection:"row",
                // backgroundColor:"#F6F9FF",
                padding:15,
                alignItems:"center",
                borderRadius:16
            }} >
                <Feather name="phone" size={18} color="black" style={{
                    marginRight:20
                }} />
                <View>
                    <Text style={{
                        fontFamily:fonts.ManropeSemiBold,
                        fontSize:14
                    }} >Call Support</Text>
                    <TextInput placeholder="+234 6768867676" style={{
                        fontSize:12,
                        marginTop:4
                    }} />
                </View>
            </View>            

            <View style={{
                marginTop:20,
                flexDirection:"row",
                padding:15,
                alignItems:"center",
                borderRadius:16
            }} >
                <MaterialCommunityIcons name="email-outline" size={18} color="black" style={{
                    marginRight:20
                }} />
                <View>
                    <Text style={{
                        fontFamily:fonts.ManropeSemiBold,
                        fontSize:14
                    }} >Email Address</Text>
                    <TextInput placeholder="Help@Milespay.com" style={{
                        fontSize:12,
                        marginTop:4
                    }} />
                </View>
            </View>

            <View style={{
                marginTop:20,
                flexDirection:"row",
                padding:14,
                alignItems:"center",
                borderRadius:16
            }} >
                <AntDesign name="instagram" size={18} color="black" style={{
                    marginRight:20
                }} />
                <View>
                    <Text style={{
                        fontFamily:fonts.ManropeSemiBold,
                        fontSize:14
                    }} >Social Media</Text>
                    <TextInput placeholder="Instagram" style={{
                        fontSize:12,
                        marginTop:4
                    }} />
                </View>
            </View>

        </ImageBackground>

    </ScrollView>

}
