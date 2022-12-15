import type { EChartsCoreOption } from 'echarts'
import type { RootState } from '@/stores'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useEcharts } from '@/hooks/useEcharts'

const data = [
  96285,
  102352,
  111235,
  112356,
  123984,
  138205,
  142059,
  152362,
  162231,
  164324,
  178291,
  192830,
]

const option: EChartsCoreOption = {
  title: {
    text: '当日充值排行',
    left: 30,
    top: 5
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    data: [
      '孤独的霸气',
      '凌云齐天',
      '夏至未至',
      '叶璃溪',
      '良辰美景奈何天',
      '凹凸曼',
      '六月离别',
      '离歌',
      '终极战犯',
      '水洗晴空',
      '安城如沫',
      '渣渣灰',

    ]
  },
  series: [
    {
      name: '充值数',
      type: 'bar',
      data
    }
  ]
}

function Bar() {
  const permissions = useSelector((state: RootState) => state.user.permissions)
  const [echartsRef, init] = useEcharts(option, data)

  useEffect(() => {
    if (permissions.length) {
      setTimeout(() => {
        init()
      }, 100)
    }
  }, [init, permissions.length])
  
  return (
    <div className='w-38% h-550px border border-gray-200 rounded-10px'>
      <div ref={echartsRef} className='w-full h-full'></div>
    </div>
  )
}

export default Bar