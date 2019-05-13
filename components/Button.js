import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { material } from "react-native-typography";

export class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
          <Text style={material.button}>{this.props.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 150,
    backgroundColor: "lightgray",
    borderWidth: 1,
    margin: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});
