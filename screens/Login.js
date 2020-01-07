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
    //check name and password

    this.props.navigation.navigate("DashboardDomain");

    // const account = {
    //     name: this.state.name,
    //     password: this.state.password
    // };

    // if(account.name == "" || account.password == ""){
    //     alert("Name and password cannot be empty!")
    //     return;
    // }

    // const url = Constants.url + 'login';

    // fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(account)
    // })
    //     .then((response) => response.json())
    //     .then((responseJson) => {

    //         //check if passwords are the same
    //         if(responseJson.result){
    //             this.loginSuccessful();
    //         }else{
    //             alert('login failed');
    //         }
    //     })
    //     .catch((error) => {
    //         console.error(JSON.stringify(error));
    //     });
  }

  //todo: go to next screen.
  loginSuccessful() {
    alert("login successful");
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.login_container} behavior="padding">
        <View>
          <TextInput
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
            placeholder={"Name"}
            placeholderTextColor="#C3C3C3"
            style={styles.login_input}
          />
          <TextInput
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            placeholder={"Password"}
            placeholderTextColor="#C3C3C3"
            secureTextEntry={true}
            style={styles.login_input}
          />
          <TouchableHighlight
            style={styles.login_button}
            onPress={this.onLogin.bind(this)}
          >
            <Text style={styles.login_btnText}>Login</Text>
          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
