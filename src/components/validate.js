import 'react-native-gesture-handler';
import { TouchableOpacity } from "react-native";
import Checkbox from "./checkbox";
import FlatButton from "./continuar";
import React, { useState } from "react";
import { View } from "react-native";

export default function Validate() {

    const [isSelected, setSelection] = useState(false);

    return (
        <TouchableOpacity onPress={() => setSelection(!isSelected)}>
            {isSelected ? (<FlatButton onPress={() => this.props.navigation.navigate('Terms')} />) : null}
        </TouchableOpacity>
    );
}