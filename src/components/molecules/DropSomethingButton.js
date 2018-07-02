import React, { PureComponent } from 'react'
import { View, TouchableHighlight, Text } from 'react-native'
import {Navigation} from 'react-native-navigation';
import {styles as s} from "react-native-style-tachyons";

class DropSomethingButton extends PureComponent {
    render() {
        const {
            onPress,
            buttonText,
            ...props
        } = this.props

        return (
              <View style={[s.absolute, s.bottom_0, s.asc, s.w8]}>
                     <TouchableHighlight style={[s.w6, s.h3, s.bg_primary]} onPress={ onPress }>
                        <Text style={[s.tc, s.ff_bold, s.white, s.f3, s.mt2]}>
                            { buttonText }
                        </Text>
                     </TouchableHighlight>
                </View>
        );
    }
}

export default DropSomethingButton
