import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

export default class EmailAuth extends PureComponent {
    constructor(props){
        super(props)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    }

  static navigatorStyle = {
  };

static navigatorButtons = {
    leftButtons: [
      {
        id: 'back',
        showAsAction: 'always',
        systemItem: 'cancel'
      }
    ]
  };

   onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'back') {
          this.props.navigator.dismissModal()
      }
    }
  }
    render () {
        return (
        <View>
            <Text>EmailAuthScreen</Text>
        </View>
        );
    }
}
