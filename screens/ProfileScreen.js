import React, { Component } from "react";
import { View, Text, TouchableHighlight, Button } from "react-native";
import { withNavigation } from "react-navigation";

import StatusBarAdjust from "../components/StatusBarAdjust";
import styles from "../style";

class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={[styles.container]}>
        <StatusBarAdjust />
        <View style={styles.btnAddPanel}>
          <Button
            title="Register an app"
            style={styles.btnAddApp}
            onPress={() => this.props.navigation.navigate("Register")}
          />
        </View>
      </View>
    );
  }
}

export default withNavigation(ProfileScreen);
