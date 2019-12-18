import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  RefreshControl,
  Picker
} from "react-native";
import { withNavigation } from "react-navigation";

import ajax from "../ajax";
import styles from "../style";
import StatusBarAdjust from "../components/StatusBarAdjust";
import { ActivityIndicator } from "react-native-paper";

let picked = false;

class FeedbackListScreen extends React.Component {
  state = {
    feedbacks: [],
    dataSource: [],
    feedbackFormFilter: [],
    _refreshing: false,
    isPickerLoading: true,
    pickerValueHolder: ""
  };

  handleRefresh = () => {
    this.setState({ _refreshing: true });
    this._getFeedbackData().then(() => {
      this.setState({ _refreshing: false });
    });
  };

  _getFeedbackAppNames = async () => {
    const apiHost = ajax.getApiHost();
    return fetch(apiHost + "/get/appsWithFeedback")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isPickerLoading: false,
            dataSource: responseJson
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  _filterFeedbacks = async () => {
    const pickerValue = this.state.pickerValueHolder;
    let feedbackFormFilter = [];
    if (pickerValue !== "All") {
      feedbackFormFilter = await ajax.fetchFeedbacksFilteredResult(pickerValue);
    }
    this.setState({ feedbackFormFilter });
    picked = false;
  };

  _getFeedbackData = async () => {
    const _feedbacks = await ajax.getAllFeedbacks();
    this.setState({ feedbacks: _feedbacks });
  };

  componentDidMount() {
    this._getFeedbackData();
    this._getFeedbackAppNames();
    this._filterFeedbacks();
  }

  componentWillUpdate() {
    if (picked == true) {
      this._filterFeedbacks();
    }
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
    const feedbacksToDisplay =
      this.state.feedbackFormFilter.length > 0
        ? this.state.feedbackFormFilter
        : this.state.feedbacks;

    console.log("todisplay" + feedbacksToDisplay);
    if (feedbacksToDisplay.length > 0) {
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
            <View style={[styles.mtb25, { justifyContent: "flex-end" }]}>
              {() =>
                this.state.isPickerLoading ? (
                  <View>
                    <ActivityIndicator size="large" />
                  </View>
                ) : (
                  <View>
                    <Text>Apps very well available</Text>
                  </View>
                )
              }
              <View style={{ justifyContent: "center", flex: 1 }}>
                <Picker
                  mode="dropdown"
                  style={[styles.filterDropdown, styles.pos_rel]}
                  selectedValue={this.state.pickerValueHolder}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ pickerValueHolder: itemValue }),
                      (picked = true);
                  }}
                >
                  <Picker.Item label="All" value="0" />
                  {this.state.dataSource.map((item, key) => {
                    return (
                      <Picker.Item
                        label={item.app}
                        value={item.app}
                        key={key}
                      />
                    );
                  })}
                </Picker>
              </View>
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
              showsVerticalScrollIndicator={false}
              data={feedbacksToDisplay}
              renderItem={({ item }) => (
                <View>
                  <View style={styles.ptb10}>
                    <TouchableOpacity
                      style={{
                        borderBottomWidth: 0.5,
                        borderBottomColor: "#ffffff5c",
                        paddingBottom: 5
                      }}
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
                        {item.app} app
                      </Text>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode="head"
                        style={styles.text_white_opacity}
                      >
                        {item.feedback}
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
              refreshControl={
                <RefreshControl
                  refreshing={this.state._refreshing}
                  onRefresh={this.handleRefresh.bind(this)}
                />
              }
            />
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>There is no feedback sent yet!</Text>
      </View>
    );
  }
}

export default withNavigation(FeedbackListScreen);
