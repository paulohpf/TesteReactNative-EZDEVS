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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
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
    this.props.openbookinfo(id);
    this.setState({
      bookSelected:id
    });
  }

  componentDidMount() {
    this.getBooksOnList();
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.bookSearch != nextProps.bookSearch) {
      this.setState({
        bookSearch: nextProps.bookSearch
      })
      this.getBooksOnList(nextProps.bookSearch);
    }
    return true
  }

  getBooksOnList(query="") {

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
    width: wp('33.3%'),
    alignItems: 'center',
    overflow:'hidden'
  },
  item_image: {
    width: wp('30%'),
    height: hp('28%'),
    resizeMode:"contain"
  }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('TesteReactNative', () => BookList);