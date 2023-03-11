import React from "react";
import {Text, SafeAreaView, StyleSheet} from "react-native";

export default class Terms extends React.Component {
    render() {
        return (
        <SafeAreaView>
            <Text style={styles.container}> Terms of Use and Privacy Policy </Text>
        </SafeAreaView>   
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 350,
        textAlign: 'center',
        fontSize: 15,
    },
});
