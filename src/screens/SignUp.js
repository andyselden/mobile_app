import React, { PureComponent } from 'react';
import { StyleSheet, View, SafeAreaView, Dimensions, Button, Text, TextInput, Image } from 'react-native';

export default class SignUp extends PureComponent {
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
