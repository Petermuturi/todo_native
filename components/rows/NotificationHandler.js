import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';

import {
  StyleSheet,
  View,
} from 'react-native';

class NotificationHandler extends Component {
	componentDidMount() {
		PushNotification.configure({
		 onNotification: function(notification) {
      console.log( 'NOTIFICATION:', notification );
 		 }
		})
	}
  render() {
    return null;
  }
}

const styles = StyleSheet.create({

});


export default NotificationHandler;