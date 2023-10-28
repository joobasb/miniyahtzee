import Home from './components/Home';
import Gameboard from './components/Gameboard';
import Scoreboard from './components/Scoreboard';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator
      initialRouteName="Home"
      sceneContainerStyle={{backgroundColor: '#381f1f'}}
      screenOptions={({ route }) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home'){
            iconName = focused
              ? 'information'
              : 'information-outline'
          }
          else if (route.name === 'Gameboard') {
            iconName = focused
              ? 'dice-multiple'
              : 'dice-multiple-outline'
          }
          else if (route.name == 'Scoreboard') {
            iconName = focused
              ? 'view-list'
              : 'view-list-outline'
          }
          return <MaterialCommunityIcons
            name={iconName}
            size={size}
            color={color}
          />
        },
        tabBarActiveTintColor: '#d4a7ac',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#381f1f',
          borderBlockColor: 'transparent',
          minHeight: 60,
          paddingBottom: 10,
          paddingTop: 5,
          alignContent: 'center'
        }
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarStyle: {display: 'none'}}}
      />
      <Tab.Screen
        name="Gameboard"
        component={Gameboard}
      />
      <Tab.Screen
        name="Scoreboard"
        component={Scoreboard}
      />
    </Tab.Navigator>
    </NavigationContainer>
  );
}