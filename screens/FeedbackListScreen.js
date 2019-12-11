import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Platform,
  TouchableOpacity,
  Image
} from "react-native";
import { withNavigation } from "react-navigation";

import ajax from "../ajax";
import styles from "../style";
import StatusBarAdjust from "../components/StatusBarAdjust";

class FeedbackListScreen extends React.Component {
  state = {
    feedbacks: []
  };

  _getFeedbackData = async () => {
    const _feedbacks = await ajax.getAllFeedbacks();
    this.setState({ feedbacks: _feedbacks });
  };

  componentDidMount() {
    this._getFeedbackData();
  }

  checkOs = osText => {
    var text = osText;
    if (text.toLowerCase().indexOf("os") >= 0) {
      return (
        <Image
          source={require("../assets/ios-icon-img.png")}
          style={styles.osLogo}
        />
      );
    } else if (text.toLowerCase().indexOf("android") >= 0) {
      return (
        <Image
          source={require("../assets/android-icon-img.png")}
          style={styles.osLogo}
        />
      );
    }
  };

  render() {
    const feedbacksToDisplay = this.state.feedbacks;
    return (
      <View style={styles.container}>
        {Platform.OS !== "ios" ? <StatusBarAdjust /> : <View />}
        <View style={[styles.mlr20, styles.mb50, styles.pb15]}>
          <View style={styles.ptb10}>
            <Text style={[styles.text_white, styles.text_h2]}>
              Feedback list
            </Text>
            <Text style={styles.text_white_opacity}>Updated 5 min ago</Text>
          </View>
          <View style={[styles.mtb25, { flexDirection: "row" }]}>
            <View>
              <Text style={[styles.text_white_opacity, styles.pt5]}>New</Text>
            </View>
            <View style={styles.badge}>
              <Text style={[styles.text_white]}>0</Text>
            </View>
          </View>
          <FlatList
            data={feedbacksToDisplay}
            renderItem={({ item }) => (
              <View>
                <View style={styles.ptb10}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("FeedbackDetails", {
                        tag: item.tag
                      })
                    }
                  >
                    <Text style={[styles.text_white, styles.text_h3]}>
                      {item.category !== "" ? (
                        item.category
                      ) : (
                        <Text>Question Feedback</Text>
                      )}
                    </Text>
                    <Text style={styles.text_white_opacity}>
                      From {item.app} app
                    </Text>
                    <Text style={styles.text_white_opacity}>
                      From {item.feedback} app
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.image_list_icon}>
                  {/* image comes here */}
                  {this.checkOs(item.os)}
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

export default withNavigation(FeedbackListScreen);
