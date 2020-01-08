import {StyleSheet, Dimensions} from "react-native";

let scr = Dimensions.get("window").width;

export default StyleSheet.create({
    container: {
        backgroundColor: "#1d2637",
        height: "100%"
    },
    questionContainer: {
        backgroundColor: "#fff",
        height: "100%"
    },
    ptb10: {
        marginVertical: 10
    },
    titles_charts: {
        fontSize: 20
    },
    axis_titles: {
        color: "#fff"
    },
    text_white: {
        color: "#fff"
    },
    text_white_opacity: {
        color: "#ffffff5c"
    },
    text_h2: {
        fontSize: 30
    },
    text_h3: {
        fontSize: 20
    },
    text_h4: {
        fontSize: 18
    },
    mlr20: {
        marginHorizontal: 20
    },
    mlr10: {
        marginHorizontal: 10
    },
    pt5: {
        paddingTop: 5
    },
    pb15: {
        paddingBottom: 15
    },
    mt15: {
        marginTop: 15
    },
    mt55: {
        marginTop: 55
    },
    mtb25: {
        marginVertical: 25
    },
    mb50: {
        marginBottom: 220
    },
    ptb15: {
        paddingVertical: 15
    },
    login_container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#313131"
    },
    login_input: {
        backgroundColor: "white",
        width: scr * 0.75,
        height: 52,
        padding: 10,
        borderWidth: 1,
        borderColor: "black",
        fontSize: 16,
        marginBottom: 10
    },
    login_btnText: {
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 18,
        color: "white"
    },
    profile_panel: {
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 10,
        margin: 15
    },
    profile_image: {
        width: 150,
        height: 150
    },
    btnAddPanel: {
        marginHorizontal: 15,
        flex: 1,
        justifyContent: "center"
    },
    btnAddApp: {},
    feedbackStyle: {
        borderWidth: 0.5,
        borderTopColor: "#a5a5a53b",
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 0
    },
    badge: {
        marginLeft: 10,
        paddingVertical: 5,
        paddingHorizontal: 25,
        borderRadius: 15,
        backgroundColor: "#feaa0a"
    },
    pos_rel: {
        position: "relative"
    },
    smiley_icon_position: {
        position: "absolute",
        right: 10
    },
    image_list_icon: {
        position: "absolute",
        right: 0,
        top: 27,
        backgroundColor: "#feaa0a",
        borderRadius: 30,
        padding: 10
    },
    osLogo: {
        width: 30,
        height: 30
    },
    panel: {
        backgroundColor: "#232e40",
        padding: 30,
        borderRadius: 15,
        marginBottom: 15,
        elevation: 4
    },
    panel_Dashboard: {
        backgroundColor: "#232e40",
        height: 460,
        width: Dimensions.get("window").width,
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        elevation: 4
    },
    text_bold: {
        fontWeight: "bold"
    },
    text_italic: {
        fontStyle: "italic"
    },
    panel_header: {
        paddingVertical: 15
    },
    hr: {
        borderBottomColor: "#ffffff5c",
        borderBottomWidth: 1
    },
    center_objects: {
        justifyContent: "center",
        backgroundColor: "#388e3c",
        paddingHorizontal: 30,
        marginLeft: 5
    },
    btnDelete: {
        flexDirection: "row",
        backgroundColor: "#fb3d57",
        justifyContent: "center",
        paddingVertical: 10,
        borderRadius: 10
    },
    btnDeleteTextSize: {
        fontSize: 14
    },
    btnDeletePos: {
        marginTop: 5,
        marginHorizontal: 10
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#fff",
        fontSize: 10,
        textTransform: "uppercase"

    },
    textInput: {
        height: 40,
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        fontSize: 15,
        color: "#161F3D"
    },
    filterDropdown: {
        color: "#fff",
        backgroundColor: "#33415f",
        height: 40
    },
    loginButton: {
        marginHorizontal: 30,
        backgroundColor: "#409eff",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"

    }
});
