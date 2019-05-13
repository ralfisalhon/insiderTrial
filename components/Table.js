import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Dimensions, Animated, Image, Text, Platform, TouchableOpacity, Alert, FlatList } from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import { material } from 'react-native-typography'

export class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    render() {
        return (
            <View style = {styles.table}>
              <View style= {styles.column}/>
              <View style= {styles.column}/>
              <View style= {styles.column}/>
              <View style= {styles.column}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    table: {
        borderWidth: 1,
        borderColor: 'white',
        height: windowHeight/2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        borderRadius: 5,
    },
    column: {
      backgroundColor: 'red',
      flex: 1,
      borderWidth: 1,
    }
});
