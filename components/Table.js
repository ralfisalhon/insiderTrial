import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Dimensions, Animated, Image, Text, Platform, TouchableOpacity, Alert, FlatList } from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import { material } from 'react-native-typography'
let { Column } = require("./Column.js");
let { Button } = require("./Button.js");

export class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
              {
                name: "Manchester City",
                played: 38,
                won: 32,
                drawn: 2,
                lost: 4,
              },
              {
                name: "Liverpool",
                played: 38,
                won: 30,
                drawn: 7,
                lost: 1,
              },
              {
                name: "Chelsea",
                played: 38,
                won: 21,
                drawn: 9,
                lost: 8,
              },
              {
                name: "Tottenham",
                played: 38,
                won: 23,
                drawn: 2,
                lost: 13,
              },
            ],
            clubs: ["Manchester", "Liverpool", "Chelsea", "Tottenham"],
            played: [0, 0, 0, 0],
            won: [0, 0, 0, 0],
            draw: [0, 0, 0, 0],
            lost: [0, 0, 0, 0],
        };

        this.setIndividualArrays();
    }

    setIndividualArrays() {
      Alert.alert("here");
    }

    render() {
        return (
            <View style = {{height: 20 + this.state.data.length * 25}}>
              <View style = {styles.table}>
                <Column name={"Position"} width={75} data={[1, 2, 3, 4]}/>
                <Column name={"Club"} width={100} data={this.state.clubs}/>
                <Column name={"P"} width={30} data={this.state.played} centered={true}/>
                <Column name={"W"} width={30} data={this.state.won} centered={true}/>
                <Column name={"D"} width={30} data={this.state.draw} centered={true}/>
                <Column name={"L"} width={30} data={this.state.lost} centered={true}/>
                <Column name={"Match Results"} data={this.state.results} width={windowWidth-360} />
              </View>

              <View style = {{justifyContent: 'center', alignItems: 'center', padding: 10, flexDirection: 'row'}}>
                <Button name={"Play All"} onPress={() => Alert.alert("Play All")}/>
                <Button name={"Next Week"} onPress={() => Alert.alert("Next Week")}/>
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    table: {
        borderColor: 'lightgray',
        flexDirection: 'row',
        borderWidth: 1,
        borderRightWidth: 0,
    },
});
