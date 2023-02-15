import React, { useState, useContext, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import SubmitButton from "../components/auth/SubmitButton";
import UserInput from "../components/auth/UserInput";
import axios from "axios";
import CircleLogo from "../components/auth/CircleLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Navigation } from "react-native-navigation";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../context/auth";
import FooterTabs from "../components/nav/FooterTabs";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";


const Account = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [image, setImage] = useState({ url: 'https://cdn.pixabay.com/photo/2023/02/08/15/10/sculpture-7776861_960_720.jpg',
public_id: ""});
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("");

    const [state, setState] = useContext(AuthContext);

    useEffect(() => {
        if (state) {
            const { name, email, image } = state.user;
            setName(name);
            setEmail(email);
            setRole(role);
        }

    }, [state]);

    const handleSubmit = async () => {
        setLoading(true)
        if (!email || !password) {
            alert("All fields are required");
            setLoading(false);
            return;
        }
        console.log("SIGN IN REQUEST => ", email, password);
        try {
            const { data } = await axios.post(`/signin`,
                {
                    email,
                    password,
                });
            if (data.error) {
                alert(data.error);
                setLoading(false);
            } else {
                setState(data);
                await AsyncStorage.setItem("@auth", JSON.stringify(data));
                setLoading(false);
                console.log("SIGN IN SUCESS => ", data);
                alert('Sign in Success');
                navigation.navigate("Home");

            }
        }
        catch (error) {
            console.log(err)
            setLoading(false);


        }
    };
    

    const handleUpload = () => {

        //
    };

    return (
        <KeyboardAwareScrollView

            contentContainerStyle={{ flex: 1, justifyContent: "center", marginVertical: 100 }}>
            <View style={{ marginVertical: 100 }}>

                <CircleLogo>
                    {image && image.url ? (<Image source={{ uri: image.url }}
                        style={{ width: 190, height: 190, borderRadius: 100, marginVertical: 50 }} />)
                         : (
                         <TouchableOpacity onPress={() => handleUpload()}>
                                <FontAwesome5Icon name="camera" size={50} color="orange"/>
                         </TouchableOpacity>
                         )}
                </CircleLogo>


                <Text
                    style={{
                        fontSize: 50,
                        paddingBottom: 10,
                        textAlign: "center"
                    }}
                >
                    {name}
                </Text>

                <Text
                    style={{
                        fontSize: 24,
                        paddingBottom: 10,
                        textAlign: "center"
                    }}
                >
                    {email}
                </Text>

                <Text
                    style={{
                        fontSize: 24,
                        paddingBottom: 10,
                        textAlign: "center"
                    }}
                >
                    {role}
                </Text>


                <UserInput name="PASSWORD" value={password} setValue={setPassword}
                    secureTextEntry={true}
                    autoCompleteType="password"
                />

                <SubmitButton title="Update Password" handleSubmit={handleSubmit} loading={loading} />



            </View>

            
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <FooterTabs />

            </View>
        </KeyboardAwareScrollView>
        
    );
};

export default Account;