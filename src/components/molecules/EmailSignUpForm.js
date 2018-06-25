import React, { PureComponent, Fragment } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'
import { Formik } from 'formik'
import * as Yup from 'yup'

import DropcornInput from '../atoms/DropcornInput'
import DropcornButton from '../atoms/DropcornButton'
import DropcornSpacer from '../atoms/DropcornSpacer'

export default class EmailSignUpForm extends PureComponent {
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
                    initialValues={{ email: '', password: '', confirmPassword: '' }}
                    onSubmit={ this._handleSubmit }
                    validationSchema={ Yup.object().shape({
                        email: Yup.string()
                        .email()
                        .required(),
                        password: Yup.string()
                        .min(8)
                        .required('a password is required'),
                        confirmPassword: Yup.string()
                        .oneOf(
                            [Yup.ref('password', null)],
                            'passwords do not match',
                        )
                        .required('please confirm your password'),
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
                            <DropcornInput
                                placeholder="confirm password"
                                autoCapitalize="none"
                                value={ values.confirmPassword }
                                onChange={ setFieldValue }
                                error={ touched.confirmPassword && errors.confirmPassword }
                                onTouch={ setFieldTouched }
                                name="confirmPassword"
                                secureTextEntry
                            />
                            <DropcornSpacer size="medium"/>
                            <DropcornButton
                                title="Sign Up"
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


