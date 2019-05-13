import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Dimensions, Animated, Image, Text, Platform, TouchableOpacity, Alert, FlatList } from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import { material } from 'react-native-typography'

export class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <View>
            <TouchableOpacity style = {styles.button} onPress={this.props.onPress}>
              <Text style = {material.button}>{this.props.name}</Text>
            </TouchableOpacity>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
      height: 50,
      width: 200,
      backgroundColor: 'lightgray',
      borderWidth: 1,
      margin: 10,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems:'center',
    }
});
