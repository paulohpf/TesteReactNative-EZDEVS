import React from 'react';
import { 
	AppRegistry,
	StyleSheet,
	TextInput,
	View,
	TouchableOpacity,
	Image,
	Text,
	ScrollView
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class BookDescriptionScreen extends React.Component {

	constructor(props) {
		super(props);

		this.ifLiked = this.ifLiked.bind(this);

		const { navigation } = this.props;
		var bookInfoJSON = navigation.getParam('resultJSON', '{}');

		this.state = {
			fontLoaded: false,
			book:bookInfoJSON[0],
			like: {
				liked: false, 
				uri: require('./assets/like_unselected.png')
			}
		};
	}

	static navigationOptios = {
		title:'Book Description'
	}

	ifLiked() { 
		if(!this.state.like.liked){
			this.setState({
				like: {
					liked: true, 
					uri: require('./assets/like_selected.png')
				}
			});			
		} else {
			this.setState({
				like: {
					liked: false, 
					uri: require('./assets/like_unselected.png')
				}
			});			
		}
	}

	componentDidMount(){
	}

	render() {
		return (
			<ScrollView>
			<View style={styles.container}>
			<View style={styles.bookinfoview}>
			<View style={styles.bookinfo_1}>
			<Image style={styles.bookinfoThumbnail}
			source={{uri: this.state.book.volumeInfo.imageLinks.thumbnail}}/>
			</View>
			<View style={styles.bookinfo_2}>
			<Text style={styles.bookinfoTitle}>{this.state.book.volumeInfo.title}</Text>
			<Text style={styles.bookinfoAuthor}>By {this.state.book.volumeInfo.authors[0]}</Text>
			<TouchableOpacity style={styles.bookinfolikebuttonview}
			onPress={this.ifLiked}>
			<Image
			style={styles.bookinfolikebutton}
			source={this.state.like.uri}
			/>
			</TouchableOpacity>
			</View>
			</View>
			<View style={styles.bookinfodescriptionview}>
			<Text style={styles.bookinfodescription}>{this.state.book.volumeInfo.description}</Text>
			</View>
			</View>
			</ScrollView>
			)
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffe207',
	},
	bookinfoview: {
		flex: 1,
		flexDirection: 'row',
		padding:10,
		minHeight: hp('30%')
	},
	bookinfo_1: {
		flex: 1,
		height: 100,
	},
	bookinfoThumbnail: {
		width: wp('30%'),
		height: hp('28%'),
		resizeMode:"contain"
	},
	bookinfo_2: {
		flex: 2,
	},
	bookinfoTitle: {
		fontSize: hp('3%'),
		fontWeight: 'bold',
		color: '#101010',
		fontFamily: 'open-sans-bold'
	},
	bookinfoAuthor:{
		fontSize: hp('2.2%'),
		color:'#636e72',
		fontFamily: 'open-sans-semibold'
	},
	bookinfolikebuttonview: {
		width:wp('8%'),
		height:hp('5%'),
		marginTop:20,
		alignItems: 'center',
		justifyContent: 'center',
		position: "absolute",
		bottom: 0,
		right: 0
	},
	bookinfolikebutton: {
		width:wp('6%'),
		height:hp('3%'),
		resizeMode:"contain"
	},
	bookinfodescriptionview: {
		backgroundColor: '#fff',
		padding:10,
		minHeight: hp('70%')
	},
	bookinfodescription: {
		fontFamily: 'open-sans-regular',
		fontSize: hp('2.2%'),
		color: '#2d3436',
		textAlign: 'justify'
	}
})

// skip this line if using Create React Native App
AppRegistry.registerComponent('TesteReactNative', () => BookDescriptionScreen);