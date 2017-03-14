import React, { Component } from 'react';
import { 
	StyleSheet, 
	View, 
	Text, 
	Switch, 
	TouchableOpacity, 
	TextInput, 
	Image, 
	Modal } from 'react-native';

class Row extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	modalVisible: false,
	  };
	}

	setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

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
  		<View style={styles.nonEdit}>
				<TouchableOpacity onPress={() => this.setModalVisible(true)}>
					<Image source={require('./timer.png')} style={[styles.time, this.props.complete && styles.time_out]}/>
				</TouchableOpacity>
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
          visible={this.state.modalVisible}>
         <View style={styles.modal}>
          <View>
          	<Text style={styles.reminder}>{[0, this.props.timer && this.props.timer]} Minutes</Text>
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
            <TouchableOpacity onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide Modal</Text>
            </TouchableOpacity>

          </View>
         </View>
        </Modal>
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
		padding:55,
		flex: 1,
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
	destroy: {
		width:30,
		height:30
	},
	text: {
		fontSize: 20,
		color: '#4d4d4d'
	}
});


export default Row;