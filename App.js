import React, { Component } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Register from "./screens/Register";
import DefaultPage from "./screens/DefaultPage";
import Login from "./screens/Login";
import HomeScreen from "./screens/HomeScreen";
import Templates from "./components/Templates";
import TemplatesConfig from "./components/appconfiguration/TemplatesConfig";
import DashboardApp from "./DashboardApp";

console.disableYellowBox = true;
const AppNavigator = createStackNavigator({
  Launch: {
    screen: DefaultPage,
    path: "launch"
  },
  Login: {
    screen: Login,
    path: "login"
  },
  Register: {
    screen: Register,
    path: "screens/Register"
  },
  Home: {
    screen: HomeScreen,
    path: "home"
  },
  TemplateConfig: {
    screen: TemplatesConfig,
    path: "templateConfig"
  },
  Details: {
    screen: Templates,
    path: "app/:id"
  },
  DashboarbDomain: {
    screen: DashboardApp,
    path: "DashboardApp",
    navigationOptions: {
      header: null
    }
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  // _animated = new Animated.Value(0);
  render() {
    return <AppContainer />;
  }
}
