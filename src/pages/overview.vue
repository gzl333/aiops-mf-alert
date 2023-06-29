<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import aiops from 'src/api/aiops'
// 绘制图表
const serverityOption = {
  title: {
    // text: 'Referer of a Website',
    subtext: '告警严重等级',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 100, name: 'critical' },
        { value: 150, name: 'error' },
        { value: 180, name: 'waring' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
const LogNumberTypeOption = {
  title: {
    // text: 'Referer of a Website',
    subtext: '日志类告警',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 100, name: 'webPageNotAvailable' },
        { value: 150, name: 'mail_log_warning' },
        { value: 191, name: 'mail_log_error' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
const TargetNumberTypeOption = {
  title: {
    // text: 'Referer of a Website',
    subtext: '指标类告警',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 100, name: 'HostOutOfMemory' },
        { value: 150, name: 'HostUnusualDiskLog' },
        { value: 210, name: 'HostHighCpuLoad' },
        { value: 152, name: 'HostOutOfDiskSpace' },
        { value: 155, name: 'HostCpuHighLoWait' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
const lineOption = {
  title: {
    text: '最近24小时内告警趋势',
    subtext: 'Fake Data'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value}'
    },
    axisPointer: {
      snap: true
    }
  },
  visualMap: {
    show: false,
    dimension: 0,
    pieces: [
      {
        lte: 6,
        color: 'green'
      },
      {
        gt: 6,
        lte: 8,
        color: 'red'
      },
      {
        gt: 8,
        lte: 14,
        color: 'green'
      },
      {
        gt: 14,
        lte: 17,
        color: 'red'
      },
      {
        gt: 17,
        color: 'green'
      }
    ]
  },
  series: [
    {
      name: '告警',
      type: 'line',
      smooth: true,
      // prettier-ignore
      data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
      markArea: {
        itemStyle: {
          color: 'rgba(255, 173, 177, 0.4)'
        },
        data: [
          [
            {
              name: 'Morning Peak',
              xAxis: '07:30'
            },
            {
              xAxis: '10:00'
            }
          ],
          [
            {
              name: 'Evening Peak',
              xAxis: '17:30'
            },
            {
              xAxis: '21:15'
            }
          ]
        ]
      }
    },
    {
      name: '告警',
      type: 'line',
      smooth: true,
      // prettier-ignore
      data: [5000, 2800, 2500, 2600, 2700, 3000, 5500, 5000, 4000, 3900, 3800, 3900, 4000, 5000, 6000, 7500, 8000, 7000, 6000, 4000],
      markArea: {
        itemStyle: {
          color: 'rgba(255, 173, 177, 0.4)'
        },
        data: [
          [
            {
              name: 'Morning Peak',
              xAxis: '07:30'
            },
            {
              xAxis: '10:00'
            }
          ],
          [
            {
              name: 'Evening Peak',
              xAxis: '17:30'
            },
            {
              xAxis: '21:15'
            }
          ]
        ]
      }
    }
  ]
}
const main = ref()
const numberType = ref()
const TargetNumberType = ref()
const lineType = ref()
onMounted(async () => {
  const myChart = echarts.init(main.value)
  const myChart2 = echarts.init(numberType.value)
  const myChart3 = echarts.init(TargetNumberType.value)
  const myChart4 = echarts.init(lineType.value)
  await myChart.setOption(serverityOption)
  await myChart2.setOption(LogNumberTypeOption)
  await myChart3.setOption(TargetNumberTypeOption)
  await myChart4.setOption(lineOption)
  myChart.resize({
    width: 400,
    height: 500
  })
  myChart2.resize({
    width: 400,
    height: 500
  })
  myChart3.resize({
    width: 400,
    height: 500
  })
  myChart4.resize({
    width: 1200,
    height: 500
  })
})

const AlertOverview = ref({
  AlertCount: 0,
  MetricAlertCount: 0,
  LogAlertCount: 0
})
const date = new Date()
const timestamp = date.getTime() / 1000
const onday = 60 * 60 * 24
const beforeTime = timestamp - onday
const queryAllAlertCount = ref({
  start: beforeTime,
  end: timestamp
})
const queryMetricAlertCount = ref({
  start: beforeTime,
  end: timestamp,
  alert_type: 'metric'
})
const querylogAlertCount = ref({
  start: beforeTime,
  end: timestamp,
  alert_type: 'log'
})
const getAllAlertCount = async () => {
  await aiops.login.alert.getOriginAlertUrl({ query: queryAllAlertCount.value }).then((res) => {
    AlertOverview.value.AlertCount = res.data.count
  })
}
const getMetricAlertCount = async () => {
  await aiops.login.alert.getOriginAlertUrl({ query: queryMetricAlertCount.value }).then((res) => {
    AlertOverview.value.MetricAlertCount = res.data.count
  })
}
const getLogAlertCount = async () => {
  await aiops.login.alert.getOriginAlertUrl({ query: querylogAlertCount.value }).then((res) => {
    AlertOverview.value.LogAlertCount = res.data.count
  })
}
onMounted(async () => {
  setTimeout(async () => {
    getAllAlertCount()
    getMetricAlertCount()
    getLogAlertCount()
  }, 50)
})
</script>

<template>
  <div class="PersonalIndex">
    <q-scroll-area style="height: calc(100vh - 60px);">
      <div class="column">

        <q-separator/>

        <div class="col-auto q-pt-xl">
          <div class="row justify-center">
            <div class="content-fixed-width">
              <div class=" row justify-center q-mt-md q-px-sm q-py-sm"  style="background-color: #f9f9f9">
                <q-card class="col-4 column justify-center no-shadow   " style="background-color: #ffffff">
                  <q-card-section class="bg-white">
                    <div class="column justify-start">
                      <div style="font-size: 15px" class="row justify-start  col-3 "><span>24小时内告警总数</span>
                      </div>
                      <div style="font-size: 30px" class="row justify-start q-pl-sm col-3"><span>{{AlertOverview.AlertCount}}</span>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
                <q-card class="col-4 column justify-center no-shadow  q-pl-sm" style="background-color: #ffffff">
                  <q-card-section class="bg-white">
                    <div class="column justify-start">
                      <div style="font-size: 15px" class="row justify-start  col-3 "><span>指标类告警</span>
                      </div>
                      <div style="font-size: 30px" class="row justify-start q-pl-sm col-3"><span>{{ AlertOverview.MetricAlertCount }} </span>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
                <q-card class="col-4 column justify-center no-shadow  " style="background-color: #ffffff">
                  <q-card-section class="bg-white">
                    <div class="column justify-start">
                      <div style="font-size: 15px" class="row justify-start  col-3 "><span>日志类告警</span>
                      </div>
                      <div style="font-size: 30px" class="row justify-start q-pl-sm col-3"><span> {{ AlertOverview.LogAlertCount }}</span>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
              <div class="row justify-center q-px-sm q-py-sm">
                <div class="col-8 row justify-center">
                  <div class="text-center col-12"> 各类告警数量分布 </div>
                  <div class="text-center row justify-center col-12 q-mt-md">
                    <div class="col-6"><div ref="TargetNumberType"></div></div>
                    <div class="col-6"><div ref="numberType"></div></div>
                  </div>
                </div>
                <div class="col-4 row justify-center">
                  <div class="text-center col-12"> 告警严重等级分布 </div>
                  <div class="col-12"><div ref="main"></div></div>
                </div>
              </div>
              <div class="row justify-center q-px-sm q-py-sm">

                <div class="col-12"><div ref="lineType"></div></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </q-scroll-area>
  </div>
  <div class="Service1Page content-fixed-width">
  </div>
</template>

<style lang="scss" scoped>
.Service1Page {
}
</style>
