import React, { Component } from "react";
import { View, Text } from "react-native";
import { withNavigation } from "react-navigation";

import ajax from "../ajax";

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
    const question = feedback.map((item, index) => {
      return item.questions.question3.question !== ""
        ? item.questions.question3.question
        : "";
    });
    return (
      <View>
        <Text>{appName}</Text>
        <Text>{question}</Text>
      </View>
    );
  }
}

export default withNavigation(FeedbackDetailsScreen);
