import React, { Component } from "react";
import { Image, View, Text, ScrollView, Alert } from "react-native";
import { withNavigation } from "react-navigation";
import {
  TouchableHighlight,
  TouchableOpacity
} from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import StarRating from "react-native-star-rating";

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
  _deleteFeedbackByTag = async () => {
    const tagID = this.props.navigation.getParam("tag");
    const deletedValue = await ajax.getFeedbackToDeleteByTag(tagID);
    if (deletedValue > 0) {
      console.log("deleted");
      //this._getFeedbackDetailData();
      this.props.navigation.navigate("DashboardDomain");
      //this._getFeedbackDetailData();
    }
  };
  componentDidMount() {
    this._getFeedbackDetailData();
  }

  render() {
    const feedback = this.state.feedbackDetails;
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
    const star2 = feedback.map((item, index) => {
      if (item.template === "Template3") {
        return item.questions.question2.stars;
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
    const star3 = feedback.map((item, index) => {
      if (item.template === "Template3") {
        return item.questions.question3.stars;
      } else {
        return null;
      }
    });

    const tagID = this.props.navigation.getParam("tag");
    const imgUrl =
      "https://res.cloudinary.com/team24icloud/image/upload/c_thumb,w_250/v1578400101/" +
      tagID +
      ".jpg";

    return (
      <View style={styles.container}>
        <StatusBarAdjust />
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
                {question0.toString().length > 0 ? (
                  <Text
                    style={[styles.text_white, styles.h2, styles.text_bold]}
                  >
                    User's feedback
                  </Text>
                ) : (
                  <>
                    <Text
                      style={[styles.text_white, styles.h2, styles.text_bold]}
                    >
                      User's mood rate : {rating}
                    </Text>
                    <View style={styles.smiley_icon_position}>
                      <SmileyDetailsScreen userInput={rating} />
                    </View>
                  </>
                )}
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
              {question0.toString().length > 0 ? (
                <View style={styles.panel}>
                  <Text style={[styles.text_white, styles.text_h4]}>
                    See feedback questions
                  </Text>
                  <Text />
                  <Text style={[styles.text_white_opacity]}>{question0}</Text>
                  <View>
                    <StarRating
                      starStyle={{ paddingVertical: 5 }}
                      containerStyle={{ paddingVertical: 5 }}
                      starStyle={{ color: "orange" }}
                      disabled={true}
                      maxStars={5}
                      rating={star0}
                      starSize={25}
                    />
                  </View>
                  <Text />
                  <Text style={[styles.text_white_opacity]}>{question1}</Text>
                  <View>
                    <StarRating
                      starStyle={{ paddingVertical: 5 }}
                      containerStyle={{ paddingVertical: 5 }}
                      starStyle={{ color: "orange" }}
                      disabled={true}
                      maxStars={5}
                      rating={star1}
                      starSize={25}
                    />
                  </View>
                  <Text />
                  <Text style={[styles.text_white_opacity]}>{question2}</Text>
                  <View>
                    <StarRating
                      starStyle={{ paddingVertical: 5 }}
                      containerStyle={{ paddingVertical: 5 }}
                      starStyle={{ color: "orange" }}
                      disabled={true}
                      maxStars={5}
                      rating={star2}
                      starSize={25}
                    />
                  </View>
                  <Text />
                  <Text style={[styles.text_white_opacity]}>{question3}</Text>
                  <View>
                    <StarRating
                      starStyle={{ paddingVertical: 5 }}
                      containerStyle={{ paddingVertical: 5 }}
                      starStyle={{ color: "orange" }}
                      disabled={true}
                      maxStars={5}
                      rating={star3}
                      starSize={25}
                    />
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("ImageFullScreen", {
                  tag: tagID
                });
              }}
            >
              <Image
                style={{ width: 250, height: 150, alignSelf: "center" }}
                source={{ uri: imgUrl }}
              />
            </TouchableOpacity>
            <View style={{ marginTop: 15 }}>
              <TouchableHighlight
                onPress={() =>
                  Alert.alert(
                    "Delete",
                    "This feedback will be deleted. Proceed?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed!")
                      },
                      {
                        text: "Yes",
                        onPress: () => this._deleteFeedbackByTag()
                      }
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
