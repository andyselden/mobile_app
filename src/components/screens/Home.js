import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, Button, Text } from 'react-native'
import FontAwesome, { Icons } from 'react-native-fontawesome'

import {
    signOut
} from '../../redux/actions/user.js'

class Home extends PureComponent {
    constructor(props){
        super(props)

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this._goToSettings = this._goToSettings.bind(this)
    }

    static propTypes = {
        signOut: PropTypes.func.isRequired,
        signedIn: PropTypes.bool.isRequired
    }

    static navigatorButtons = {
        rightButtons: [
                 {
                 id: 'profileSettings',
                 component: 'DropcornApp.FontAwesomeNavButton', // This line loads our component as a nav bar button item
                 passProps: {
                     icon: <FontAwesome>{Icons.cog}</FontAwesome>,
                     id: 'profileSettings'
                 }
                 }
        ]
           };

    _goToSettings(){
        this.props.navigator.showModal({
            screen: 'DropcornApp.Settings',
            title: 'Settings'
        })
    }



    onNavigatorEvent(event) {
     if (event.type == 'DeepLink') {
         if(event.payload.id = 'profileSettings') {
        this.props.navigator.showModal({
            screen: 'DropcornApp.Settings',
            title: 'Settings'
        })

         }
      }
  }

    render () {
        return (
        <View>
            <Text>HomeScreen</Text>
            <Text> { this.props.signedIn ? 'logged in' : 'logged out' } </Text>
            <Button onPress={ this.props.signOut } title="Sign Out" color="#2C127D" accessibilityLabel="Sign out of your account"/>
            <Button onPress={ this._goToSettings } title="Settings" color="#2C127D" accessibilityLabel="Sign out of your account"/>
        </View>
        );
    }
}

const mapStateToProps = state => ({
    signedIn: state.user.signedIn
})

const mapDispatchToProps = {
    signOut
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
