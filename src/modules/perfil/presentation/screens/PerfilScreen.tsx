import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { globalStyle } from '../../../../themes/GlobalStyles';
import { ButtonModeEnum } from '../../../../themes/buttons/enums/ButtonMode.enum';
import { papersButtonVariables } from '../../../../themes/buttons/globalStyleButtons';
import { Button } from 'react-native-paper';
import { getData } from '../../../../utils/StorageService';
import { UserAuth } from '../../../auth/data/models/userAuth';

export const PerfilScreen = () => {
	const [name, setName] = useState<string | null>(null);
	const [email, setEmail] = useState<string | null>(null);
	const [rol, setRol] = useState<string | null>(null);
	const [username, setUsername] = useState<string | null>(null);


	const getUserDetail = async () => {
		const userAuth: any | null = await getData('temporalUserDetail');
		setName(userAuth.employe ? userAuth.employe.people.first_name : '-');
		setEmail(userAuth.employe.people.email ? userAuth.employe.people.email : 'No tiene');
		setRol('EMPLEADO');
	}

	useEffect(() => {
		getUserDetail();
	}, []);

	return (
		<View style={globalStyle.container} >
			<View style={styles.spaceBeetween}>
				<View style={styles.infoContainer}>
					<View style={styles.row}>
						<Text style={styles.label} >Nombre:</Text>
						<Text style={styles.value} >{ name ? name : '--' }</Text>
					</View>
					<View style={styles.row}>
						<Text style={styles.label} >Email:</Text>
						<Text style={styles.value} >{ email ? email : '--' }</Text>
					</View>
					<View style={styles.row}>
						<Text style={styles.label} >Rol:</Text>
						<Text style={styles.value} >{ rol ? rol : '--' }</Text>
					</View>
					{/* <View style={styles.row}>
						<Text style={styles.label} >Nombre de usuario:</Text>
						<Text style={styles.value} >{ username ? username : '--' }</Text>
					</View> */}
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
  infoContainer: {
	marginTop: 50,
  },

  row: {
	flexDirection: 'row',
	marginBottom: 15,
	alignItems: 'baseline'
  },

  label: {
	fontSize: 18,
	fontWeight: "bold",
	marginBottom: 5,
	minWidth: 100
  },

  value: {
	fontSize: 16,
	marginBottom: 20,
  },

  spaceBeetween: {
	justifyContent: 'space-between'
  }
});
