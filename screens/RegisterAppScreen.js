import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Button
} from "react-native";
import { withNavigation } from "react-navigation";
import * as ImagePicker from "expo-image-picker";
import StatusBarAdjust from "../components/StatusBarAdjust";
import Constants from "../Constants";
import styles from "../style";
import { TouchableHighlight } from "react-native-gesture-handler";

const apiUrl = "https://api.cloudinary.com/v1_1/team24icloud/image/upload";

var imgData = {};

class RegisterAppScreen extends Component {
  state = {
    appName: "",
    image: null
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 11],
      base64: true
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });

      let base64Img = `data:image/jpg;base64,${result.base64}`;

      imgData = {
        file: base64Img,
        public_id: "",
        upload_preset: "tomko6xf"
      };
    }
  };

  onRegister() {
    //get all data

    // const { appName, logoURL } = this.state;
    const appName = this.state.appName;
    const imageUrl = this.state.image;

    if (appName === "") {
      alert("App Name cannot be empty");
      return;
    }

    imgData.public_id = appName;

    fetch(apiUrl, {
      body: JSON.stringify(imgData),
      headers: {
        "content-type": "application/json"
      },
      method: "POST"
    })
      .then(async r => {
        let data = await r.json();
        console.log(data.secure_url);
        return data.secure_url;
      })
      .catch(err => console.log(err));

    const imgUrl =
      "https://res.cloudinary.com/team24icloud/image/upload/v1578400140/" +
      appName +
      ".jpg";

    console.log(imgUrl);

    this.props.navigation.navigate("TemplateConfig", {
      appName: appName,
      logoURL: imgUrl
    });
  }

  render() {
    return (
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
                onChangeText={text => this.setState({ appName: text })}
              />
            </View>
            <View>
              <TouchableHighlight
                style={[styles.input_registerApp, styles.pos_rel]}
                onPress={() => this.pickImage()}
              >
                <Text style={{ position: "absolute", top: 10, left: "32%" }}>
                  Select app image
                </Text>
              </TouchableHighlight>
            </View>
            <View style={styles.mt15}>
              <Button
                title="Submit to configure"
                onPress={this.onRegister.bind(this)}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default withNavigation(RegisterAppScreen);
