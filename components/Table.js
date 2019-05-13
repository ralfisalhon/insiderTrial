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
          name: "Amazing Team",
          played: 0,
          won: 0,
          draw: 0,
          lost: 0,
          strength: 10
        },
        {
          name: "Great Team",
          played: 0,
          won: 0,
          draw: 0,
          lost: 0,
          strength: 8
        },
        {
          name: "Good Team",
          played: 0,
          won: 0,
          draw: 0,
          lost: 0,
          strength: 6
        },
        {
          name: "Okay Team",
          played: 0,
          won: 0,
          draw: 0,
          lost: 0,
          strength: 4
        }
      ],
      clubs: null,
      played: null,
      won: null,
      draw: null,
      lost: null,
      strengths: null
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
      lost: null,
      strengths: null
    });

    let clubs = [],
      played = [],
      won = [],
      draw = [],
      lost = [],
      strengths = [];

    for (let i = 0; i < this.state.data.length; i++) {
      clubs.push(this.state.data[i].name);
      played.push(this.state.data[i].played);
      won.push(this.state.data[i].won);
      draw.push(this.state.data[i].draw);
      lost.push(this.state.data[i].lost);
      strengths.push(this.state.data[i].strengths);
    }

    this.setState({ clubs, played, won, draw, lost, strengths });
  }

  nextWeek() {
    let teamIndexes = this.findTeamIndexes(this.state.played);

    // Alert.alert(teamIndexes[0].toString(), teamIndexes[1].toString());

    console.log("INDEXES", teamIndexes[0], teamIndexes[1]);
    console.log("STRENGTHS", this.state.data[teamIndexes[0]].strength, this.state.data[teamIndexes[1]].strength);
  }

  findTeamIndexes(playCounts) {
    let minIndex1 = Math.floor(Math.random() * Math.floor(playCounts.length));
    let min = playCounts[minIndex1];
    for (var i = 0; i < playCounts.length; i++) {
      if (playCounts[i] < min) {
        minIndex1 = i;
      }
    }

    let minIndex2 = Math.floor(Math.random() * Math.floor(playCounts.length));
    while (minIndex2 == minIndex1) {
      minIndex2 = Math.floor(Math.random() * Math.floor(playCounts.length));
    }
    let min2 = playCounts[minIndex2];

    for (var i = 0; i < playCounts.length; i++) {
      if (i != minIndex1 && playCounts[i] < min2) {
        minIndex2 = i;
      }
    }

    return [minIndex1, minIndex2];

  }

  render() {
    return (
      <View>
        {this.state.clubs &&
        this.state.played &&
        this.state.won &&
        this.state.draw &&
        this.state.lost &&
        this.state.strengths ? (
          <View style={{ height: 20 + this.state.data.length * 20 }}>
            <View style={styles.table}>
              <Column name={"Position"} width={75} data={[1, 2, 3, 4]} />
              <Column name={"Club"} width={125} data={this.state.clubs} />
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
                width={250}
              />
            </View>

            <View style={styles.buttons}>
              <Button
                name={"Play All"}
                onPress={() => Alert.alert("Play All")}
              />
              <Button
                name={"Next Week"}
                onPress={() => this.nextWeek()}
              />
            </View>
          </View>
        ) : (
          <Text style={material.titleWhite}>Loading Data...</Text>
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
  },
  buttons: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    flexDirection: "row"
  },
});
