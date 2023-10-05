// import NewsApi from "./Components/NewsApi";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./Components/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./Components/SearchScreen";
import ContactScreen from "./Components/ContactScreen";
import NewsApi from "./Components/NewsApi";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={NewsApi} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
