import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TaskOne from './src/TaskOne';
import TaskTwo from './src/TaskTwo';
import TaskThree from './src/TaskThree';

const Drawer = createDrawerNavigator()
const App = () => {
  return(
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='TaskOne'>
      <Drawer.Screen options={{headerShown:false}} name="TaskOne" component={TaskOne} />
      <Drawer.Screen options={{headerShown:false}} name="TaskTwo" component={TaskTwo} />
      <Drawer.Screen options={{headerShown:false}} name="TaskThree" component={TaskThree} /> 
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default App