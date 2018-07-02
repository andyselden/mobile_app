import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SafeAreaView, View, Text } from 'react-native'

import DropcornSafeAreaView from '../atoms/DropcornSafeAreaView'

class DropSomethingModal extends PureComponent {
  constructor(props){
        super(props)

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    }

    static propTypes = {
    }

    static navigatorButtons = {
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
            <DropcornSafeAreaView>
                <Text>
                    Testing
                </Text>
            </DropcornSafeAreaView>
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
)(DropSomethingModal)

