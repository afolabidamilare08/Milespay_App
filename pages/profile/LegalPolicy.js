import { Image, Text, View } from "react-native"
import { ViewDefault } from "../../components/layoutComponents"
import Logo from '../../assets/images/MainLogo.png';
import fonts from "../../config/fonts";

export const LegalPolicy = () => {

    return <ViewDefault>
        
            <View style={{
                alignItems:"center"
            }} >

                <Image source={Logo} style={{
                    width:60,
                    height:60,
                }} />

                <Text style={{
                    marginTop:10,
                    fontFamily:fonts.ManropeSemiBold,
                    fontSize:16
                }} > LEGAL AND POLICY </Text>

                <Text style={{
                    marginTop:10,
                    fontFamily:fonts.Regular,
                    fontSize:12
                }} > Term and conditions </Text>

            </View>

            <Text style={{
                marginTop:20,
                fontSize:12
            }} > EFFECTIVE: July 27,2002 </Text>


            <Text style={{
                marginTop:30,
                fontFamily:fonts.QuickRegular,
                fontSize:12
            }} >
                IMPORTANT, READ CAREFULLY : YOUR USE OF AND ACCESS TO THE WEBSITE 
                AND PRODUCTS AND SERVICES AND ASSOCIATED SOFTWARE (COLLECTIVELY, 
                THE “SERVICES”) OF TRU COMMUNICATIONS, INC. AND ITS AFFILIATES  
                IS CONDITIONED UPON YOUR COMPLIANCE WITH AND ACCEPTANCE OF THESE 
                TERMS, WHICH INCLUDE YOUR AGREEMENT TO ARBITRATE CLAIMS. PLEASE 
                REVIEW THOROUGHLY BEFORE ACCEPTING.
            </Text>

            <Text style={{
                marginTop:30,
                fontFamily:fonts.ManropeSemiBold,
                fontSize:12
            }} >

                BY CLICKING/CHECKING THE “I AGREE” BUTTON/BOX,
                BY THESE TERMS OF SERVICE AND ALL EXHIBITS, ORDER FORMS, 
                AND INCORPORATED POLICIES (THE “AGREEMENT” OR “TOS”). 
                THE TRU SERVICES ARE NOT AVAILABLE TO PERSONS WHO ARE 
                NOT LEGALLY ELIGIBLE TO BE BOUND BY THESE TERMS OF SERVICE.

            </Text>

            <Text style={{
                marginTop:40,
                fontFamily:fonts.QuickRegular,
                fontSize:12,
                marginBottom:70,
            }} >

                System Requirements. Use of the Services requires one or more compatible devices, 
                Internet access (fees may apply), and certain software (fees may apply), 
                and may require obtaining updates or upgrades from time to time. Because 
                use of the Services involves hardware, software, and Internet access, Your 
                ability to access and use the Services may be affected by the performance of 
                these factors. High speed Internet access is recommended. You acknowledge 
                and agree that such system requirements, which may be changed from time to 
                time, are Your responsibility.

                DEFINITIONS. The following definitions will apply in this Agreement, and any reference to the singular includes a reference to the plural and vice versa. Service specific definitions are found in the Services Description located at
                “Affiliate” means, with respect to a Party, any entity that directly or indirectly controls, is controlled by or is under common control with that Party. For purposes of this Agreement, “control” means an economic or voting interest of at least fifty percent (50%) or, in the absence of such economic or voting interest, the power to direct or cause the direction of the management and set er Form.
            </Text>

    </ViewDefault>

}