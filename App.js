import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import Imageitit from './assets/images/TheSplash.jpg';
import MainLogo from './assets/images/MainLogo.png';
import { useEffect } from 'react';
import colors from './config/colors';
import fonts from './config/fonts';
import AuthRoutes from './routes/authRoutes';
import AppContext from './context/Appcontext';
import { useState } from 'react';
import Axios from 'axios';
import { Header, HeaderVersion2, HeaderVersion3, RatesHeader } from './components/layoutComponents';
import AppRoutes from './routes/appRoutes';
import * as SecureStore from 'expo-secure-store';
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';
import { LoginPage } from './pages/loginPage';
import OnboardingComponent from './components/onboardingComponents';
import { AuthMainPage } from './pages/authmainPage';
import { RegisterPage } from './pages/registerPage';
import { TheForgotPasswordSha } from './pages/TheForgotPassword';
import { EnterCodeResetPassword } from './pages/ResetPasswordCodePage';
import { ChangeResetPassowrdScreen } from './pages/changeResetpasswordPage';
import HomeNavigation from './routes/homeRoutes';
import { SellGiftcardHome } from './pages/sell_gift_card/sellgiftcardPage';
import { SubmitCardPage } from './pages/sell_gift_card/submitcardPage';
import { RateResultPage } from './pages/rates/ratesResultPage';
import { EditProfilePage } from './pages/profile/editprofilePage';
import { AddBAnkAccount } from './pages/profile/add_bank_accountPage';
import { BankHomePage } from './pages/profile/banksPage';
import { SecurityPage } from './pages/profile/securityPage';
import { ChangePassowrdScreen } from './pages/profile/changepasswordPage';
import { ChangePinScreen } from './pages/profile/changepinPage';
import { LegalPolicy } from './pages/profile/LegalPolicy';
import { TradeBitcoinPage1 } from './pages/trade_Bitcoin/tradeBitcoinPage1';
import { TradeBitcoinPage2 } from './pages/trade_Bitcoin/tradeBitcoinPage2';
import { TradeBitcoinPage3 } from './pages/trade_Bitcoin/tradeBitcoinPage3';
import { CryptoHistoryDetail } from './pages/trade_Bitcoin/tradeCryptoHistory';
import { TradeAltcoin } from './pages/tradeAltcoinPage';
import { MainTradeScreen } from './pages/MainTradePage';
import { WellIFy } from './pages/testPage';
import { ReportBugPage } from './pages/reportBugPage';
import { WalletPage } from './pages/profile/WalletPage';
import { ContactUsPage } from './pages/contactUsPage';
import { NotificationsPage } from './pages/NotificationPage';
import { VerifyUserOtpPage } from './pages/VerifyUserOtp';


export default function App() {
 

  const [ UserBasicDetails, setUserBasicDetails ] = useState()

  const [ AppLoading, setAppLoading ] = useState(false)

    // checking if token exists


  const HandleIfUserIsTrullyAuthenticated = async () => {
      
    // setAppLoading(true)
    let token = await SecureStore.getItemAsync("token");
    if (token) {
      // console.log("firstTOken",token)
      Axios.defaults.headers.common['token'] = 'Bearer ' + token

      const glorious = Axios.create({
        baseURL: "https://milespay-production.up.railway.app/",
      })

    glorious.defaults.headers.common['token'] = 'Bearer ' + token

    glorious.get('auth/my_profile').then((response) => {
        setUserBasicDetails(response.data)
        console.log(response.data)
        setAppLoading(false)
      }).catch((error) => {
        // console.log(error.response.data)
        // setAppLoading(false) 
      })

    } else {
      setUserBasicDetails()
      setAppLoading(false)
    }


  }

    useEffect( () => {

      HandleIfUserIsTrullyAuthenticated()

    }, [] )
  

  const [Rubik_Regular] = useFonts({
    'Rubik-Regular': require('./assets/fonts/rubik/Rubik-Regular.ttf'),
    'Rubik-SemiBold': require('./assets/fonts/rubik/Rubik-SemiBold.ttf'),
  });

  const [Rubik_Bold] = useFonts({
    'Rubik-Bold': require('./assets/fonts/rubik/Rubik-Bold.ttf'),
  });

  const [QuickSand] = useFonts({
    'Quicksand-Regular': require('./assets/fonts/quicksand/Quicksand-Regular.ttf'),
    'Quicksand-Bold': require('./assets/fonts/quicksand/Quicksand-Bold.ttf'),
    'Quicksand-SemiBold': require('./assets/fonts/quicksand/Quicksand-SemiBold.ttf'),
  });

  const [Manrope] = useFonts({
    'Manrope-Regular': require('./assets/fonts/manrope/Manrope-Regular.ttf'),
    'Manrope-Bold': require('./assets/fonts/manrope/Manrope-Bold.ttf'),
    'Manrope-SemiBold': require('./assets/fonts/manrope/Manrope-SemiBold.ttf'),
  });

  if (!Rubik_Regular || !Rubik_Bold  || !QuickSand || !Manrope) {
    return null;
  }






  // All Genral or important logics

  // 

  // 

  // Axios.defaults.baseURL = "https://milespay-production.up.railway.app/"; 

  Axios.defaults.baseURL = "https://milespay-production.up.railway.app/"; 

  // 
  // login function

  async function LoginHandler(key, value, user_details,) {
    await SecureStore.setItemAsync(key, value);
    Axios.defaults.headers.common['token'] = 'Bearer ' + value
    setUserBasicDetails(user_details)
  }

        // Log out function
  const LogoutHandler = async () => {

    await SecureStore.setItemAsync("token", "");
    Axios.defaults.headers.common['token'] = ''
    setUserBasicDetails()
  }

  const AuthNavigation = createNativeStackNavigator();

  const MainNavigation = createNativeStackNavigator();



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
    <AppContext.Provider value={{
      UserBasicDetails:UserBasicDetails,
      LoginHandler: LoginHandler,
      LogoutHandler:LogoutHandler,
      UpdateUserBasicDetails: (data) => setUserBasicDetails(data) 
    }} >
      <NavigationContainer>
      {/* <View style={styles.container} >
      <StatusBar backgroundColor={colors.primary} />
          { UserBasicDetails ? <AppRoutes/> : <AuthRoutes/> }
      </View> */}
        
        { UserBasicDetails ? 
        
        
        
        <MainNavigation.Navigator initialRouteName='HomeNavigation' >

          <MainNavigation.Screen name='HomeNavigation' component={HomeNavigation} options={{
            headerShown: false
          }} />

          <MainNavigation.Screen name='GiftCardHome' component={SellGiftcardHome} options={{
            headerShown: false
          }} />
    
          <MainNavigation.Screen name='SubmitGiftCard' component={SubmitCardPage} options={{
            headerShown: false
          }} />
    
          <MainNavigation.Screen name='Rate_result' component={RateResultPage} options={{
            headerBackVisible: false,
            // headerTitle:(props) => <Header {...props}/>,
            header: (props) => <RatesHeader {...props} />,
            headerShadowVisible: true
          }} />
    
          <MainNavigation.Screen name='edit_account' component={EditProfilePage} options={{
            headerBackVisible: false,
            headerShown: false,
            headerShadowVisible: true,
          }} />
    
          <MainNavigation.Screen name='add_bank_account' component={AddBAnkAccount} options={{
            headerBackVisible: false,
            headerShown: false,
            headerShadowVisible: true,
          }} />
    
          <MainNavigation.Screen name='BankHome' component={BankHomePage} options={{
            headerBackVisible: false,
            headerShown: false,
            headerShadowVisible: true,
          }} />
    
          <MainNavigation.Screen name='SecurityHome' component={SecurityPage} options={{
            headerBackVisible: false,
            headerShown: false,
            headerShadowVisible: true,
          }} />
    
          <MainNavigation.Screen name='changePasswordPage' component={ChangePassowrdScreen} options={{
            headerBackVisible: false,
            headerShown: false,
            headerShadowVisible: true,
          }} />
    
          <MainNavigation.Screen name='changePinPage' component={ChangePinScreen} options={{
            headerBackVisible: false,
            headerShown: false,
            headerShadowVisible: true,
          }} />
    
          <MainNavigation.Screen name='LegalPolicyPage' component={LegalPolicy} options={{
            headerBackVisible: false,
            // headerTitle:(props) => <Header {...props}/>,
            header: (props) => <HeaderVersion2 title={"Legal Policy"} {...props} />,
            headerShadowVisible: true,
          }} />
    
          <MainNavigation.Screen name='TradeBitcoin' component={TradeBitcoinPage1} options={{
            headerBackVisible: false,
            headerShown: false,
            headerShadowVisible: true,
          }} />
    
          <MainNavigation.Screen name='TradeBitcoin_2' component={TradeBitcoinPage2} options={{
            headerBackVisible: false,
            headerShown: false,
            headerShadowVisible: true,
          }} />
    
          <MainNavigation.Screen name='TradeBitcoin_3' component={TradeBitcoinPage3} options={{
            headerBackVisible: false,
            headerShown: false,
            headerShadowVisible: true,
          }} />
    
          <MainNavigation.Screen name='Crypto_transaction_detail' component={CryptoHistoryDetail} options={{
            headerBackVisible: false,
            headerShown: false,
            headerShadowVisible: true,
          }} />
    
          <MainNavigation.Screen name='TradeAltcoin' component={TradeAltcoin} options={{
            headerBackVisible: false,
            headerShown: false,
            headerShadowVisible: true,
          }} />
    
          <MainNavigation.Screen name='MainTrade_page' component={MainTradeScreen} options={{
            headerBackVisible: false,
            headerShown: false,
            headerShadowVisible: true,
          }} />
    
          <MainNavigation.Screen name='see_me' component={WellIFy} options={{
            headerBackVisible: false,
            headerShown: false,
            headerShadowVisible: true,
          }} />
    
          <MainNavigation.Screen name='Report_Bug' component={ReportBugPage} options={{
            headerBackVisible: false,
            headerShown: false,
            headerShadowVisible: true,
          }} />
    
          <MainNavigation.Screen name='WalletPage' component={WalletPage} options={{
            headerBackVisible: false,
            headerShown: false,
            headerShadowVisible: true,
          }} />
    
          <MainNavigation.Screen name='ContactUs' component={ContactUsPage} options={{
            headerBackVisible: false,
            headerShown: false,
            headerShadowVisible: true,
          }} />

          <MainNavigation.Screen name='Notifications' component={NotificationsPage} options={{
            headerBackVisible: false,
            headerShown: false,
            headerShadowVisible: true,
          }} />
  
        </MainNavigation.Navigator>
        
        
        
        
        
        
        :
        
        <AuthNavigation.Navigator>
            <AuthNavigation.Screen name='Splash' component={AppScreen} options={{ headerShown:false }} />
            <AuthNavigation.Screen name='onBoarding'  component={OnboardingComponent} options={{ headerShown:false }} />
            <AuthNavigation.Screen name='Authmainpage' component={AuthMainPage} options={{ headerShown:false }} />
            <AuthNavigation.Screen name='LoginPage' component={LoginPage} options={{ headerShown:false }} />
            <AuthNavigation.Screen name='RegisterPage' component={RegisterPage} options={{ headerShown:false }} />
            <AuthNavigation.Screen name='ForgotPassword1' component={ TheForgotPasswordSha } options={{ headerShown:false}} />
            <AuthNavigation.Screen name='ForgotPassword2' component={ EnterCodeResetPassword } options={{ headerShown:false }} />
            <AuthNavigation.Screen name='changePasswordPage' component={ ChangeResetPassowrdScreen } options={{ headerShown:false }} />
            <AuthNavigation.Screen name='VerifyOtpCodePage' component={ VerifyUserOtpPage } options={{ headerShown:false }} />
        </AuthNavigation.Navigator>
        
        }

      </NavigationContainer>
    </AppContext.Provider>

  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});




// : AppLoading ? <AppScreen/> :