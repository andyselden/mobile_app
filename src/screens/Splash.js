import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {styles as s} from "react-native-style-tachyons";
import { SafeAreaView, View, Text } from 'react-native';
import { Button } from 'react-native-elements';

import {
    login
} from '../redux/actions/authentication.js'

class Splash extends PureComponent {
    static propTypes = {
        login: PropTypes.func.isRequired,
        loggedIn: PropTypes.bool.isRequired
    }

    render () {
        console.log('Splash Screen Rendered')
         const {
             login,
             loggedIn
        } = this.props

        return (
        <SafeAreaView style={[ s.flex_i, s.bg_white ]}>
            <View style={[ s.mt6 ]}></View>
            <View style={[ s.ml3, s.mr3]}>
            </View>
            <View>
                <Text>Splash Page</Text>
                <Text> { loggedIn ? 'logged in' : 'logged out' } </Text>
                <Button onPress={ ()=> login('testing@gmail.com', 'testing123') } title="Sign In" color='#2C127D' accessibilityLabel="Sign into Your Account"/>
            </View>
        </SafeAreaView>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.authentication.loggedIn
})

const mapDispatchToProps = {
    login
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(Splash)

