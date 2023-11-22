<template>
  <a-space direction="vertical" :size="20">
    <a-space direction="vertical" :size="0">
      <a-space wrap>
        <a-button type="primary">Primary</a-button>
        <a-button>Default</a-button>
        <a-button type="dashed">Dashed</a-button>
        <a-button type="outline">Outline</a-button>
        <a-button type="text">Text</a-button>
      </a-space>
      <a-space wrap>
        <a-button type="primary" status="success">Primary</a-button>
        <a-button status="success">Default</a-button>
        <a-button type="dashed" status="success">Dashed</a-button>
        <a-button type="outline" status="success">Outline</a-button>
        <a-button type="text" status="success">Text</a-button>
      </a-space>
      <a-space wrap>
        <a-button type="primary" status="warning">Primary</a-button>
        <a-button status="warning">Default</a-button>
        <a-button type="dashed" status="warning">Dashed</a-button>
        <a-button type="outline" status="warning">Outline</a-button>
        <a-button type="text" status="warning">Text</a-button>
      </a-space>
      <a-space wrap>
        <a-button type="primary" status="danger">Primary</a-button>
        <a-button status="danger">Default</a-button>
        <a-button type="dashed" status="danger">Dashed</a-button>
        <a-button type="outline" status="danger">Outline</a-button>
        <a-button type="text" status="danger">Text</a-button>
      </a-space>
    </a-space>

    <a-space direction="vertical" :size="0">
      <a-space wrap>
        <a-button type="primary" disabled>Primary</a-button>
        <a-button disabled>Default</a-button>
        <a-button type="dashed" disabled>Dashed</a-button>
        <a-button type="outline" disabled>Outline</a-button>
        <a-button type="text" disabled>Text</a-button>
      </a-space>
      <a-space wrap>
        <a-button type="primary" status="success" disabled>Primary</a-button>
        <a-button status="success" disabled>Default</a-button>
        <a-button type="dashed" status="success" disabled>Dashed</a-button>
        <a-button type="outline" status="success" disabled>Outline</a-button>
        <a-button type="text" status="success" disabled>Text</a-button>
      </a-space>
      <a-space wrap>
        <a-button type="primary" status="warning" disabled>Primary</a-button>
        <a-button status="warning" disabled>Default</a-button>
        <a-button type="dashed" status="warning" disabled>Dashed</a-button>
        <a-button type="outline" status="warning" disabled>Outline</a-button>
        <a-button type="text" status="warning" disabled>Text</a-button>
      </a-space>
      <a-space wrap>
        <a-button type="primary" status="danger" disabled>Primary</a-button>
        <a-button status="danger" disabled>Default</a-button>
        <a-button type="dashed" status="danger" disabled>Dashed</a-button>
        <a-button type="outline" status="danger" disabled>Outline</a-button>
        <a-button type="text" status="danger" disabled>Text</a-button>
      </a-space>
    </a-space>

    <a-space direction="vertical" :size="0">
      <a-space wrap>
        <a-button type="primary">Square</a-button>
        <a-button type="primary" shape="round">Round</a-button>
        <a-button type="primary"><icon-plus /></a-button>
        <a-button type="primary">
          <template #icon><icon-plus /></template>
        </a-button>
        <a-button type="primary" shape="circle"><icon-plus /></a-button>
        <a-button type="outline">Square</a-button>
        <a-button type="outline" shape="round">Round</a-button>
        <a-button type="outline">
          <template #icon><icon-plus /></template>
        </a-button>
        <a-button type="outline" shape="circle"><icon-plus /></a-button>
        <a-button type="dashed">Square</a-button>
        <a-button type="dashed" shape="round">Round</a-button>
        <a-button type="dashed">
          <template #icon><icon-plus /></template>
        </a-button>
        <a-button type="dashed" shape="circle"><icon-plus /></a-button>
        <a-button>Square</a-button>
        <a-button shape="round">Round</a-button>
        <a-button>
          <template #icon><icon-plus /></template>
        </a-button>
        <a-button shape="circle"><icon-plus /></a-button>
      </a-space>

      <a-space wrap>
        <a-button type="primary" status="success">Square</a-button>
        <a-button type="primary" shape="round" status="success">Round</a-button>
        <a-button type="primary" status="success"><icon-plus /></a-button>
        <a-button type="primary" status="success">
          <template #icon><icon-plus /></template>
        </a-button>
        <a-button type="primary" shape="circle" status="success"><icon-plus /></a-button>
        <a-button type="outline" status="success">Square</a-button>
        <a-button type="outline" shape="round" status="success">Round</a-button>
        <a-button type="outline" status="success">
          <template #icon><icon-plus /></template>
        </a-button>
        <a-button type="outline" shape="circle" status="success"><icon-plus /></a-button>
        <a-button type="dashed" status="success">Square</a-button>
        <a-button type="dashed" shape="round" status="success">Round</a-button>
        <a-button type="dashed" status="success">
          <template #icon><icon-plus /></template>
        </a-button>
        <a-button type="dashed" shape="circle" status="success"><icon-plus /></a-button>
        <a-button status="success">Square</a-button>
        <a-button shape="round" status="success">Round</a-button>
        <a-button status="success">
          <template #icon><icon-plus /></template>
        </a-button>
        <a-button shape="circle" status="success"><icon-plus /></a-button>
      </a-space>

      <a-space wrap>
        <a-button type="primary" status="warning">Square</a-button>
        <a-button type="primary" shape="round" status="warning">Round</a-button>
        <a-button type="primary" status="warning"><icon-plus /></a-button>
        <a-button type="primary" status="warning">
          <template #icon><icon-plus /></template>
        </a-button>
        <a-button type="primary" shape="circle" status="warning"><icon-plus /></a-button>
        <a-button type="outline" status="warning">Square</a-button>
        <a-button type="outline" shape="round" status="warning">Round</a-button>
        <a-button type="outline" status="warning">
          <template #icon><icon-plus /></template>
        </a-button>
        <a-button type="outline" shape="circle" status="warning"><icon-plus /></a-button>
        <a-button type="dashed" status="warning">Square</a-button>
        <a-button type="dashed" shape="round" status="warning">Round</a-button>
        <a-button type="dashed" status="warning">
          <template #icon><icon-plus /></template>
        </a-button>
        <a-button type="dashed" shape="circle" status="warning"><icon-plus /></a-button>
        <a-button status="warning">Square</a-button>
        <a-button shape="round" status="warning">Round</a-button>
        <a-button status="warning">
          <template #icon><icon-plus /></template>
        </a-button>
        <a-button shape="circle" status="warning"><icon-plus /></a-button>
      </a-space>

      <a-space wrap>
        <a-button type="primary" status="danger">Square</a-button>
        <a-button type="primary" shape="round" status="danger">Round</a-button>
        <a-button type="primary" status="danger"><icon-plus /></a-button>
        <a-button type="primary" status="danger">
          <template #icon><icon-plus /></template>
        </a-button>
        <a-button type="primary" shape="circle" status="danger"><icon-plus /></a-button>
        <a-button type="outline" status="danger">Square</a-button>
        <a-button type="outline" shape="round" status="danger">Round</a-button>
        <a-button type="outline" status="danger">
          <template #icon><icon-plus /></template>
        </a-button>
        <a-button type="outline" shape="circle" status="danger"><icon-plus /></a-button>
        <a-button type="dashed" status="danger">Square</a-button>
        <a-button type="dashed" shape="round" status="danger">Round</a-button>
        <a-button type="dashed" status="danger">
          <template #icon><icon-plus /></template>
        </a-button>
        <a-button type="dashed" shape="circle" status="danger"><icon-plus /></a-button>
        <a-button status="danger">Square</a-button>
        <a-button shape="round" status="danger">Round</a-button>
        <a-button status="danger">
          <template #icon><icon-plus /></template>
        </a-button>
        <a-button shape="circle" status="danger"><icon-plus /></a-button>
      </a-space>
    </a-space>

    <a-space direction="vertical">
      <a-button-group>
        <a-button>Publish</a-button>
        <a-button>
          <template #icon>
            <icon-down />
          </template>
        </a-button>
      </a-button-group>
      <a-button-group>
        <a-button>Publish</a-button>
        <a-button>
          <template #icon>
            <icon-more />
          </template>
        </a-button>
      </a-button-group>
      <a-button-group>
        <a-button type="primary">
          <icon-left />
          Prev
        </a-button>
        <a-button type="primary">
          Next
          <icon-right />
        </a-button>
      </a-button-group>
    </a-space>
  </a-space>
</template>

<script setup lang="ts"></script>
