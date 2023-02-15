import React, { useContext } from "react";
import { View } from "react-native";
import { Text } from "react-native";
import FooterTabs from "../components/nav/FooterTabs";
import { AuthContext } from "../context/auth";
import { SafeAreaView } from "react-native";




const Home = () => {
    const [state, setState] = useContext(AuthContext);
    return(
        <SafeAreaView style={{ flex: 1}}>
            <Text>
                {JSON.stringify(state, null, 4)}
                
            </Text>
            <View style={{ flex: 1, justifyContent: "flex-end"}}>
            <FooterTabs />
            </View>
        </SafeAreaView>
    );

};


export default Home;