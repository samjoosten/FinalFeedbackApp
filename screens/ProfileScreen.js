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
          <View style={styles.pb15}>
            <Button
              title="Register an app"
              style={styles.btnAddApp}
              onPress={() => this.props.navigation.navigate("RegisterApp")}
            />
          </View>
          <View style={styles.pb15}>
            <Button
              title="Add new admin"
              style={styles.btnAddApp}
              onPress={() => alert("In future updates")}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default withNavigation(ProfileScreen);
