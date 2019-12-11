import React, { Component } from "react";
import { View, Text } from "react-native";

class DashboardScreen extends Component {
  static navigationOptions = {
    title: "Welcome",
    header: { visible: false }
  };
  render() {
    return (
      <View>
        <Text>DashboardScreen</Text>
      </View>
    );
  }
}

export default DashboardScreen;
