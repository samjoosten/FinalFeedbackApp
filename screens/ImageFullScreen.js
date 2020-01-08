import React, { Component } from "react";
import { Image, View, Dimensions} from "react-native";
import { withNavigation } from "react-navigation";
import StatusBarAdjust from "../components/StatusBarAdjust";

class ImageFullScreen extends Component {
    
    render() {
        var w = Dimensions.get('window').width
        var h = Dimensions.get('window').height
        const tag = this.props.navigation.getParam("tag");
        const imgUrl = 'https://res.cloudinary.com/team24icloud/image/upload/v1578400140/'+tag+'.jpg';

        console.log(imgUrl);
        return (

            <View style={{flex: 1, height: h, width: w, backgroundColor: "#1d2637"}}>
                <StatusBarAdjust />
                <Image style={{height: h, width: w, resizeMode: 'contain'}} source={{uri: imgUrl}}/>
            </View>
        )
    }
}
export default withNavigation(ImageFullScreen);