import React, { Component } from "react";
import { View, Text, Picker } from "react-native";
import styles from "../style";
import ajax from "../ajax";
import StatusBarAdjust from "../components/StatusBarAdjust";
import QuestionList from "../components/questions/QuestionList";

let pickerValue = "";
let picked = false;

class QuestionScreen extends Component {
  state = {
    questions: [],
    questionsFormFilter: [],
    dataSource: [],
    loading: false,
    refreshing: false,
    isPickerLoading: true,
    pickerValueHolder: "",
  };  
  
  
  _getFeedbackAppNames = async () => {
    const apiHost = await ajax.getApiHost();
    return fetch(apiHost + "/get/appsWithQuestions")
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
        console.error("getFeedbackAppNames "+error);
      });
  };  
  
  _filterFeedbacks = async () => {

    // get chosen app from the state
    pickerValue = this.state.pickerValueHolder;

    let questionsFormFilter = [];

    // if an app is chosen from the picker, fetch data for that app
    if (pickerValue !== "Choose App") {
      questionsFormFilter = await ajax.getQuestionsAndAvg(pickerValue);
    }

    // set received data in a state
    this.setState({ questionsFormFilter });

    // set picked back to false so data won't be fetched until something is 
    // chosen in the picker again
    picked = false;

  };  
  
  componentDidMount() {
    // get app names to populate picker
    this._getFeedbackAppNames();
  }
  
  componentDidUpdate() {

    // if an app was chosen from the picker, fetch data for that app
    if (picked == true){
      this._filterFeedbacks();
    }

  }

  render() {
    // get questions to display from the state
    const questionsToDisplay = this.state.questionsFormFilter;

    // get current app name from the state
    const appname = this.state.pickerValueHolder;

    // if there are questions to display, show QuestionList
    if (questionsToDisplay.length > 0) {
      return (
          <View style={styles.container}>
            <StatusBarAdjust />
            <View style={styles.mlr20}>
              <View>
                <View style={styles.ptb10}>
                  <Text style={[styles.text_white, styles.text_h2]}>
                    Avg. stars per question
                  </Text>
                </View>
                <View style={[styles.mtb25, { justifyContent: "flex-end" }]}>
                  {() =>
                    this.state.isPickerLoading ? (
                      <View style={{ flex: 1, paddingTop: 20 }}>
                        <ActivityIndicator />
                      </View>
                    ) : (
                      <View>
                        <Text>Apps available</Text>
                      </View>
                    )
                  }
                  <View style={{ justifyContent: "center", flex: 1 }}>
                    <Picker
                      mode="dropdown"
                      style={[styles.filterDropdown, styles.pos_rel]}
                      selectedValue={this.state.pickerValueHolder}
                      onValueChange={(itemValue, itemIndex) => {
                        // set chosen app in a state and set boolean variable picked to true
                        this.setState({ 
                          pickerValueHolder: itemValue}),
                        picked = true
                      }}
                    >
                      <Picker.Item label="Choose App" value="0" />
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
              </View>
              <View>
                <QuestionList
                  // provide QuestionList with the feedback data and appName to display them
                  style={{backgroundColor: "#fff"}}
                  feedbacks={questionsToDisplay}
                  appName={appname}/>
              </View>
            </View>
          </View>
        );
      }
      // If there are no questions to display, show the picker only
      else {
          return (
              <View style={styles.container}>
                <StatusBarAdjust />
                <View style={styles.mlr20}>
                  <View>
                    <View style={styles.ptb10}>
                      <Text style={[styles.text_white, styles.text_h2]}>
                        Avg. stars per question
                      </Text>
                    </View>
                    <View style={[styles.mtb25, { justifyContent: "flex-end" }]}>
                      {() =>
                        this.state.isPickerLoading ? (
                          <View style={{ flex: 1, paddingTop: 20 }}>
                            <ActivityIndicator />
                          </View>
                        ) : (
                          <View>
                            <Text>Apps available</Text>
                          </View>
                        )
                      }
                      <View style={{ justifyContent: "center", flex: 1 }}>
                        <Picker
                          mode="dropdown"
                          style={[styles.filterDropdown, styles.pos_rel]}
                          selectedValue={this.state.pickerValueHolder}
                          onValueChange={(itemValue, itemIndex) => {
                            // set chosen app in a state and set boolean variable picked to true
                            this.setState({ 
                              pickerValueHolder: itemValue}),
                            picked = true
                          }
                          }
                        >
                          <Picker.Item label="Choose App" value="0" />
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
                  </View>
                </View>
              </View>
            );
      }
  }        
}         
export default QuestionScreen;
