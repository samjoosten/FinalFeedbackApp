import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Button,
    KeyboardAvoidingView,
    Platform, ScrollView, TextInput, TouchableHighlight,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import PropTypes, { object } from "prop-types"
import BugReportCheckBox from '../BugReportCheckBox'
import Constants from "../../Constants";

var starMap = {};


export default class Template3Config extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionConfig: {},
            starCount: {},
            feedback: "",
            feedbackType: "",
            configData: [1, 2, 3, 4]
            // appName: props.appName,
            // configData: props.config
        };
        this.questionMap = {};
        this.basicQuestions = ['Click on text to change it', 'Swipe left or right to change the template', 'Your survey will look like this', 'How did you like the app?'];
        this.stars = [1, 2, 3, 4, 5];
        this.addQuestionButton = this.addQuestionButton.bind(this);

        this.confirm = this.confirm.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.addBugReport = this.addBugReport.bind(this);
    }

    componentDidMount() {
        starMap = {};
    }

    onStarPressed(rating, index) {
        starMap[index] = {
            star: rating
        };
        this.setState({ starCount: starMap })

    }

    inputChangeHandler(text, index) {
        this.questionMap[index] = text;
    }

    addQuestionButton() {
        var questionList = this.state.configData;
        questionList = questionList.concat(questionList.length + 1);
        this.setState({
            configData: questionList
        })
    }

    confirm() {
        var appName = this.props.name;
        var logo = this.props.logo;
        var password = this.props.password;
        var questionConfig = this.questionMap;

        var i;
        const MINIMUMQUESTIONAMOUNT = 4;

        //undefined is not an object evaluating quesionConfig[i]
        for (i = 0; i < MINIMUMQUESTIONAMOUNT; i++) {
            if (!questionConfig[i] || questionConfig[i] === '') {
                alert('The first 4 questions must be filled in');
                return;
            }
        }
        for (i = MINIMUMQUESTIONAMOUNT; i < Object.keys(questionConfig).length; i++) {
            if (questionConfig[i] === '') {
                delete questionConfig[i]

            }
        }




        Object.keys(questionConfig).map(function (key) {
            fetch(Constants.url + 'addAccount', {
                method: 'POST',
                body: JSON.stringify({
                    appName: appName,
                    template: 'Template3',
                    logoURL: logo,
                    password: password,
                    featureConfig: "",
                    starQuestion: questionConfig[key]
                })
            })
                .then(res => console.log(JSON.stringify(res)))
                .catch(err => console.log(JSON.stringify(err)))
        })
        this.props.navigation.navigate('Launch')

    }


    addBugReport(text) {
        this.setState({ feedback: text })
    }

    renderListFooter = () => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableHighlight style={styles.addButton} onPress={this.addQuestionButton}>
                    <Text style={{ fontSize: 40, color: 'white' }}>+</Text>
                </TouchableHighlight>
            </View>
        )
    }


    renderItem = ({ item, index }) => {
        return (
            <View style={{ margin: 5 }}>
                <TextInput style={styles.txtInput}
                    placeholder={!this.basicQuestions[index] ? 'Insert your question' : this.basicQuestions[index]}
                    value={this.state.questionConfig[index]}
                    placeholderTextColor="#C3C3C3"
                    multiline={true}
                    onChangeText={(text) => this.inputChangeHandler(text, index)} />
                <StarRating starStyle={{ color: 'orange' }}
                    disabled={true}
                    maxStars={5}
                    rating={this.stars[index % 5]}
                    selectedStar={(rating) => this.onStarPressed(rating, index)} />
            </View>
        )
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={{ flex: 4 }}>
                    <FlatList numOfColumns={1}
                        horizontal={false}
                        contentContainerStyle={styles.list}
                        data={this.state.configData}
                        extractData={this.state}
                        ListFooterComponent={this.renderListFooter}
                        renderItem={this.renderItem} />
                </View>
                <BugReportCheckBox textChange={(text) => this.addBugReport(text)} />
                <Button title="Confirm" onPress={this.confirm} />
            </KeyboardAvoidingView>

        )
    }
}

Template3Config.propTypes = {
    name: PropTypes.string,
    logo: PropTypes.string,
    password: PropTypes.string
}

const styles = StyleSheet.create({
    container: {
        flex: 5,
        // padding: 10,
        backgroundColor: '#313131'
    },
    header: {
        fontSize: 20,
        margin: 10,
        color: 'white',
        fontWeight: 'bold'
    },
    questionSection: {
        padding: 10
    },
    list: {
        // paddingBottom: 50,
        backgroundColor: '#313131',
        justifyContent: 'space-around',
    },
    txtInput: {
        borderBottomColor: 'gray',
        borderBottomWidth: 3,
        padding: 10,
        margin: 10,
        fontSize: 22,
    },
    addButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#27ae60',
        width: 50,
        height: 50,
        borderRadius: 100
    }
})
