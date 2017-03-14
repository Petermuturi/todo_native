import React, { Component } from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	Switch, 
	TouchableOpacity, 
	TextInput, 
	Image,
	AppState,
	Platform, 
	Modal } from 'react-native';

import NotificationHandler from './NotificationHandler';
import PushNotification from 'react-native-push-notification';

class Row extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	modalVisible: false,
	  };

	  this.handleAppStateChange = this.handleAppStateChange.bind(this);
	}

	componentDidMount() {
		AppState.addEventListener('change', this.handleAppStateChange);
	}

	componentWillUnmount() {
		AppState.removeEventListener('change', this.handleAppStateChange);
	}
	
	handleAppStateChange(appState){
		if ((appState === 'background') && (this.props.timer !== undefined)) {
			let time = parseInt(this.props.timer, 10);
			let time_sec = time * 60;
			let message = this.props.text;
			let date = new Date(Date.now() + (time_sec * 1000));

				PushNotification.localNotificationSchedule({
				  message: "Remember to "+message+"!",
				  date,
				});
		}
	}

	setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
  	const time = this.props.timer === undefined ? 0 : 
  	this.props.timer === '' ? 0 : parseInt(this.props.timer, 10);
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
  		<View style={[styles.nonEdit, this.props.timer && styles.nonEditText]}>
				{
					time === 0 ?
					<TouchableOpacity onPress={() => this.setModalVisible(true)}>
						<Image source={require('./timer.png')} style={[styles.time, this.props.complete && styles.time_out]}/>
					</TouchableOpacity>
					:
					<Text style={styles.text}>{time} Min</Text>
				}
				<TouchableOpacity onPress={this.props.onRemove}>
					<Image source={require('./bin.png')} style={styles.destroy}/>
				</TouchableOpacity>
  		</View>
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

				<Modal
          animationType={"slide"}
          transparent={false}
          onRequestClose={() => this.setModalVisible(false)}
          visible={this.state.modalVisible}>
         <View style={styles.modal}>
          <View>
          	<Text style={styles.reminder}>{time} Minutes</Text>
            <Text style={styles.reminderText}>Enter Reminder Time (minutes)</Text>
						<View style={styles.text_wrap}>
			  			<TextInput
			  				onChangeText={this.props.onTimer}
			  				autoFocus
			  				style={styles.input}
			  				value={this.props.timer}
			  				keyboardType='numeric'
			  				multiline
			  				maxLength={2}
				        underlineColorAndroid='transparent'
			  			/>
			  		</View>
            <TouchableOpacity style={styles.close_modal} onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Image source={require('./add.png')} style={styles.closeButton}/>
            </TouchableOpacity>

          </View>
         </View>
        </Modal>
        <NotificationHandler/>
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
	nonEdit: {
		flex: 0.3,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent:'space-between'
	},
	nonEditText: {
		flex: 0.5,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent:'space-between'
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
	time: {
		width:30,
		height:30
	},
	time_out: {
		height: 0,
		width: 0,
		opacity: 0
	},
	modal: {
		paddingTop:145,
		flex: 1,
		backgroundColor: '#C9E4F9',
		alignItems: 'center',
		justifyContent: 'center'
	},
	reminder: {
		textAlign: 'center',
		color: '#4d4d4d',
		fontSize: 50
	},
	reminderText: {
		color: '#4d4d4d',
		textAlign: 'center',
		fontSize: 18
	},
	close_modal: {
		flex: 1,
		alignItems: 'center',
	},
	closeButton: {
		width:60,
		height:60
	},
	destroy: {
		width:30,
		height:30
	},
	text: {
		fontSize: 20,
		color: '#032946'
	}
});


export default Row;