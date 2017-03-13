'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

class Footer extends Component {
  render() {
  	const filter = this.props.filter;
    return (
      <View style={styles.container}>
      	<Text style={styles.footer}>{this.props.count} Count</Text>
	      <View style={styles.filters}>
	      	<TouchableOpacity 
	      		style={[styles.filter, filter === 'ALL' && styles.selected]} 
	      		onPress={()=>this.props.onFilter('ALL')}>
	      		<Text style={styles.footer}>All</Text>
	      	</TouchableOpacity>
	      	<TouchableOpacity 
	      		style={[styles.filter, filter === 'ACTIVE' && styles.selected]} 
	      		onPress={()=>this.props.onFilter('ACTIVE')}>
	      		<Text style={styles.footer}>Active</Text>
	      	</TouchableOpacity>
	      	<TouchableOpacity 
	      		style={[styles.filter, filter === 'COMPLETED' && styles.selected]} 
	      		onPress={()=>this.props.onFilter('COMPLETED')}>
	      		<Text style={styles.footer}>Completed</Text>
	      	</TouchableOpacity>
	      </View>
	      <TouchableOpacity
	      	onPress={this.props.onClearComplete}>
	      	<Text style={styles.clear}>Clear Completed</Text>
	      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	filters: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	filter: {
		padding: 5,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: 'transparent'
	},
	selected: {
		borderColor: 'rgba(0,0,0,0.3)'
	},
	footer: {
		fontSize:12
	},
	clear: {
		color: '#cc9a9a'
	}
});


export default Footer;