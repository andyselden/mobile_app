import React, { PureComponent } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import {Navigation} from 'react-native-navigation';

class FontAwesomeNavButton extends PureComponent {
    render() {
        const {
            icon, //Idea is that this is a react-native-fontawesome prop <FontAwesome>{Icons.cog}</FontAwesome>
            id, //Call via 'event.payload.id'
            ...props
        } = this.props

        return (
            <TouchableOpacity onPress={ ()=>Navigation.handleDeepLink({link: 'FontAwesomeNavButton', payload: { id }}) }>
                <View>
                  <Text>
                      { icon }
                  </Text>
                </View>
              </TouchableOpacity>
        );
    }
}

export default FontAwesomeNavButton
