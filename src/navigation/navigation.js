import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSelector } from 'react-redux'
import { StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import TabBar from '../components/TabBar'

import LoginScreen from '../screens/Login'
import SplashScreen from '../screens/Splash/SplashScreen'
import Register from '../screens/Register'
import Home from '../screens/Home'
import Setting from '../screens/Setting'

import AlacarteHome from '../screens/Alacarte'
import AlacarteIndividual from '../screens/Alacarte/Individual'
import AlacartePatient from '../screens/Alacarte/Patient'
import AlacarteListRoom from '../screens/Alacarte/Patient/ListRoom'
import AlacarteListPatient from '../screens/Alacarte/Patient/ListPatient'
import AlacarteListMenu from '../screens/Alacarte/ListMenu'

import PatientOrder from '../screens/PatientOrder'
import AlacarteConfirmation from '../screens/Alacarte/AlacarteConfirmation'
import PatientOrderListRoom from '../screens/PatientOrder/PatientOrderListRoom'
import PatientOrderListPatient from '../screens/PatientOrder/PatientOrderListPatient'
import PatientOrderListMenu from '../screens/PatientOrder/PatientOrderListMenu'
import PatientOrderConfirmation from '../screens/PatientOrder/PatientOrderConfirmation'
import ChangeServer from '../screens/ChangeServer'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

// bottom tab bar
function MyTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{ tabBarHideOnKeyboard: true }}>
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
            return <Icon name={'ios-home'} size={25} color={color} />
          },
        }}
      />
      <Tab.Screen
        name="PatientOrder"
        component={PatientOrderStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <Icon name={'settings'} size={25} color={color} />
          },
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <Icon name={'settings'} size={25} color={color} />
          },
        }}
      />
    </Tab.Navigator>
  )
}

// Alacarte
const AlaCarteStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AlacarteHome"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AlacarteHome" component={AlacarteHome} />

      <Stack.Screen name="AlacarteIndividual" component={AlacarteIndividual} />
      <Stack.Screen name="AlacartePatient" component={AlacartePatient} />

      <Stack.Screen name="AlacarteListRoom" component={AlacarteListRoom} />
      <Stack.Screen
        name="AlacarteListPatient"
        component={AlacarteListPatient}
      />
      <Stack.Screen name="AlacarteListMenu" component={AlacarteListMenu} />
      <Stack.Screen
        name="AlacarteConfirmation"
        component={AlacarteConfirmation}
      />
    </Stack.Navigator>
  )
}

//  Patient Order
const PatientOrderStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="PatientOrderHome"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PatientOrderHome" component={PatientOrder} />
      <Stack.Screen
        name="PatientOrderListRoom"
        component={PatientOrderListRoom}
      />
      <Stack.Screen
        name="PatientOrderListPatient"
        component={PatientOrderListPatient}
      />
      <Stack.Screen
        name="PatientOrderListMenu"
        component={PatientOrderListMenu}
      />
      <Stack.Screen
        name="PatientOrderConfirmation"
        component={PatientOrderConfirmation}
      />
    </Stack.Navigator>
  )
}

// Main
const MainNavigation = () => {
  const { isFetching, error, isLogin, isSplash } = useSelector(
    state => state.auth,
  )

  if (isSplash) {
    return <SplashScreen />
  }

  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLogin ? (
          <>
            <Stack.Screen
              name="HomeBase"
              options={{ headerShown: false }}
              component={MyTabs}
            />
            <Stack.Screen
              name="ChangeServer"
              options={{ headerShown: false }}
              component={ChangeServer}
            />
          </>
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation
