import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    Button,
    Platform, ScrollView,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import BugReportCheckBox from './BugReportCheckBox';
import * as Device from 'expo-device';
import Constants from "../Constants";

var starMap = {};

class Template3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starCount: {},
            feedback: "",
            feedbackType: "",
            appName: props.appName,
            configData: props.config
        };
        this.sendFeedback = this.sendFeedback.bind(this);
        this.addBugReport = this.addBugReport.bind(this);
    }

    componentDidMount() {
        starMap = {};
    }

    onStarPressed(rating, index, starQuestion) {
        starMap[index] = {
            star: rating,
            question: starQuestion
        };
        this.setState({starCount: starMap})

    }

    sendFeedback() {
        var i;
        //Hier alleen even this.state.configData.question veranderen in de som van het aantal vragen van de template
        for(i = 0; i<this.state.configData.length; i++){
            if(!starMap[i] || starMap[i] === 0){
                alert('Please press on a star for every question');
                return;
            }
        }
        if (this.state.feedback !== "") {
            this.setState({ feedbackType: "bugreport"})
        } else {
            this.setState({ feedbackType: "feedback"})
        }
            // set the device info and os in state
            var deviceInfo = Device.modelName;
            var deviceOs = Platform.OS;
            // post the user feedback to the api
            var starValues = this.state.starCount;
            var appName = this.state.appName;
            var feedback = this.state.feedback;
            var feedbackType = this.state.feedbackType;
            var feedbackTag = Constants.makeId();

            // fetch(Constants.url + 'post', {
            //     method: 'POST',
            //     body:
            //         JSON.stringify({
            //             feedback: feedback,
            //             app: appName,
            //             device: deviceInfo,
            //             os: deviceOs,
            //             category: feedbackType,
            //
            //         })
            // })
            //     .then(res => console.log(res))
            //     .catch(err => console.log(err));
            Object.keys(starValues).map(function (key) {
                fetch(Constants.url + 'post', {
                    method: 'POST',
                    body:
                        JSON.stringify({
                            template: 'Template3',
                            feedback: feedback,
                            app: appName,
                            device: deviceInfo,
                            os: deviceOs,
                            category: feedbackType,
                            stars: starValues[key].star,
                            starQuestion: starValues[key].question,
                            tag: feedbackTag

                        })
                })
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            });
            this.props.navigation.navigate('Home');

    }

    addBugReport(text) {
        this.setState({ feedback: text })
    }



    renderItem = ({item, index}) => {
        var starQuestion = item.starQuestion;
        return (
            <View style={{margin: 5}}>
                <Text style={styles.header}>{starQuestion}</Text>
                <StarRating starStyle={{color: 'orange'}}
                            disabled={false}
                            maxStars={5}
                            rating={this.state.starCount[index] ? this.state.starCount[index].star : 0}
                            selectedStar={(rating) => this.onStarPressed(rating, index, starQuestion)}/>
            </View>
        )
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{flex: 4}}>
                    <FlatList numOfColumns={1}
                              horizontal={false}
                              contentContainerStyle={styles.list}
                              data={this.state.configData}
                              extractData={this.state}
                              renderItem={this.renderItem}/>
                </View>
                <BugReportCheckBox textChange={(text) => this.addBugReport(text)}/>
                <Button title="Submit" onPress={this.sendFeedback}/>
            </ScrollView>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 5,
        padding: 10,
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
})

export default Template3
