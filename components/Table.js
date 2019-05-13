import React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  Image,
  Text,
  Platform,
  TouchableOpacity,
  Alert,
  FlatList
} from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import { material } from "react-native-typography";
let { Column } = require("./Column.js");
let { Button } = require("./Button.js");

export class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          name: "Manchester",
          played: 38,
          won: 32,
          draw: 2,
          lost: 4
        },
        {
          name: "Liverpool",
          played: 38,
          won: 30,
          draw: 7,
          lost: 1
        },
        {
          name: "Chelsea",
          played: 38,
          won: 21,
          draw: 9,
          lost: 8
        },
        {
          name: "Tottenham",
          played: 38,
          won: 23,
          draw: 2,
          lost: 13
        }
      ],
      clubs: null,
      played: null,
      won: null,
      draw: null,
      lost: null
    };
  }

  componentDidMount() {
    this.setIndividualArrays();
  }

  setIndividualArrays() {
    this.setState({
      clubs: null,
      played: null,
      won: null,
      draw: null,
      lost: null
    });

    let clubs = [], played = [], won = [], draw = [], lost = [];

    for (let i = 0; i < this.state.data.length; i++) {
      clubs.push(this.state.data[i].name);
      played.push(this.state.data[i].played);
      won.push(this.state.data[i].won);
      draw.push(this.state.data[i].draw);
      lost.push(this.state.data[i].lost);
    }

    this.setState({ clubs, played, won, draw, lost });
  }

  render() {
    return (
      <View>
        {this.state.clubs &&
        this.state.played &&
        this.state.won &&
        this.state.draw &&
        this.state.lost ? (
          <View style={{ height: 20 + this.state.data.length * 20 }}>
            <View style={styles.table}>
              <Column name={"Position"} width={75} data={[1, 2, 3, 4]} />
              <Column name={"Club"} width={100} data={this.state.clubs} />
              <Column
                name={"P"}
                width={30}
                data={this.state.played}
                centered={true}
              />
              <Column
                name={"W"}
                width={30}
                data={this.state.won}
                centered={true}
              />
              <Column
                name={"D"}
                width={30}
                data={this.state.draw}
                centered={true}
              />
              <Column
                name={"L"}
                width={30}
                data={this.state.lost}
                centered={true}
              />
              <Column
                name={"Match Results"}
                data={this.state.results}
                width={windowWidth - 360}
              />
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                flexDirection: "row"
              }}
            >
              <Button
                name={"Play All"}
                onPress={() => Alert.alert("Play All")}
              />
              <Button
                name={"Next Week"}
                onPress={() => Alert.alert("Next Week")}
              />
            </View>
          </View>
        ) : (
          <Text style = {material.titleWhite}>Loading Data...</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  table: {
    borderColor: "lightgray",
    flexDirection: "row",
    borderWidth: 1,
    borderRightWidth: 0
  }
});
