import React, { PureComponent } from 'react'
import {StyleSheet, View, Text, Dimensions, Button} from 'react-native';
import {styles as s} from "react-native-style-tachyons";

class Notification extends PureComponent {

  render() {
    return (
        <View style={
            this.props.alertType == "SUCCESS" ?
            [ s.h2, s.w6, s.bg_primary, s.p3 ]
                :
            [ s.h2, s.w6, s.bg_typography_60, s.p3 ]
        }>
          <Text style={[ s.mt2, s.f6, s.tc, s.white]}>{ this.props.alertTitle }</Text>
      </View>
    );
  }
}

export default Notification;
