import React, { Component } from 'react';
import {
    Text,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class ImagePickerButton extends Component {

    constructor() {
        super();
        this.state = {

        };

        this.imagePickerHandler = this.imagePickerHandler.bind(this);
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    imagePickerHandler = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        console.log(result);

        if (!result.cancelled) {
            this.props.setImage(result.uri);
        }
    }

    render() {
        const style = this.props.style;
        return (
            <TouchableHighlight style={[styles.button, style]}
                onPress={this.imagePickerHandler}
                underlayColor="#74b9ff">
                <Text style={styles.btnText}>Choose Photo</Text>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginBottom: 20,
        padding: 10,
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: "orange",
    },
    btnText: {
        textAlign: 'center',
        fontSize: 17,
        color: 'white'
    },
});
