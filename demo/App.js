import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import Toast, { Duration, Position } from 'react-native-mix-toast';

class MixToastExample extends Component {
  getToast1 = () => {
    Toast.show('Default Toast');
  };
  getToast2 = () => {
    Toast.show('Duration === LONG', {
      duration: Duration.LONG
    });
  };
  getToast3 = () => {
    Toast.show('Position === Top', {
      position: Position.TOP
    });
  };
  getToast4 = () => {
    Toast.show('Slide Animation', {
      animation: 'slide-right'
    });
  };
  getToast5 = () => {
    Toast.show('Press To Hide', {
      hideOnPress: true,
      onPress: () => {
        console.log('Press to hide the toast');
      }
    });
  };
  getToast6 = () => {
    Toast.show('Lifecycle on Console', {
      onShow: () => {
        console.log('Toast Show Start');
      },
      onShown: () => {
        console.log('Toast Show End');
      },
      onHide: () => {
        console.log('Toast Hide Start');
      },
      onHidden: () => {
        console.log('Toast Hide End');
      }
    });
  };
  getToast7 = () => {
    Toast.show('Changed ToastSTyle', {
      toastStyle: { backgroundColor: 'yellowgreen' }
    });
  };
  getToast8 = () => {
    Toast.show(
      <View style={{ width: 100, height: 50, backgroundColor: 'red' }}>
        <Text>Node Message</Text>
      </View>
    );
  };
  getToast9 = () => {
    Toast.show(
      <View style={{ width: 100, height: 50, backgroundColor: 'red' }}>
        <Text>Node Message</Text>
      </View>,
      {
        custom: true
      }
    );
  };

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.getToast1}>
          <Text style={styles.text}>Default Toast</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.getToast2}>
          <Text style={styles.text}>Duration Long</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.getToast3}>
          <Text style={styles.text}>Position Top</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.getToast4}>
          <Text style={styles.text}>Slide Animation</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.getToast5}>
          <Text style={styles.text}>Press To Hide</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.getToast6}>
          <Text style={styles.text}>Lifecycle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.getToast7}>
          <Text style={styles.text}>ToastStyle</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.getToast8}>
          <Text style={styles.text}>Node Message</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.getToast9}>
          <Text style={styles.text}>Custom Node Message</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default MixToastExample;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    margin: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'yellowgreen'
  }
});
