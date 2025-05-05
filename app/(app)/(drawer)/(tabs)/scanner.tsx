import { StyleSheet } from 'react-native';
import { QrScannerScreen } from '../../../../src/modules/qrScanner/presentation/screen/QrScannerScreen';

export default function ScannerScreen() {
    return (
        <QrScannerScreen/>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});