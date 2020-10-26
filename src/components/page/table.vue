<template>
  <div class="page-wrap">
    <div ref="table-box" class="table-box">
      <tree-table :treeData="result" :wrapWidth="tableBoxWidthComputed" />
    </div>
  </div>
</template>

<script>
  import treeTable from '../common/treeTable.vue';
  export default {
    name: 'table-box',
    data() {
      return {
        result: [],
        data: [
          ['JOBS0', '2018', '2018-01', '2018-01-01', 12, 16],
          ['JOBS0', '2018', '2018-01', '2018-01-07', 13, 17],
          ['JOBS0', '2018', '2018-02', '2018-01-08', 14, 18],
          ['JOBS0', '2018', '2018-02', '2018-01-09', 15, 19],
          ['JOBS0', '2018', '2018-02', '2018-01-12', 16, 10],
          ['JOBS0', '2018', '2018-03', '2018-01-15', 8, 11],
          ['JOBS0', '2018', '2018-03', '2018-01-16', 6, 12],
          ['JOBS0', '2018', '2018-03', '2018-01-18', 8, 13],
          ['JOBS0', '2018', '2018-03', '2018-01-21', 9, 14],
          ['JOBS0', '2018', '2018-04', '2018-01-23', 12, 15],
          ['JOBS0', '2019', '2018-04', '2018-01-26', 9, 16],
          ['JOBS0', '2019', '2019-05', '2018-01-30', 12, 17],
          ['JOBS1', '2018', '2018-01', '2018-01-01', 12, 18],
          ['JOBS1', '2018', '2018-01', '2018-01-07', 12, 19],
          ['JOBS1', '2018', '2018-02', '2018-01-08', 12, 20],
          ['JOBS1', '2018', '2018-02', '2018-01-09', 12, 21],
          ['JOBS1', '2018', '2018-02', '2018-01-12', 12, 22],
          ['JOBS1', '2019', '2018-03', '2018-01-15', 12, 23],
          ['JOBS1', '2019', '2018-03', '2018-01-16', 12, 24],
        ],
        typeList: ['服务', '年', '周', '日'],
        valueType: ['平均值', '最大值'],
        tableBoxWidth: 0,
      };
    },
    components: {
      treeTable
    },
    computed: {
      headerList(){
        return [...this.typeList, ...this.valueType];
      },
      tableBoxWidthComputed() {
        return this.tableBoxWidth / this.headerList.length;
      },
    },
    created() {
      // 合并表头数据
      this.data.unshift(this.headerList);
      // 遍历数据
      this.data.forEach(v => {
        // 递归转化数据
        this.recursionFn(v, this.result);
      });
    },
    mounted() {
      this.tableBoxWidth = this.$refs['table-box'].clientWidth;
      window.addEventListener('resize', () => {
        this.tableBoxWidth = this.$refs['table-box'].clientWidth;
      });
    },
    methods: {
      recursionFn(data, arr) {
        // 如果不存在
        if (!arr.find((w, j) => {
            return w.name && w.name === data[0];
          })) {
          const obj = {
            name: data[0],
            children: [],
          };
          // 如果data.slice(1)中还有元素则一直递归下去
          if (data.slice(1).length) {
            this.recursionFn(data.slice(1), obj.children);
          }
          // 遍历完毕整体填充至arr中
          arr.push(obj);
        } else { // 数据中已存在
          const index = arr.findIndex((w, j) => {
            return w.name === data[0];
          });
          if (data.slice(1).length) {
            this.recursionFn(data.slice(1), arr[index].children);
          }
        }
      }
    }
  };
</script>

<style scoped>
.page-wrap {
  padding: 10px;
}

.table-box {
  background: rgba(0,0,0,.2);
}
</style>
