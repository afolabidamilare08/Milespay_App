import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons,FontAwesome5,Entypo, MaterialIcons } from '@expo/vector-icons'; 
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../config/colors';
import { HomePage } from '../pages/homePage';
import { RateHomePage } from '../pages/rates/ratesHomePage';
import { RatesHeader } from '../components/layoutComponents';
import { RateResultPage } from '../pages/rates/ratesResultPage';
import { ProfileHomePage } from '../pages/profile/profilehomePage';
import { HistoryPage } from '../pages/history/historyPage';
import fonts from '../config/fonts';


export default function HomeNavigation(){

    const Fake_History_Components = () => {
        return <View><Text> History is currently under construction</Text></View>
    }

    const Fake_rate_component = () => {
        return <View><Text>Rate is currently under construction</Text></View>
    }

    const Fake_profile_component = () => {
        return <View><Text>Profile is currently under construction</Text></View>
    }

    const HomeStackScreen = createBottomTabNavigator();

        return (
            <HomeStackScreen.Navigator
                initialRouteName='Home_index'
                      screenOptions={({route}) => ({
                        tabBarLabelStyle:{fontFamily:"Rubik-Bold"},
                    tabBarShowLabel:false,

                        tabBarStyle:{backgroundColor:"#F6F9FF",paddingBottom:5,paddingTop:5},
                        tabBarIcon: ({focused,color}) => {
                            let iconName;
                            let iconColor = colors.primary ;
                            let returnValue
                            let size = 10

                            if (route.name === 'Home_index') {
                            returnValue = <View style={{
                                alignItems:"center"
                            }} > 
                                <MaterialIcons name="home-filled" size={24} color={ focused ? iconColor : 'gray'} />
                                <Text style={{
                                    fontFamily:fonts.ManropeSemiBold,
                                    color: focused ? iconColor : 'gray',
                                    fontSize:size
                                }} >Home</Text>
                                {/* { focused ? <View style={{
                                    width:6,
                                    height:6,
                                    borderRadius:50,
                                    backgroundColor:colors.primary
                                }} ></View> : <></> } */}
                            </View>
                            }

                            if (route.name === 'Rate') {
                                returnValue = <View style={{
                                    alignItems:"center"
                                }} > 
                                    <MaterialIcons name="insert-chart-outlined" size={24} color={focused ? iconColor : 'gray'} />
                                    <Text style={{
                                    fontFamily:fonts.ManropeSemiBold,
                                    color: focused ? iconColor : 'gray',
                                    fontSize:size
                                }} >Rates</Text>
                                </View>
                                }

                            if (route.name === 'History') {
                                returnValue = <View style={{
                                    alignItems:"center"
                                }} > 
                                    <FontAwesome5 name="exchange-alt" size={18} color={focused ? iconColor : 'gray'} style={[{
                                        transform: [{rotate:"90deg"}]
                                    }]} />
                                    <Text style={{
                                    fontFamily:fonts.ManropeSemiBold,
                                    color: focused ? iconColor : 'gray',
                                    fontSize:size
                                }} >Trades</Text>
                                </View>
                                }

                            if (route.name === 'Profile') {
                                returnValue = <View style={{
                                    alignItems:"center"
                                }} > 
                                    <Entypo name="user" size={18} color={focused ? iconColor : 'gray'} />
                                    <Text style={{
                                    fontFamily:fonts.ManropeSemiBold,
                                    color: focused ? iconColor : 'gray',
                                    fontSize:size
                                }} >Profile</Text>
                                </View>
                                }   

                            // You can return any component that you like here!
                            return returnValue
                            },
                            tabBarActiveTintColor: colors.primary,
                            tabBarInactiveTintColor: 'gray',
                            }) 
                                        
                        }
            >
                <HomeStackScreen.Screen  name='Home_index' options={{
                    tabBarLabel:"Home",
                    headerShown:false,
                }} component={HomePage} />
                <HomeStackScreen.Screen name='Rate' component={RateHomePage} options={{
                    headerBackVisible:false,
                    headerShown:false,
                    headerShadowVisible:true,
                }} />
                <HomeStackScreen.Screen name='History' component={ HistoryPage } options={{
                    header: (props) => <View></View>
                }} />
                <HomeStackScreen.Screen name='Profile' component={ProfileHomePage} options={{
                    headerShown:false
                }} />
            </HomeStackScreen.Navigator> 
        );
      }



      const styles = StyleSheet.create({

        container:{
          flexDirection:"row",
          padding:10,
          justifyContent:'space-around',
          backgroundColor:"white"
        },
        link:{
          alignItems:"center",
          justifyContent:"space-between", 
          paddingTop:5
        },
        label:{
          fontSize:10, 
          color:"gray",
         fontFamily:'Rubik-Regular',
        }

      })







      // screenOptions={({route}) => ({
      //   tabBarIcon: ({focused,color,size}) => {
    //                       let iconName;
    //                       let iconColor;
    //                       let returnValue

    //                       if (route.name === 'Home_main') {
    //                       iconName = focused ? 'md-home' : 'md-home-outline';
    //                       iconColor = focused ? colors.primary : 'gray';
    //                       returnValue = <Ionicons name={iconName} size={size} color={iconColor} />;
    //                       }

    //                       // You can return any component that you like here!
    //                       return returnValue
    //                       },
    //                       tabBarActiveTintColor: colors.primary,
    //                       tabBarInactiveTintColor: 'gray',
    //                       }) 
                          
      //     }