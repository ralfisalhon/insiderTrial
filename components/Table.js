import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { material } from "react-native-typography";
let { Column } = require("./Column.js");
let { Button } = require("./Button.js");

export class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          name: "Manchester (25)",
          points: 0,
          played: 0,
          won: 0,
          draw: 0,
          lost: 0,
          goaldifference: 0,
          strength: 25
        },
        {
          name: "Liverpool (20)",
          points: 0,
          played: 0,
          won: 0,
          draw: 0,
          lost: 0,
          goaldifference: 0,
          strength: 20
        },
        {
          name: "Chelsea (15)",
          points: 0,
          played: 0,
          won: 0,
          draw: 0,
          lost: 0,
          goaldifference: 0,
          strength: 15
        },
        {
          name: "Tottenham (10)",
          points: 0,
          played: 0,
          won: 0,
          draw: 0,
          lost: 0,
          goaldifference: 0,
          strength: 10
        }
      ],
      clubs: null,
      points: null,
      played: null,
      won: null,
      draw: null,
      lost: null,
      goaldifference: null,
      strengths: null,
      results: [],
      refresh: false,
      totalPlays: 0
    };
  }

  componentDidMount() {
    this.setIndividualArrays();
  }

  reorderTeams(pointsArray, differenceArray) {
    let oldPointsArray = [];
    for (var i = 0; i < this.state.data.length; i++) {
      oldPointsArray.push(pointsArray[i]);
    }

    let newArray = [];
    let oldArray = [];
    for (var i = 0; i < this.state.data.length; i++) {
      oldArray.push(this.state.data[i]);
    }

    for (var z = 0; z < 4; z++) {
      let largest = Math.max.apply(0, oldPointsArray);
      console.log("LARGEST NUM IS", largest);

      let j = 0;
      while (oldPointsArray[j] != largest) {
        j++;
      }

      newArray.push(oldArray[j]);
      oldArray.splice(j, 1);
      oldPointsArray.splice(j, 1);
    }

    this.setState({ data: newArray });
  }

  setIndividualArrays() {
    if (this.state.points) {
      let pointsArray = [],
        differenceArray = [];

      for (var i = 0; i < this.state.data.length; i++) {
        pointsArray.push(this.state.data[i].points);
        differenceArray.push(this.state.data[i].goaldifference);
      }

      this.reorderTeams(pointsArray, differenceArray);
    }

    let that = this;
    setTimeout(function() {
      that.setState({
        clubs: null,
        points: null,
        played: null,
        won: null,
        draw: null,
        lost: null,
        goaldifference: null,
        strengths: null
      });

      let clubs = [],
        played = [],
        points = [],
        won = [],
        draw = [],
        lost = [],
        goaldifference = [],
        strengths = [];

      for (let i = 0; i < that.state.data.length; i++) {
        clubs.push(that.state.data[i].name);
        points.push(that.state.data[i].points);
        played.push(that.state.data[i].played);
        won.push(that.state.data[i].won);
        draw.push(that.state.data[i].draw);
        lost.push(that.state.data[i].lost);
        goaldifference.push(that.state.data[i].goaldifference);
        strengths.push(that.state.data[i].strengths);
      }

      that.setState({
        clubs,
        points,
        played,
        won,
        draw,
        lost,
        goaldifference,
        strengths
      });
    }, 50);
  }

  nextWeek() {
    if (!(this.state.totalPlays < (this.state.data.length - 1) * 4)) {
      return;
    }

    this.setState({ totalPlays: this.state.totalPlays + 1 });

    let teamIndexes = this.findTeamIndexes(this.state.played);

    console.log("INDEXES", teamIndexes[0], teamIndexes[1]);
    console.log(
      "STRENGTHS",
      this.state.data[teamIndexes[0]].strength,
      this.state.data[teamIndexes[1]].strength
    );

    this.state.data[teamIndexes[0]].played++;
    this.state.data[teamIndexes[1]].played++;

    let currResults = this.state.results;

    let randomNum = Math.floor(
      Math.random() *
        Math.floor(
          this.state.data[teamIndexes[0]].strength +
            this.state.data[teamIndexes[1]].strength
        )
    );

    console.log("RANDOM NUM", randomNum);

    let loserScore = Math.floor(Math.random() * Math.floor(3));
    let winnerScore = loserScore;
    if (
      !(
        Math.floor(
          Math.random() *
            Math.floor(
              Math.abs(
                this.state.data[teamIndexes[0]].strength -
                  this.state.data[teamIndexes[1]].strength
              ) * 2
            )
        ) == 0
      )
    ) {
      winnerScore += 1 + Math.floor(Math.random() * Math.floor(2));
    } else {
    }

    if (loserScore == winnerScore) {
      console.log("DRAW", this.state.data[teamIndexes[0]].name);
      currResults.push(
        this.state.data[teamIndexes[0]].name +
          " " +
          winnerScore +
          " - " +
          loserScore +
          " " +
          this.state.data[teamIndexes[1]].name
      );
      this.state.data[teamIndexes[0]].draw++;
      this.state.data[teamIndexes[1]].draw++;
      this.state.data[teamIndexes[0]].points++;
      this.state.data[teamIndexes[1]].points++;
    } else if (randomNum <= this.state.data[teamIndexes[0]].strength) {
      console.log("First team wins", this.state.data[teamIndexes[0]].name);
      currResults.push(
        this.state.data[teamIndexes[0]].name +
          " " +
          winnerScore +
          " - " +
          loserScore +
          " " +
          this.state.data[teamIndexes[1]].name
      );
      this.state.data[teamIndexes[0]].won++;
      this.state.data[teamIndexes[1]].lost++;
      this.state.data[teamIndexes[0]].points += 3;

      this.state.data[teamIndexes[0]].goaldifference +=
        winnerScore - loserScore;
      this.state.data[teamIndexes[1]].goaldifference +=
        loserScore - winnerScore;
    } else {
      console.log("Second team wins", this.state.data[teamIndexes[1]].name);
      currResults.push(
        this.state.data[teamIndexes[1]].name +
          " " +
          winnerScore +
          " - " +
          loserScore +
          " " +
          this.state.data[teamIndexes[0]].name
      );
      this.state.data[teamIndexes[1]].won++;
      this.state.data[teamIndexes[0]].lost++;
      this.state.data[teamIndexes[1]].points += 3;

      this.state.data[teamIndexes[1]].goaldifference +=
        winnerScore - loserScore;
      this.state.data[teamIndexes[0]].goaldifference +=
        loserScore - winnerScore;
    }

    this.setState({ results: currResults, refresh: !this.state.refresh }, () =>
      this.setIndividualArrays()
    );
  }

  playAll() {
    if (this.state.totalPlays < (this.state.data.length - 1) * 4) {
      this.nextWeek();
      let that = this;
      setTimeout(function() {
        that.playAll();
      }, 100);
    }
  }

  resetAll() {
    this.setState(
      {
        data: [
          {
            name: "Manchester (25)",
            points: 0,
            played: 0,
            won: 0,
            draw: 0,
            lost: 0,
            goaldifference: 0,
            strength: 10
          },
          {
            name: "Liverpool (20)",
            points: 0,
            played: 0,
            won: 0,
            draw: 0,
            lost: 0,
            goaldifference: 0,
            strength: 8
          },
          {
            name: "Chelsea (15)",
            points: 0,
            played: 0,
            won: 0,
            draw: 0,
            lost: 0,
            goaldifference: 0,
            strength: 6
          },
          {
            name: "Tottenham (10)",
            points: 0,
            played: 0,
            won: 0,
            draw: 0,
            lost: 0,
            goaldifference: 0,
            strength: 4
          }
        ],
        clubs: null,
        points: null,
        played: null,
        won: null,
        draw: null,
        lost: null,
        goaldifference: null,
        strengths: null,
        results: [],
        refresh: false,
        totalPlays: 0
      },
      () => this.setIndividualArrays()
    );
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
        this.state.points &&
        this.state.played &&
        this.state.won &&
        this.state.draw &&
        this.state.lost &&
        this.state.goaldifference &&
        this.state.strengths ? (
          <View style={{ height: 200 }}>
            <View style={styles.table}>
              <Column name={"Position"} width={65} data={[1, 2, 3, 4]} />
              <Column name={"PTS"} width={40} data={this.state.points} />
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
                name={"GD"}
                width={40}
                data={this.state.goaldifference}
                centered={true}
              />
              <Column
                name={"Match Results"}
                data={this.state.results}
                refresh={this.state.refresh}
                width={250}
              />
            </View>

            <View style={styles.buttons}>
              <Button name={"Reset All"} onPress={() => this.resetAll()} />
              <Button name={"Play All"} onPress={() => this.playAll()} />
              <Button name={"Next Week"} onPress={() => this.nextWeek()} />
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
  }
});
