'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';

class Header extends Component {
  render() {
    return (
      <View>
      <TextInput
				placeholder="What's on your mind?"
				blurOnSubmit={false}
				returnKeyType='add'
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
	}
});


export default Header;