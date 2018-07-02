import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SafeAreaView, View } from 'react-native'

import SettingsForm from '../molecules/SettingsForm'
import { updateProfile, signOut } from '../../redux/actions/user'
import { userActionTypes } from '../../redux/constants/actionTypes'
import DropcornButton from '../atoms/DropcornButton'
import DropcornSpacer from '../atoms/DropcornSpacer'

class Settings extends PureComponent {
  constructor(props){
        super(props)

        this._handleUpdateProfileRequest  = this._handleUpdateProfileRequest.bind(this)
        this._handleSignOutRequest  = this._handleSignOutRequest.bind(this)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    }

    static propTypes = {
    }

    static navigatorButtons = {
        leftButtons: [
        {
           id: 'back',
           showAsAction: 'always',
           systemItem: 'cancel'
        }]
    };

   onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'back') {
          this.props.navigator.dismissModal()
      }
    } else if(event.type == 'DeepLink'){
        if(event.payload.id == userActionTypes.UPDATEPROFILE.FULFILLED)
        {
            this.props.navigator.dismissModal()
       }
    }
  }

    _handleUpdateProfileRequest(payload, actions){
        this.props.updateProfile(payload, actions)
    }

    _handleSignOutRequest(){
        this.props.signOut()
    }

    render () {
        const {
            user
        } = this.props

        return (
            <SafeAreaView>>
                 <SettingsForm onSubmit={ this._handleUpdateProfileRequest } displayName={ (user != null ? user.displayName : null) } email={ user != null ? user.email : null } />
                 <DropcornSpacer size='large'/>
                 <DropcornButton
                     title="Sign Out"
                     onPress={ this._handleSignOutRequest }
                     role="secondary"
                 />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user
})

const mapDispatchToProps = {
    updateProfile,
    signOut
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(Settings)
