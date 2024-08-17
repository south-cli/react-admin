import type { InputProps } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounceFn } from 'ahooks';
import { Input } from 'antd';
import StrengthBar from './components/StrengthBar';

/**
 * @description: 密码强度组件
 */
function PasswordStrength(props: InputProps) {
  const { value } = props;
  const { t } = useTranslation();
  const [strength, setStrength] = useState(0);

  /**
   * 密码强度判断
   * @param value - 值
   */
  const handleStrength = useDebounceFn((value: string) => {
    if (!value) return;
    let level = 0;
    if (/\d/.test(value)) level++; // 有数字强度加1
    if (/[a-z]/.test(value)) level++; // 有小写字母强度加1
    if (/[A-Z]/.test(value)) level++; // 有大写字母强度加1
    if (value.length > 10) level++; // 长度大于10强度加1
    if (/[\.\~\@\#\$\^\&\*]/.test(value)) level++; // 有以下特殊字符强度加1
    setStrength(level);
  }, { wait: 500 });

  // 监听传入值变化
  useEffect(() => {
    handleStrength.run(value as string);
  }, [handleStrength, value]);

  return (
    <>
      <Input.Password
        value={value}
        allowClear={true}
        placeholder={t('public.inputPleaseEnter')}
        autoComplete="password"
        {...props}
        onChange={e => {
          props.onChange?.(e);
          handleStrength.run(e.target.value);
        }}
      />

      {
        !!strength &&
        <StrengthBar strength={strength} />
      }
    </>
  );
}

export default PasswordStrength;