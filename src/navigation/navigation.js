import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSelector } from 'react-redux'

import Icon from 'react-native-vector-icons/Ionicons'

import LoginScreen from '../screens/Login'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <Icon name={'ios-home'} size={25} color={color} />
          },
        }}
      />

      <Tab.Screen
        name="Alacarte"
        component={AlaCarteStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <Icon name={'ios-settings'} size={25} color={color} />
          },
        }}
      />
    </Tab.Navigator>
  )
}

const MainNavigation = () => {
  const { isFetching, error, isLogin } = useSelector(state => state.auth)
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLogin ? (
          <Stack.Screen
            name="HomeBase"
            options={{ headerShown: false }}
            component={MyTabs}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={LoginScreen}
            />
            <Stack.Screen
              name="Register"
              options={{ headerShown: false }}
              component={Register}
            />
          </>
        )}
        {/* add your another screen here using -> Stack.Screen */}
        <Stack.Screen
          name="BeforeOrder"
          options={{ headerShown: false }}
          component={BeforeOrder}
        />
        {/* Gua Buat disini seemntara buat ui dulu */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation
