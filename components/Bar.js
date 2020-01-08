import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryTooltip
} from "victory-native";
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
    //const osAndroid = osCount.map((item, index) => {return item.android});
    //const osIos = osCount.map((item, index) => {return item.ios});

    return (
      <View>
          <VictoryChart
            animate={{duration: 500}}
            theme={VictoryTheme.material}
            domain={{ x: [0, 3] }}
            containerComponent={<VictoryVoronoiContainer />}
          >
              <VictoryBar
                labelComponent={<VictoryTooltip />}
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
                data={osCount}
                animate={{
                  onExit: {
                    duration: 500,
                    before: () => ({
                      _y: 0,
                      fill: "orange",
                      label: "BYE"
                    })
                  }
                }}
              />
    
          </VictoryChart>
      </View>
    );
  }
}

export default Bar;
