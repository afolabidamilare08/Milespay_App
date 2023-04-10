import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import colors from '../config/colors';
import OnboardingComponent from '../components/onboardingComponents';
import fonts from '../config/fonts';
import MainLogo from '../assets/images/MainLogo.png';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AuthMainPage } from '../pages/authmainPage';
import Imageitit from '../assets/images/TheSplash.jpg';
import { LoginPage } from '../pages/loginPage';
import VerifyemailPage from '../pages/verifyemailPage';
import { RegisterPage } from '../pages/registerPage';
import TheForgotPassword, { TheForgotPasswordSha } from '../pages/TheForgotPassword';
import { EnterCodeResetPassword } from '../pages/ResetPasswordCodePage';
import { ChangeResetPassowrdScreen } from '../pages/changeResetpasswordPage';



export default function AuthRoutes() {

    const AuthNavigation = createNativeStackNavigator();

    const AppScreen = ({navigation}) => {

        useEffect( () => {
    
          setTimeout( () => {
            navigation.navigate("onBoarding")
          },5000 )
    
        }, [] )
    
        return (
    
          <>
          <StatusBar translucent={true} />
            <ImageBackground style={[styles.container,{
                justifyContent:"center",
                alignItems:"center"
            }]} source={Imageitit} >
                <View style={{
                  flexDirection:"row",
                  alignItems:"center"
                }} >
                  <Image source={MainLogo} style={{
                    width:50,
                    height:50
                  }} />
                  <Text style={{
                    fontFamily:fonts.ManropeBold,
                    color:"white",
                    marginLeft:10,
                    fontSize:20
                  }} > MilesPay </Text>
                </View>
            </ImageBackground>
          </>
    
        );
               
      }

    return (
    
        <AuthNavigation.Navigator>
            <AuthNavigation.Screen name='Splash' component={AppScreen} options={{ headerShown:false }} />
            <AuthNavigation.Screen name='onBoarding'  component={OnboardingComponent} options={{ headerShown:false }} />
            <AuthNavigation.Screen name='Authmainpage' component={AuthMainPage} options={{ headerShown:false }} />
            <AuthNavigation.Screen name='LoginPage' component={LoginPage} options={{ headerShown:false }} />
            <AuthNavigation.Screen name='RegisterPage' component={RegisterPage} options={{ headerShown:false }} />
            <AuthNavigation.Screen name='ForgotPassword1' component={ TheForgotPasswordSha } options={{ headerShown:false}} />
            <AuthNavigation.Screen name='ForgotPassword2' component={ EnterCodeResetPassword } options={{ headerShown:false }} />
            <AuthNavigation.Screen name='changePasswordPage' component={ ChangeResetPassowrdScreen } options={{ headerShown:false }} />
        </AuthNavigation.Navigator>
    
    );    

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
  });
  