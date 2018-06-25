import React, { PureComponent } from 'react'
import { View } from 'react-native'
import {styles as s} from "react-native-style-tachyons";



class DropcornSpacer extends PureComponent {
    render() {
        const sizeOptions = {
            s: 'small',
            m: 'medium',
            l: 'large',
        }

        const {
            size=sizeOptions.s,
            ...props
        } = this.props

        return (
            <View>
                { size===sizeOptions.s &&
                       <View
                           style={[s.mt2]}
                           {...props}
                       >
                       </View>
               }
                { size===sizeOptions.m &&
                       <View
                           style={[s.mt3]}
                           {...props}
                       >
                       </View>
               }
                { size===sizeOptions.l &&
                       <View
                           style={[s.mt4]}
                           {...props}
                       >
                       </View>
               }
             </View>
        );
    }
}

export default DropcornSpacer
