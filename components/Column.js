import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { material } from "react-native-typography";

export class Column extends React.Component {
  constructor(props) {
    super(props);
  }

  renderItem = ({ item, index }) => {
    return (
      <View style={{ height: 20, width: this.props.width - 12 }}>
        <Text style={material.body1White}>{this.props.data[index]}</Text>
      </View>
    );
  };

  render() {
    return (
      <View
        style={[
          styles.column,
          {
            width: this.props.width,
            alignItems: this.props.centered ? "center" : null
          }
        ]}
      >
        <View style={{ borderBottomWidth: 1, borderColor: "white" }}>
          <Text style={material.body1White}>{this.props.name}</Text>
        </View>
        <View style={{ marginTop: 5, marginBottom: 25 }}>
          <FlatList
            extraData={this.props.refresh}
            showsVerticalScrollIndicator={false}
            data={this.props.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  column: {
    borderRightWidth: 1,
    borderColor: "lightgray",
    padding: 5,
    overflow: "hidden"
  }
});
