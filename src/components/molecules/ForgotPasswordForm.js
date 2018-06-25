import React, { PureComponent, Fragment } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import { Formik } from 'formik'
import * as Yup from 'yup'

import DropcornInput from '../atoms/DropcornInput'
import DropcornButton from '../atoms/DropcornButton'
import DropcornSpacer from '../atoms/DropcornSpacer'

export default class ForgotPasswordForm extends PureComponent {
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
                    initialValues={{ email: '' }}
                    onSubmit={ this._handleSubmit }
                    validationSchema={ Yup.object().shape({
                        email: Yup.string()
                        .email()
                        .required()
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
                            <DropcornSpacer size="medium"/>
                            <DropcornButton
                                title="Reset my password via email"
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


