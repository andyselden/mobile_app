import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, Button, Text } from 'react-native';

import {
    logout
} from '../redux/actions/authentication.js'

class Home extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired,
        loggedIn: PropTypes.bool.isRequired
    }

    render () {
        return (
        <View>
            <Text>HomeScreen</Text>
            <Text> { this.props.loggedIn ? 'logged in' : 'logged out' } </Text>
            <Button onPress={ this.props.logout } title="Sign Out" color="#2C127D" accessibilityLabel="Sign out of your account"/>
        </View>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.authentication.loggedIn
})

const mapDispatchToProps = {
    logout
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
