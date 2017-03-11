'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Platform
} from 'react-native';

import Header from './components/structure/Header';
import Footer from './components/structure/Footer';

class App extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	value: '',
	  	items: []
	  };
	}
	handleAddItem(){
		if(!this.state.value) return;
		
	}
  render() {
    return (
      <View style={styles.container}>
      	<Header/>
      	<View style={styles.content}>
      		
      	</View>
      	<Footer/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
		...Platform.select({
			ios: { paddingTop: 30 }
		})
	},
	content: {
		flex: 1
	}
});


export default App;