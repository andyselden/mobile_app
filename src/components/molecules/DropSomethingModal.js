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
        this._goToTextInput = this._goToTextInput.bind(this)

        this.state = { _activeModalAction: 'ROOT'}
    }

    static propTypes = {
        handleClose: PropTypes.func.isRequired,
    }


    _handleTextSubmit = (inputValue) => {
        this.props.handleTextSubmit(inputValue)
    }

    _handleClose = () => {
        this.props.handleClose()
    }

    _goToOptionsRoot(){
        this.setState({
            _activeModalAction: 'ROOT'
        })
    }

    _handleImageButton = () => {
        this.props.handleImageButton()
    }

    _goToTextInput(){
        this.setState({
            _activeModalAction: 'TEXT'
        })
    }

    readFromClipboard = async () => {
        const message = await Clipboard.getString();
        this.setState({ message });
    };


    render() {
        const {
            modalIsVisible,
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
                            handleTextButton={ this._goToTextInput }
                            handleImageButton={ this._handleImageButton }
                        />
                    :
                    <DropSomethingText handleBackButton={ this._goToOptionsRoot } handleSubmitButton={ this._handleTextSubmit } inputDefaultValue=''/>
                }
               </Modal>
             </View>
        );
    }
}

export default DropSomethingModal
