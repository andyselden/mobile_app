import React, { PureComponent } from 'react';
import { StyleSheet, View, SafeAreaView, Dimensions, Button, Text, TextInput, Image } from 'react-native';

export default class SignIn extends PureComponent {
    static navigationOptions = {
        headerStyle: {
                display: 'none'
            },
    }

    render () {
        return (
        <View>
            <Text>SignInScreen</Text>
        </View>
        );
    }
}
