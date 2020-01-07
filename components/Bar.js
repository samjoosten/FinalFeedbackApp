import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryLabel,
  VictoryTooltip
} from "victory-native";
import CustomVictoryTheme from "../theme/CustomVictoryTheme"
import { View, Text } from "react-native";
import PropTypes from "prop-types";


class Bar extends React.PureComponent {
  static propTypes = {
    os: PropTypes.array.isRequired,
    onListRefresh: PropTypes.bool.isRequired,
    onPullDownRefresh: PropTypes.func.isRequired
  };

  render() {
    const osCount = this.props.os;
    const osAndroid = osCount.map((item, index) => {return item.android});
    const osIos = osCount.map((item, index) => {return item.ios});
    const iOSProportion = ((parseInt(osIos) / (parseInt(osAndroid) + parseInt(osIos))) * 100).toFixed(1)
    const androidProportion = ((parseInt(osAndroid) / (parseInt(osAndroid) + parseInt(osIos))) * 100).toFixed(1)

    return (
      <View>
        {osCount.length !== 0 ? (
          <VictoryChart
            theme={CustomVictoryTheme}
            domain={{ x: [0, 3] }}
            containerComponent={<VictoryVoronoiContainer />}
          >
            <VictoryLabel x={5} y={30} style={{fill: "#ECEFF1", fontSize: 11, fontStyle: "italic"}} text={"Feedbacks \nfrom devices"}/>
            <VictoryLabel x={290} y={325} style={{fill: "#ECEFF1", fontSize: 11, fontStyle: "italic"}} text={"Operation \nsystems"}/>
            {osCount.length !== 0 ? (
              <VictoryBar
                labelComponent={<VictoryTooltip constrainToVisibleArea />}
                barWidth={({ index }) => index * 2 + 75}
                style={{
                  data: {
                    fill: "#c43a31",
                    stroke: "#000000",
                    fillOpacity: 0.7,
                    strokeWidth: 3
                  }
                }}
                categories={{
                  x: ["Android", "iOS"]
                }}
                data={[
                  { x: "Android", y: osAndroid, label: androidProportion + "%" },
                  { x: "iOS", y: osIos, label: iOSProportion + "%" }
                ]}
              />
            ) : (
              <Text> No data to display </Text>
            )}
          </VictoryChart>
        ) : (
          <Text>No data to display Bar</Text>
        )}
      </View>
    );
  }
}

export default Bar;
