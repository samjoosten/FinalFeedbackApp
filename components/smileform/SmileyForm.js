import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Slider,
} from 'react-native';
import PropTypes from 'prop-types';
import Smiley from './Smiley';

export default class Smile50 extends Component {
    constructor() {
        super();
        this.getVal = this.getVal.bind(this)
    }

    //on slide change
    getVal(val) {
        this.props.setSmiley(val)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    How do you feel about the App?
                </Text>
                <Smiley userInput={this.props.smile}></Smiley>
                <Slider
                    style={{ width: 200, transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                    step={1}
                    minimumValue={1}
                    maximumValue={10}
                    value={this.props.smile}
                    onValueChange={smile => this.getVal(smile)}
                    thumbTintColor="orange"                
                    minimumTrackTintColor= "#f78c19"
                    
                />
            </View>
        );
    }
}   

Smile50.propTypes = {
    onNewSmiley: PropTypes.func
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#313131',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 27,
        textAlign: 'center',
        color: 'white',
        margin: 20,
        marginTop: 0
    },
    rating: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        marginTop: 10,
        fontWeight: "bold"
    },
});