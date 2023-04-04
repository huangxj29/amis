/**
 * @file icon按钮组
 */
import React from 'react';
import {FormControlProps, FormItem} from 'amis';
import ButtonGroup from './ButtonGroupControl';

interface PlainObject {
  [propsName: string]: any;
}

interface FlexSettingControlProps extends FormControlProps {
  onChange: (value: PlainObject) => void;
  value?: PlainObject;
}

const getFlexItem = (props: FlexSettingControlProps) => {
  const {value, direction, justify, alignItems} = props;
  const curDirection = value?.flexDirection || direction;
  const isColumn =
    curDirection === 'column' || curDirection === 'column-reverse';

  // 主轴排列方向
  const directionItemOptions = [
    {
      label: '水平方向',
      value: 'row',
      icon: 'drow'
    },
    {
      label: '垂直方向',
      value: 'column',
      icon: 'dcolumn'
    },
    {
      label: '水平反向',
      value: 'row-reverse',
      icon: 'drowReverse',
      iconClassName: 'scaleX-180'
    },
    {
      label: '垂直反向',
      value: 'column-reverse',
      icon: 'dcolumnReverse',
      iconClassName: 'scaleX-180'
    }
  ];

  // 交叉轴排列方式
  const alignItemsOptions = [
    {
      label: isColumn ? '左对齐' : '顶部对齐',
      value: 'flex-start',
      icon: 'aFlexStart'
      // iconClassName: isColumn ? 'scaleX-90' : '',
    },
    {
      label: isColumn ? '水平居中' : '垂直居中',
      value: 'center',
      icon: 'aCenter'
    },
    {
      label: isColumn ? '右对齐' : '底部对齐',
      value: 'flex-end',
      icon: 'aFlexEnd'
      // iconClassName: isColumn ? 'scaleX-90' : '',
    },
    {
      label: '基线对齐',
      value: 'baseline',
      icon: 'aBaseline'
    },
    {
      label: isColumn ? '水平铺开' : '高度撑满',
      value: 'stretch',
      icon: 'aStretch',
      iconClassName: isColumn ? 'scaleX-90' : ''
    }
  ];

  // 主轴排列方式
  const justifyItemsOptions = [
    {
      label: isColumn ? '顶部对齐' : '左对齐',
      value: 'flex-start',
      icon: 'jFlexStart'
      // iconClassName: isColumn ? 'scaleX-90' : '',
    },
    {
      label: isColumn ? '垂直居中' : '水平居中',
      value: 'center',
      icon: 'jCenter'
    },
    {
      label: isColumn ? '底部对齐' : '右对齐',
      value: 'flex-end',
      icon: 'jFlexEnd'
      // iconClassName: isColumn ? 'scaleX-90' : '',
    },
    {
      label: '两端对齐',
      value: 'space-between',
      icon: 'jSpaceBetween'
    },
    {
      label: '间隔分布',
      value: 'space-around',
      icon: 'jSpaceAround'
    }
  ];

  const flexItems = [
    {
      field: 'flexDirection',
      options: directionItemOptions,
      default: direction || 'row'
    },
    {
      field: 'justifyContent',
      options: justifyItemsOptions,
      default: justify || 'flex-start'
    },
    {
      field: 'alignItems',
      options: alignItemsOptions,
      default: alignItems || 'stretch'
    }
  ];

  return flexItems;
};

export default class FlexSettingControl extends React.Component<FlexSettingControlProps> {
  constructor(props: any) {
    super(props);
  }

  setField(field: string) {
    const {value, onChange} = this.props;
    return (val: string) => {
      onChange({
        ...value,
        [field]: val
      });
    };
  }

  render() {
    const {value, label, ...rest} = this.props;
    const flexItems = getFlexItem(this.props);

    return (
      <div className="ap-Flex">
        {!label && <div className="ap-Flex-label">弹性布局设置</div>}
        {flexItems.map(item => (
          <div
            className={`ap-Flex-item ap-Flex-${item.field}`}
            key={item.field}
          >
            <ButtonGroup
              {...rest}
              options={item.options}
              value={value?.[item.field] || item.default}
              onChange={this.setField(item.field)}
            />
          </div>
        ))}
      </div>
    );
  }
}

@FormItem({
  type: 'flex-setting'
})
export class FlexSettingControlRenderer extends FlexSettingControl {}
