<script setup lang="ts">
import { ref, computed } from 'vue'
const nginxLogTableRow = ref([{
  id: 1,
  alarm_name: '节点错误',
  alarm_computer: '三号机',
  severity: '严重',
  alarm_time: '2023-06-27',
  description: '系统崩溃'
}, {
  id: 2,
  alarm_name: '节点崩溃',
  alarm_computer: '四号机',
  severity: '轻微',
  alarm_time: '2023-06-28',
  description: '系统崩溃'
}])
// 数据表字段设计
const nginxLogColumns = computed(() => [
  { name: 'id', label: 'ID', align: 'center' },
  { name: 'alarm_name', label: '告警名称', align: 'center' },
  { name: 'alarm_computer', label: '告警主机', align: 'center' },
  { name: 'severity', label: '严重等级', align: 'center' },
  { name: 'alarm_time', label: '告警时间', align: 'center' },
  { name: 'description', label: '详细描述', align: 'center' }
])
// 分页表变量
const paginationTable = ref({
  page: 1,
  count: 0,
  rowsPerPage: 10
})

const search = ref()
// 服务单元筛选框数据类型接口
interface ServiceInterface {
  label?: string,
  label_en?: string,
  value?: string
}
const deviceOptions = ref< ServiceInterface[] >([])
deviceOptions.value.push({ label: '1', label_en: '1', value: '1' }, { label: '2', label_en: '2', value: '2' }, { label: '3', label_en: '3', value: '3' })
const device = ref({
  label: '全部设备',
  labelEn: 'All Device',
  value: ''
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
                      <q-input dense outlined v-model="search" placeholder="请输入名称，主机">
                        <template v-slot:prepend>
                          <q-icon name="search"/>
                        </template>
                        <template v-slot:append v-if="search">
                          <q-icon name="close" @click="search = ''" class="cursor-pointer"/>
                        </template>
                      </q-input>
                    </div>
                    <div class='col-2 q-mr-lg'>
                      <q-btn style="height: 40px"  outline label="筛选" class="q-px-lg q-ml-lg" @click="search"/></div>
                    <q-select v-model="device" :options="deviceOptions" label="请选择" outlined class=" row col-3 q-py-ms q-mr-lg" dense/>
                  </div>
                </div>
                <div class="row justify-center" >
                  <q-table
                    flat
                    class="row col-12  justify-start  q-pl-md "
                    id="StorageMeteringTable"
                    card-class="no-padding"
                    table-header-class="bg-grey-1 text-grey"
                    :rows="nginxLogTableRow"
                    :columns="nginxLogColumns"
                    row-key="name"
                    color="primary"
                    :loading-label="'notifyLoading'"
                    :no-data-label="'noData'"
                    hide-pagination
                    :pagination="{ rowsPerPage: 0 }"
                  >
                    <template v-slot:body="props">
                      <q-tr :props="props">
                        <q-td class="no-padding"  key="id" :props="props">
                          {{ props.row.id}}
                        </q-td>
                        <q-td class="no-padding"  key="alarm_name" :props="props">{{ props.row.alarm_name }}</q-td>
                        <q-td class="no-padding" style="white-space:normal;word-break:break-all;word-wrap:break-word;" key="alarm_computer" :props="props">{{ props.row.alarm_computer}}</q-td>
                        <q-td class="no-padding" style="white-space:normal;word-break:break-all;word-wrap:break-word;" key="severity" :props="props">{{ props.row.severity}}</q-td>
                        <q-td class="no-padding" key="alarm_time" :props="props">
                          {{ props.row.alarm_time }}
                        </q-td>
                        <q-td class="no-padding" key="description" :props="props">{{ props.row.description}}</q-td>
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
                          @click="exportAllTable"
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
                      <q-select class="q-pt-none" color="grey" v-model="paginationTable.rowsPerPage" :options="[10,15,20,25,30]" dense options-dense
                                borderless @update:model-value="changePageSize">
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
