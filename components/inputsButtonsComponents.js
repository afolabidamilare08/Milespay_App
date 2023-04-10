import {TouchableOpacity,Text, View, TextInput } from "react-native"
import colors from "../config/colors";
import {Ionicons} from '@expo/vector-icons'; 
import { useState } from "react";
import { ActivityIndicator } from 'react-native';
import fonts from "../config/fonts";

const CustomButton = ({title,onpress,disabled,styles,isloading}) => {

    return <TouchableOpacity onPress={onpress} disabled={disabled} style={[
        {
            backgroundColor:colors.primary,
            width:"100%",
            padding:15,
            marginTop:30,
            borderRadius:5,
        },styles
    ]} >
        
        { isloading ? <ActivityIndicator color={"white"} /> : <Text style={{
            textAlign:"center",
            color:"white",
            fontSize:14,
            fontFamily:fonts.ManropeSemiBold
        }} >{title}</Text> }

    </TouchableOpacity>

}

const CustomButton20 = ({title,onpress,disabled}) => {

    return <TouchableOpacity onPress={onpress} disabled={disabled} style={{
        width:"60%",
        padding:15,
        marginTop:15,
        borderRadius:5,
        borderColor:"#00D2FF",
        borderWidth:1
    }} >
        <Text style={{
            textAlign:"center",
            color:"black",
            fontSize:10,
            fontFamily:"Rubik-Bold"
        }} >{title}</Text>
    </TouchableOpacity>

}

const CustomInput = ({title,placeholder,error,value,onChange}) => {

    return (
    
            <>
            
                <View style={{
                        width:"100%",
                        marginTop:20,
                        paddingLeft:14,
                        paddingTop:10,
                        paddingBottom:10,
                        borderRadius:12,
                        borderColor: error ? "tomato" : colors.lightBlue ,
                        borderWidth:1
                    }} >

                        <Text style={{
                            // color:"rgba(8, 15, 29, 0.62)",
                            fontFamily:fonts.ManropeSemiBold,
                            fontSize:13
                        }} >{title} </Text>

                        <TextInput style={{
                            fontSize:13,
                            fontFamily:fonts.ManropeRegular
                        }} placeholder={placeholder} value={value} onChangeText={onChange} />

                </View>   

                { error ?
                    <Text style={{
                        fontFamily:fonts.ManropeRegular,
                        marginTop:5,
                        marginLeft:5,
                        color:"tomato"
                    }} > {error} </Text> 
                : <></> }        

            </>

        )

}

const AnotherInput = ({placeholder,multiline,styles,value,onChange,error,keyboardType}) => {

    return (

        <>
        
            <TextInput placeholder={placeholder} multiline={multiline}  style={[{
                marginTop:20,
                borderColor:error ? "tomato" : colors.lightBlue,
                borderWidth:1,
                padding:10,
                fontSize:14,
                borderRadius:10,
                color:"black",
            },styles]} value={value} keyboardType={keyboardType} onChangeText={onChange} />    

            { error ?
                    <Text style={{
                        fontFamily:fonts.ManropeRegular,
                        marginTop:5,
                        marginLeft:5,
                        color:"tomato"
                    }} > {error} </Text> 
                : <></> }    

        </>

    );

} 


const PasswordInput = ({title,error,value,onChange}) => {

    const [ showpassword, setshowpassword ] = useState(true) 

    return (

        <>

            <View style={{
                    borderColor: error ? "tomato" : colors.lightBlue,
                    borderWidth:1,
                    width:"100%",
                    marginTop:20,
                    paddingLeft:14,
                    paddingRight:14,
                    paddingTop:10,
                    paddingBottom:10,
                    borderRadius:12,
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"space-between"
                }}>

                    <View style={{
                        width:"70%"
                    }} >
                        <Text style={{
                            color:"rgba(8, 15, 29, 0.62)",
                            fontFamily:fonts.ManropeSemiBold,
                            fontSize:13
                        }} >{title} </Text>

                        <TextInput style={{
                            fontSize:13,
                            fontFamily:fonts.ManropeRegular
                        }} secureTextEntry={showpassword}
                         placeholder="************"
                        value={value}
                        onChangeText={onChange}
                         />
                    </View>

                    <Ionicons color={"rgba(0, 67, 188, 0.62)"} name="eye-sharp" size={25} onPress={ () => setshowpassword(!showpassword) } />

            </View>       
            
            { error ?
                <Text style={{
                    fontFamily:fonts.ManropeRegular,
                    marginTop:5,
                    marginLeft:5,
                    color:"tomato"
                }} > {error} </Text> 
            : <></> }   

        </>

    );

}

const ProfileInput = ({placeholder,icon,onChange,value,error}) => {

    return (

        <>

            <View style={{
                flexDirection:"row",
                borderColor:error ? "tomato" : "gray",
                borderWidth:1,
                padding:10,
                borderRadius:10,
                alignItems:"center",
                marginTop:30
            }} >

                {icon}

                <TextInput placeholder={placeholder} style={{
                    width:"80%",
                    marginLeft:20,
                    fontSize:14,
                    fontFamily:"Rubik-Regular",
                }} onChangeText={onChange}
                value={value}  />

            </View>

            { error ?
                <Text style={{
                    fontFamily:fonts.ManropeRegular,
                    marginTop:5,
                    marginLeft:5,
                    color:"tomato"
                }} > {error} </Text> 
            : <></> } 

        </>

    );

}

const WellInput = ({title,placeholder,error,value,onChange}) => {

    return (

        <>
        
            <View style={{
                marginTop:20
            }} >
                <Text style={{
                    marginBottom:10,
                    fontFamily:fonts.ManropeSemiBold,
                    fontSize:14
                }} > {title} </Text>
                <TextInput style={{
                    borderColor: error ? "tomato" : colors.lightBlue ,
                    borderWidth:1,
                    padding:10,
                    borderRadius:10,
                    fontSize:14,
                    fontFamily:fonts.ManropeRegular
                }} placeholder={placeholder} value={value} onChangeText={onChange} />
            </View>  

            { error ?
                <Text style={{
                    fontFamily:fonts.ManropeRegular,
                    marginTop:5,
                    marginLeft:5,
                    color:"tomato"
                }} > {error} </Text> 
            : <></> } 

        </>

    );

}








export {CustomButton,CustomButton20,CustomInput,PasswordInput,AnotherInput,ProfileInput,WellInput}