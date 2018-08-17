import React, { PureComponent } from 'react'
import { SafeAreaView, View } from 'react-native'
import {styles as s} from "react-native-style-tachyons";



class DropcornSafeAreaView extends PureComponent {
    render() {
         return (
             <SafeAreaView style={[ s.absolute_fill, s.flx_i ]}>
                { this.props.children }
            </SafeAreaView>
        );
    }
}

export default DropcornSafeAreaView
