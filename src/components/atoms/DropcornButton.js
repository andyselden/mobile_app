import React, { PureComponent } from 'react'
import { View } from 'react-native'
import {styles as s} from "react-native-style-tachyons";
import { D_COLOR_TYPOGRAPHY, D_COLOR_WHITE } from '../../styles/constants'
import {
    Button
} from 'react-native-elements'



class DropcornButton extends PureComponent {
    render() {
        const roleOptions = {
            primary: 'primary',
            secondary: 'secondary',
            info: 'info',
        }

        const {
            role=roleOptions.primary,
            title='submit',
            loading=false,
            disabled=false,
            onPress,
            ...props
        } = this.props

        return (
            <View>
               { role===roleOptions.primary &&
                        <Button
                             title={ title }
                             onPress={ onPress }
                             disabled={ disabled }
                             loading={ loading }
                             textStyle={[ s.ff_regular, s.white ]}
                             buttonStyle={[ s.bg_primary ]}
                             disabledStyle={[ s.bg_primary_60 ]}
                             disabledTextStyle={[ s.white_60 ]}
                             color={ D_COLOR_WHITE }
                             { ...props }
                        />
                 }
                { role===roleOptions.secondary &&
                        <Button
                             title={ title }
                             onPress={ onPress }
                             disabled={ disabled }
                             loading={ loading }
                             textStyle={[ s.ff_regular, s.primary ]}
                             buttonStyle={[ s.bg_white, s.ba, s.b__primary ]}
                             disabledStyle={[ s.bg_white, s.b__typography_30 ]}
                             disabledTextStyle={[ s.typography_30 ]}
                             color={ D_COLOR_TYPOGRAPHY }
                             { ...props }
                        />
                 }

                 { role===roleOptions.info &&
                <Button
                     title={ title }
                     onPress={ onPress }
                     disabled={ disabled }
                     loading={ loading }
                     textStyle={[ s.ff_light, s.link ]}
                     buttonStyle={[ s.bg_white ]}
                     disabledStyle={[ s.bg_white ]}
                     disabledTextStyle={[ s.link]}
                     color={ D_COLOR_WHITE }
                     { ...props }
                />
                 }
             </View>
        );
    }
}

export default DropcornButton
