import React from "react";
import { Alert, BackHandler } from "react-native";
import { BottomNavigation } from "react-native-paper";

import DashboardScreen from "./screens/DashboardScreen";
import FeedbackListScreen from "./screens/FeedbackListScreen";
import QuestionScreen from "./screens/QuestionScreen";
import ProfileScreen from "./screens/ProfileScreen";

const DashboardRoute = () => <DashboardScreen />;
const FeedbackRoute = () => <FeedbackListScreen />;
const QuestionsRoute = () => <QuestionScreen />;
const ProfileRoute = () => <ProfileScreen />;

export default class App extends React.Component {
  state = {
    index: 0,
    routes: [
      {
        key: "dashboard",
        title: "Dashboard",
        icon: "monitor-dashboard",
        color: "#181f2d"
      },
      {
        key: "feedbackList",
        title: "Feedback List",
        icon: "format-list-checkbox",
        color: "#181f2d"
      },
      {
        key: "questions",
        title: "Questions",
        icon: "comment-question-outline",
        color: "#181f2d"
      },
      {
        key: "profile",
        title: "Profile",
        icon: "account",
        color: "#181f2d"
      }
    ]
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    dashboard: DashboardRoute,
    feedbackList: FeedbackRoute,
    questions: QuestionsRoute,
    profile: ProfileRoute
  });

  render() {
    console.disableYellowBox = true;
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
        shifting={true}
      />
    );
  }
}
