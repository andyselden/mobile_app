import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native'
import FontAwesome, { Icons } from 'react-native-fontawesome';

import { addTextItemToKernel } from '../../redux/actions/kernel'

import DropcornSafeAreaView from '../atoms/DropcornSafeAreaView'
import DropcornButton from '../atoms/DropcornButton'
import DropSomethingButton from '../molecules/DropSomethingButton'
import DropSomethingModal from '../molecules/DropSomethingModal'

class Home extends PureComponent {
    constructor(props){
        super(props)

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this._goToSettings = this._goToSettings.bind(this)
        this._showDropSomethingModal = this._showDropSomethingModal.bind(this)
        this._hideDropSomethingModal = this._hideDropSomethingModal.bind(this)

        this._handleTextSubmit = this._handleTextSubmit.bind(this)
        this.state = { _modalIsVisible:false }
    }

    static propTypes = {
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

    onNavigatorEvent(event) {
     if (event.type == 'DeepLink') {
         if(event.payload.id == 'profileSettings') {
        this.props.navigator.showModal({
            screen: 'DropcornApp.Settings',
            title: 'Settings'
        })
         }
      }
    }


    _goToSettings(){
        this.props.navigator.showModal({
            screen: 'DropcornApp.Settings',
            title: 'Settings'
        })
    }

    _showDropSomethingModal(){
        this.setState({
          _modalIsVisible:true
        })
    }

    _hideDropSomethingModal(){
        this.setState({
          _modalIsVisible:false
        })

    }

    _handleTextSubmit(){
        this.props.addTextItemToKernel('andrewscool')
    }

    render () {
        return (
            <DropcornSafeAreaView>
                <DropSomethingButton onPress={ this._showDropSomethingModal } buttonText='Drop Something' />
                <DropSomethingModal
                    modalIsVisible={ this.state._modalIsVisible }
                    handleClose={ this._hideDropSomethingModal }
                    handleTextSubmit={ this._handleTextSubmit }
                />
            </DropcornSafeAreaView>
        );
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    addTextItemToKernel
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)


