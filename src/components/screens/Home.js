import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SafeAreaView } from 'react-native'
import FontAwesome, { Icons } from 'react-native-fontawesome'
import ImagePicker from 'react-native-image-picker'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';

import {
    addTextItem,
    addImageItem
} from '../../redux/actions/kernel'

import {
   updatePermissions
} from '../../redux/actions/locationBrowser'


import DropcornSafeAreaView from '../atoms/DropcornSafeAreaView'
import DropcornButton from '../atoms/DropcornButton'
import DropSomethingButton from '../molecules/DropSomethingButton'
import DropSomethingModal from '../molecules/DropSomethingModal'

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
        this.state = { _modalIsVisible:false }
    }

    componentDidMount(){
        this.props.updatePermissions(true)
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
     if (event.type == 'DeepLink') {
         if(event.payload.id == 'profileSettings') {
        this.props.navigator.showModal({
            screen: 'DropcornApp.Settings',
            title: 'Settings'
        })
         }
      }
    }


    _goToSettings(){
        this.props.navigator.showModal({
            screen: 'DropcornApp.Settings',
            title: 'Settings'
        })
    }

    _showDropSomethingModal(){
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
    },(error,res) => {
      // Android
      console.log(
         res.uri,
         res.type, // mime type
         res.fileName,
         res.fileSize
      );
    });
        //// iPad
        //const {pageX, pageY} = event.nativeEvent;
        //
        //DocumentPicker.show({
        //  top: pageY,
        //  left: pageX,
        //  filetype: ['public.image'],
        //}, (error, url) => {
        //  alert(url);
        //});
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

    render () {
        return (
            <DropcornSafeAreaView>
                <DropSomethingButton onPress={ this._showDropSomethingModal } buttonText='Drop Something' />
                <DropSomethingModal
                    modalIsVisible={ this.state._modalIsVisible }
                    handleClose={ this._hideDropSomethingModal }
                    handleFileButton={ this._handleFileButton }
                    handleImageButton={ this._handleImageButton }
                    handleTextSubmit={ this._handleTextSubmit }
                />
            </DropcornSafeAreaView>
        );
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
    addTextItem,
    addImageItem,
    updatePermissions
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)


