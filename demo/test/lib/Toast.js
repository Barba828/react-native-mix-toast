import React, { Component } from 'react';
import RootSiblings from 'react-native-root-siblings';
import ToastConstructer, { positions, durations } from './ToastConstructer';

class Toast extends Component {
  static displayName = 'Toast';
  static propTypes = ToastConstructer.propTypes;
  static positions = positions;
  static durations = durations;

  constructor(props) {
    super(props);
  }

  //生产toast实例
  static show = (
    message,
    options = {
      position: positions.BOTTOM,
      duration: durations.SHORT
    },
  ) => {
    //new Toast对象实例
    let toast = new RootSiblings(
      (
        <ToastConstructer
          //传入子组件回调销毁
          destroyToast={() => {
            this.hide(toast)
          }}
          {...options}>
          {message}
        </ToastConstructer>
      ),
    );
    return toast
  };

  static update = (
    toast,
    message,
    options = {
      position: positions.BOTTOM,
      duration: durations.SHORT
    }, ) => {
    //判断toast类型
    if (toast instanceof RootSiblings) {
      toast.update(
        <ToastConstructer
          //传入子组件回调销毁
          destroyToast={() => {
            this.hide(toast)
          }}
          {...options}>
          {message}
        </ToastConstructer>
      )
    } else {
      console.warn(
        `Toast.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof toast}\` instead.`,
      );
    }
  }

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
