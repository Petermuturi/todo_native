'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity
} from 'react-native';

class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
      <TouchableOpacity onPress={this.props.onToggleAllComplete}>
      	<Text style={styles.toggleIcon}>{String.fromCharCode(10003)}</Text>
      </TouchableOpacity>
      <TextInput
      	value={this.props.value}
      	onChangeText={this.props.onChange}
      	onSubmitEditing={this.props.onAddItem}
				placeholder="What's on your mind?"
				blurOnSubmit={false}
				returnKeyType='done'
				underlineColorAndroid='transparent'
				style={styles.input}
      />
      </View>
    );
  }
}


const styles = StyleSheet.create({
	header: {
		paddingHorizontal: 16,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	input: {
		flex: 1,
		height: 100
	},
	toggleIcon: {
		fontSize: 24,
		marginRight:5,
		color: '#ccc',
	}
});


export default Header;