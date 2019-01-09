import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import BookDescriptionScreen from './BookDescriptionScreen';
import MainScreen from './MainScreen';
import { Font } from 'expo';

const AppNavigator = createStackNavigator({
  Home: {screen: MainScreen },
  BookDescription: {screen: BookDescriptionScreen },
}, {
  initialRouteName: "Home"
});
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state={
      fontLoaded: false,
    };
  }

  componentDidMount(){
    Font.loadAsync({
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
      'open-sans-semibold': require('./assets/fonts/OpenSans-SemiBold.ttf'),
      'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <AppContainer />
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe207',
  }
});
