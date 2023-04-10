import { StatusBar, Text, TouchableOpacity, Alert, Modal, View, StyleSheet, ImageBackground, ScrollView, Dimensions, Image, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons,AntDesign,MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';


const ModalSection = ({modalVisible,closeModal,content}) => {

    return(


    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
    >

        <View style={styles.centeredView}>

            <ScrollView contentContainerStyle={{
                // alignItems:"center"
            }} style={styles.modalView}>

                <View style={{
                    alignItems:"flex-end",
                    width:"100%",
                }} >
                    <TouchableOpacity onPress={closeModal} >
                        <AntDesign name="close" size={19} color="black" />
                    </TouchableOpacity>
                </View>

                {content}

            </ScrollView>


        </View>

        </Modal>

    );

}


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
    //   marginTop: 22,
      backgroundColor:"rgba(2, 2, 2, 0.59)"
    },
    modalView: {
        padding:30,
        position:"absolute",
        bottom:0,
        // alignItems:"center",
        backgroundColor:"white",
        width:"100%",
        // height:"60%",
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    //   margin: 20,
    //   backgroundColor: "white",
    //   borderRadius: 20,
    //   padding: 35,
    //   alignItems: "center",
    //   shadowColor: "#000",
    //   shadowOffset: {
    //     width: 0,
    //     height: 2
    //   },
    //   shadowOpacity: 0.25,
    //   shadowRadius: 4,
    //   elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

  export { ModalSection }