import React, { Component } from 'react';
import RootSiblings from 'react-native-root-siblings';
// import ToastContainer, { positions, durations } from './ToastContainer';
import ToastConstructer, { positions, durations } from './ToastConstructer';

class Toast extends Component {
  static displayName = 'Toast';
  static propTypes = ToastConstructer.propTypes;
  static positions = positions;
  static durations = durations;

  constructor(props) {
    super(props);
    //使用单例模式构造toast对象
    this.toast = null;
  }

  //生产toast实例
  static show = (
    message,
    options = {
      position: positions.BOTTOM,
      duration: durations.SHORT,
    },
  ) => {
    this.toast = new RootSiblings(
      (
        <ToastConstructer
          // visible={true}
          destroyToast={() => {
            this.hide(this.toast)
          }}
          {...options}>
          {message}
        </ToastConstructer>
      ),
    );
    return this.toast
  };

  //销毁toast实例
  static hide = toast => {
    //判断toast类型
    if (toast instanceof RootSiblings) {
      toast.destroy();
    } else {
      console.warn(
        `Toast.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof toast}\` instead.`,
      );
    }
  };
}

export { RootSiblings as Manager };
export default Toast;
