import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import {SelectList} from 'react-native-dropdown-select-list';
import { AntDesign,Ionicons,Feather } from '@expo/vector-icons';
import colors from "../config/colors";
import fonts from "../config/fonts";


const Altcoins = [
    {key:'1',value:'Solana'},
    {key:'2',value:'Dogecoin'},
    {key:'3',value:'Polkadot'},
    {key:'4',value:'Polygon'},
    {key:'5',value:'Avalanche'},
    {key:'6',value:'Litecoin'},
    {key:'7',value:'Cosmos'},
    {key:'8',value:'Stellar'},
];

const Networks = [
    {key:'1',value:'Bitcoin'},
    {key:'2',value:'Litecoin'},
    {key:'3',value:'Provenance'},
    {key:'4',value:'Primecoin'},
    {key:'5',value:'MazaCoin'},
];

const Accounts = [
    {key:'1',value:'2134545676'},
    {key:'2',value:'Litecoin'},
    {key:'3',value:'Provenance'},
    {key:'4',value:'Primecoin'},
    {key:'5',value:'MazaCoin'},
];

const data4 = [
    {key:'0',value:'Coinbase'},
    {key:'10',value:'Metamask'},
    {key:'25',value:'ZenGo'},
    {key:'50',value:'Exodus'},
    {key:'75',value:'Trust'},
    {key:'100',value:'Trezor'},
];

const FirstPart = () => {

    return (

        <>

                <SelectList setSelected={()=>{console.log("working")} } inputStyles={{
                    fontFamily:fonts.ManropeRegular,
                    fontSize:14,
                }} placeholder="Select Network" search={false} boxStyles={{
                    borderColor:"black",
                    borderWidth:0,
                    width:"55%",
                }} data={Networks} onSelect={()=>{console.log("working")}} /> 

                <Text style={{
                    marginTop:20,
                    fontSize:14,
                    fontFamily:fonts.ManropeRegular,
                    textAlign:"center"
                }} >Enter Amount in USD</Text>

                <View style={{
                    alignItems:"center",
                    flexDirection:"row",
                    justifyContent:"center",
                    marginTop:25,
                    alignSelf:"center",
                    width:"90%"
                }} >
                    <Text style={{
                        fontSize:40,
                        fontFamily:fonts.ManropeBold,
                        marginRight:10
                    }} >$</Text>
                    <TextInput style={{
                        // paddingLeft:10,
                        // padding:13,
                        textAlign:"center",
                        fontSize:40,
                        // minWidth:"80%",
                        // width:"50%",
                        borderRadius:13,
                        fontFamily:fonts.ManropeBold
                    }} placeholder="0" keyboardType="number-pad" />
                </View>

                <Text style={{
                    marginTop:20,
                    fontSize:14,
                    fontFamily:fonts.ManropeRegular,
                    textAlign:"center"
                }} >Min $100 - Max $10,00000</Text>  

                <Text style={{
                    marginTop:20,
                    fontSize:14,
                    fontFamily:fonts.ManropeRegular,
                    textAlign:"center"
                }} >Current Balance:  $10,000</Text>  


                <View style={{
                    marginTop:30,
                    flexDirection:"row",
                    justifyContent:"space-evenly"
                }} >

                    { data4.map( (well,index) => {
                        return <TouchableOpacity key={index} style={{
                                    backgroundColor:"lightgray",
                                    padding:8,
                                    borderRadius:15,
                                    // marginLeft:10
                                }} >
                                    <Text style={{
                                        fontFamily:fonts.ManropeRegular,
                                    }} >{well.key} %</Text>
                            </TouchableOpacity>
                    } ) }

                </View>

                <View style={{
                    marginTop:"40%"
                }} >

                </View>
    </>

    );

}

const SecoundPart = ({navigation}) => {

    return(

        <View>
            
            <View style={{
                borderColor:colors.lightBlue,
                borderWidth:1,
                width:"75%",
                alignSelf:"center",
                padding:10,
                borderRadius:8,
                backgroundColor:"#F7FAFE"
            }} >

                <Text style={{
                    textAlign:"center",
                    marginBottom:20,
                    fontFamily:fonts.ManropeRegular
                }} >Amount you will recieve</Text>
                <Text style={{
                    textAlign:"center",
                    fontSize:29,
                    fontFamily:fonts.ManropeBold
                }} >131,000.00</Text>

            </View>

            <Text style={{
                marginTop:38,
                fontSize:14,
                fontFamily:fonts.ManropeSemiBold,
                marginBottom:12
            }} >
                Wallet to Pay:
            </Text>

            <Text style={{
                fontFamily:fonts.ManropeRegular,
                fontSize:12,
                color:"#686869"
            }} > Tap to copy this address </Text>

            <Text style={{
                fontFamily:fonts.ManropeRegular,
                fontSize:12,
                color:"#686869",
                marginTop:5
            }} > Double tap QR code to save the image. </Text>


            <View style={{
                marginTop:39,
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"space-between"
            }} >

                <AntDesign name="qrcode" size={30}  color="black" />

                <View style={{  
                    flexDirection:"row",
                    justifyContent:"space-between",
                    padding:14,
                    alignItems:"center",
                    backgroundColor:"lightgray",
                    borderRadius:10,
                    width:"80%"
                }} >

                    <Text style={{
                        fontFamily:fonts.Regular,
                        fontSize:10,
                        // width:"40%"
                    }} >0xE0e544504Fc42f4C27a311785456...</Text>
                    <Text style={{
                        color:colors.primary,
                        fontFamily:"Rubik-Bold",
                        textAlign:"right",
                        fontSize:10,
                        marginLeft:20,
                    }} >Copy</Text>

                </View>

            </View>

            <View style={{
                marginTop:40,
                borderRadius:10,
                flexDirection:"row",
                alignItems:"center",
                // justifyContent:"center"
            }}>

                <Ionicons name="image" size={20} color="gray" style={{marginRight:20}} />
                <Text style={{
                    fontFamily:fonts.ManropeRegular,
                    fontSize:14
                }} >Upload Proof of Payment</Text>                

            </View>

            <View style={{
                borderBottomColor:"lightgray",
                borderBottomWidth:1,
                marginTop:20
            }} >

            </View>


            <Text style={{
                marginTop:18,
                fontFamily:fonts.ManropeRegular,
                fontSize:12,
                color:"#686869"
            }} >This is the account to recieve the naira equivalent </Text>

                <SelectList setSelected={()=>{console.log("working")} } inputStyles={{
                    fontFamily:fonts.ManropeRegular,
                    fontSize:14,
                }} placeholder="Select Account" search={false} boxStyles={{
                    borderColor:"black",
                    borderWidth:0,
                    width:"100%",
                    marginTop:20
                }} data={Accounts} onSelect={()=>{console.log("working")}} />

                <TouchableOpacity onPress={ () => navigation.navigate("add_bank_account") } style={{
                    flexDirection:"row",
                    marginTop:20,
                    justifyContent:"center",
                    alignItems:"center",
                }} >
                    <Feather name="plus" size={15} color={"gray"} />
                    <Text style={{
                        color:"gray",
                        fontFamily:fonts.ManropeRegular,
                        marginLeft:10,
                        fontSize:12
                    }} >Add New Account</Text>
                </TouchableOpacity>

        </View>

    );

}


const ThirdPart = () => {

    return(

        <>

            <Text style={{
                fontFamily:fonts.ManropeRegular,
                fontSize:15,
                color:"#686869",
                marginTop:50
            }} >Wallet address to pay </Text>


            <View style={{
                marginTop:29,
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center",
                borderBottomColor:"lightgray",
                borderBottomWidth:1,
                paddingBottom:30
            }} >

                <Text style={{
                    fontFamily:fonts.ManropeRegular,
                    width:"75%",
                    fontSize:12
                }} >0xE0e544504Fc42f4C27a3117860A40ddC9e2641Ea</Text>

                <TouchableOpacity style={{
                    // backgroundColor:"#EAF0FB",
                    padding:15,
                    borderRadius:8
                }} >
                    <Text style={{
                        color:colors.primary,
                        fontFamily:fonts.ManropeRegular,
                        fontSize:12
                    }} >Copy</Text>
                </TouchableOpacity>

            </View>

            
            <View style={{
                marginTop:29,
                flexDirection:"row",
                justifyContent:"space-between",
                // alignItems:"center",
                borderBottomColor:"lightgray",
                borderBottomWidth:1,
                paddingBottom:30
            }} >

                <View>

                    <Text style={{
                        fontFamily:fonts.ManropeRegular,
                        fontSize:14,
                        color:"#686869"
                    }} >Wallet address to pay </Text>

                    <Text style={{
                        fontFamily:fonts.ManropeSemiBold,
                        fontSize:14,
                        marginTop:5,
                        color:"#686869"
                    }} >N200,000.00 </Text>

                </View>

                <View style={{
                    width:"45%"
                }} >

                    <Text style={{
                        fontFamily:fonts.ManropeRegular,
                        fontSize:14,
                        color:"#686869"
                    }} >Bitcoin Value </Text>

                    <Text style={{
                        fontFamily:fonts.ManropeSemiBold,
                        fontSize:14,
                        marginTop:5,
                        color:"#686869",
                    }} >0.0548373636637573 </Text>

                </View>

            </View>

            <View style={{
                marginTop:29,
                flexDirection:"row",
                justifyContent:"space-between",
                // alignItems:"center",
                borderBottomColor:"lightgray",
                borderBottomWidth:1,
                paddingBottom:30
            }} >

                <View style={{
                    width:"45%"
                }}>

                    <Text style={{
                        fontFamily:fonts.ManropeRegular,
                        fontSize:14,
                        color:"#686869"
                    }} >Account to credit </Text>

                    <Text style={{
                        fontFamily:fonts.ManropeSemiBold,
                        fontSize:14,
                        marginTop:5,
                        color:"#686869"
                    }} >2923738234 </Text>

                    <Text style={{
                        fontFamily:fonts.ManropeRegular,
                        fontSize:12,
                        marginTop:5,
                        color:"#686869"
                    }} >STEPHEN JONES CHARELS </Text>

                </View>

                <View style={{
                    width:"45%"
                }} >

                    <Text style={{
                        fontFamily:fonts.ManropeRegular,
                        fontSize:14,
                        color:"#686869"
                    }} > Bank Name </Text>

                    <Text style={{
                        fontFamily:fonts.ManropeRegular,
                        fontSize:14,
                        marginTop:5,
                        color:"#686869",
                    }} >Zenith bank </Text>

                </View>

            </View>

        </>

    );

}

export {FirstPart,SecoundPart,ThirdPart}