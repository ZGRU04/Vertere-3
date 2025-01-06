import { Tabs } from 'expo-router';
import { HomeIcon, QrIcon } from '../../../src/modules/shared/components/Icons';
import { globalColors } from '../../../src/themes/GlobalStyles';

export default function HomeTabsLayout() {
    const size = 42;
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: "#9e0c14",
                tabBarInactiveTintColor: "#8E8E93",
                tabBarStyle: {
                    height: 70,
                    paddingBottom: 10,
                  },
            }}
        >
            <Tabs.Screen 
                name="index"
                options={{
                    tabBarLabel: 'Home',
                    headerTitle: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <HomeIcon color={color} size={focused ? 32 : 24}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="scanner"
                options={{ 
                    tabBarLabel: 'Scanner',
                    headerTitle: 'Scanner',
                    tabBarIcon: ({color, focused}) => (
                        <QrIcon color={color} size={focused ? 32 : 24}/>
                    ),
                }}
            />
        </Tabs>
    );
}