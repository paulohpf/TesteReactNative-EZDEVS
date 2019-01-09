import React from 'react';
import { StyleSheet, TextInput, View, TouchableHighlight, Image } from 'react-native';
import BookList from './components/BookList';
import * as BooksAPI from "./BooksAPI";

export default class App extends React.Component {

  state={
    search:"",
    searchinput:"",
    selectedbook:""
  };

  constructor(props) {
    super(props);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
    this.handleOpenBookInfo = this.handleOpenBookInfo.bind(this);
  }

  handleSubmitSearch() {
    this.setState({
      search:this.state.searchinput
    });
  }

  handleOpenBookInfo(id) {
    BooksAPI.getSelfBookLink(id).then(result => {
      console.log(result);
    });
  };

  render() {
    return (
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
      OpenBookInfo={this.handleOpenBookInfo}/>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe207',
    paddingTop: 30
  },
  menu: {
    flexDirection: 'row',
    width: window.width,
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
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
