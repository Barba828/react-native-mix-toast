# react-native-mix-toast 轻提示

## DESCRIBE
Android和iOS平台通用的自定义Toast UI组件

## INSTALL
```shell
npm install react-native-mix-toast
```

## USAGE
```js
import Toast from 'react-native-mix-toast'

Toast.show('显示时间LONG', {
    duration: Toast.durations.LONG,
});

```

## API

属性 | 说明 | 类型 | 默认值
----|-----|------|------
| children  | 显示内容，传入`element`为在toast父组件内自定义内容  | `string`、`element` |  -  |
| custom | 完全自定义显示内容 | `boolean` |  `fasle`  |
| duration      | 显示时间，默认使用SHORT和LONG表示为2000ms和3500ms  | `number` |  `SHORT`  |
| position       | 提示显示位置，有`BOTTOM`,`TOP`,`CENTER`选择，传入number为相对CENTER位置的偏移 | `number` |  `BOTTOM`  |
| animation   | 渐入渐出动画       | `boolean` |  `true`  |
| keyboardAvoiding | 避免键盘遮挡 | `boolean` |  `true`  |
| shadowColor| 阴影色，IOS有效| `string` | - |
| textColor| 文本颜色 | `string` | - |
| textStyle | 文本样式 | `object` | - |
| opacity    |  显示背景色  | `number`   | `0.6` |
| delay    | 延时显示 | `number` |  `0`  |
| hideOnPress    | 可点击取消显示 | `boolean` |  `fasle`  |
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
| {props}      | 参数，如上API  | `object` |  -  |

### hide()
可以主动调用关闭Toast

