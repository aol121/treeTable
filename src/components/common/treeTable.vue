<template>
  <div class="tree-table">
    <div v-for="item in treeData" :key="item.name">
      <div :style="{ width:wrapWidth + 'px' }">{{item.name}}</div>
      <template v-if="item.children && item.children.length">
        <tree-table :tree-data="item.children" :wrapWidth="wrapWidth" />
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tree-table',
    data() {
      return {};
    },
    props: {
      //其容器元素的尺寸/列数=每列宽度
      wrapWidth: {
        default: 0,
      },
      treeData: {
        default: () => [],
      }
    },
  }
</script>

<style>
  .tree-table > div {
    width: 100%;
    display: flex;
    align-items: center;
    box-shadow: inset 0 0 0 1px #000;
  }

  .tree-table > div + div {
    margin-top: -1px;
  }

  .tree-table > div > div:first-child {
    /* 显示文字的dom元素 */
    padding:5px 8px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .tree-table div:nth-child(n+1) {
    /* 剩余项填充满除第一项宽度的剩余宽度 */
    flex: 1;
  }
</style>
