import React, { Component } from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import * as BooksAPI from "../BooksAPI";

const ITEM_WIDTH = (Dimensions.get('window').width)/3;

export default class BookList extends Component {

  constructor(props) {
    super(props);

    this.handleBookItemPress = this.handleBookItemPress.bind(this);

    this.state = {
      loading:false,
      books: [],
      bookSearch: "",
      bookSelected: ""
    };
  };

  handleBookItemPress(id, event) {
    this.props.OpenBookInfo(id);
    this.setState({
      bookSelected:id
    });
  }

  componentDidMount() {
    this.getBooksOnList();
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.bookSearch != nextProps.bookSearch) {
      // console.log(`nextProps=${nextProps.bookSearch}`);
      this.setState({
        bookSearch: nextProps.bookSearch
      })
      this.getBooksOnList(nextProps.bookSearch);
    }
    return true
  }

  getBooksOnList(query="") {
    // console.log(`query=${query}`)
    BooksAPI.getBooks(query).then(result => {
      this.setState({
        loading: true
      });

      let booksKeys = [];

      for (var count = 0; count < result.length; count++) {
        booksKeys.push({
          key: result[count].id,
          image_url_small: result[count].volumeInfo.imageLinks.smallThumbnail,
          name: result[count].volumeInfo.title,
        });
      }

      this.setState({
        books: booksKeys,
        loading: false
      });
      // console.log(booksKeys);
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <FlatList
      data={this.state.books}
      extraData={this.state.books}
      numColumns={3}
      renderItem={({item}) => (
        <View style={styles.item}>
        <TouchableOpacity key={item.key}
        onPress={this.handleBookItemPress.bind(this, item.key)}>
        <Image
        source={{ uri: item.image_url_small }}
        style={styles.item_image}
        />
        </TouchableOpacity>
        </View>
        )}
      />
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    width: ITEM_WIDTH,
    alignItems: 'center',
  },
  item_image: {
    width: 128,
    height: 194,
  }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('TesteReactNative', () => BookList);