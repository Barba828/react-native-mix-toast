# react-native-mix-toast 轻提示
[![npm package](https://img.shields.io/npm/v/react-native-mix-toast)](https://www.npmjs.com/package/react-native-mix-toast)
[![npm download](https://img.shields.io/npm/dy/react-native-mix-toast)](https://www.npmjs.com/package/react-native-mix-toast)
[![license](https://img.shields.io/npm/l/react-native-mix-toast)](https://github.com/Barba828/react-native-mix-toast/blob/master/LICENSE)
[![Stars](https://img.shields.io/github/stars/Barba828/react-native-mix-toast)](https://github.com/Barba828/react-native-mix-toast/stargazers)

## DESCRIBE
Android和iOS平台通用的自定义Toast UI组件

## INSTALL
```shell
npm install react-native-mix-toast
```

## USAGE
```js
import Toast, { Duration, Position } from 'react-native-mix-toast';

Toast.show('This is Toast', {
    duration: Duration.LONG,
});
```

## API

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| children  | 显示内容，传入`node`为在toast父组件内自定义内容  | `string`、`node` |  -  |
| duration   | 显示时间，默认提供`LONG`,`SHORT`,`PERSIST`  | `number` |  `SHORT`  |
| position   | 显示位置，默认提供`BOTTOM`,`TOP`,`CENTER` | `number` |  `BOTTOM`  |
| mask   | 遮罩层 | `bool` |  `false`  |
| icon   | 显示图标 | `number`、`node` |  -  |
| opacity    | 显示透明度  | `number`   | `0.8` |
| delay    | 延时显示 | `number` |  `0`  |
| animation   | 渐入渐出动画，默认提供`fade`,`slide-right`,`slide-left`,`slide-bottom`,`slide-top`,`scale`,`scale-vertical`,`scale-horizontal`     | `string` |  `fade`  |
| custom | 完全自定义显示内容 | `boolean` |  `false`  |
| keyboardAvoiding | 避免键盘遮挡 | `boolean` |  `true`  |
| toastStyle| Toast自定义样式 | `object` | - |
| textStyle | Toast文本自定义样式 | `object` | - |
| iconStyle | Toast图标自定义样式 | `object` | - |
| touchable | 可点击内容 | `object` | - |
| hideOnPress | 点击取消显示 | `boolean` |  `fasle`  |
| onPress    | 点击Toast触发事件 | `function` | - |
| onShow    | 显示动画开始调用函数 | `function` | - |
| onShown    | 显示动画结束调用函数 | `function` | - |
| onHide    | 消失动画开始调用函数 | `function` | - |
| onHidden    | 消失动画结束调用函数 | `function` | - |

## FUNC

### show(children,{props})
显示Toast
属性 | 说明 | 类型 | 默认值
----|-----|------|------
| children      | 显示内容  | `string`、`node` |  -  |
| {props}      | 参数，如上`API`  | `object` |  -  |

### update(toast,children,{props})
更新Toast
属性 | 说明 | 类型 | 默认值
----|-----|------|------
| toast      | 需要更新的toast  | `object` |  -  |
| children      | 显示内容  | `string`、`node` |  -  |
| {props}      | 参数，如上`API`  | `object` |  -  |

### hide()
可以主动调用关闭Toast

## DEMO
```shell
cd src
npm install
expo start
```
or

[![Expo](https://img.shields.io/badge/expo-demo-blue)](https://expo.io/@barba-lee/demo)


