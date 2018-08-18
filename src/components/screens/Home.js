import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SafeAreaView, Text } from 'react-native'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import ImagePicker from 'react-native-image-picker'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'
import validator from 'validator'

import {
    addTextItem,
    addImageItem,
    addFileItem
} from '../../redux/actions/kernel'

import {
   updatePermissions
} from '../../redux/actions/locationBrowser'

import {
    readFromClipboard,
    writeToClipboard
} from '../../redux/actions/clipboard'

import {
    downloadFile
} from '../../redux/actions/download'

import DropcornSafeAreaView from '../atoms/DropcornSafeAreaView'
import DropcornButton from '../atoms/DropcornButton'
import DropSomethingButton from '../molecules/DropSomethingButton'
import DropSomethingModal from '../molecules/DropSomethingModal'
import KernelList from '../molecules/KernelList'

class Home extends PureComponent {
    constructor(props){
        super(props)

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this._goToSettings = this._goToSettings.bind(this)
        this._showDropSomethingModal = this._showDropSomethingModal.bind(this)
        this._hideDropSomethingModal = this._hideDropSomethingModal.bind(this)

        this._handleFileButton = this._handleFileButton.bind(this)
        this._handleImageButton = this._handleImageButton.bind(this)
        this._handleTextSubmit = this._handleTextSubmit.bind(this)
        this._handleItemSelected = this._handleItemSelected.bind(this)
        this.state = { _modalIsVisible:false }
    }

    componentDidMount(){
        this.props.updatePermissions(true)
    }

    componentDidUpdate(prevProps){
        if(prevProps.alertDropdownTimestamp !== this.props.alertDropdownTimestamp)
        {
            this.props.navigator.showInAppNotification({
              screen: 'DropcornApp.Notification',
                passProps: {
                    alertTitle: this.props.alertDropdownTitle,
                    alertType: this.props.alertDropdownType
                },
              autoDismissTimerSec: .5
            });
        }
    }

    static propTypes = {
    }

    static navigatorButtons = {
        rightButtons: [
                 {
                 id: 'profileSettings',
                 component: 'DropcornApp.FontAwesomeNavButton', // This line loads our component as a nav bar button item
                 passProps: {
                     icon: <FontAwesome>{Icons.cog}</FontAwesome>,
                     id: 'profileSettings'
                 }
                 }
        ]
    };

    onNavigatorEvent(event) {
        if(event.type == "DeepLink" && event.payload.id == "profileSettings")
        {
            this.props.navigator.showModal({
                screen: 'DropcornApp.Settings',
                title: 'Settings'
            })
        }
    }

    _goToSettings(){
        this.props.navigator.showModal({
            screen: 'DropcornApp.Settings',
            title: 'Settings'
        })
    }

    _showDropSomethingModal(){
        this.props.readFromClipboard()
        this.setState({
          _modalIsVisible:true
        })
    }

    _hideDropSomethingModal(){
        this.setState({
          _modalIsVisible:false
        })

    }

    _handleFileButton(){
        DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()],
    },(error,response) => {
        if (error) {
            console.log('DocumentPicker Error: ', error)
        } else {

            let { uri, fileName } = response

            this.props.addFileItem(uri, fileName)
        }
    });

    }

    _handleImageButton(){
        var options = {
            title: 'Select Something to Drop',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }
        ImagePicker.showImagePicker(options, (response) => {
          if (response.didCancel) {
              return
          }

          else if (response.error) {
            console.log('ImagePicker Error: ', response.error)
          }
          else {
            let { uri, fileName } = response
            this.props.addImageItem(uri, fileName)
          }
        });

    }

    _handleTextSubmit(text){
        this.props.addTextItem(text)
    }

    _handleItemSelected(item){

        //Handle URL
        if(item.itemType == "TEXT" && validator.isURL(item.text.toLowerCase())){
            const url = item.text.toLowerCase()
            if(!validator.isURL(url, {require_protocol: true}))
            {
                url = 'https://' +  url
            }
            Linking.canOpenURL(url).then(supported => {
              if (!supported) {
                console.log('Can\'t handle url: ' + url);
              } else {
                return Linking.openURL(url);
              }
            }).catch(err => console.error('An error occurred', err));
            return
        }

        //Handle Non URL
        if(item.itemType == "TEXT"){
            this.props.writeToClipboard(item.text)
            this.props.readFromClipboard()
            return
        }

        //Handle Image and File Download
        if(item.itemType == "FILE" || item.itemType == "IMAGE")
        {
            this.props.downloadFile(item.fileReference)
        }
    }

  onError = error => {
    if (error) {
      this.dropdown.alertWithType('error', 'Error', error);
    }
  };
  // ...
  onClose(data) {
    // data = {type, title, message, action}
    // action means how the alert was closed.
    // returns: automatic, programmatic, tap, pan or cancel
  }
    render () {
        return (
            <DropcornSafeAreaView>
                <KernelList kernelList={ this.props.kernelList } handleItemSelected={ this._handleItemSelected } />
                <DropSomethingButton onPress={ this._showDropSomethingModal } buttonText='Drop Something' />
                <DropSomethingModal
                    modalIsVisible={ this.state._modalIsVisible }
                    handleClose={ this._hideDropSomethingModal }
                    handleFileButton={ this._handleFileButton }
                    handleImageButton={ this._handleImageButton }
                    handleTextSubmit={ this._handleTextSubmit }
                    inputDefaultValue={ this.props.clipboardContent }
                />
            </DropcornSafeAreaView>
        );
    }
}

const mapStateToProps = state => ({
    kernelList: state.locationBrowser.kernelList,
    clipboardContent: state.clipboard.content,
    alertDropdownTimestamp: state.alertDropdown.timestamp,
    alertDropdownType: state.alertDropdown.alertType,
    alertDropdownTitle: state.alertDropdown.title,
    alertDropdownMessage: state.alertDropdown.message
})

const mapDispatchToProps = {
    addTextItem,
    addImageItem,
    addFileItem,
    updatePermissions,
    readFromClipboard,
    writeToClipboard,
    downloadFile
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)


