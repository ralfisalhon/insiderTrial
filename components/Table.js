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
          name: "AMAZING team",
          played: 0,
          won: 0,
          draw: 0,
          lost: 0,
          strength: 10
        },
        {
          name: "GREAT players",
          played: 0,
          won: 0,
          draw: 0,
          lost: 0,
          strength: 8
        },
        {
          name: "GOOD club",
          played: 0,
          won: 0,
          draw: 0,
          lost: 0,
          strength: 6
        },
        {
          name: "OKAY kids",
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
      strengths: null,
      results: [],
      refresh: false,
      totalPlays: 0,
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
    this.setState({totalPlays: this.state.totalPlays + 1});

    let teamIndexes = this.findTeamIndexes(this.state.played);

    // Alert.alert(teamIndexes[0].toString(), teamIndexes[1].toString());

    console.log("INDEXES", teamIndexes[0], teamIndexes[1]);
    console.log("STRENGTHS", this.state.data[teamIndexes[0]].strength, this.state.data[teamIndexes[1]].strength);

    this.state.data[teamIndexes[0]].played++;
    this.state.data[teamIndexes[1]].played++;

    let currResults = this.state.results;

    let randomNum = Math.floor(Math.random() * Math.floor(this.state.data[teamIndexes[0]].strength + this.state.data[teamIndexes[1]].strength));

    console.log("RANDOM NUM", randomNum);

    let loserScore = Math.floor(Math.random() * Math.floor(3));
    let winnerScore = loserScore + Math.floor(Math.random() * Math.floor(2)) + + Math.floor(Math.random() * Math.floor(2));

    if (loserScore == winnerScore) {
      console.log("DRAW", this.state.data[teamIndexes[0]].name);
      currResults.push(this.state.data[teamIndexes[0]].name + " " + winnerScore + " - " + loserScore + " " + this.state.data[teamIndexes[1]].name);
      this.state.data[teamIndexes[0]].draw++;
      this.state.data[teamIndexes[1]].draw++;
    } else if (randomNum <= this.state.data[teamIndexes[0]].strength) {
      console.log("First team wins", this.state.data[teamIndexes[0]].name);
      currResults.push(this.state.data[teamIndexes[0]].name + " " + winnerScore + " - " + loserScore + " " + this.state.data[teamIndexes[1]].name);
      this.state.data[teamIndexes[0]].won++;
      this.state.data[teamIndexes[1]].lost++;
    } else {
      console.log("Second team wins", this.state.data[teamIndexes[1]].name);
      currResults.push(this.state.data[teamIndexes[1]].name + " " + winnerScore + " - " + loserScore + " " + this.state.data[teamIndexes[0]].name);
      this.state.data[teamIndexes[1]].won++;
      this.state.data[teamIndexes[0]].lost++;
    }

    this.setState({results: currResults, refresh: !this.state.refresh});

    this.setIndividualArrays();
  }

  playAll() {
    this.nextWeek();

    if (this.state.totalPlays < (this.state.data.length-1) * 4) {
      let that = this;
      setTimeout(function() {
        that.playAll();
      }, 250);
    }
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
          <View style={{ height: windowHeight-180 }}>
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
                refresh={this.state.refresh}
                width={300}
              />
            </View>

            <View style={styles.buttons}>
              <Button
                name={"Play All"}
                onPress={() => this.playAll()}
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
