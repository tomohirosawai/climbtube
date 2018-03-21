import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  PixelRatio,
} from 'react-native';

export default class Header extends React.Component {

  render() {
    return (
      <View
        style={[
          {
            width: PixelRatio.roundToNearestPixel(this.props.width),
          },
          styles.header,
        ]}
      >
        <Text style={styles.text}>
          climbtube
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 40,
    backgroundColor: 'white',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  }
})
