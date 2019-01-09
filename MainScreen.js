import React from 'react';
import { 
  AppRegistry,
  StyleSheet,
  TextInput,
  View,
  TouchableHighlight,
  Image,
  Button,
  ScrollView
} from 'react-native';
import BookList from './components/BookList';
import * as BooksAPI from "./BooksAPI";

export default class MainScreen extends React.Component {

  static navigationOptions = {
    title:'MainScreen',
    header: null
  }

  constructor(props) {
    super(props);

    this.state={
      search:"",
      searchinput:"",
      selectedbook:""
    };

    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
    this.handleOpenBookInfo = this.handleOpenBookInfo.bind(this);
  }

  handleOpenBookInfo(id) {
    BooksAPI.getSelfBookLink(id).then(result => {
      this.props.navigation.navigate('BookDescription', {
        resultJSON: result
      })
    });
  };

  handleSubmitSearch() {
    this.setState({
      search:this.state.searchinput
    });
  }

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
      <View style={styles.menu}>
      <View style={{flex:4}}>
      <TextInput
      style={styles.searchbar}
      onChangeText={(text) => this.setState({searchinput:text})}
      onSubmitEditing={this.handleSubmitSearch} />
      </View>
      <TouchableHighlight onPress={this.handleSubmitSearch}
      style={styles.searchbutton}>
      <Image
      style={styles.searchbuttonimage}
      source={require('./assets/search.png')}
      />
      </TouchableHighlight>
      </View>

      <BookList
      bookSearch={this.state.search}
      selectedBook={this.state.selectedbook}
      openbookinfo={this.handleOpenBookInfo}/>
      </View>
      </ScrollView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe207',
  },
  menu: {
    flexDirection: 'row',
    width: window.width,
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 30
  },
  searchbar: {
    height: 45,
    fontSize: 18,
    borderWidth: 0,
    textAlign: 'center',
  },
  searchbutton:{
    padding:6
  },
  searchbuttonimage: {
    width:32,
    height:32,
  }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('TesteReactNative', () => MainScreen);