import React from "react";
import { View, Text } from "react-native";
import FooterTabs from "../components/nav/FooterTabs";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Links () {

    return(
        <SafeAreaView style={{ flex: 1}}>
        <Text>
            Links Screen
            
        </Text>
        <View style={{ flex: 1, justifyContent: "flex-end"}}>
        <FooterTabs />
        </View>
    </SafeAreaView>
    );
};