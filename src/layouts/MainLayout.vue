<script setup lang="ts">
import { computed } from 'vue'
import { navigateToUrl } from 'single-spa'
import { useStore } from 'stores/store'
// import { useRoute, useRouter } from 'vue-router'
import { i18n } from 'boot/i18n'

import { logs } from 'src/configs/logs'

// const props = defineProps({
//   foo: {
//     type: String,
//     required: false,
//     default: ''
//   }
// })
// const emits = defineEmits(['change', 'delete'])

const store = useStore()
// const router = useRouter()
// const route = useRoute()
const tc = i18n.global.tc

const activeItem = computed(() => store.items.currentPath[0])

const appPath = process.env.appPath as string
const releaseTime = process.env.releaseTime as string
const appVersion = logs[0].version
</script>

<template>
  <q-layout view="hHh LpR fFf">

    <q-drawer :model-value="true" style="padding-top: 60px;" :breakpoint="0" side="left" width="120" bordered>

      <div class="column full-height bg-grey-2">
        <q-scroll-area class="col non-selectable" visible>

          <q-list>

            <q-item>
              <q-item-section class="column items-center q-py-sm text-center text-weight-bold text-grey-8">
                {{ tc('告警') }}
              </q-item-section>
            </q-item>

            <q-item
              clickable
              :active="activeItem === 'overview'"
              @click="navigateToUrl(appPath + '/overview')"
              active-class="active-item"
            >
              <q-item-section class="column items-center">
                <q-icon name="las la-video" size="lg"/>
                <div class="active-text text-center">{{ tc('告警概览') }}</div>
              </q-item-section>
            </q-item>

            <q-item
              clickable
              :active="activeItem === 'detail'"
              @click="navigateToUrl(appPath + '/detail')"
              active-class="active-item"
            >
              <q-item-section class="column items-center">
                <q-icon name="las la-server" size="lg"/>
                <div class="active-text text-center">{{ tc('告警详情') }}</div>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              :active="activeItem === 'convergence'"
              @click="navigateToUrl(appPath + '/convergence')"
              active-class="active-item"
            >
              <q-item-section class="column items-center">
                <q-icon name="las la-server" size="lg"/>
                <div class="active-text text-center">{{ tc('收敛信息') }}</div>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              :active="activeItem === 'record'"
              @click="navigateToUrl(appPath + '/record')"
              active-class="active-item"
            >
              <q-item-section class="column items-center">
                <q-icon name="las la-server" size="lg"/>
                <div class="active-text text-center">{{ tc('发送记录') }}</div>
              </q-item-section>
            </q-item>
          </q-list>

          <div class="row justify-center q-pt-lg">
            <q-icon class="text-center cursor-pointer"
                    name="info"
                    size="xs"
                    :color="activeItem === 'about' ? 'primary' : 'grey-4'"
                    @click="navigateToUrl(appPath + '/about')">
              <q-tooltip class="bg-grey-3">
                <div class="text-grey text-caption text-center">{{ tc('appVersion') }}</div>
                <div class="text-grey text-caption text-center">
                  {{ appVersion }}
                </div>

                <div class="text-grey text-caption text-center">{{ tc('releaseTime') }}</div>
                <div class="text-grey text-caption text-center">
                  {{ new Date(releaseTime).toLocaleString(i18n.global.locale) }}
                </div>
              </q-tooltip>
            </q-icon>
          </div>

        </q-scroll-area>
      </div>
    </q-drawer>

    <q-page-container>
      <q-scroll-area style="height: 100vh;">
        <router-view/>
      </q-scroll-area>
    </q-page-container>

  </q-layout>
</template>

<style lang="scss" scoped>
.active-item {
  background-color: #DBF0FC; // $grey-4;

  .active-text {
    color: $primary;
  }
}
</style>
