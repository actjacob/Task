import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import AdminBoardScreen from '../screens/AdminBoardScreen';
import BoardScreen from '../screens/BoardScreen';
import MyCardScreen from '../screens/MyCardScreen';
import SearchScreen from '../screens/SearchScreen';
import Notifications from '../screens/NotificationsScreen';
import AccountScreen from '../screens/AccountScreen';
import TaskScreen from '../screens/TaskScreen';
import UsersList from '../components/taskManagement/UsersList';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = (props) => {
   return (
      <Tab.Navigator
         initialRouteName="AdminBoard"
         component={AdminBoardScreen}
         screenOptions={{
            headerTitle: '',
            headerShadowVisible: false,
         }}
      >
         <Tab.Screen
            name="AdminBoard"
            component={AdminBoardScreen}
            options={{
               headerShown: false,
               tabBarIcon: ({ color, size }) => {
                  return <FontAwesome5 name="trello" size={size} color={color} />;
               },
            }}
         />
         <Tab.Screen
            name="Board"
            component={BoardScreen}
            options={{
               headerShown: false,
               tabBarIcon: ({ color, size }) => {
                  return <FontAwesome5 name="trello" size={size} color={color} />;
               },
            }}
         />
         <Tab.Screen
            name="TaskCard"
            component={MyCardScreen}
            options={{
               tabBarLabel: 'MyCards',
               tabBarIcon: ({ color, size }) => {
                  return (
                     <MaterialCommunityIcons
                        name="tablet-dashboard"
                        size={size}
                        color={color}
                     />
                  );
                  // return <FontAwesome6 name="table-columns" size={24} color={colors.blue} />;
               },
            }}
         />
         <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
               tabBarIcon: ({ color, size }) => {
                  return <FontAwesome5 name="search" size={size} color={color} />;
               },
            }}
         />
         <Tab.Screen
            name="Notifications"
            component={Notifications}
            options={{
               tabBarIcon: ({ color, size }) => {
                  return <Ionicons name="notifications" size={size} color={color} />;
               },
            }}
         />
         <Tab.Screen
            name="Account"
            component={AccountScreen}
            options={{
               tabBarIcon: ({ color, size }) => {
                  return (
                     <Ionicons name="person-circle-outline" size={size} color={color} />
                  );
               },
            }}
         />
      </Tab.Navigator>
   );
};

const AdminMainNavigator = (props) => {
   return (
      <Stack.Navigator>
         <Stack.Screen
            name="Home"
            component={TabNavigator}
            options={{ headerShown: false }}
         />
         <Stack.Screen name="AdminBoard" component={AdminBoardScreen} />
         <Stack.Screen
            name="TaskScreen"
            component={TaskScreen}
            options={{ headerShown: false }}
         />
      </Stack.Navigator>
   );
};

export default AdminMainNavigator;
