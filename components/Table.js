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
            teams: [
              {}
            ],
        };
    }

    render() {
        return (
            <View>
              <View style = {styles.table}>
                <Column name={"Position"} width={100}/>
                <Column name={"Club"} width={100}/>
                <Column name={"P"} width={30} centered={true}/>
                <Column name={"W"} width={30} centered={true}/>
                <Column name={"D"} width={30} centered={true}/>
                <Column name={"L"} width={30} centered={true}/>
                <Column name={"Match Results"} width={windowWidth-360} />
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
        height: 200,
        flexDirection: 'row',
        borderWidth: 1,
        width: windowWidth - 40,
        borderRightWidth: 0,
    },
});
