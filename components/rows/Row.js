import React, { Component } from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity, TextInput } from 'react-native';

class Row extends Component {
  render() {
  	const textComponent=(
			<TouchableOpacity style={styles.text_wrap} onLongPress={()=> this.props.onEdit(true)}>
    		<Text style={[styles.text, this.props.complete && styles.complete]}>
    			{this.props.text}
    		</Text>
			</TouchableOpacity>
  	)
  	const editingComponent=(
  		<View style={styles.text_wrap}>
  			<TextInput
  				onChangeText={this.props.onUpdate}
  				autoFocus
  				value={this.props.text}
  				style={styles.input}
  				multiline
	        underlineColorAndroid='transparent'
  			/>
  		</View>
  	)
  	const removeButton=(
			<TouchableOpacity onPress={this.props.onRemove}>
				<Text style={styles.destroy}>x</Text>
			</TouchableOpacity>
  	)
  	const saveButton=(
			<TouchableOpacity style={styles.save} onPress={()=>this.props.onEdit(false)}>
				<Text style={styles.saveText}>Save</Text>
			</TouchableOpacity>
  	)
    return (
      <View style={styles.container}>
				<Switch
					value={this.props.complete}
					onValueChange={this.props.onComplete}
				/>
				{this.props.editing ? editingComponent : textComponent}
				{this.props.editing ? saveButton : removeButton}
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
	input: {
		flex: 1,
		fontSize:20,
		color: '#4d4d4d',
		padding:0
	},
	text_wrap: {
		flex: 1,
		marginHorizontal:5
	},
	complete: {
		textDecorationLine: 'line-through',
		color: 'rgba(0,0,0,0.3)'
	},
	save: {
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#7be290',
		padding: 5
	},
	saveText: {
		color: '#4d4d4d',
		fontSize: 18
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