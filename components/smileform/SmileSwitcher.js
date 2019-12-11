/*

Made by Tim Terwijn,

When a user opens template 1 he sees this smile switcher.

This class is responsible for swapping between the default 
smiley component and the smilepopup where you can select a
smiley instead of swiping for one.

*/

import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text
} from 'react-native';

import SmilePopup from './SmilePopup'
import Smile50 from './SmileyForm'

export default class SmileSwitcher extends Component {
    constructor() {
        super()
        this.state = {
            smileyVisible: true
        }
        this.swapSmiley = this.swapSmiley.bind(this);
    }

    //swaps between the smiley screens when pressed
    swapSmiley() {
        this.setState({
            smileyVisible : !this.state.smileyVisible
        });
    }

    render() {
        if(this.state.smileyVisible){
            return(

                <TouchableOpacity style={{flex: 1}} onPress={this.swapSmiley}>
                    <Smile50
                        smile={this.props.smile}
                        setSmiley={this.props.setSmiley}
                    />
                    <View style = {{flexDirection: 'row', justifyContent: 'space-between', marginLeft:20 , marginRight: 20}}>

                        <Text style = {{color: 'white'}}>Bad</Text>
                        <Text style = {{color: 'white'}}>Good</Text>
                    </View>
                </TouchableOpacity>
            );
        }else{
            return (
                <View style={{flex: 1}}>
                    <SmilePopup
                        smileyVisible={this.state.smileyVisible}
                        swapSmiley={this.swapSmiley}
                        setSmiley={this.props.setSmiley}
                    >
                    </SmilePopup>
                </View>
            );
        }
    }
}
