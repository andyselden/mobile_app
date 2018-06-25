import React, { PureComponent, Fragment } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import { Formik } from 'formik'
import * as Yup from 'yup'

import DropcornInput from '../atoms/DropcornInput'
import DropcornButton from '../atoms/DropcornButton'
import DropcornSpacer from '../atoms/DropcornSpacer'

export default class EmailSignInForm extends PureComponent {
    constructor(props){
        super(props)
    }

    _handleSubmit = (values, bag) => {
        this.props.onSubmit(values, bag)
    }

    render() {
        return (
            <View>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={ this._handleSubmit }
                    validationSchema={ Yup.object().shape({
                        email: Yup.string()
                        .email()
                        .required(),
                        password: Yup.string()
                        .min(8)
                        .required('a password is required'),
                    })}
                    render={({
                        values,
                        handleSubmit,
                        setFieldValue,
                        errors,
                        touched,
                        setFieldTouched,
                        isValid,
                        isSubmitting
                    }) => (
                        <Fragment>
                            <DropcornInput
                                placeholder="email"
                                autoCapitalize="none"
                                value={ values.email }
                                onChange={ setFieldValue }
                                error={ touched.email && errors.email }
                                onTouch={ setFieldTouched }
                                name="email"
                                autoFocus
                            />
                            <DropcornInput
                                placeholder="password"
                                autoCapitalize="none"
                                value={ values.password }
                                onChange={ setFieldValue }
                                error={ touched.password && errors.password }
                                onTouch={ setFieldTouched }
                                name="password"
                                secureTextEntry
                            />
                            <DropcornSpacer size="medium"/>
                            <DropcornButton
                                title="Sign In"
                                onPress={ handleSubmit }
                                disabled={ !isValid || isSubmitting }
                                loading={ isSubmitting }
                                role='primary'
                            />
                        </Fragment>
                    )}
                />
            </View>
        )}
}


