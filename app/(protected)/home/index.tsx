import { Text, View, StyleSheet } from 'react-native';
import { HomeScreen } from '../../../src/modules/home/presentation/screens/HomeScreen';

export default function IndexScreen() {
    return (
        // <View style={styles.container}>
        //     <Text style={styles.title}>Bienvenido a Home</Text>
        // </View>
        <HomeScreen/>
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