import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ViewPropTypes,
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Easing,
  Keyboard,
  Image
} from 'react-native';
const window = Dimensions.get('window');
/**
 * Toast展示位置
 * @TOP top:20%
 * @CENTER top:50%
 * @BOTTOM top:80%
 */
const positions = {
  TOP: window.height * 0.2,
  BOTTOM: window.height * 0.8,
  CENTER: window.height * 0.5,
};
/**
 * Toast展示时间
 * @LONG 3500ms
 * @SHORT 2000ms
 * @PERSIST 永久展示
 */
const durations = {
  LONG: 3500,
  SHORT: 2000,
  PERSIST: Infinity,
};

const MAX_WIDTH = 0.8;
const MIN_WIDTH = 0.4;
const ANIMATION_DURATION = 200;

class ToastConstructor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      animatedValue: new Animated.Value(0),//动画状态值
      windowWidth: window.width,
      windowHeight: window.height,
      keyboardScreenY: window.height,
    };
    //渐入动画
    this.animatedValueStart = Animated.timing(this.state.animatedValue, {
      toValue: 100,
      duration: ANIMATION_DURATION,
      easing: Easing.out(Easing.ease),
      useNativeDriver:false,
    })
    //渐出动画
    this.animatedValueEnd = Animated.timing(this.state.animatedValue, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      easing: Easing.in(Easing.ease),
      useNativeDriver:false,
    })
    //展示定时器
    this.Timeout = null;
    this.ttt = null
  }

  componentDidMount () {
    // 响应式改变布局
    Dimensions.addEventListener('change', () => {
      this.setState({
        windowWidth: window.width,
        windowHeight: window.height,
      });
    });
    this.props.keyboardAvoiding && Keyboard.addListener(
      'keyboardDidChangeFrame',
      (endCoordinates) => {
        this.setState({
          keyboardScreenY: endCoordinates.screenY,
        });
      },
    );
    //new =>启动定时器开始show
    this.Timeout = setTimeout(() => this._show(), this.props.delay);
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    //update =>更新定时器和显示参数
    clearTimeout(this.Timeout);
    this.Timeout = setTimeout(() => {
      this._hide()
    }, nextProps.duration);
  }
  componentWillUnmount () {
    //hide =>清除定时器和监听
    clearTimeout(this.Timeout)
    Dimensions.removeEventListener('change');
    Keyboard.removeListener('keyboardDidChangeFrame');
  };

  /**
   * 定义动画
   */
  _animated () {
    let animate = {
      opacity: this.state.animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: [0, this.props.opacity]
      })
    }
    switch (this.props.animation) {
      case 'fade':
        break
      case 'slide-right':
        animate.transform = [{
          translateX: this.state.animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: [window.width / 2, 0]
          })
        }]
        break
      case 'slide-left':
        animate.transform = [{
          translateX: this.state.animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: [-window.width / 2, 0]
          })
        }]
        break
      case 'slide-bottom':
        animate.transform = [{
          translateY: this.state.animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: [this.props.position, 0]
          })
        }]
        break
      case 'slide-top':
        animate.transform = [{
          translateY: this.state.animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: [-this.props.position, 0]
          })
        }]
        break
      case 'scale':
        animate.transform = [{
          scaleX: this.state.animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: [0.1, 1]
          }),
        },
        {
          scaleY: this.state.animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: [0.1, 1]
          })
        }]
        break
      case 'scale-vertical':
        animate.transform = [
          {
            scaleY: this.state.animatedValue.interpolate({
              inputRange: [0, 100],
              outputRange: [0.1, 1]
            })
          }]
        break
      case 'scale-horizontal':
        animate.transform = [{
          scaleX: this.state.animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: [0.1, 1]
          }),
        }]
        break
      default:
        break;
    }
    return animate
  }

  /**
   * 定义遮罩层mask动画
   */
  _maskAnimated () {
    return {
      backgroundColor: this.state.animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: ["#0000", "#0003"]
      })
    }
  }

  /**
   * 执行点击事件方法
   * @param {object} event 
   */
  _onPress (event) {
    this.props.onPress && this.props.onPress(event);
    this.props.hideOnPress && this._hide();
  }

  /**
   * 展示toast
   */
  _show () {
    clearTimeout(this.Timeout)
    this.props.onShow && this.props.onShow();
    this.setState({ visible: true }, () => {
      this.animatedValueStart.start(() => {
        this.props.onShown && this.props.onShown();
        //执行消失方法
        this.props.duration !== durations.PERSIST && (this.Timeout = setTimeout(() => {
          this._hide()
        }, this.props.duration))
      })
    })
  }

  /**
   * 消失toast
   */
  _hide () {
    clearTimeout(this.Timeout)
    this.props.onHide && this.props.onHide();
    this.animatedValueEnd.start(() => {
      this.props.onHidden && this.props.onHidden();
      this.setState({ visible: false }, () => {
        //销毁本组件
        this.props.destroyToast()
      })
    })
  }

  /**
   * toast内容
   */
  renderContent () {
    const { position, custom, children, icon, toastStyle, textStyle, iconStyle, onPress, hideOnPress, touchable } = this.props;
    const { windowWidth, windowHeight, keyboardScreenY } = this.state;
    const heightRate = (keyboardScreenY / windowHeight)||1;
    let offset = { top: position * heightRate }
    return (
      <View style={[styles.container, offset]} pointerEvents={(onPress || hideOnPress || touchable) ? "box-none" : 'none'}>
        <TouchableWithoutFeedback onPress={event => this._onPress(event)} pointerEvents="none">
          <Animated.View style={[this._animated()]}>
            {custom
              ? <View>{typeof children === "string"
                ? <Text style={textStyle && textStyle}>{children}</Text>
                : (children)}
              </View>
              : <View style={[styles.toast, {
                minWidth: windowWidth * MIN_WIDTH,
                maxWidth: windowWidth * MAX_WIDTH
              }, toastStyle && toastStyle]}>
                {typeof children === "string"
                  ? (<View style={styles.view}>
                    {icon && typeof icon === 'number'
                      ? <Image source={icon} style={[styles.icon, iconStyle && iconStyle]} />
                      : icon}
                    <Text style={[styles.text, textStyle && textStyle]}>{children}</Text>
                  </View>)
                  : (children)}
              </View>}
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  render () {
    const { mask } = this.props;
    const { visible } = this.state;
    return visible
      ? mask
        ? <Animated.View style={[styles.mask, this._maskAnimated()]}>
          {this.renderContent()}
        </Animated.View>
        : this.renderContent()
      : null
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  toast: {
    padding: 8,
    paddingHorizontal: 12,
    backgroundColor: '#000',
    borderRadius: 6,
    minHeight: 44,
  },
  mask: {
    width: window.width,
    height: window.height,
    position: 'absolute',
    backgroundColor: '#0003'
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 28,
  },
  icon: {
    width: 32,
    height: 32,
    resizeMode: 'contain'
  }
})

/**
 * 定义参数类型
 */
ToastConstructor.propTypes = {
  ...ViewPropTypes,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  duration: PropTypes.number,
  position: PropTypes.number,
  mask: PropTypes.bool,
  opacity: PropTypes.number,
  delay: PropTypes.number,
  animation: PropTypes.string,
  custom: PropTypes.bool,
  keyboardAvoiding: PropTypes.bool,
  hideOnPress: PropTypes.bool,
  toastStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  onPress: PropTypes.func,
  onHide: PropTypes.func,
  onHidden: PropTypes.func,
  onShow: PropTypes.func,
  onShown: PropTypes.func,
}

/**
 * 默认参数值
 */
ToastConstructor.defaultProps = {
  duration: durations.SHORT,
  position: positions.BOTTOM,
  mask: false,
  custom: false,
  opacity: 0.8,
  delay: 0,
  hideOnPress: false,
  keyboardAvoiding: true,
}

export default ToastConstructor;
export { positions, durations };