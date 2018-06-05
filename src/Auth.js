import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, Text, Button } from 'react-native';

import {
  login,
  logout
} from './redux/actions/login.js'

class Auth extends PureComponent {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    user: PropTypes.object
  }

    static navigationOptions = {
        headerStyle: {
                display: 'none'
            },
    }

    render () {
         const {
             login,
             logout
        } = this.props


        return (
        <View>
            <Text>Auth</Text>
            <Text>User: {this.props.user ? this.props.user.email : 'none'}</Text>
            <Text>Logged In State: { this.props.loggedIn ? 'yes' : 'no' }</Text>
            <Text>Loading: { this.props.loading ? 'yes' : 'no' }</Text>
            <Button onPress={ ()=> login('testing@gmail.com', 'testing123') } title="Sign In" color='#2C127D' accessibilityLabel="Sign into Your Account"/>
            <Button onPress={ logout } title="Sign Out" color='#2C127D' accessibilityLabel="Sign into Your Account"/>
        </View>
        );
    }
}


const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn,
  loading: state.login.loading,
  user: state.login.user,
  email: state.login.email,
  password: state.login.password
})

const mapDispatchToProps = {
  login,
  logout
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth)
