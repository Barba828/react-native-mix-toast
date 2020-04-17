import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { Component } from 'react';
import Toast, { Duration, Position } from 'react-native-mix-toast';

class MixToastExample extends Component {
  getToast1 = () => {
    Toast.show('Default Toast');
  };
  getToast10 = () => {
    Toast.show('View Off',
      {
        icon: require('./assets/view_off.png'),
      }
    );
  };
  getToast11 = () => {
    Toast.show('View Off',
      {
        icon: <Image source={require('./assets/smile.png')} style={{ width: 60, height: 60 }} />,
      }
    );
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
  getToast40 = () => {
    Toast.show('Scale Animation 2', {
      animation: 'scale'
    });
  };
  getToast5 = () => {
    Toast.show('Press To Hide', {
      hideOnPress: true,
      onPress: () => {
        alert('Press to hide the toast');
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
  _toast = null
  getToast60 = () => {
    this._toast = Toast.show('Touch PressToHide Will Hide The Toast', {
      duration: 10000
    });
  };
  getToast61 = () => {
    Toast.hide(this._toast)
  };
  getToast62 = () => {
    this._toast = Toast.show('I am happy', {
      icon: <Image source={require('./assets/smile.png')} style={{ width: 60, height: 60 }} />,
    });
  };
  getToast63 = () => {
    Toast.update(this._toast, 'You are happy', {
      icon: <Image source={require('./assets/smile.png')} style={{ width: 60, height: 60, transform: [{ rotate: '180deg' }] }} />,
    })
  };
  getToast7 = () => {
    Toast.show('Changed ToastSTyle', {
      toastStyle: { backgroundColor: 'yellowgreen' }
    });
  };
  getToast70 = () => {
    Toast.show('Changed TextSTyle', {
      textStyle: { color: 'yellowgreen', fontWeight: 'bold' }
    });
  };
  getToast71 = () => {
    Toast.show('Changed IconSTyle', {
      iconStyle: { backgroundColor: 'yellowgreen' },
      icon: require('./assets/view_off.png'),
    });
  };
  getToast8 = () => {
    <View style={styles.custom}>
      <Image source={require('./assets/smile.png')} style={{ width: 80, height: 80 }} />
    </View> ,
      Toast.show(
        <View style={{ justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>
          <Image source={require('./assets/smile.png')} style={{ width: 48, height: 48 }} />
          <Text style={{ color: '#fff', padding: 10, fontSize: 18 }}> you will smile </Text>
        </View >
      );
  };
  getToast9 = () => {
    Toast.show(
      <View style={styles.custom}>
        <Image source={require('./assets/smile.png')} style={{ width: 80, height: 80 }} />
      </View>,
      {
        custom: true,
        animation: 'slide-bottom',
        opacity: 1
      }
    );
  };

  _myToast = null
  _mySound = 50
  myToast1 = () => {
    this._myToast = Toast.show(
      this.iosNaitveSound(),
      {
        custom: true,
        animation: 'slide-top',
        opacity: 1,
        position: 40
      }
    );
  }
  myToast2 = () => {
    if (this._mySound < 120) { this._mySound += 5 };
    Toast.update(
      this._myToast,
      this.iosNaitveSound(),
      {
        custom: true,
        animation: 'slide-top',
        opacity: 1,
        position: 40
      }
    );
  }
  iosNaitveSound = () => {
    return <View style={styles.iosNaitve}>
      <Image source={require('./assets/sound_off.png')} style={{ width: 20, height: 20, marginHorizontal: 4 }} />
      <View style={{ marginHorizontal: 16, width: 120 }}>
        <Text style={{ fontSize: 14, color: '#666', paddingBottom: 6, textAlign: 'center' }}>铃声</Text>
        <View style={{ width: this._mySound, height: 4, backgroundColor: '#aaa', borderRadius: 2, left: 0 }}></View>
      </View>
    </View>
  }

  myToast3 = () => {
    this._myToast = Toast.show(
      this.androidSound(),
      {
        custom: true,
        animation: 'slide-right',
        opacity: 1,
        position: Position.CENTER
      }
    );
  }
  myToast4 = () => {
    if (this._mySound > 0) { this._mySound -= 5 };
    Toast.update(
      this._myToast,
      this.androidSound(),
      {
        custom: true,
        animation: 'slide-right',
        opacity: 1,
        position: Position.CENTER
      }
    );
  }
  androidSound = () => {
    return <View style={styles.androidSound}>
      <View style={{ backgroundColor: '#17abe3', paddingVertical: 20, borderRadius: 50, justifyContent: "center", alignItems: 'center' }}>
        <Image source={require('./assets/sound_off.png')} style={{ width: 20, height: 20, marginHorizontal: 4 }} />
        <View style={{ marginHorizontal: 16, height: 120, padding: 5 }}>
          <View style={{ width: 4, height: this._mySound, backgroundColor: '#fff', borderRadius: 2, left: 0 }}></View>
        </View>
      </View>
    </View>
  }



  render () {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.header}>Mix Toast Demo</Text>
          <TouchableOpacity onPress={this.getToast1}>
            <Text style={styles.text}>Default Toast</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.getToast2}>
            <Text style={styles.text}>Duration Long</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.getToast3}>
            <Text style={styles.text}>Position Top</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={this.getToast10}>
              <Text style={styles.text}>Icon</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.getToast11}>
              <Text style={styles.text}>Icon2</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={this.getToast4}>
            <Text style={styles.text}>Slide Animation</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.getToast40}>
            <Text style={styles.text}>Scale Animation</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.getToast5}>
            <Text style={styles.text}>Press To Hide</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.getToast6}>
            <Text style={styles.text}>Lifecycle</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={this.getToast60}>
              <Text style={styles.text}>ToShow</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.getToast61}>
              <Text style={styles.text}>ToHide</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={this.getToast62}>
              <Text style={styles.text}>ToShow</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.getToast63}>
              <Text style={styles.text}>ToUpdate</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={this.getToast7}>
            <Text style={styles.text}>ToastStyle</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.getToast70}>
            <Text style={styles.text}>TextSTyle</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.getToast71}>
            <Text style={styles.text}>IconStyle</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.getToast8}>
            <Text style={styles.text}>Node Message</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.getToast9}>
            <Text style={styles.text}>Custom Node Message</Text>
          </TouchableOpacity>

          <View style={{ width: 300, height: 2, backgroundColor: 'yellowgreen', margin: 18 }}></View>
          <Text style={styles.header}>iOS Native</Text>
          <TouchableOpacity onPress={this.myToast1}>
            <Text style={styles.text}>Show Sound</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.myToast2}>
            <Text style={styles.text}>Update Sound</Text>
          </TouchableOpacity>
          <Text style={styles.header}>Android Sound</Text>
          <TouchableOpacity onPress={this.myToast3}>
            <Text style={styles.text}>Show Sound</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.myToast4}>
            <Text style={styles.text}>Update Sound</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    );
  }
}
export default MixToastExample;

const styles = StyleSheet.create({
  container: {
    marginVertical: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    margin: 10,
    fontSize: 42,
    fontWeight: 'bold',
    color: 'green'
  },
  text: {
    margin: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'yellowgreen',
  },
  custom: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowOpacity: 0.2,
    shadowColor: '#000',
    shadowRadius: 3,
    elevation: 3,
  },
  iosNaitve: {
    width: 200,
    backgroundColor: '#f5f6f2',
    borderRadius: 50,
    padding: 12,
    shadowOpacity: 0.2,
    shadowColor: '#000',
    shadowRadius: 30,
    elevation: 3,
    alignItems: 'center',
    flexDirection: 'row'
  },
  androidSound: {
    width: 375,
    justifyContent: 'center',
    alignItems: 'flex-end',
    shadowOpacity: 0.2,
    shadowColor: '#000',
    shadowRadius: 10,
    elevation: 2,
  }
});
