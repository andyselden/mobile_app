import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, Dimensions, Button, Text, TextInput, Image } from 'react-native';

export default class SignUp extends Component {
    static navigationOptions = {
        headerStyle: {
                display: 'none'
            },
    }

    render () {
        return (
        <View>
            <Text>SignUpScreen</Text>
        </View>
        );
    }
}
