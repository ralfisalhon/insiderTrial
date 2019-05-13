import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { material } from "react-native-typography";
let { Table } = require("./components/Table.js");

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={material.titleWhite}>
            Ralfi's Ultimate Champions League Predictor
          </Text>
        </View>
        <Table />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c2c2c",
    alignItems: "center",
    padding: 20
  },
  title: {
    marginBottom: 10
  }
});
