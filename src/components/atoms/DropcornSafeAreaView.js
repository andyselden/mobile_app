import React, { PureComponent } from 'react'
import { SafeAreaView, View } from 'react-native'
import {styles as s} from "react-native-style-tachyons";



class DropcornSafeAreaView extends PureComponent {
    render() {
         return (
             <SafeAreaView style={[ s.absolute_fill, s.bg_white_00 ]}>
                { this.props.children }
            </SafeAreaView>
        );
    }
}

export default DropcornSafeAreaView
