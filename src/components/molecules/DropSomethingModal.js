import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Modal from "react-native-modal";
import {styles as s} from "react-native-style-tachyons";
import PropTypes from 'prop-types'

import DropSomethingOptions from './DropSomethingOptions'
import DropSomethingText from './DropSomethingText'

class DropSomethingModal extends PureComponent {
     constructor(props){
        super(props)

        this._goToOptionsRoot = this._goToOptionsRoot.bind(this)
        this._handleTextSubmit = this._handleTextSubmit.bind(this)
        this._handleFileButton = this._handleFileButton.bind(this)
        this._handleImageButton = this._handleImageButton.bind(this)
        this._handleClose = this._handleClose.bind(this)
        this._goToTextInput = this._goToTextInput.bind(this)

        this.state = { _activeModalAction: 'ROOT'}
    }

    static propTypes = {
        handleClose: PropTypes.func.isRequired,
    }


    _handleTextSubmit(inputValue){
        this.props.handleTextSubmit(inputValue)
    }

    _handleClose(){
        this.props.handleClose()
    }

    _goToOptionsRoot(){
        this.setState({
            _activeModalAction: 'ROOT'
        })
    }

    _handleFileButton(){
        this.props.handleFileButton()
    }

    _handleImageButton(){
        this.props.handleImageButton()
    }

    _goToTextInput(){
        this.setState({
            _activeModalAction: 'TEXT'
        })
    }

    render() {
        const {
            modalIsVisible,
            inputDefaultValue,
            ...props
        } = this.props

        return (
             <View>
                 <Modal
                     isVisible={ modalIsVisible }
                     onSwipe = { this._handleClose }
                     backdropOpacity= '0'
                     swipeDirection='down'
                     onBackdropPress = { this._handleClose }
                     style={[s.ml0, s.mr0, s.mb0]}
                >

                { this.state._activeModalAction == 'ROOT' ?
                        <DropSomethingOptions
                            handleFileButton={ this._handleFileButton }
                            handleImageButton={ this._handleImageButton }
                            handleTextButton={ this._goToTextInput }
                        />
                    :
                    <DropSomethingText handleBackButton={ this._goToOptionsRoot } handleSubmitButton={ this._handleTextSubmit } inputDefaultValue={ inputDefaultValue }/>
                }
               </Modal>
             </View>
        );
    }
}

export default DropSomethingModal
