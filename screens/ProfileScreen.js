import React, {Component} from "react";
import {View, Text, TouchableHighlight, Button, Modal} from "react-native";
import {withNavigation} from "react-navigation";
import {Ionicons} from "@expo/vector-icons"

import StatusBarAdjust from "../components/StatusBarAdjust";
import styles from "../style";

class ProfileScreen extends React.Component {
    state = {
        modalVisible: false
    }


    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <View style={[styles.container]}>
                <StatusBarAdjust/>
                <View style={styles.btnAddPanel}>
                    <View style={styles.pb15}>
                        <Button
                            title="Register an app"
                            style={styles.btnAddApp}
                            onPress={() => this.props.navigation.navigate("RegisterApp")}
                        />
                    </View>
                    <View style={styles.pb15}>
                        <Button
                            title="Add new admin"
                            style={styles.btnAddApp}
                            onPress={() => this.setModalVisible(!this.state.modalVisible)}
                        />
                    </View>
                </View>

                {/* Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <View style={{height: "100%", alignItems: "center", justifyContent: "center"}}>
                        <View style={styles.modalStyle}>
                            <View style={styles.modalTitle}>
                                <View style={{alignItems: "flex-end", width: "100%"}}>
                                    <Ionicons name="ios-close"
                                              size={26}
                                              color="#8A8F9E"
                                              onPress={() => {
                                                  this.setModalVisible(!this.state.modalVisible);
                                              }}/>
                                </View>
                                <Text style={{fontWeight: "300", fontSize: 23, textAlign: "center"}}>Not yet implemented</Text>
                            </View>

                            <View style={styles.modalBody}>
                                <Text style={{fontWeight: "200", fontSize: 18, textAlign: "center"}}>This feature is not yet implemented
                                    but may be added in the future. Keep an eye out for updates!</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

export default withNavigation(ProfileScreen);
