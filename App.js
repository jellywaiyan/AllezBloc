import { SafeAreaView } from "react-native-safe-area-context";
import { AppProvider } from "./AppContext";
import Navigation from "./navigation";
import { Amplify} from "aws-amplify";
import awsExports from './src/aws-exports';
import { View } from "react-native";
import { HOMECOLOURS } from "./assets/color";

Amplify.configure(awsExports);

const App = () => {
  return (
    <AppProvider>
      <View style={{flex : 1, justifyContent:"center", backgroundColor:HOMECOLOURS.dullwhite, paddingBottom:30}}>
    <Navigation/>
    </View>
    </AppProvider>
  );
};

export default App;