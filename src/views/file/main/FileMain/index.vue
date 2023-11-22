<template>
  <div class="file-main">
    <!-- 面包屑导航 -->
    <FileNavPath></FileNavPath>

    <a-row justify="space-between" class="row-operate">
      <!-- 左侧区域 -->
      <a-space wrap>
        <a-dropdown>
          <a-button type="primary" shape="round">
            <template #icon><icon-upload /></template>
            <template #default>上传</template>
          </a-button>
          <template #content>
            <a-doption>
              <template #icon><GiSvgIcon name="upload-file" /></template>
              <span>上传文件</span>
            </a-doption>
            <a-doption>
              <template #icon><GiSvgIcon name="upload-folder" /></template>
              <span>上传文件夹</span>
            </a-doption>
          </template>
        </a-dropdown>

        <a-input-group>
          <a-select style="width: 150px" placeholder="请选择">
            <a-option v-for="item in fileTypeList" :key="item.value">
              <template #icon>
                <component :is="item.icon" size="18" color="#999"></component>
              </template>
              <template #default>{{ item.name }}</template>
            </a-option>
          </a-select>
          <a-input placeholder="请输入关键词..." allow-clear> </a-input>
          <a-button type="primary">
            <template #icon><icon-search /></template>
            <template #default>搜索</template>
          </a-button>
        </a-input-group>
      </a-space>

      <!-- 右侧区域 -->
      <a-space wrap>
        <a-button
          v-if="isBatchMode"
          :disabled="!fileStore.selectedFileIds.length"
          type="primary"
          status="danger"
          @click="handleMulDelete"
          ><template #icon><icon-delete /></template
        ></a-button>
        <a-button type="primary" @click="isBatchMode = !isBatchMode">
          <template #icon><icon-select-all /></template>
          <template #default>{{ isBatchMode ? '取消批量' : '批量操作' }}</template>
        </a-button>
        <a-button-group>
          <a-tooltip content="传输列表" position="bottom">
            <a-button @click="loading = !loading">
              <template #icon>
                <icon-swap />
              </template>
            </a-button>
          </a-tooltip>
          <a-tooltip content="排序" position="bottom">
            <a-button>
              <template #icon>
                <icon-filter />
              </template>
            </a-button>
          </a-tooltip>
          <a-tooltip content="视图" position="bottom">
            <a-button @click="fileStore.changeViewMode">
              <template #icon>
                <icon-apps v-if="fileStore.viewMode === 'grid'" />
                <icon-list v-else />
              </template>
            </a-button>
          </a-tooltip>
        </a-button-group>
      </a-space>
    </a-row>

    <!-- 文件列表-宫格模式 -->
    <a-spin class="file-wrap" :loading="loading">
      <FileGrid
        v-show="fileList.length && fileStore.viewMode == 'grid'"
        :data="fileList"
        :isBatchMode="isBatchMode"
        :selectedFileIds="fileStore.selectedFileIds"
        @click="handleClickFile"
        @check="handleCheckFile"
        @right-menu-click="handleRightMenuClick"
      ></FileGrid>

      <!-- 文件列表-列表模式 -->
      <FileList
        v-show="fileList.length && fileStore.viewMode == 'list'"
        :data="fileList"
        :isBatchMode="isBatchMode"
        @click="handleClickFile"
        @right-menu-click="handleRightMenuClick"
      ></FileList>

      <a-empty v-show="!fileList.length"></a-empty>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { Message, Modal } from '@arco-design/web-vue'
import { fileTypeList, imageTypeList } from '@/constant/file'
import { useFileStore } from '@/stores'
import { api as viewerApi } from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import FileNavPath from './FileNavPath.vue'
import FileGrid from './FileGrid.vue'
import FileList from './FileList.vue'
import { getFileList } from '@/apis'
import type { FileItem } from '@/apis'
import {
  openFileMoveModal,
  openFileRenameModal,
  previewFileVideoModal,
  previewFileAudioModal
} from '../../components/index'
const route = useRoute()
const router = useRouter()

const fileStore = useFileStore()

const loading = ref(false)
// 文件列表数据
const fileList = ref<FileItem[]>([])
const fileType = ref('0')
fileType.value = route.query.fileType?.toString() || '0'

const getListData = async () => {
  try {
    loading.value = true
    isBatchMode.value = false
    const res = await getFileList({ fileType: fileType.value })
    fileList.value = res.data.records
  } catch (error) {
    return error
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getListData()
})

onBeforeRouteUpdate((to) => {
  if (!to.query.fileType) return
  fileType.value = to.query.fileType?.toString()
  getListData()
})

// 批量操作
const isBatchMode = ref(false)

// 点击文件
const handleClickFile = (item: FileItem) => {
  Message.success(`点击了文件-${item.name}`)
  if (imageTypeList.includes(item.extendName)) {
    if (item.src) {
      const imgList: string[] = fileList.value
        .filter((i) => imageTypeList.includes(i.extendName))
        .map((a) => a.src || '')
      const index = imgList.findIndex((i) => i === item.src)
      if (imgList.length) {
        viewerApi({
          options: {
            initialViewIndex: index
          },
          images: imgList
        })
      }
    }
  }
  if (item.extendName === 'mp4') {
    previewFileVideoModal(item)
  }
  if (item.extendName === 'mp3') {
    previewFileAudioModal(item)
  }
}

// 勾选文件
const handleCheckFile = (item: FileItem) => {
  fileStore.addSelectedFileItem(item)
}
// 鼠标右键
const handleRightMenuClick = (mode: string, fileInfo: FileItem) => {
  Message.success('点击了' + mode)
  if (mode === 'delete') {
    Modal.warning({
      title: '提示',
      content: '是否删除该文件？',
      hideCancel: false
    })
  }
  if (mode === 'rename') {
    openFileRenameModal(fileInfo)
  }
  if (mode === 'move') {
    openFileMoveModal(fileInfo)
  }
  if (mode === 'detail') {
    router.push({ path: '/file/detail' })
  }
}

// 批量删除
const handleMulDelete = () => {
  Modal.warning({
    title: '提示',
    content: '是否确认删除？',
    hideCancel: false
  })
}
</script>

<style lang="scss" scoped>
.file-main {
  height: 100%;
  background: var(--color-bg-1);
  border-radius: $radius-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .row-operate {
    border-bottom: 1px dashed var(--color-border-3);
    margin: 0 $padding;
  }
  .file-wrap {
    flex: 1;
    padding: 0 $padding $padding;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
}
</style>
