import React, { PureComponent } from 'react'
import { View } from 'react-native'
import {styles as s} from "react-native-style-tachyons";
import {
    FormInput,
    FormValidationMessage
} from 'react-native-elements'


class DropcornInput extends PureComponent {
    _handleChange = (value) => {
        this.props.onChange(this.props.name, value)
    }

    _handleTouch = () => {
        this.props.onTouch(this.props.name)
    }

    render() {
        const { placeholder, error, ...props } = this.props

        return (
            <View style={[ s.mb2, s.mt2 ]}>
                <FormInput
                    onChangeText={ this._handleChange }
                    onBlur={ this._handleTouch }
                    placeholder={ placeholder }
                    inputStyle={[ s.typography, s.ff_regular ]}
                    { ...props }
                />
                { error && <FormValidationMessage style={[ s.ff_light ]}>{ error }</FormValidationMessage> }
            </View>
        );
    }
}

export default DropcornInput