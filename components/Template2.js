import React, { Component } from 'react';
import {
    Text,
    TouchableHighlight,
    View,
    TextInput,
    StyleSheet,
    Dimensions,
    Platform,
    FlatList,
    Button,
    ScrollView,
    Alert,
    KeyboardAvoidingView
} from 'react-native';
import * as Device from "expo-device";
import BugReportCheckBox from "./BugReportCheckBox"
import Constants from "../Constants";


class Template2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonActive: true,
            loadTextInput: false,
            loadBugInput: false,
            feedbackType: "feedback",
            feedback: "",
            appName: props.appName,
            configData: props.config,
            featureHeader: '',
            loadInputSection: false,
            rating: '',
            feature: ''
        };
        this.sendFeedback = this.sendFeedback.bind(this);
        this.addBugReportText = this.addBugReportText.bind(this);
    }

    componentDidMount() {
        var even = [];
        var uneven = [];
        for (var i = 0; i < 11; i++) {
            if (i % 2 === 0) {
                even.push({ key: i, val: i, active: false });
            } else {
                uneven.push({ key: i, val: i, active: false });
            }
        }
        var data = even.concat(uneven);
        this.setState({
            data: data
        })
    }

    addBugReportText(text) {
        this.setState({ feedback: text })
        this.setState({ feedbackType: 'bugreport' })
    }

    sendFeedback() {
        var feedbackTag = Constants.makeId();

        if (this.state.rating !== '') {
            var chosenFeature = this.state.featurePick;
            if (chosenFeature !== '') {

                if (this.state.feedback !== "") {
                    this.setState({ feedbackType: "bugreport" })
                } else {
                    this.setState({ feedbackType: "feedback" })
                }
                // set the device info and os in variables
                var deviceInfo = Device.modelName;
                var deviceOs = Platform.OS;

                // post the user feedback to the api

                fetch(Constants.url + 'post', {
                    method: 'POST',
                    body: JSON.stringify({
                        template: 'Template2',
                        feedback: this.state.feedback,
                        app: this.state.appName,
                        device: deviceInfo,
                        os: deviceOs,
                        category: this.state.feedbackType,
                        rating: this.state.rating,
                        feature: this.state.featurePick,
                        tag: feedbackTag


                    })
                })
                    .then(res => console.log(JSON.stringify(res)))
                    .catch(err => console.log(JSON.stringify(err)));
                Alert.alert("Feedback sent!")
                this.props.navigation.navigate('Home');
            } else {
                Alert.alert('You must pick a feature');
            }
        } else {
            Alert.alert('Rating cannot be empty');
        }

    }

    renderItem = ({ item }) => {
        return (
            <TouchableHighlight style={item.active ? styles.circleButtonActive : styles.circleButton} onPress={() => {
                this.state.data.forEach((element) => {
                    element.active = false;
                });
                item.active = !item.active;
                this.setState({
                    loadTextInput: true,
                    featureHeader: (item.val < 6 ? 'What did you dislike?' : 'What did you like?'),
                    rating: item.val
                })

            }}>

                <Text style={{ color: 'white', fontSize: 17, fontWeight: 'bold' }}>{item.val}</Text>
            </TouchableHighlight>
        )
    }



    renderButtonItem = ({ item }) => {
        return (
            <TouchableHighlight style={item.active ? [styles.button, {
                backgroundColor: '#e67e22'
            }] : [styles.button, { backgroundColor: 'orange' }]} onPress={() => {
                this.state.configData.forEach((element) => {
                    element.active = false;
                })
                item.active = !item.active;
                if (item.featureConfig !== 'Other...') {
                    this.setState({
                        featurePick: item.featureConfig,
                        loadInputSection: false
                    })
                } else {
                    this.setState({
                        loadInputSection: true
                    })
                }
                this.setState({
                    buttonActive: false
                })


            }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{item.featureConfig}</Text>
            </TouchableHighlight>
        )

    }


    renderListHeader = () => {
        return (
            <Text style={styles.listHeader}>Rate Our App</Text>
        )
    }

    renderListFooter = () => {
        return (
            <View
                style={{ flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width }}>
                <Text style={{ margin: 10, color: 'white' }}>Really Bad</Text>
                <Text style={{ margin: 10, color: 'white' }}>Really Good</Text>
            </View>
        )
    }


    render() {

        if (!this.state.data) {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            )
        }

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <ScrollView>
                    <FlatList
                        numColumns={6}
                        horizontal={false}
                        contentContainerStyle={styles.list}
                        data={this.state.data}
                        extractData={this.state}
                        ListHeaderComponent={this.renderListHeader}
                        ListFooterComponent={this.renderListFooter}
                        renderItem={this.renderItem} />
                    {this.state.loadTextInput ? <View style={styles.btnContainer}>
                        <Text style={styles.listHeader}>{this.state.featureHeader}</Text>
                        <FlatList numColumns={2}
                            horizontal={false}
                            contentContainerStyle={styles.btnList}
                            data={this.state.configData}
                            extractData={this.state}
                            renderItem={this.renderButtonItem} />
                        {this.state.loadInputSection ? <View style={styles.inputSection}>
                            <TextInput style={{ color: 'white' }}
                                placeholder="Type your feature..."
                                placeholderTextColor="#C3C3C3"
                                onChangeText={(text) => this.setState({ featurePick: text })} />
                        </View> : <View />}
                    </View> : <View style={styles.btnContainer} />}
                    <BugReportCheckBox textChange={(text) => this.addBugReportText(text)} />
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Button title="Submit" onPress={this.sendFeedback} disabled={this.state.buttonActive} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )

    }
}

const styles = StyleSheet.create({
    listHeader: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
        margin: 10
    },
    container: {
        flex: 6,
        backgroundColor: '#313131',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    btnContainer: {
        flex: 1.7,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnList: {
        flex: 1,
        alignItems: 'center'
    },
    circleButton: {
        borderRadius: 100,
        margin: 3,
        backgroundColor: 'orange',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleButtonActive: {
        borderRadius: 100,
        margin: 3,
        backgroundColor: '#e67e22',
        width: 53,
        height: 53,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        borderRadius: 10,
        width: 150,
        padding: 15,
        margin: 10,
        justifyContent: 'center'
    },
    inputSection: {
        borderBottomColor: 'gray',
        borderBottomWidth: 3,
        padding: 10,
        margin: 10,
        justifyContent: 'flex-start',
        alignSelf: 'stretch'
    },
    list: {
        flex: 1,
        marginBottom: 5,
        // paddingBottom: 50,
        backgroundColor: '#5f5f5f',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    picker: {
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        padding: 10
    },
    btnText: {
        textAlign: 'center',
        fontSize: 17,
        color: 'white'
    },
})


export default Template2
