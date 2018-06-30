import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SafeAreaView, View } from 'react-native'

import { signIn, signUp, passwordReset } from '../../redux/actions/user'

import EmailSignInForm from '../molecules/EmailSignInForm'
import EmailSignUpForm from '../molecules/EmailSignUpForm'
import ForgotPasswordForm from '../molecules/ForgotPasswordForm'
import DropcornButton from '../atoms/DropcornButton'
import DropcornSpacer from '../atoms/DropcornSpacer'

class EmailAuthentication extends PureComponent {
    constructor(props){
        super(props)

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))

        this._toggleSignIn = this._toggleSignIn.bind(this)
        this._handleSignInRequest = this._handleSignInRequest.bind(this)
        this._toggleSignUp = this._toggleSignUp.bind(this)
        this._handleSignUpRequest = this._handleSignUpRequest.bind(this)
        this._toggleForgotPassword = this._toggleForgotPassword.bind(this)
        this._handleForgotPasswordRequest = this._handleForgotPasswordRequest.bind(this)

        this.state = { _active: 'SIGNIN' }
    }

    static propTypes = {
        signIn: PropTypes.func.isRequired,
        signUp: PropTypes.func.isRequired,
        passwordReset: PropTypes.func.isRequired
    }

  static navigatorStyle = {
  };

    static navigatorButtons = {
    leftButtons: [
      {
        id: 'back',
        showAsAction: 'always',
        systemItem: 'cancel'
      }
    ]
  };

   onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'back') {
          this.props.navigator.dismissModal()
      }
    }
  }

    _toggleSignIn(){
        this.setState({
            _active: 'SIGNIN'
        })
    }

    _handleSignInRequest(payload, actions){
        this.props.signIn(payload, actions)
    }

    _toggleSignUp(){
        this.setState({
            _active: 'SIGNUP'
        })
    }

    _handleSignUpRequest(payload, actions){
        this.props.signUp(payload, actions)
    }


    _toggleForgotPassword(){
        this.setState({
            _active: 'FORGOTPASSWORD'
        })
    }

    _handleForgotPasswordRequest(payload, actions){
        this.props.passwordReset(payload, actions)

    }

    render () {
       return (
          <SafeAreaView>
              { this.state._active == "SIGNIN" &&
                      <View>
                 <DropcornSpacer size="small"/>
                 <EmailSignInForm onSubmit={ this._handleSignInRequest } />
                 <DropcornSpacer size="large"/>
                 <DropcornButton
                     title="forgot password"
                     onPress={ this._toggleForgotPassword }
                     role="info"
                 />
                  <DropcornButton
                      title="or I need to create an account"
                      onPress={ this._toggleSignUp }
                      role="info"
                  />
              </View>
              }

            { this.state._active == "SIGNUP" &&
                <View>
                    <DropcornSpacer size="small"/>
                 <EmailSignUpForm onSubmit={ this._handleSignUpRequest } />
                 <DropcornSpacer size="large"/>
                 <DropcornButton
                     title="actually I have an account!"
                     onPress={ this._toggleSignIn }
                     role="info"
                 />
                </View>
              }

               { this.state._active == "FORGOTPASSWORD" &&
                <View>
                    <DropcornSpacer size="small"/>
                 <ForgotPasswordForm onSubmit={ this._handleForgotPasswordRequest } />
                 <DropcornSpacer size="large"/>
                 <DropcornButton
                     title="actually I remember my password!"
                     onPress={ this._toggleSignIn }
                     role="info"
                 />
                </View>
              }

          </SafeAreaView>
     );
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    signIn,
    signUp,
    passwordReset
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(EmailAuthentication)

