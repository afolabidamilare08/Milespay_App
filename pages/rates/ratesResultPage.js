import { Text, View } from "react-native";
import {SelectList} from 'react-native-dropdown-select-list';
import { AnotherInput } from "../../components/inputsButtonsComponents";
import { ViewDefault } from "../../components/layoutComponents";


export const RateResultPage = () => {

    const data = [
        {key:'1',value:'Jammu & Kashmir'},
        {key:'2',value:'Google'},
        {key:'3',value:'Apple'},
        {key:'4',value:'Steam'},
        {key:'5',value:'Ebay'},
        {key:'6',value:'Best Buy'},
        {key:'7',value:'Xbox'},
        {key:'8',value:'Walmart'},
    ];

    return <ViewDefault style={{
        paddingTop:70
    }} >

                <SelectList setSelected={()=>{console.log("working")} } inputStyles={{
                    fontFamily:"Rubik-Bold",
                    fontSize:18
                }} placeholder="Select wallet Type" search={false} boxStyles={{
                    borderColor:"orange",
                    width:"100%",
                    marginBottom:20
                }} data={data} onSelect={()=>{console.log("working")}} />

                <AnotherInput placeholder={"Enter Amount in USD"} />

                <Text style={{
                    marginTop:60,
                    textAlign:"center",
                    fontFamily:"Rubik-Regular",
                    fontSize:16,
                    color:"#686869"
                }} > Amount you will recieve </Text>

                <Text style={{
                    marginTop:40,
                    textAlign:"center",
                    fontSize:40,
                    fontFamily:"Rubik-Bold"
                }} > N0.00 </Text>

                <Text style={{
                    marginTop:60,
                    textAlign:"center",
                    width:"50%",
                    marginLeft:"25%",
                    fontFamily:"Rubik-Regular",
                    fontSize:16,
                    color:"#686869",
                    paddingBottom:140
                }} >
                    Note: this is an estimated rate actual rate may differ
                </Text>

        
    </ViewDefault>

} 