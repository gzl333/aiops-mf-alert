<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import aiops from 'src/api/aiops'

// const alertLogTableRow = ref([{
//   id: 1,
//   alertname: '节点错误',
//   instance: '三号机',
//   monitor_cluster: 'webMonitor_xxh',
//   severity: '严重',
//   alarm_time: '2023-06-27',
//   description: '系统崩溃'
// }, {
//   id: 2,
//   alertname: '节点崩溃',
//   instance: '四号机',
//   monitor_cluster: 'webMonitor_xxh',
//   severity: '轻微',
//   alarm_time: '2023-06-28',
//   description: '系统崩溃'
// }])

// 数据表字段设计
const alertLogColumns = computed(() => [
  { name: 'id', label: 'ID', align: 'center' },
  { name: 'alertname', label: '告警名称', align: 'center' },
  { name: 'instance', label: '告警主机', align: 'center' },
  { name: 'monitor_cluster', label: '监控集群', align: 'center' },
  { name: 'severity', label: '严重等级', align: 'center' },
  { name: 'alarm_time', label: '告警时间', align: 'center' },
  { name: 'description', label: '告警详情', align: 'center' }
])
// 分页表变量
const paginationTable = ref({
  page: 1,
  count: 0,
  rowsPerPage: 100
})
const search = ref()
// 服务单元筛选框数据类型接口
interface ServiceInterface {
  label?: string,
  label_en?: string,
  value?: string
}
const deviceOptions = ref< ServiceInterface[] >([])
deviceOptions.value.push({ label: '全部设备', label_en: 'all_devices', value: 'all_devices' }, { label: '网站监测点(信息化大厦）', label_en: 'webMonitor_xxh', value: 'webMonitor_xxh' }, { label: '全球开放科学云集群', label_en: 'goscMetrics', value: 'goscMetrics' }, { label: '邮件系统性能指标', label_en: 'mail_metric', value: 'mail_metric' }, { label: '邮件系统非业务类日志', label_en: 'mail_log', value: 'mail_log' }, { label: ' 运维大数据平台物理服务器集群', label_en: 'aiopsMetrics', value: 'aiopsMetrics' }, { label: '地球大数据集群', label_en: 'casearthMetrics', value: 'casearthMetrics' }, { label: '运维大数据平台物理云主机集群', label_en: 'aiopsK8sMetrics', value: 'aiopsK8sMetrics' }, { label: '网站监测点(软件园区）', label_en: 'webMonitor_zgc', value: 'webMonitor_zgc' })
const device = ref({
  label: '全部设备',
  labelEn: 'All Device',
  value: ''
})
const OriginAlertResultInfo = ref()
const date = new Date()
const timestamp = date.getTime() / 1000
const onday = 60 * 60 * 24
const beforeTime = timestamp - onday
const queryInfo = ref({
  start: beforeTime,
  end: timestamp,
  offset: 0,
  limit: 100,
  monitor_cluster: '',
  alertname: ''
})
const getOriginAlertinfo = async () => {
  await aiops.login.alert.getOriginAlertUrl({ query: queryInfo.value }).then((res) => {
    OriginAlertResultInfo.value = res.data.results
    paginationTable.value.count = res.data.count
  })
}
// const changePageSize = () => {
//   query.value.page_size = paginationTable.value.rowsPerPage
//   query.value.page = 1
//   paginationTable.value.page = 1
//   getUserMetering()
// }

const changePagination = () => {
  const offset = Math.floor(paginationTable.value.page - 1) * 100
  queryInfo.value.offset = offset
  getOriginAlertinfo()
}

const changeMonitorcluster = (device: string) => {
  let monitorcluster = ''
  if (device === 'all_devices') {
    monitorcluster = ''
  } else {
    monitorcluster = device
  }
  queryInfo.value.monitor_cluster = monitorcluster
  queryInfo.value.offset = 0
  paginationTable.value.page = 1
  getOriginAlertinfo()
}

const searchAlertbyName = () => {
  const alertname = search.value
  queryInfo.value.alertname = alertname
  getOriginAlertinfo()
}

onMounted(async () => {
  setTimeout(async () => {
    await getOriginAlertinfo()
  }, 50)
})
</script>

<template>
  <div class="Service2Page">
    <q-scroll-area style="height: calc(100vh - 60px);">
      <div class="column">

        <div class="col-auto">
          <div class="row justify-center">

            <div class="content-fixed-width">

              <div class="row justify-between q-pt-lg q-pb-sm">

                <div class="col-auto row items-end text-h6 q-px-none">
                  告警详情
                </div>

              </div>
              <div>
                <div class="row justify-start">
                  <div class="col-6 row justify-start">
                    <div class="col-5 q-mr-lg">
                      <q-input dense outlined v-model="search" placeholder="请输入告警名称">
                        <template v-slot:prepend>
                          <q-icon name="search"/>
                        </template>
                        <template v-slot:append v-if="search">
                          <q-icon name="close" @click="search = ''" class="cursor-pointer"/>
                        </template>
                      </q-input>
                    </div>
                    <div class='col-2 q-mr-lg'>
                      <q-btn style="height: 40px"  outline label="筛选" class="q-px-lg q-ml-lg" @click="searchAlertbyName()"/></div>
                    <q-select v-model="device" :options="deviceOptions" label="请选择集群" outlined class=" row col-3 q-py-ms q-mr-lg" @update:model-value="changeMonitorcluster(device.value)" dense/>
                  </div>
                </div>
                <div class="row justify-center" >
                  <q-table
                    flat
                    class="row col-12  justify-start  q-pl-md "
                    id="StorageMeteringTable"
                    card-class="no-padding"
                    table-header-class="bg-grey-1 text-grey"
                    :rows="OriginAlertResultInfo"
                    :columns="alertLogColumns"
                    row-key="name"
                    color="primary"
                    :loading-label="'notifyLoading'"
                    :no-data-label="'noData'"
                    hide-pagination
                    :pagination="{ rowsPerPage: 100 }"
                  >
                    <template v-slot:body="props">
                      <q-tr :props="props">
                        <q-td class="no-padding"  key="id" :props="props">
                          {{ props.row.id}}
                        </q-td>
                        <q-td class="no-padding"  key="alertname" :props="props">{{ props.row.alertname }}</q-td>
                        <q-td class="no-padding" style="white-space:normal;word-break:break-all;word-wrap:break-word;" key="instance" :props="props">{{ props.row.instance}}</q-td>
                        <q-td class="no-padding" style="white-space:normal;word-break:break-all;word-wrap:break-word;" key="monitor_cluster" :props="props">{{ props.row.monitor_cluster}}</q-td>
                        <q-td class="no-padding" style="white-space:normal;word-break:break-all;word-wrap:break-word;" key="severity" :props="props">{{ props.row.severity}}</q-td>
                        <q-td class="no-padding" key="alarm_time" :props="props">{{ props.row.startsAt }}</q-td>
                        <q-td class="no-padding" style="white-space:normal;word-break:break-all;word-wrap:break-word;" key="description" :props="props">{{ props.row.description}}</q-td>
                      </q-tr>
                    </template>
                    <template v-slot:top-right>
                      <div class="col-auto row items-center q-gutter-x-xs">
                        <q-btn
                          class="col-auto"
                          color="primary"
                          flat
                          :label="'导出当页数据'"
                          no-caps
                          dense
                          @click="exportTable()"
                        />
                        <q-btn
                          class="col-auto"
                          color="primary"
                          flat
                          :label="'导出全部数据'"
                          no-caps
                          dense
                          @click="exportAllTable()"
                        />
                        <span class="text-grey"> (注: 限制导出最大记录数为 1000)</span>
                      </div>
                    </template>
                  </q-table>
                  <q-separator/>
                </div>
                <div class="text-grey q-mt-lg row justify-start q-mb-lg">
                  <div class="row col-12  justify-start ">
                    <div class="col-4 justify-start row ">
                      <span class="q-ml-xl q-pt-sm q-pr-md " >共{{ paginationTable.count }}条数据</span>
                      <q-select class="q-pt-none" color="grey" v-model="paginationTable.rowsPerPage"  dense options-dense
                                borderless >
                      </q-select>
                      <span class="q-pt-sm ">页</span>
                    </div>
                    <q-pagination
                      v-model="paginationTable.page"
                      :max="Math.ceil(paginationTable.count/paginationTable.rowsPerPage)"
                      :max-pages="9"
                      direction-links
                      outline
                      :ripple="false"
                      @click="changePagination"
                      class="col-8 justify-end q-pr-lg"
                    />
                  </div>
                </div>
                <q-separator></q-separator>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>

<style lang="scss" scoped>
.Service2Page {
}
</style>
