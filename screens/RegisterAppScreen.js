import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Button
} from "react-native";
import { withNavigation } from "react-navigation";
import StatusBarAdjust from "../components/StatusBarAdjust";
import styles from "../style";

class RegisterAppScreen extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.container}>
          <StatusBarAdjust />
          <View style={styles.containerCenter}>
            <View style={[styles.bg_white, styles.p10, styles.radius10]}>
              <View style={styles.mb15}>
                <Text style={styles.text_h3}>Register an app</Text>
              </View>
              <View>
                <TextInput
                  style={styles.input_registerApp}
                  placeholder="Type app name..."
                />
              </View>
              <View>
                <TextInput
                  style={styles.input_registerApp}
                  placeholder="Type image url..."
                />
              </View>
              <View style={styles.mt15}>
                <Button title="Submit and configure" />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default withNavigation(RegisterAppScreen);
