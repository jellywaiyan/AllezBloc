import { SafeAreaView } from "react-native-safe-area-context";
import { AppProvider } from "./AppContext";
import Navigation from "./navigation";
import { Amplify, Auth, API, graphqlOperation } from "aws-amplify";
import awsExports from './src/aws-exports';
import { View } from "react-native";
import { HOMECOLOURS } from "./assets/color";
import { useEffect } from "react";
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";

Amplify.configure(awsExports);

const App = () => {
  
  useEffect(() => {
    const syncUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true,});

      const userData = await API.graphql(graphqlOperation(getUser, { id: authUser.attributes.sub}));

      if (userData.data.getUser) {
        return;
      }

      const newUser = {
        id: authUser.attributes.sub,
        name: authUser.attributes.name,
        status: "Hello! I'm free to climb!",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/680px-Default_pfp.svg.png"
      };
      const newUserResponse = await API.graphql(
        graphqlOperation(createUser, {input: newUser}));
    };
    syncUser();
  },[]);

  return (
    <AppProvider>
      <View style={{flex : 1, justifyContent:"center", backgroundColor:HOMECOLOURS.dullwhite, paddingBottom:30}}>
    <Navigation/>
    </View>
    </AppProvider>
  );
};

export default App;