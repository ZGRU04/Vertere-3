import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { SessionProvider, useSession } from '../../src/context/AuthContext';


export default function AppLayout() {
    return (
        <SessionProvider>
            <Stack screenOptions={{ headerShown: false }}/>
        </SessionProvider>
    );
}