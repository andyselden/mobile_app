import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, Dimensions, Button, Text, TextInput, Image } from 'react-native';

export default class Splash extends Component {
    static navigationOptions = {
        headerStyle: {
                display: 'none'
            },
    }

    render () {
        return (
        <View>
            <Text>SplashScreen</Text>
        </View>
        );
    }
    //    signIn = () => {
    //        this.props.navigation.navigate('SignIn');
    //    }
    //
    //    signUp = () => {
    //        this.props.navigation.navigate('SignUp');
    //    }
    //  render() {
    //    return (
    //        <SafeAreaView style={[s.flx_i, s.bg_white]}>
    //            <View style={[s.ml3, s.mr3]}>
    //            <Image source={require('./assets/img/primary_logo_2x.png')} style={[s.max_w4, s.max_h4, s.asc, s.mt6]} />
    //            <Text style={[s.primary, s.mt4, s.asc, s.ff_regular, s.f4, s.tc]}><Text style={[s.ff_logo, s.f4]}>DROPCORN</Text> lets you easily drop anything digital to anyone around you</Text>
    //        </View>
    //            <View style={[s.absolute, s.bottom_0, s.min_w8, s.asc]}>
    //                <View style={[s.flx_row, s.mb3]}>
    //            <View style={[{marginRight: Dimensions.get('window').width * 0.175}]}>
    //                <Button onPress={this.signUp} title="Sign Up" color='#141414' accessibilityLabel="Become a New User"/>
    //            </View>
    //            <View style={[{marginLeft: Dimensions.get('window').width * 0.175}]}>
    //                <Button onPress={this.signIn} title="Sign In" color='#2C127D' accessibilityLabel="Sign into Your Account"/>
    //            </View>
    //                </View>
    //            </View>
    //      </SafeAreaView>
    //    );
    //  }
}

