import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import {styles as s} from "react-native-style-tachyons";
import FontAwesome, { Icons } from 'react-native-fontawesome';

import FontAwesomeSpin from '../atoms/FontAwesomeSpin'

class DropSomethingOptions extends PureComponent {
     constructor(props){
        super(props)

        this._handleFileButton = this._handleFileButton.bind(this)
        this._handleImageButton = this._handleImageButton.bind(this)
        this._handleTextButton = this._handleTextButton.bind(this)
    }

    _handleFileButton = () => {
        this.props.handleFileButton()
    }

    _handleImageButton = () => {
        this.props.handleImageButton()
    }

    _handleTextButton = () => {
        this.props.handleTextButton()
    }

    render() {
        const {
            ...props
        } = this.props

        return (
            <View>
                <View  style={[{height: Dimensions.get('window').height * 0.70}]} />
                     <View style={[s.bg_white, s.bt, s.b__primary, {height: Dimensions.get('window').height * 0.30}]}>
                         <Text style={[s.ff_light, s.typography, s.tc, s.f6, s.ma3]}>Share something digital with anyone around you for one minute</Text>
                         <View style={[s.flx_row, s.jcsb, s.jcsa]}>
                             <Text style={[ s.f2, s.typography_70, s.mt3 ]} onPress={ this._handleFileButton } >
                                 <FontAwesome>
                                     { Icons.fileTextO }
                                 </FontAwesome>
                             </Text>
                             <Text style={[s.f2, s.typography_70, s.mt3 ]} onPress={ this._handleImageButton } >
                                 <FontAwesome>
                                     { Icons.pictureO }
                                 </FontAwesome>
                             </Text>
                             <Text style={[s.f2, s.typography_70, s.mt3 ]} onPress={ this._handleTextButton } >
                                   <FontAwesome>{Icons.paperPlaneO}</FontAwesome>
                             </Text>
                </View>
            </View>
        </View>
        );
    }
}

export default DropSomethingOptions
