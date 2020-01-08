import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Register from "./screens/Register";
import DefaultPage from "./screens/DefaultPage";
import Login from "./screens/Login";
import HomeScreen from "./screens/HomeScreen";
import Templates from "./components/Templates";
import TemplatesConfig from "./components/appconfiguration/TemplatesConfig";
import DashboardApp from "./DashboardApp";
import FeedbackDetailsScreen from "./screens/FeedbackDetailsScreen";
import FeedbackListScreen from "./screens/FeedbackListScreen";
import ImageFullScreen from "./screens/ImageFullScreen";

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
  RegisterApp: {
    screen: RegisterAppScreen,
    path: "screens/RegisterAppScreen",
    navigationOptions: {
      header: null
    }
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
  DashboardDomain: {
    screen: DashboardApp,
    path: "DashboardApp",
    navigationOptions: {
      header: null
    }
  },
  FeedbackList: {
    screen: FeedbackListScreen,
    path: "screens/FeedbackListScreen",
    navigationOptions: {
      header: null
    }
  },
  FeedbackDetails: {
    screen: FeedbackDetailsScreen,
    path: "screens/FeedbackDetailsScreen",
    navigationOptions: {
      header: null
    }
  },
  ImageFullScreen: {
    screen: ImageFullScreen,
    path: "screens/ImageFullScreen",
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
