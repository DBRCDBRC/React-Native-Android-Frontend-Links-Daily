import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useRoute } from "@react-navigation/native";
import { Divider } from "react-native-elements";




export const IconTab = ({ name, text, handlePress, screenName, routeName }) =>{
   const activeScreenColor = screenName === routeName && "orange";
   
    return (
        <TouchableOpacity onPress={handlePress}>
            
                <FontAwesome5 name={name}
                    size={25}
                    style={{
                        marginBottom: 3,
                        alignSelf: "center"
                    }}
                    color={activeScreenColor}
                />
    
    <>
      <Text>{text}</Text>
            </>
        </TouchableOpacity>
    
    );
};

export default function FooterTabs() {
    const navigation = useNavigation();
    const route = useRoute();
    
    return (
        <>
        <Divider width={1}/>
        
        <View 
        style={{ 
            flexDirection: "row", 
            margin: 10, 
            marginHorizontal: 30, 
            justifyContent: "space-between", }}
            >
         <IconTab text="Home" name="home" handlePress={()=> navigation.navigate("Home")} screenName="Home" routeName={route.name}/>
         <IconTab text="Post" name="plus-square"handlePress={()=> navigation.navigate("Post")} screenName="Post" routeName={route.name}/>
         <IconTab text="Links" name="list-ol" handlePress={()=> navigation.navigate("Links")} screenName="Links" routeName={route.name}/>
         <IconTab text="Account" name="user" handlePress={()=> navigation.navigate("Account")} screenName="Account" routeName={route.name}/>
                 </View>
                 </>
    );
}
