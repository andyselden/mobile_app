import React, { PureComponent } from 'react'
import { styles as s, options as tachyonsOptions } from 'react-native-style-tachyons'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Linking } from 'react-native'
import PropTypes from 'prop-types'
import ModalDropdown from 'react-native-modal-dropdown'
import { D_FONT_REGULAR } from '../../styles/constants'
import { ListItem } from 'react-native-elements'
import {
    D_COLOR_PRIMARY
} from '../../styles/constants'

class KernelListItem  extends PureComponent {
    constructor(props){
        super(props)

        this._handleItemSelected = this._handleItemSelected.bind(this)
        this._handleDropdownWillHide = this._handleDropdownWillHide.bind(this)
        this._handleDropdownWillShow = this._handleDropdownWillShow.bind(this)
        this._handleRowRender = this._handleRowRender.bind(this)
        this._handleOnPress = this._handleOnPress.bind(this)

        this.state = {
            _itemsPressed: [],
            _doNotCloseBool: false,
            _kernelOpen: false
        }
    }

    _handleOnPress()
    {
        if(this.state._kernelOpen)
        {
            this._dropdown.hide()
            this.setState({
                _kernelOpen: false
            })
        }
        this._dropdown.show()
        this.setState({
            _kernelOpen: true
        })

    }

    _handleItemSelected(idx, value) {
        this.setState({
            _doNotCloseBool: true
        })
         this.timeoutHandle = setTimeout(()=>{
             this.setState({
                 _doNotCloseBool: false
             })
         }, 100);

        if(!this.state._itemsPressed.includes(idx)){
            this.setState({
                _itemsPressed: [idx, Array.from(this.state._itemsPressed)]
            })
        }

        const item = this.props.kernel.items[idx]
        this.props.handleItemSelected(item)
    }

    _handleDropdownWillShow() {
        this.setState({
            _kernelOpen: true
        })
    }


    _handleDropdownWillHide() {
         this.timeoutHandle = setTimeout(()=>{
        if(this.state._doNotCloseBool)
        {
            return false
        }
         this.setState({
            _kernelOpen: false
        })
         this._dropdown.hide()
         }, 50);
        return false;
    }

    _handleRowRender(rowData, rowID, highlighted) {

        const item = this.props.kernel.items[rowID]
        return (
                <ListItem
                    key={ rowID }
                    title={ rowData }
                    hideChevron={ true }
                    leftIcon=
                        { item.itemType == "TEXT" ?
                            <FontAwesome>{Icons.paperPlaneO}</FontAwesome>
                                : item.itemType == "IMAGE" ?
                            <FontAwesome>{Icons.pictureO}</FontAwesome>
                                :
                            <FontAwesome>{Icons.fileText}</FontAwesome>
                    }
                    containerStyle={{
                        borderBottomWidth: 0,
                        minHeight: 2 * tachyonsOptions.rem,
                        maxHeight: 2 * tachyonsOptions.rem,
                        paddingTop: 0,
                        paddingBottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    titleStyle={[ s.ml2 ]}

                />
        )
    }

    static itemsTransformer( items ){
        return items.map(item => KernelListItem.itemTransformer(item))
    }

    static itemTransformer( item ) {
        if(item.itemType == 'TEXT') { return item.text.length > 40 ? item.text.substring(0,37)+'...' : item.text }
        if(item.itemType == 'IMAGE') { return item.fileName }
        if(item.itemType == 'FILE') { return item.fileName }
        return 'not able to find item'
    }

    static proptypes = {
        kernel: PropTypes.object.isrequired,
        key: PropTypes.number.isrequired,
    }

    render() {
        const itemTypeOptions = {
            TEXT: 'TEXT',
            IMAGE: 'IMAGE',
            FILE: 'FILE',
        }

        const {
            index,
            kernel,
            ...props
        } = this.props
        // dropdownStyle={[{ maxHeight: (  * tachyonsOptions.rem) * kernel.items.length , minWidth: Dimensions.get('window').width * 0.80 }, s.mt5, s.ml3 ]}
        return (
            <ModalDropdown
                ref={el => this._dropdown = el}
                style={[ s.ba, s.ml3, s.mr3, s.b__primary, s.br3 ]}
                dropdownTextStyle={[ s.ml3, s.ff_light, s.typography, s.f6 ]}
                dropdownStyle={[
                    { minWidth: Dimensions.get('window').width - (tachyonsOptions.rem * 2),
                      maxHeight: (tachyonsOptions.rem * 2 + StyleSheet.hairlineWidth) * kernel.items.length,
                      minHeight: (tachyonsOptions.rem * 2 + StyleSheet.hairlineWidth)
                    },
                    s.mt5,
                    s.br3,
                    s.ba
                ]}
                options={ KernelListItem.itemsTransformer(kernel.items) }
                onSelect={ this._handleItemSelected }
                onDropdownWillHide={ this._handleDropdownWillHide }
                onDropdownWillShow={ this._handleDropdownWillShow }
                renderRow={ this._handleRowRender }>
                 <ListItem
                    key={ index }
                    title={ kernel.userDisplayName }
                    onPress={ this._handleKernelOnPress }
                    containerStyle={{
                            borderBottomWidth: 0,
                            paddingTop: 1 * tachyonsOptions.rem,
                            paddingBottom: 1 * tachyonsOptions.rem
                    }}
                    rightIcon={
                        this.state._kernelOpen ?
                        <FontAwesome>{Icons.chevronDown}</FontAwesome>
                            :
                        <FontAwesome>{Icons.chevronLeft}</FontAwesome>
                    }
                />
            </ModalDropdown>
        );
    }

}



export default KernelListItem
