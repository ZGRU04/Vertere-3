import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Alert, Button, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect, useRouter } from 'expo-router';


export const QrScannerScreen = () => {
	const router = useRouter();
	const [permission, requestPermission] = useCameraPermissions();
	const [facing, setFacing] = useState<CameraType>('back');
	const [scanned, setScanned] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	// const [loading, setLoading] = useState<boolean>(true);
	const keyValidator = 'working-hour';
	const navigation = useNavigation();

	useFocusEffect(
		useCallback(() => {
			setScanned(false)
		}, [])
	)

	if (!permission) {
		return <View />;
	}

	if (!permission.granted) {
		return (
			<View style={styles.container}>
			<Text style={styles.message}>We need your permission to show the camera</Text>
			<Button onPress={requestPermission} title="grant permission" />
			</View>
		);
	}

	const toggleCameraFacing = () => {
		setFacing(current => (current === 'back' ? 'front' : 'back'));
	}

	const handleScan = ({type, data}: any) => {
		setScanned(true);
		if ( type === 'qr' && data.includes(keyValidator) ) {
			setModalVisible(true);
		}
		//setScanned(false);
	}

	const handleAccept = () => {
		setModalVisible(false);
		router.replace('/?scanned=true');
	}

	const handleCancel = () => {
		setModalVisible(false);
		router.replace('/');
	}

	return (
	<View style={styles.container}>

		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => setModalVisible(false)}
		>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContainer}>
					<Text style={styles.modalTitle}>¿Está seguro de iniciar el día de trabajo?</Text>
					<View style={styles.modalButtons}>
						<TouchableOpacity style={styles.modalButtonAccept} onPress={handleAccept}>
							<Text style={styles.modalButtonText}>Aceptar</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.modalButtonCancel} onPress={handleCancel}>
							<Text style={styles.modalButtonText}>Cancelar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>


		<CameraView 
			style={styles.camera}
			facing={facing}
			barcodeScannerSettings={{
				barcodeTypes: ["qr"],
			}}
			onBarcodeScanned={scanned ? undefined : handleScan}
			>

			{/* Overlay for QR Scanner */}
			<View style={styles.overlay}>
				<View style={styles.scannerFrameTopLeft} />
				<View style={styles.scannerFrameTopRight} />
				<View style={styles.scannerFrameBottomLeft} />
				<View style={styles.scannerFrameBottomRight} />
			</View>
		</CameraView>
	</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	message: {
		textAlign: 'center',
		paddingBottom: 10,
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'transparent',
		margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: 'flex-end',
		alignItems: 'center',
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
	},

	overlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
	scannerFrameTopLeft: {
		position: 'absolute',
		top: '30%',
		left: '15%',
		width: 50,
		height: 50,
		borderLeftWidth: 10,
		borderTopWidth: 10,
		borderColor: 'white',
		borderRadius: 10, // Border radius for rounded corners
	},
	scannerFrameTopRight: {
		position: 'absolute',
		top: '30%',
		right: '15%',
		width: 50,
		height: 50,
		borderRightWidth: 10,
		borderTopWidth: 10,
		borderColor: 'white',
		borderRadius: 10, // Border radius for rounded corners
	},
	scannerFrameBottomLeft: {
		position: 'absolute',
		bottom: '30%',
		left: '15%',
		width: 50,
		height: 50,
		borderLeftWidth: 10,
		borderBottomWidth: 10,
		borderColor: 'white',
		borderRadius: 10, // Border radius for rounded corners
	},
	scannerFrameBottomRight: {
		position: 'absolute',
		bottom: '30%',
		right: '15%',
		width: 50,
		height: 50,
		borderRightWidth: 10,
		borderBottomWidth: 10,
		borderColor: 'white',
		borderRadius: 10, // Border radius for rounded corners
	},
	modalOverlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContainer: {
		width: '80%',
		padding: 20,
		backgroundColor: 'white',
		borderRadius: 10,
		alignItems: 'center',
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 20,
		textAlign: 'center',
	},
	modalButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	modalButtonAccept: {
		flex: 1,
		margin: 5,
		padding: 10,
		backgroundColor: 'green',
		borderRadius: 5,
		alignItems: 'center',
	},
	modalButtonCancel: {
		flex: 1,
		margin: 5,
		padding: 10,
		backgroundColor: 'red',
		borderRadius: 5,
		alignItems: 'center',
	},
	modalButtonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
});
