import { Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import TheSplash from '../assets/images/TheSplash.jpg';
import Group from '../assets/images/group.png';
import GiftCard from '../assets/images/thegift.png';
import mainLogo from '../assets/images/MainLogo.png';
import lady from '../assets/images/lady.png';
import colors from "../config/colors";
import {AntDesign} from '@expo/vector-icons'; 
import fonts from "../config/fonts";



const OnboardingComponent = ({navigation}) => {


  const OnboardingComponentTemplate = ({image,narrate,title,well}) => {

    return <View style={styles.sub} >
 
              <Image source={image} style={{
                      width:300 ,
                      height:300,
                      marginTop:20,
                      alignSelf:"center"
              }} />

              <View style={{
                height:500,
                marginTop:-120
              }} >

                    <View style={{
                      padding:30,
                      marginTop:110
                    }} >
                      <Text style={styles.main_text} >{title}</Text>
                      <Text style={[styles.sub_text,{
                        width: well ? "70%" : "100%" ,
                        alignSelf:"center"
                      }]} >{narrate}</Text>
                    </View>

              </View>

          </View>

  }


    const data = [
        {
          title:"page0",
          display: <OnboardingComponentTemplate 
                      image={GiftCard}
                      narrate="An ideal platform to easily convert your Giftcards and get paid in Naira swiftly."
                      title="Convert your GiftCards" />
        },
        {
          title:"page1",
          display: <OnboardingComponentTemplate 
                    image={lady}
                    well
                    narrate="Exchange your Bitcoin, Eth, Usdt & Others for good Naira value."
                    title="Trading Bitcoin & Other Digital Assets" />
        },
        {
          title:"page2",
          display: <OnboardingComponentTemplate 
                    image={Group}
                    narrate="Extra layered security, which ensures a fast & reliable transaction."
                    title="Highly Secured & Swift Cashout"  />
        },
    ]

    // const firstScreen ;

    const keyExtractor = (item) => item.title;

    const renderItem = ({ item }) => { return item.display }
    
    const renderDoneButton = () => {
      return (
          <View style={styles.rightTextWrapper}>
          <Text style={{
              color:"white",
              fontFamily:fonts.Regular,
              fontSize:10
          }} > Done </Text>
        </View>
      );
    };
    
    const renderNextButton = () => {
      return (
        <View style={styles.rightTextWrapper}>
          <AntDesign name="right" size={20} color={"white"} />
        </View>
      ); 
    };
    
    const renderPrevButton = () => {
      return (
      <View style={styles.rightTextWrapper}>
          <AntDesign name="left" size={20} color={"white"} />
        </View>
      );
    };
  
    const handleDone = () => {
      navigation.navigate('Authmainpage')
    }
    


    return(
            <>
            <StatusBar backgroundColor={"#0043BC"} />

              <ImageBackground source={TheSplash} style={{
                flex:1
              }} >

                  <View style={{
                    padding:30, flexDirection:"row", 
                    alignItems:"center", justifyContent:"space-between"
                  }} >
                    
                      <View style={{
                        flexDirection:"row", alignItems:"center"
                      }} >

                          <Image source={mainLogo} style={{
                            width:40, height:40
                          }} />

                            <Text style={{
                              fontFamily:fonts.Regular, color:"white"
                            }} > MilesPay </Text>

                      </View>

                      <TouchableOpacity onPress={ () => navigation.navigate("Authmainpage") } >

                        <Text style={{
                          fontFamily:fonts.Bold,
                          color:"white"
                        }}>Skip </Text>
                        
                      </TouchableOpacity>

                  </View>

                  <AppIntroSlider
                      keyExtractor={keyExtractor}
                      renderItem={renderItem}
                      renderDoneButton={renderDoneButton}
                      renderNextButton={renderNextButton}
                      renderPrevButton={renderPrevButton}
                      showPrevButton
                      // onSlideChange={ (index) => {
                      //     console.log(index)
                      // } }
                      dotStyle={styles.dotStyle}
                      activeDotStyle={styles.activeDotStyle}
                      data={data}
                      onDone={handleDone}
                      style={{
                          flex:1,
                      }}
                  />

              </ImageBackground>

            </>
    );

}

export default OnboardingComponent;


const styles = StyleSheet.create({
    main:{
        flex: 1,
        alignItems: 'center',
        borderColor:"red",
        borderWidth:14,
    },  
    sub:{
        backgroundColor:colors.specialblue
    } ,
    sub_image:{
        marginTop:110,
        width:250,
        height:250
    },
    main_text:{
        fontSize:20,
        textAlign:"center",
        color:"white",
        fontFamily:fonts.ManropeBold
    },
    sub_text:{
        textAlign:"center",
        marginTop:17,
        fontSize:15,
        fontFamily:fonts.ManropeRegular,
        color:"white",
    },
    dotStyle: {
        backgroundColor: "#D9D9D9"
      },
    
      activeDotStyle: {
        backgroundColor:"#00D2FF"
      },
      rightTextWrapper:{
        backgroundColor:colors.lightBlue,
        width:40,
        height:40,
        borderRadius:400,
        justifyContent:"center",
        alignItems:"center"
      },
})