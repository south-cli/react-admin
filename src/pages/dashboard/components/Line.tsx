import type { EChartsCoreOption } from 'echarts';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useEcharts } from '@/hooks/useEcharts';
import { useCommonStore } from '@/hooks/useCommonStore';

function Line() {
  const { t } = useTranslation();
  const { permissions } = useCommonStore();

  const option: EChartsCoreOption = {
    title: {
      text: t('dashboard.effectiveRechargeRatio'),
      left: 30,
      top: 5
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['07-11', '07-12', '07-13', '07-14', '07-15', '07-16', '07-17']
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    series: [
      {
        name: t('dashboard.rechargeAmount'),
        type: 'line',
        areaStyle: {
          color: '#1890ff',
          opacity: 0.2
        },
        emphasis: {
          focus: 'series'
        },
        data: [120, 140, 120, 190, 150, 111, 160]
      },
      {
        name: t('dashboard.usersNumber'),
        type: 'line',
        areaStyle: {
          color: '#1890ff',
          opacity: 0.3
        },
        emphasis: {
          focus: 'series'
        },
        data: [90, 122, 90, 140, 123, 280, 200]
      },
    ]
  };
  
  const [echartsRef, init] = useEcharts(option);

  useEffect(() => {
    if (permissions.length && echartsRef.current) {
      init();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [echartsRef]);
  
  return (
    <div className='w-60% h-550px border border-gray-200 rounded-10px'>
      <div ref={echartsRef} className='w-full h-full'></div>
    </div>
  );
}

export default Line;