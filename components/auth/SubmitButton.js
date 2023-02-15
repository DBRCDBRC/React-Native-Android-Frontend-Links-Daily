import React from "react";
import { Text, TouchableOpacity } from "react-native";

const SubmitButton = ({title, handleSubmit, loading}) => (
    <TouchableOpacity
    onPress={handleSubmit}
    style={{
        backgroundColor: "#ff9900",
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        marginHorizontal: 15,
        borderRadius: 24,

    }} ><Text style={{ 
        textAlign: "center"
        
    }}>{loading ? "Please Wait" : title}</Text>
</TouchableOpacity>
);

export default SubmitButton;