import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SafeAreaView, View } from 'react-native'

import ProfileForm from '../molecules/ProfileForm'
import { updateProfile } from '../../redux/actions/user'

class Settings extends PureComponent {
  constructor(props){
        super(props)

        this._handleUpdateProfileRequest  = this._handleUpdateProfileRequest.bind(this)
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
    }
  }

    _handleUpdateProfileRequest(payload, actions){
        this.props.updateProfile(payload, actions)
    }





    render () {
        const {
            user
        } = this.props

        return (
            <SafeAreaView>>
                 <ProfileForm onSubmit={ this._handleUpdateProfileRequest } displayName={ user.displayName } email={ user.email } />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user
})

const mapDispatchToProps = {
    updateProfile
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(Settings)

