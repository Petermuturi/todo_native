import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Platform,
  ListView,
  Keyboard,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';

import Header from './components/structure/Header';
import Footer from './components/structure/Footer';
import Row from './components/rows/Row';

const filterItems = (filter, items)=>{
	return items.filter((item)=>{
		if (filter === 'ALL') return true;
		if (filter === 'COMPLETED') return item.complete;
		if (filter === 'ACTIVE') return !item.complete;
	})
}

class App extends Component {
	constructor(props) {
	  super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

	  this.state = {
	  	loading: true,
	  	allComplete: false,
	  	value: '',
	  	items: [],
	  	filter: 'ALL',
      dataSource: ds.cloneWithRows([])
	  };

	  this.handleTimer = this.handleTimer.bind(this);
	  this.handleUpdateText = this.handleUpdateText.bind(this);
	  this.handleToggleEditing = this.handleToggleEditing.bind(this);
	  this.handleFilterItem = this.handleFilterItem.bind(this);
	  this.handleClearComplete = this.handleClearComplete.bind(this);
	  this.handleRemoveItem = this.handleRemoveItem.bind(this);
	  this.handleToggleComplete = this.handleToggleComplete.bind(this);
	  this.setSource = this.setSource.bind(this);
	  this.handleAddItem = this.handleAddItem.bind(this);
	  this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
	}

	componentWillMount() {
		AsyncStorage.getItem('items').then((json)=>{
			try {
				const items = JSON.parse(json);
				this.setSource(items, items, {loading: false});
			} catch(e){
				this.setState({
					loading:false,
				})
			}
		})
	}
	
	setSource(items, itemsDatasource, otherState){
		this.setState({
			items,
			dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
			...otherState
		})
		AsyncStorage.setItem('items', JSON.stringify(items));
	}

	handleClearComplete(){
		const newItems = filterItems('ACTIVE', this.state.items);
		this.setSource(newItems, filterItems(this.state.filter, newItems));
	}
	
	handleTimer(key, timer) {
		const newItems = this.state.items.map((item)=>{
			if(item.key !== key) return item;
			return {
				...item,
				timer
			}
		})
		this.setSource(newItems, filterItems(this.state.filter, newItems));
	}

	handleUpdateText(key, text){
		const newItems = this.state.items.map((item)=>{
			if(item.key !== key) return item;
			return {
				...item,
				text
			}
		})
		this.setSource(newItems, filterItems(this.state.filter, newItems));
	}

	handleToggleEditing(key, editing){
		const newItems = this.state.items.map((item)=>{
			if(item.key !== key) return item;
			return {
				...item,
				editing
			}
		})
		this.setSource(newItems, filterItems(this.state.filter, newItems));
	}

	handleToggleComplete(key, complete) {
		const newItems = this.state.items.map((item)=>{
			if ((item.key === key)&&(item.timer !== undefined)){
				item.timer = "";
			}
			if(item.key !== key) return item;
			return {
				...item,
				complete
			}
		})
			this.setSource(newItems, filterItems(this.state.filter, newItems));
	}
	
	handleFilterItem(filter) {
		this.setSource(this.state.items, filterItems(filter, this.state.items), { filter })
	}

	handleRemoveItem(key) {
		const newItems = this.state.items.filter((item)=>{
			if ((item.key === key)&&(item.timer !== undefined)){
				item.timer = "";
			}
			return item.key !== key;
		})
		this.setSource(newItems, filterItems(this.state.filter, newItems));
	}

	handleToggleAllComplete(){
		const complete = !this.state.allComplete;
		this.state.items.map((item)=> {
			if(item.timer !== undefined) item.timer = "";
		})
		const newItems = this.state.items.map((item)=> ({
			...item,
			complete,
		}));
		this.setSource(newItems, filterItems(this.state.filter, newItems), { allComplete: complete});
	}

	handleAddItem(){
		if(!this.state.value) return;
		const newItems = [
			...this.state.items,
			{
				key: Date.now(),
				text: this.state.value,
				complete: false
			}
		]
		this.setSource(newItems, filterItems(this.state.filter, newItems), {value: ''});
	}

  render() {
  	console.log(this.state.items);
  	const length = filterItems('ACTIVE', this.state.items).length;
    return (
      <View style={styles.container}>
      	<Header
      		value={this.state.value}
      		onAddItem={this.handleAddItem}
      		onChange={(value)=>this.setState({value})}
      		onToggleAllComplete={this.handleToggleAllComplete}
      	/>
      	<View style={styles.content}>
      		<ListView
      			style={styles.list}
      			enableEmptySections
      			dataSource={this.state.dataSource}
      			onScroll={()=> Keyboard.dismiss()}
      			renderRow={({ key, ...value })=>{
      				return(
								<Row 
									key={key} 
									{...value}
									onTimer={(timer)=>this.handleTimer(key, timer)}
									onUpdate={(text)=>this.handleUpdateText(key, text)}
									onEdit={(editing)=>this.handleToggleEditing(key, editing)}
									onRemove={()=> this.handleRemoveItem(key)} 
									onComplete={(complete)=> this.handleToggleComplete(key, complete)}/>
      				)
      			}}
      			renderSeparator={(sectionId, rowId)=>{
      				return <View key={rowId} style={styles.separator} />
      			}}
      		/>
      		{
      			length === 0 &&
      			<View style={styles.blank}>
	      			<Text style={styles.blankText}>
	      				Nothing to do yet...
	      			</Text>
      			</View>
      		}
      	</View>
      	<Footer
      		count={length}
      		onClearComplete={this.handleClearComplete}
      		onFilter={this.handleFilterItem}
      		filter={this.state.filter}
      	/>
      	{
      		this.state.loading &&
      		<View style={styles.loading}>
      		<ActivityIndicator
						animating
						size='large'
      		/>
      	</View> 
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#C9E4F9',
		...Platform.select({
			ios: { paddingTop: 30 }
		})
	},
	loading: {
		position: 'absolute',
		left: 0,
		top: 0,
		bottom: 0,
		right: 0,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.2)'
	},
	content: {
		flex: 1
	},
	list: {
		backgroundColor: '#fff'
	},
	blank: {
		flex:1,
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	blankText: {
		fontSize: 15
	},
	separator: {
		borderWidth: 1,
		borderColor: '#032946'
	}
});


export default App;