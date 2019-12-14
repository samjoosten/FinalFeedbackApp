import React, { Component } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { withNavigation } from "react-navigation";
import { TouchableHighlight } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";

import StatusBarAdjust from "../components/StatusBarAdjust";
import SmileyDetailsScreen from "../components/SmileyDetailsScreen";

import ajax from "../ajax";
import styles from "../style";

class FeedbackDetailsScreen extends React.Component {
  state = {
    feedbackDetails: []
  };

  _getFeedbackDetailData = async () => {
    const tagID = this.props.navigation.getParam("tag");
    const _feedback = await ajax.getFeedbackDetail(tagID);
    this.setState({ feedbackDetails: _feedback });
  };

  componentDidMount() {
    this._getFeedbackDetailData();
  }

  render() {
    const feedback = this.state.feedbackDetails;
    const appName = feedback.map((item, index) => {
      return item.app;
    });
    const feedbackID = feedback.map((item, index) => {
      return item.id;
    });
    const time = feedback.map((item, index) => {
      return item.time;
    });
    const category = feedback.map((item, index) => {
      return item.category;
    });
    const _feedback = feedback.map((item, index) => {
      return item.feedback;
    });
    const os = feedback.map((item, index) => {
      return item.os;
    });
    const device = feedback.map((item, index) => {
      return item.device;
    });
    const template = feedback.map((item, index) => {
      return item.template;
    });
    const rating = feedback.map((item, index) => {
      if (item.template !== "Template3") {
        return item.rating;
      } else {
        return null;
      }
    });
    const question0 = feedback.map((item, index) => {
      if (item.template === "Template3") {
        return item.questions.question0.question;
      } else {
        return null;
      }
    });
    const star0 = feedback.map((item, index) => {
      if (item.template === "Template3") {
        return item.questions.question0.stars;
      } else {
        return null;
      }
    });
    const question1 = feedback.map((item, index) => {
      if (item.template === "Template3") {
        return item.questions.question1.question;
      } else {
        return null;
      }
    });
    const star1 = feedback.map((item, index) => {
      if (item.template === "Template3") {
        return item.questions.question1.stars;
      } else {
        return null;
      }
    });
    const question2 = feedback.map((item, index) => {
      if (item.template === "Template3") {
        return item.questions.question2.question;
      } else {
        return null;
      }
    });
    const question3 = feedback.map((item, index) => {
      if (item.template === "Template3") {
        return item.questions.question3.question;
      } else {
        return null;
      }
    });
    return (
      <View style={styles.container}>
        {Platform.OS !== "ios" ? <StatusBarAdjust /> : <View />}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.mlr20, styles.pt5, styles.pb15]}>
            <View style={styles.ptb10}>
              <Text style={[styles.text_h3, styles.text_white]}>
                Feedback id : {feedbackID}
              </Text>
            </View>
            <View style={styles.panel}>
              <View style={styles.panel_header}>
                <Text style={[styles.text_white, styles.h2, styles.text_bold]}>
                  Date
                </Text>
                <Text style={[styles.text_white_opacity, styles.ptb10]}>
                  {time}
                </Text>
              </View>
              <View style={styles.hr} />
              <View style={styles.ptb10}>
                <Text style={styles.text_white}>
                  <Text style={styles.text_bold}>Category : </Text>
                  <Text style={styles.text_white_opacity}>{category}</Text>
                </Text>
              </View>
            </View>
            <View style={styles.panel}>
              <View style={[styles.panel_header, styles.pos_rel]}>
                <Text style={[styles.text_white, styles.h2, styles.text_bold]}>
                  User's mood rate : {rating}
                </Text>
                <View style={styles.smiley_icon_position}>
                  <SmileyDetailsScreen userInput={rating} />
                </View>
              </View>
              <View style={[styles.hr, styles.mt15]} />
              <View style={styles.ptb10}>
                <Text style={styles.text_white}>
                  <Text style={styles.text_bold}>Feedback : </Text>
                  <Text style={styles.text_white_opacity}>{_feedback}</Text>
                </Text>
              </View>
            </View>
            <View style={styles.panel}>
              <View style={[styles.panel_header, styles.pos_rel]}>
                <Text style={[styles.text_white, styles.h2, styles.text_bold]}>
                  Feedback metadata
                </Text>
              </View>
              <View style={[styles.hr, styles.mt15]} />
              <View style={styles.ptb10}>
                <Text style={styles.text_white}>
                  <Text style={styles.text_bold}>Operation system : </Text>
                  <Text style={styles.text_white_opacity}>{os}</Text>
                </Text>
              </View>
              <View style={styles.ptb10}>
                <Text style={styles.text_white}>
                  <Text style={styles.text_bold}>User device : </Text>
                  <Text style={styles.text_white_opacity}>{device}</Text>
                </Text>
              </View>
            </View>
            <View>
              {question0 !== null ? (
                <View style={styles.panel}>
                  <Text style={[styles.text_white]}>
                    See feedback questions
                  </Text>
                  <Text style={[styles.text_white_opacity]}>
                    1. {question0}
                  </Text>
                  <Text style={[styles.text_white_opacity]}> {star0}</Text>
                  <Text style={[styles.text_white_opacity]}>
                    2. {question1}
                  </Text>
                  <Text style={[styles.text_white_opacity]}> {star1}</Text>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              <TouchableHighlight
                onPress={() =>
                  Alert.alert(
                    "Delete",
                    "Feedback will be achived. Proceed?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed!")
                      },
                      { text: "Yes", onPress: () => this.handleDeleteFeedback }
                    ],
                    { cancelable: false }
                  )
                }
              >
                <View style={[styles.btnDelete]}>
                  <Ionicons
                    style={styles.text_white}
                    name="md-trash"
                    size={30}
                  />
                  <Text
                    style={[
                      styles.text_white,
                      styles.btnDeleteTextSize,
                      styles.btnDeletePos
                    ]}
                  >
                    Delete
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default withNavigation(FeedbackDetailsScreen);
