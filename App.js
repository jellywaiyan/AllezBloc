import { SafeAreaView } from "react-native-safe-area-context";
import { AppProvider } from "./AppContext";
import Navigation from "./navigation";
import { Amplify} from "aws-amplify";
import awsExports from './src/aws-exports';

Amplify.configure(awsExports);

const App = () => {
  return (
    <AppProvider>
      <SafeAreaView style={{flex : 1}}>
    <Navigation/>
    </SafeAreaView>
    </AppProvider>
  );
};

export default App;
/*

<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="Welcome"
        component={Navigation}
        options={{headerShown:false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
*/