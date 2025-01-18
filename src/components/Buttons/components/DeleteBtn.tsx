import type { ButtonProps } from 'antd';
import { Button, App } from 'antd';
import { useTranslation } from 'react-i18next';
import { ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons';

interface Props extends Omit<ButtonProps, 'loading'> {
  isLoading: boolean;
  name?: string;
  isIcon?: boolean;
  handleDelete: () => void;
}

function DeleteBtn(props: Props) {
  const { isLoading, isIcon, name, handleDelete } = props;
  const { t } = useTranslation();
  const { modal } = App.useApp();

  // 清除自定义属性
  const params: Partial<Props> = { ...props };
  delete params.isIcon;
  delete params.isLoading;
  delete params.handleDelete;

  const showConfirm = () => {
    modal.confirm({
      title: t('public.kindTips'),
      icon: <ExclamationCircleOutlined />,
      content: t('public.confirmMessage', { name: name || t('public.delete') }),
      okText: t('public.confirm'),
      okType: 'danger',
      cancelText: t('public.cancel'),
      onOk() {
        handleDelete();
      },
    });
  };

  return (
    <Button
      danger
      type='primary'
      {...params}
      icon={params?.icon || (isIcon && <DeleteOutlined />)}
      loading={!!isLoading}
      onClick={showConfirm}
    >
      { name || t('public.delete') }
    </Button>
  );
}

export default DeleteBtn;
