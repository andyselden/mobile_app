import { StyleSheet } from 'react-native'
import NativeTachyons from 'react-native-style-tachyons'

import {
    D_COLOR_PRIMARY,
    D_COLOR_SECONDARY,
    D_COLOR_TYPOGRAPHY,
    D_COLOR_WHITE,
    D_FONT_LOGO,
    D_FONT_LIGHT,
    D_FONT_REGULAR,
    D_FONT_BOLD,
} from './src/constants/style';

//Styles Init
NativeTachyons.build({
    fontRem: 20,
    fonts: {
        logo: D_FONT_LOGO,
        light: D_FONT_LIGHT,
        regular: D_FONT_REGULAR,
        bold: D_FONT_BOLD
    },
    colors: {
      palette: {
         primary: D_COLOR_PRIMARY,
         secondary: D_COLOR_SECONDARY,
         typography: D_COLOR_TYPOGRAPHY,
         white: D_COLOR_WHITE,
      }
   }
}, StyleSheet);


import App from './src/App';
const app = new App();


