import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, Button, Text } from 'react-native';

import {
    login
} from '../redux/actions/authentication.js'

class Splash extends Component {
    static propTypes = {
        login: PropTypes.func.isRequired,
        loggedIn: PropTypes.bool.isRequired
    }

    render () {
         const {
             login,
             loggedIn
        } = this.props

        return (
        <View>
            <Text>Splash Page</Text>
            <Text> { loggedIn ? 'logged in' : 'logged out' } </Text>
            <Button onPress={ ()=> login('testing@gmail.com', 'testing123') } title="Sign In" color='#2C127D' accessibilityLabel="Sign into Your Account"/>
        </View>
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

