import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useWatermark } from '@/hooks/useWatermark';
import { checkPermission } from '@/utils/permissions';
import { useCommonStore } from '@/hooks/useCommonStore';
import BaseContent from '@/components/Content/BaseContent';

function Watermark() {
  const { t } = useTranslation();
  const { permissions } = useCommonStore();
  const [Watermark, RemoveWatermark] = useWatermark();
  const isPermission = checkPermission('/demo/watermark', permissions);

  const openWatermark = () => {
    Watermark({
      content: t('content.watermark'),
      height: 300,
      width: 350,
      rotate: -20,
      color: '#000',
      fontSize: 30,
      opacity: .07
    });
  };

  const hidWatermark = () => {
    RemoveWatermark();
  };

  return (
    <BaseContent isPermission={isPermission}>
      <div className="p-30px bg">
        <Button onClick={openWatermark}>
          { t('content.openWatermark') }
        </Button>
        <Button danger onClick={hidWatermark}>
          { t('content.hideWatermark') }
        </Button>
      </div>
    </BaseContent>
  );
}

export default Watermark;
