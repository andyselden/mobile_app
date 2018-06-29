import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {styles as s} from "react-native-style-tachyons";
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import FontAwesome, { Icons } from 'react-native-fontawesome';

class Splash extends PureComponent {
    constructor(props){
        super(props)

        this._goToEmailAuthentication = this._goToEmailAuthentication.bind(this)
    }

    static propTypes = {
    }

    _goToEmailAuthentication() {
        this.props.navigator.showModal({
            screen: 'DropcornApp.EmailAuthentication',
            title: 'Sign In'
        })
    }

    render () {
        return (
        <SafeAreaView style={[ s.flex_i, s.bg_white ]}>
            <View style={[ s.mt6 ]}></View>
            <View style={[ s.ml3, s.mr3]}>
                <Image source={require('../../../assets/img/primary_logo_2x.png')} style={[s.max_w4, s.max_h4, s.asc ]} />
                <Text style={[s.primary, s.mt4, s.asc, s.ff_regular, s.f4, s.tc]}><Text style={[s.ff_logo, s.f4]}>DROPCORN</Text> lets you easily drop anything digital to anyone around you</Text>
            </View>
            <View style={[s.absolute, s.bottom_0, s.min_w8, s.asc, s.mb1]}>
                    <TouchableOpacity style={[ s.bg_primary, s.h3, s.w4, s.br1 ]} onPress={ this._goToEmailAuthentication }>
                        <FontAwesome style={[ s.f2, s.white, s.asc, s.mt2 ]}>{ Icons.envelope }</FontAwesome>
                    </TouchableOpacity>
            </View>
       </SafeAreaView>
        );
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(Splash)

