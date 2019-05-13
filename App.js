import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Dimensions, Animated, Image, Text, Platform, TouchableOpacity, Alert, FlatList } from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
import { material } from 'react-native-typography';
let { Table } = require("./components/Table.js");

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style = {styles.container}>
              <Table/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c2c2c',
        alignItems: 'center',
    },
});
