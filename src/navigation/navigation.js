import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSelector } from 'react-redux'

import Icon from 'react-native-vector-icons/Ionicons'

import LoginScreen from '../screens/Login'
import SplashScreen from '../screens/Splash/SplashScreen'
import Register from '../screens/Register'
import Home from '../screens/Home'
import { StatusBar } from 'react-native'
import AlacarteHome from '../screens/Alacarte'

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
          }
        }}
      />

      <Tab.Screen
        name="Alacarte"
        component={AlaCarteStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <Icon name={'ios-home'} size={25} color={color} />
          }
        }}
      />
    </Tab.Navigator>
  )
}

const AlaCarteStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AlacarteHome"
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="AlacarteHome" component={AlacarteHome} />
    </Stack.Navigator>
  )
}

const MainNavigation = () => {
  const { isFetching, error, isLogin, isSplash } = useSelector(
    state => state.auth
  )

  if (isSplash) {
    return <SplashScreen />
  }

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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation
