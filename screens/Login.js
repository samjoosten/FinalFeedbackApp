import React, { Component } from "react";
import {
  TouchableHighlight,
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  Dimensions
} from "react-native";
import styles from "../style";

let scr = Dimensions.get("window").width;

export default class Login extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Login",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#474747"
      }
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      password: ""
    };

    this.loginSuccessful = this.loginSuccessful.bind(this);
  }

  onLogin() {
    const account = {
      name: this.state.name,
      password: this.state.password
    };

    if (account.name == "" || account.password == "") {
      alert("Name and password cannot be empty!");
      return;
    } else if (account.name == "admin" && account.password == "admin") {
      this.props.navigation.navigate("DashboardDomain");
    } else {
      alert("Invalid name or password");
      return;
    }
  }

  //todo: go to next screen.
  loginSuccessful() {
    alert("login successful");
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.login_container} behavior="padding">
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Name</Text>
            <TextInput
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
              placeholderTextColor="#C3C3C3"
              style={styles.textInput}
            />
          </View>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              placeholderTextColor="#C3C3C3"
              secureTextEntry={true}
              style={styles.textInput}
            />
          </View>
        </View>

        <TouchableHighlight
          style={styles.loginButton}
          onPress={this.onLogin.bind(this)}
        >
          <Text style={{ color: "#fff", fontWeight: "500" }}>Login</Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    );
  }
}
