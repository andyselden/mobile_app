import React, { PureComponent } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import {Navigation} from 'react-native-navigation';
import {styles as s} from "react-native-style-tachyons";

class FontAwesomeNavButton extends PureComponent {
    render() {
        const {
            icon, //Idea is that this is a react-native-fontawesome prop <FontAwesome>{Icons.cog}</FontAwesome>
            id, //Call via 'event.payload.id'
            visible=true,
            ...props
        } = this.props

        return (
            <TouchableOpacity onPress={ ()=>Navigation.handleDeepLink({link: 'FontAwesomeNavButton', payload: { id }}) }>
                <View>
                    { visible ?
                            <Text style={[s.f5, s.typography_60]}>
                                { icon }
                            </Text>
                            :
                            <Text></Text>
                    }
                </View>
              </TouchableOpacity>
        );
    }
}

export default FontAwesomeNavButton
