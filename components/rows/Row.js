import React, { Component } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';

class Row extends Component {
  render() {
  	const { data } = this.props;
    return (
      <View style={styles.container}>
				<Switch
					value={data.complete}
				/>
				<View style={styles.text_wrap}>
      		<Text style={[styles.text, data.complete && styles.complete]}>{data.text}</Text>
				</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between'
	},
	text_wrap: {
		flex: 1,
		marginHorizontal:5
	},
	complete: {
		textDecorationLine: 'line-through',
		color: 'rgba(0,0,0,0.3)'
	},
	text: {
		fontSize: 20,
		color: '#4d4d4d'
	}
});


export default Row;