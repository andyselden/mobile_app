import React, { PureComponent } from 'react'
import {styles as s} from "react-native-style-tachyons";
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { List } from 'react-native-elements'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import KernelListItem from './KernelListItem'

class KernelList  extends PureComponent {
    constructor(props){
        super(props)
    }

    static proptypes = {
        kernelList: PropTypes.array.isrequired,
    }

    render() {
        const {
            kernelList,
            ...props
        } = this.props

        return (
        <View style={[ s.flx_i ]}>

            <List containerStyle={[ s.mb3 ], { borderTopWidth: 0 }}>
          {
          kernelList.map((kernel, index) => (
            <KernelListItem
              index={ index }
              kernel={ kernel }
            />
          ))
          }
          </List>

    </View>
    );
    }
}

export default KernelList
