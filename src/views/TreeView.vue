<template>
  <div class="tree-view">
    <ul class="list">
      <li v-for="(item, index) in treeData" :key="index">
        <TreeNode :item="item" />
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import TreeNode from "@/components/TreeNode.vue";

export default {
  components: {
    TreeNode,
  },
  setup() {
    const store = useStore();
    const treeData = computed(() => store.getters["list/getList"]);
    return {
      treeData,
    };
  },
};
</script>

<style lang="scss">
.tree-view {
  width: 300px;
  margin: 0 auto;

  .list {
    padding-left: 10px;
  }
}
</style>
