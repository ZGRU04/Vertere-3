import { StyleSheet, View, Text, TouchableOpacity, Pressable } from 'react-native'
import { Button, IconButton, TextInput } from 'react-native-paper'
import { Controller, useForm } from 'react-hook-form';

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputModeEnum } from '../../../../themes/imputs/enums/InputMode.enum';
import { globalStyleInputColor } from '../../../../themes/imputs/globaStyleInputs';
import { ButtonModeEnum } from '../../../../themes/buttons/enums/ButtonMode.enum';
import { papersButtonVariables } from '../../../../themes/buttons/globalStyleButtons';
import { Login } from '../../domain/entities/login';
import { globalTextStyle } from '../../../../themes/errors/error';
import { useState } from 'react';


const loginSchema = Yup.object().shape({
    username: Yup.string()
        .required("El usuario es obligatorio"),
    password: Yup.string()
        .required("La contraseña es obligatoria"),
});

export const LoginFormComponent = ({ onSubmit }: { onSubmit: (data: Login) => void }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    });

    const submit = (loginData: Login) => {
        onSubmit(loginData)
    }


    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name="username"
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <TextInput
                            style={ styles.input }
                            label="Usuario"
                            autoCapitalize="none"
                            onBlur={ onBlur }
                            onChangeText={ onChange }
                            value={ value ?? '' }
                            mode={ InputModeEnum.OUTLINED }
                            activeOutlineColor={globalStyleInputColor.outlineGreyColor}
                        />
                        {errors.username && (
                            <Text style={globalTextStyle.error} >{errors.username.message}</Text>
                        )}
                    </View>
                )}
            />
            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <TextInput
                            style={ styles.input }
                            label="Contraseña"
                            onBlur={ onBlur }
                            onChangeText={ onChange }
                            value={value}
                            mode={InputModeEnum.OUTLINED}
                            secureTextEntry={!isPasswordVisible}
                            activeOutlineColor={globalStyleInputColor.outlineGreyColor}
                            right={
                                <TextInput.Icon icon={isPasswordVisible ? 'eye' : 'eye-off'} onPress={togglePasswordVisibility}/>
                            }
                        />
                        {errors.password && (
                            <Text style={globalTextStyle.error}>{errors.password.message}</Text>
                        )}
                    </View>
                )}
            />
            <Button
                mode={ButtonModeEnum.CONTAINED}
                labelStyle={{color: papersButtonVariables.primaryButton.fontColor}}
                theme={{ colors: papersButtonVariables.primaryButton }}
                onPress={handleSubmit(submit)}
            >
                Ingresar
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20
    },
    input: {
        marginBottom: 10,
        color: 'green'
    }
});
