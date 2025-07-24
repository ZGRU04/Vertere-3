import { Provider as PaperProvider } from 'react-native-paper';
import { LoginScreen } from "./modules/auth/presentation/screens/LoginScreen";

export const Main = () => {
    const isAuthtenticated = false
  return (
    <PaperProvider>
      <LoginScreen/>
    </PaperProvider>
  ) 
}
