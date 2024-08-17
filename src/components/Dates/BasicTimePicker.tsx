import type { TimePickerProps } from 'antd';
import { TimePicker } from 'antd';
import { string2Dayjs } from './utils/helper';

function BasicTimePicker(props: TimePickerProps) {
  const { value } = props;
  const params = {...props};

  // 如果值不是dayjs类型则进行转换
  if (value) params.value = string2Dayjs(value);

  return (
    <TimePicker
      {...params}
    />
  );
}

export default BasicTimePicker;