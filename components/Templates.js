import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';

import Template1 from './Template1'
import Template2 from './Template2'
import Template3 from './Template3'
import Constants from '../Constants'
import Error from './errorhandling/Error'


// Switcher to retrieve the template associated with the app and render the correct template
class Templates extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name') + "       ",
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#474747',
            },
        };
    };

    constructor(props) {
        super(props);
        var id = (props.navigation.getParam('appId') ? props.navigation.getParam('appId') : props.navigation.state.params);
        console.log(id);
        this.state = {
            appId: (id.id ? id.id : id)
        }
    }


    componentDidMount() {
        return fetch(Constants.url + 'get/templates/' + this.state.appId)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    data: responseJson
                })
                this.props.navigation.setParams({ app: this.state.data[0].app })
                this.props.navigation.setParams({ name: this.state.data[0].appName })
            }).catch((error) => {
                return (
                    <Error />
                )
            })

    }


    render() {
        if (!this.state.data) {
            return (
                <View style={{ flex: 1, backgroundColor: '#313131', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#3498db" />
                </View>
            )
        }

        var appConfig = this.state.data;
        // load the right template based on the template property from the app
        switch (appConfig[0].template) {
            case "Template1":
                return <Template1 config={appConfig} appName={appConfig[0].appName} navigation={this.props.navigation} />;
            case "Template2":
                return <Template2 config={appConfig} appName={appConfig[0].appName} navigation={this.props.navigation} />;
            case "Template3":
                return <Template3 config={appConfig} appName={appConfig[0].appName} navigation={this.props.navigation} />;
        }
    }
}


export default Templates
