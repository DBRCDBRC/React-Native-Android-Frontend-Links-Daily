import React, { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import SubmitButton from "../components/auth/SubmitButton";
import UserInput from "../components/auth/UserInput";
import axios from "axios";
import CircleLogo from "../components/auth/CircleLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { API } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("");

    const handleSubmit = async () => {

        setLoading(true)
        if (!name || !email || !password) {
            alert("All fields are required");
            setLoading(false);
            return;
        }
        //   console.log("SIGN UP REQUEST => ", name, email, password);
        try {
            const { data } = await axios.post(`/signup`,
                {
                    name,
                    email,
                    password,
                });
            if (data.error) {
                alert(data.error);
                setLoading(false);
            } else {
                await AsyncStorage.setItem('@auth', JSON.stringify(data));
                setLoading(false);
                console.log("SIGN IN SUCESS => ", data);
                alert('Sign up Success')

            }
        }
        catch (error) {
            console.log(error)
            setLoading(false);


        }
    }

    return (
        <ScrollView

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
                    Signup
                </Text>
                <UserInput name="NAME" value={name} setValue={setName}
                    autoCapitalize="words"
                    autoCorrect={false}
                />
                <UserInput name="EMAIL" value={email} setValue={setEmail}
                    autoCompleteType="email"
                    keyboardType="email-address"
                />
                <UserInput name="PASSWORD" value={password} setValue={setPassword}
                    secureTextEntry={true}
                    autoCompleteType="password"
                />

                <SubmitButton title="Sign Up" handleSubmit={handleSubmit} loading={loading} />

                <Text style={{ justifyContent: "center", textAlign: "center" }}> Already Joined?
                    <Text onPress={() => navigation.navigate("Signin")} style={{ color: "#ff2222" }}>Sign In</Text></Text>

            </View>

        </ScrollView>
    );
};

export default Signup;