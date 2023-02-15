import React, { useState, useContext } from "react";
import { Text, View, ScrollView } from "react-native";
import SubmitButton from "../components/auth/SubmitButton";
import UserInput from "../components/auth/UserInput";
import axios from "axios";
import CircleLogo from "../components/auth/CircleLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Navigation } from "react-native-navigation";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../context/auth";

const Signin = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("");

    const [state, setState] = useContext(AuthContext);

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
                navigation.navigate("Account");

            }
        }
        catch (error) {
            console.log(err)
            setLoading(false);


        }
    };
    // const loadFromAsyncStorage = async () => {
    //     let data = await AsyncStorage.getItem("auth");
    //     // console.log("FROM ASYNC STORAGE=> ", data);
    // };
    // loadFromAsyncStorage();

    return (
        <KeyboardAwareScrollView

            contentContainerStyle={{ flex: 1, justifyContent: "center", marginVertical: 100 }}>
            <View style={{ marginVertical: 100 }}>

                <CircleLogo />


                <Text
                    style={{
                        fontSize: 24,
                        color: "#DC143C",
                        textAlign: "center"
                    }}
                >
                    Signin
                </Text>

                <UserInput name="EMAIL" value={email} setValue={setEmail}
                    autoCompleteType="email"
                    keyboardType="email-address"
                />
                <UserInput name="PASSWORD" value={password} setValue={setPassword}
                    secureTextEntry={true}
                    autoCompleteType="password"
                />

                <SubmitButton title="Sign In" handleSubmit={handleSubmit} loading={loading} />

                <Text style={{ justifyContent: "center", textAlign: "center" }}> Not a Member? <Text onPress={() => navigation.navigate("Signup")} style={{ color: "#ff2222" }}>Sign Up</Text></Text>
                <Text style={{ justifyContent: "center", textAlign: "center" }}> <Text style={{ color: "#ee7894" }}>Forgot Password</Text></Text>


            </View>

        </KeyboardAwareScrollView>
    );
};

export default Signin;