import { StyleSheet, View, Text, TouchableOpacity, Pressable } from 'react-native'
import { Button, IconButton, TextInput } from 'react-native-paper'
import { Controller, useForm } from 'react-hook-form';

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputModeEnum } from '../../../../themes/imputs/enums/InputMode.enum';
import { globalStyleInputColor } from '../../../../themes/imputs/globaStyleInputs';
import { ButtonModeEnum } from '../../../../themes/buttons/enums/ButtonMode.enum';
import { papersButtonVariables } from '../../../../themes/buttons/globalStyleButtons';
import { globalTextStyle } from '../../../../themes/errors/error';
import { useState } from 'react';


const loginSchema = Yup.object().shape({
    doc_identity: Yup.string()
        .required("El Documento de identidad no es correcto"),
});

export const TemporalLoginFormComponent = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    });

    const submit = (loginData: any) => {
        onSubmit(loginData)
    }

    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name="doc_identity"
                render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                        <TextInput
                            style={ styles.input }
                            label="Documento de indentidad"
                            autoCapitalize="none"
                            onBlur={ onBlur }
                            onChangeText={ onChange }
                            value={ value ?? "" }
                            mode={ InputModeEnum.OUTLINED }
                            secureTextEntry={!isPasswordVisible}
                        />
                        {errors.doc_identity && (
                            <Text style={globalTextStyle.error} >{errors.doc_identity.message}</Text>
                        )}
                    </View>
                )}
            />
            <View style={styles.buttonSection}>
                <Button
                    mode={ButtonModeEnum.CONTAINED}
                    labelStyle={{color: papersButtonVariables.primaryButton.fontColor}}
                    theme={{ colors: papersButtonVariables.primaryButton }}
                    onPress={handleSubmit(submit)}
                >
                    Ingresar
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20
    },
    input: {
        marginBottom: 10,
        color: 'green',
        backgroundColor: '#ffffff'
    },
    buttonSection: {
        marginTop: 20
    },
});
