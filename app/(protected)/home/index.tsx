import { HomeScreen } from '../../../src/modules/home/presentation/screens/HomeScreen';
import { PaperProvider } from 'react-native-paper';

export default function IndexScreen() {
    return (
        <PaperProvider>
            <HomeScreen/>
        </PaperProvider>
    );
}
