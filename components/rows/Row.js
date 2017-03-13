import React, { Component } from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity } from 'react-native';

class Row extends Component {
  render() {
    return (
      <View style={styles.container}>
				<Switch
					value={this.props.complete}
					onValueChange={this.props.onComplete}
				/>
				<View style={styles.text_wrap}>
      		<Text style={[styles.text, this.props.complete && styles.complete]}>
      			{this.props.text}
      		</Text>
				</View>
				<TouchableOpacity onPress={this.props.onRemove}>
					<Text style={styles.destroy}>x</Text>
				</TouchableOpacity>
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
	destroy: {
		fontSize: 20,
		color: '#cc9a9a'
	},
	text: {
		fontSize: 20,
		color: '#4d4d4d'
	}
});


export default Row;