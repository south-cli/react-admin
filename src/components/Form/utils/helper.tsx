import type { TFunction } from 'i18next';
import type { ComponentProps, ComponentType } from '#/form';
import { DATE_FORMAT, TIME_FORMAT } from '@/utils/config';

/**
 * 处理子节点的值的属性
 * @param component - 组件名
 */
export function handleValuePropName(component: ComponentType): string {
  switch (component) {
    case 'Switch':
    case 'Checkbox':
    case 'CheckboxGroup':
      return 'checked';

    case 'Upload':
      return 'fileList';

    default:
      return 'value';
  }
}

/**
 * 初始化组件自定义属性
 * @param component - 组件名
 */
export function initCompProps(t: TFunction, component: ComponentType): ComponentProps {
  switch (component) {
    // 下拉框
    case 'Select':
      return {
        allowClear: true,
        placeholder: t('public.inputPleaseSelect')
      };

    // 数字框
    case 'InputNumber':
      return {
        placeholder: t('public.inputPleaseEnter')
      };

    // 勾选框
    case 'Checkbox':
      return {};

    // 勾选框组
    case 'CheckboxGroup':
      return {};

    // 日期
    case 'DatePicker':
      return {
        placeholder: t('public.inputPleaseSelect'),
        format: DATE_FORMAT,
      };

    // 日期区间
    case 'RangePicker':
      return {
        placeholder: [t('public.inputPleaseSelect'), t('public.inputPleaseSelect')],
        format: [DATE_FORMAT, DATE_FORMAT],
      };

    // 时间
    case 'TimePicker':
      return {
        placeholder: t('public.inputPleaseSelect'),
        format: TIME_FORMAT,
      };

    // 时间区间
    case 'TimeRangePicker':
      return {
        placeholder: [t('public.inputPleaseSelect'), t('public.inputPleaseSelect')],
        format: [TIME_FORMAT, TIME_FORMAT],
      };
    
    default:
      return {
        allowClear: true,
        placeholder: t('public.inputPleaseEnter')
      };
  }
}