import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, ImageBackground, Dimensions } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; 
import DashImg from '../assets/images/dest.jpg';
import HeaderImg from '../assets/images/Transaction.png';
import colors from '../config/colors';
import fonts from '../config/fonts';
import AppIntroSlider from "react-native-app-intro-slider";



 function Header({ navigation,title }) {

  return (
    <View style={styles.header}>
        
        <StatusBar backgroundColor={colors.specialblue} />

        <ImageBackground source={DashImg} style={{
            padding:30,
            // paddingTop:50
            paddingBottom:130,
            // borderColor:"red",
            // borderWidth:1
        }} >

            <View style={{
                height:50,
            }} >

            </View>

            <View style={{
                flexDirection:"row",
                justifyContent:"space-between"
            }} >

                <TouchableOpacity style={styles.header_left} onPress={() => navigation.goBack()} >
                    <AntDesign  name="arrowleft" style={styles.header_left_ic} size={20} /> 
                </TouchableOpacity>

                <Text style={{
                    color:"white",
                    fontFamily:"Rubik-Bold",
                    fontSize:16
                }} > {title} </Text>

                <AntDesign name="arrowleft" color={"rgba(217, 217, 217, 0)"} size={24} />

            </View>
            
        </ImageBackground>

    </View>
  );
}

const SimpleHeader = ({action,text}) => {

    return <View style={{
                marginTop:20,
                marginBottom:40,
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"space-between",
            }} >
                <TouchableOpacity onPress={action} >
                    <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
                <Text style={{
                    fontFamily:fonts.ManropeSemiBold,
                    fontSize:18,
                    color:"white"
                }} > {text} </Text>
                <MaterialCommunityIcons name="arrow-left" size={24} color={colors.transparent} />
            </View>

}

const TheRatesHeader = ({action,text,select,styles}) => {

    return <ImageBackground source={HeaderImg} style={[{
        // marginBottom:50,
        height: Dimensions.get('window').height * 0.2 
    },styles]} >
    
            <View style={{
                marginTop:20,
                // marginBottom:20,
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"space-between"
            }} >
                <TouchableOpacity onPress={action} >
                    <MaterialCommunityIcons name="arrow-left" size={24} color={colors.transparent} />
                </TouchableOpacity>
                <Text style={{
                    fontFamily:fonts.ManropeSemiBold,
                    fontSize:18,
                    color:"white"
                }} > {text} </Text>
                <MaterialCommunityIcons name="arrow-left" size={24} color={colors.transparent} />
            </View>

            <View style={{
                width:"100%",
            }} >
                {select}
            </View>

    </ImageBackground>

}

const SliderHeader = ({action,data,onSlideChange}) => {

    const OnboardingComponentTemplate = ({title}) => {

        return <TouchableOpacity style={{
            // backgroundColor:"green",
        }} >
            <Text style={{
                fontFamily:fonts.ManropeRegular,
                fontSize:20,
                color:"white",
                textAlign:"center"
            }} > {title} </Text>
        </TouchableOpacity>
    
      }

      const empty = () => {
        return <></>
      }

    return <View style={{
                marginTop:20,
                marginBottom:40,
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"space-between"
            }} >
                <TouchableOpacity onPress={action} >
                    <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
                <View style={{
                    width:"40%",
                    height:40
                }} >
                    <AppIntroSlider
                        keyExtractor={(item) => item.title}
                        renderDoneButton={empty}
                        renderNextButton={empty}
                        renderPrevButton={empty}
                        renderItem={({ item }) => { return <OnboardingComponentTemplate title={item.title} /> }}
                        onSlideChange={ onSlideChange }
                        dotStyle={styles.dotStyle}
                        activeDotStyle={styles.activeDotStyle}
                        data={data}
                        style={{
                            flex:1,
                        }}
                    />
                </View>
                <MaterialCommunityIcons name="arrow-left" size={24} color={colors.transparent} />
            </View>

}

function HeaderVersion2({ navigation,title }) {

    return (
      <View style={styles.headerversion2}>
          
          <StatusBar backgroundColor={colors.white} />
  
          <View style={{
              height:50,
          }} >
  
          </View>
  
          <View style={{
              flexDirection:"row",
              justifyContent:"space-between"
          }} >
  
              <TouchableOpacity style={styles.header_left} onPress={() => navigation.goBack()} >
                  <AntDesign  name="arrowleft" color={"black"} size={30} /> 
              </TouchableOpacity>
  
              <Text style={{
                  color:"white",
                  fontFamily:"Rubik-Bold",
                  fontSize:16
              }} > {title} </Text>
  
              <AntDesign name="arrowleft" color={"rgba(217, 217, 217, 0)"} size={24} />
  
          </View>
  
      </View>
    );
  }

  function HeaderVersion3({ navigation,title }) {

    return (
      <View style={styles.headerversion2}>
          
          <StatusBar backgroundColor={colors.white} />
  
          <View style={{
              height:50,
          }} >
  
          </View>
  
          <View style={{
              flexDirection:"row",
              justifyContent:"space-between"
          }} >
  
              <TouchableOpacity style={styles.header_left} onPress={() => navigation.goBack()} >
                  <AntDesign  name="arrowleft" color={"black"} size={30} /> 
              </TouchableOpacity>
  
              <Text style={{
                  color:"black",
                  fontFamily:"Rubik-Bold",
                  fontSize:16
              }} > {title} </Text>
  
              <AntDesign name="arrowleft" color={"rgba(217, 217, 217, 0)"} size={24} />
              
  
          </View>
  
      </View>
    );
  }

function RatesHeader({}) {

    
    return (
        <View style={styles.header}>
            
            <View style={{
                height:50,
            }} >
    
            </View>
    
            <View style={{
                flexDirection:"row",
                justifyContent:"center"
            }} >
    
                <Text style={{
                    color:"white",
                    fontFamily:"Rubik-Bold",
                    fontSize:16
                }} > Our Rates </Text>
                
    
            </View>
    
        </View>
      );

}

function HistoryHeader({}){

    return (
        <View style={styles.header}>
            
            <View style={{
                height:50,
            }} >
    
            </View>
    
            <View style={{
                flexDirection:"row",
                justifyContent:"center"
            }} >
    
                <Text style={{
                    color:"white",
                    fontFamily:"Rubik-Bold",
                    fontSize:20
                }} > Our Rates </Text>
                
    
            </View>

            <View style={{
                marginTop:40,
                flexDirection:"row",
                justifyContent:"space-between"
            }} >

                <TouchableOpacity> 
                     <Text style={{
                        fontFamily:"Rubik-Bold",
                        fontSize:15,
                        color:"white"
                     }} >Giftcards</Text>
                </TouchableOpacity>

                <TouchableOpacity> 
                     <Text style={{
                        fontFamily:"Rubik-Bold",
                        fontSize:15,
                        color:"#97999C"
                     }} >Bitcoins</Text>
                </TouchableOpacity>

                <TouchableOpacity> 
                     <Text style={{
                        fontFamily:"Rubik-Bold",
                        fontSize:15,
                        color:"#97999C"
                     }} >USDT</Text>
                </TouchableOpacity>

                <TouchableOpacity> 
                     <Text style={{
                        fontFamily:"Rubik-Bold",
                        fontSize:15,
                        color:"#97999C"
                     }} >ALT</Text>
                </TouchableOpacity>

                <TouchableOpacity> 
                     <Text style={{
                        fontFamily:"Rubik-Bold",
                        fontSize:15,
                        color:"#97999C"
                     }} >ETH</Text>
                </TouchableOpacity>


            </View>
    
        </View>
      );


}

function ViewDefault(props){

    return <ScrollView style={[{
        padding:30,
        backgroundColor:"white",
        flex:1,
    },props.style]} >

        {props.children}

    </ScrollView>

}


export {Header,RatesHeader,ViewDefault,HeaderVersion2,HeaderVersion3,SimpleHeader,SliderHeader,TheRatesHeader}

const styles = StyleSheet.create({

    header:{
        // width:"100%",
        // marginRight:10,
        backgroundColor:colors.specialblue,
        // padding:20,

        ...Platform.select({
            ios: {
              shadowColor: "rgba(0,0,0)",
              shadowOpacity: 0.5,
              shadowRadius: 5
            },
            android: {
              elevation: 5
            },
          }),
    },
    headerversion2:{
        // width:"100%",
        // marginRight:10,
        backgroundColor:"white",
        padding:20,

        ...Platform.select({
            ios: {
              shadowColor: "rgba(0,0,0)",
              shadowOpacity: 0.5,
              shadowRadius: 5
            },
            android: {
              elevation: 5
            },
          }),
    },

    header_left_ic:{
        color:"white", 
    },

    dotStyle: {
        marginTop:90,
        backgroundColor: "#D9D9D9"
      },
    
      activeDotStyle: {
        marginTop:90,
        backgroundColor:"#00D2FF"
      },

})


