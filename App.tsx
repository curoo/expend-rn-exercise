import * as React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import InventoryScreen from './screens/InventoryScreen';
import ReservationsScreen from './screens/ReservationsScreen';

const BottomTab = createBottomTabNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Inventory">
      <BottomTab.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{
          title: 'Inventory',
          tabBarIcon: ({ color }) => <TabBarIcon name="bars" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Reservations"
        component={ReservationsScreen}
        options={{
          title: 'Reservations',
          tabBarIcon: ({ color }) => <TabBarIcon name="flag" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// https://fontawesome.com/search
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

function App() {
  return <Navigation />;
}

export default App;
