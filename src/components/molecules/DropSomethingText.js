import React, { PureComponent } from 'react'
import {Platform, ScrollView, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, Dimensions } from "react-native";
import {styles as s} from "react-native-style-tachyons";
import FontAwesome, { Icons } from 'react-native-fontawesome';
import PropTypes from 'prop-types'

class DropSomethingText extends PureComponent {
    constructor(props){
        super(props)

        this._handleBackButton = this._handleBackButton.bind(this)
        this._handleSubmitButton = this._handleSubmitButton.bind(this)
        this.state = { _inputValue: this.props.inputDefaultValue ? this.props.inputDefaultValue : 'test'}
    }

    static propTypes = {
        handleBackButton: PropTypes.func.isRequired,
        handleSubmitButton: PropTypes.func.isRequired,
        inputDefaultValue: PropTypes.string.isRequired,
    }


    _handleBackButton() {
        this.props.handleBackButton()
    }


    _handleSubmitButton(){
        this.props.handleSubmitButton(this.state._inputValue)
        this.setState({
            _inputValue: ''
        })
    }

    render() {
    return(
        <KeyboardAvoidingView behavior="padding" >
        <View style={[s.flx_row, s.bg_white, s.b, s.b__primary ]}>
            <Text style={[s.f4, s.ml2, s.w2, s.mt2, s.tc, s.typography_60 ]} onPress={ this._handleBackButton }>
          <FontAwesome>{Icons.arrowLeft}</FontAwesome>
        </Text>
        <TextInput
          autoFocus
          multiline={true}
          lines={20}
          selectTextOnFocus={true}
          onChangeText={value => this.setState({ _inputValue: value })}
          style={[s.flx_i, s.ml3, s.mr2, s.mt2 ]}
          placeholder={'link, paragraph, or love letter...'}
          defaultValue= { this.state._inputValue }
        />
                { String.prototype.trim.call(this.state._inputValue)  == '' ?
                <Text style={[s.f3, s.typography_70, s.mr3, s.ml2, s.mt2 ]} >
                    <FontAwesome>{Icons.paperPlaneO}</FontAwesome>
                </Text>
                :
                <Text style={[s.f3, s.primary, s.mr3, s.ml2, s.mt2 ]} onPress={ this._handleSubmitButton }>
                    <FontAwesome>{Icons.paperPlane}</FontAwesome>
                </Text>
                }
                </View>
        </KeyboardAvoidingView>
    );
    }
}

export default DropSomethingText
