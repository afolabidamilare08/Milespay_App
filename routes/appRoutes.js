import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import colors from '../config/colors';
import OnboardingComponent from '../components/onboardingComponents';
import fonts from '../config/fonts';
import MainLogo from '../assets/images/MainLogo.png';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AuthMainPage } from '../pages/authmainPage';
import { LoginPage } from '../pages/loginPage';
import { RegisterPage } from '../pages/registerPage';
import VerifyemailPage from '../pages/verifyemailPage';
import { HomePage } from '../pages/homePage';
import Imageitit from '../assets/images/TheSplash.jpg';
import verifyemailPage from '../pages/verifyemailPage';
import HomeNavigation from '../routes/homeRoutes';
import { SellGiftcardHome } from '../pages/sell_gift_card/sellgiftcardPage';
import { MainTradeScreen } from '../pages/MainTradePage';
import { SubmitCardPage } from '../pages/sell_gift_card/submitcardPage';
import { Header, HeaderVersion2, HeaderVersion3, RatesHeader } from '../components/layoutComponents';
import { RateResultPage } from '../pages/rates/ratesResultPage';
import { EditProfilePage } from '../pages/profile/editprofilePage';
import { AddBAnkAccount } from '../pages/profile/add_bank_accountPage';
import { BankHomePage } from '../pages/profile/banksPage';
import { SecurityPage } from '../pages/profile/securityPage';
import { ChangePassowrdScreen } from '../pages/profile/changepasswordPage';
import { ChangePinScreen } from '../pages/profile/changepinPage';
import { LegalPolicy } from '../pages/profile/LegalPolicy';
// import { TradeBitcoin } from '../pages/tradeBitcoinPage';
import { TradeAltcoin } from '../pages/tradeAltcoinPage';
import { HistoryPage } from '../pages/history/historyPage';
import { ReportBugPage } from '../pages/reportBugPage';
import { ContactUsPage } from '../pages/contactUsPage';
import TheForgotPassword, { TheForgotPasswordSha } from '../pages/TheForgotPassword';
import { EnterCodeResetPassword } from '../pages/ResetPasswordCodePage';
import Well, { WellIFy } from '../pages/testPage';
import { TradeBitcoinPage1 } from '../pages/trade_Bitcoin/tradeBitcoinPage1';
import { TradeBitcoinPage2 } from '../pages/trade_Bitcoin/tradeBitcoinPage2';
import { TradeBitcoinPage3 } from '../pages/trade_Bitcoin/tradeBitcoinPage3';
import { CryptoHistoryDetail } from '../pages/trade_Bitcoin/tradeCryptoHistory';
import { WalletPage } from '../pages/profile/WalletPage';


export default function AppRoutes() {

  const MainNavigation = createNativeStackNavigator();

  return (

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
      {/* 
              <MainNavigation.Screen name='TradeUsdt' component={TradeBitcoin} options={{
                headerBackVisible:false,
                headerShown:false,
                headerShadowVisible:true,
              }} /> */}

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

    </MainNavigation.Navigator>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
