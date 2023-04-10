import { ScrollView, Text, TextInput, View } from "react-native";
import {Ionicons,AntDesign} from '@expo/vector-icons'; 
import { CustomButton } from "../components/inputsButtonsComponents";
import colors from "../config/colors";
import fonts from "../config/fonts";


export default VerifyEmailPage = ({navigation}) => {

    const Inputit = ({placeholder}) => {
        
        return <TextInput style={{
            borderColor:"red",
            borderBottomColor:"black",
            borderBottomWidth:1,
            width:"15%",
            fontSize:30,
            textAlign:"center"
        }} placeholder={placeholder} />

    }

    return(

        <ScrollView style={{
            flex:1,
            padding:30,
            backgroundColor:"white"
        }} >

            <AntDesign name="arrowleft" size={25} style={{
                marginTop:20
            }} onPress={ () => navigation.goBack() } />

            <Text style={{
                marginTop:30,
                fontSize:16,
                fontFamily:fonts.ManropeBold
            }} >Verify Email Address</Text>
            <Text style={{
                marginTop:10,
                fontSize:12,
                fontFamily:fonts.ManropeRegular
            }} >Enter the 4 digit code sent to <Text style={{
                fontFamily:fonts.ManropeBold
            }} >lugidma@yahoo.com</Text></Text>
            
            <View style={{
                marginTop:130,
                flexDirection:"row",
                justifyContent:"space-evenly"
            }} >
                <Inputit placeholder={"8"} />
                <Inputit placeholder={"9"} />
                <Inputit placeholder={"4"} />
                <Inputit placeholder={"3"} />
            </View>

            <Text style={{
                marginTop:140,
                textAlign:"center",
                fontSize:14,
            }} > Resend Code in <Text style={{
                fontFamily:fonts.ManropeBold,
                color:colors.lightBlue
            }} >52s</Text> </Text>


            <View style={{
                alignItems:"center",
                width:"100%",
            }} >
                <CustomButton
                    title={"Create Account"}
                    onpress={ () => navigation.navigate("HomeNavigation") }
                />
            </View>

        </ScrollView>

    );

}