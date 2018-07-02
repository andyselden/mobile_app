import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native'
import FontAwesome, { Icons } from 'react-native-fontawesome';


import DropcornSafeAreaView from '../atoms/DropcornSafeAreaView'
import DropcornButton from '../atoms/DropcornButton'
import DropSomethingButton from '../molecules/DropSomethingButton'


class Home extends PureComponent {
    constructor(props){
        super(props)

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this._goToSettings = this._goToSettings.bind(this)
        this._goToDropSomethingModal = this._goToDropSomethingModal.bind(this)
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

     _goToDropSomethingModal(){
        this.props.navigator.showModal({
            screen: 'DropcornApp.DropSomethingModal',
            navigatorStyle: {
                navBarHidden: true
            },
            screenBackgroundColor: 'transparent',
            modalPresentationStyle: 'overCurrentContext'
        })
    }




    render () {
        return (
            <DropcornSafeAreaView>
                <DropSomethingButton onPress={ this._goToDropSomethingModal } buttonText='Drop Something' />
            </DropcornSafeAreaView>
        );
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)


