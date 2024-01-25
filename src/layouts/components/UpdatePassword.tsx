import type { FormProps } from 'antd/es/form/Form';
import { Ref, useImperativeHandle } from 'react';
import { useState } from 'react';
import { Form, Input, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { updatePassword } from '@/servers/login';
import { PASSWORD_RULE } from '@/utils/config';
import BasicModal from '@/components/Modal/BasicModal';
import PasswordStrength from '@/components/PasswordStrength';

export interface PasswordModal {
  open: () => void;
}

interface Props {
  passwordRef: Ref<PasswordModal>;
}

function UpdatePassword(props: Props) {
  const { passwordRef } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // 抛出外部方法
  useImperativeHandle(
    passwordRef,
    () => ({
      open: () => {
        setOpen(true);
      }
    })
  );

  /** 点击模态框确定 */
  const onOk = () => {
    form.submit();
  };

  /**
   * 提交表单
   * @param values - 表单值
   */
  const onFinish: FormProps['onFinish'] = async values => {
    // 当密码和确认密码不同时则提示错误
    if (values.password !== values.confirmPassword) {
      return messageApi.warning({
        content: t('login.confirmPasswordMessage'),
        key: 'confirmPassword'
      });
    }
    try {
      setLoading(true);
      const { code, message } = await updatePassword(values);
      if (Number(code) === 200) {
        setOpen(false);
        messageApi.success(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      { contextHolder }
      <BasicModal
        title={t('public.changePassword')}
        open={isOpen}
        confirmLoading={isLoading}
        onOk={onOk}
        onCancel={() => setOpen(false)}
      >
        <Form
          name="UpdatePassword"
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label={t('login.username')}
            name="username"
            rules={[{ required: true, message: t('public.pleaseEnter', { name: t('login.username') }) }]}
          >
            <Input placeholder={t('public.inputPleaseEnter')} />
          </Form.Item>

          <Form.Item
            label={t('login.password')}
            name="password"
            rules={[
              { required: true, message: t('public.pleaseEnter', { name: t('login.password') }) },
              PASSWORD_RULE(t)
            ]}
          >
            <PasswordStrength />
          </Form.Item>

          <Form.Item
            label={t('login.confirmPassword')}
            name="confirmPassword"
            rules={[
              { required: true, message: t('public.pleaseEnter', { name: t('login.confirmPassword') })},
              PASSWORD_RULE(t)
            ]}
          >
            <PasswordStrength />
          </Form.Item>
        </Form>
      </BasicModal>
    </>
  );
}

export default UpdatePassword;