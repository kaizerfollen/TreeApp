<template>
  <div class="nodes">
    <div class="node">
      <div class="node__left-side">
        <FolderIcon v-if="item.type === 'dir'" class="icon-type" />
        <FileIcon v-else class="icon-type" />
        <span>{{ item.name }}</span>
      </div>
      <div class="node__right-side">
        <EditIcon class="icon" @click="editNode" />
        <TrashIcon class="icon" @click="deleteNode" />
      </div>
    </div>
    <ul class="list">
      <li v-for="(child, index) in item.child" :key="index">
        <TreeNode :item="child" />
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from "vuex";
import TreeNode from "@/components/TreeNode.vue";
import EditIcon from "@/assets/EditIcon";
import TrashIcon from "@/assets/TrashIcon";
import FolderIcon from "@/assets/FolderIcon";
import FileIcon from "@/assets/FileIcon";

export default {
  components: {
    TreeNode,
    EditIcon,
    TrashIcon,
    FolderIcon,
    FileIcon,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const store = useStore();
    const deleteNode = () => {
      store.commit("list/editOrDeleteNode", {
        action: "delete",
        payload: {
          id: props.item.id,
        },
      });
    };
    const editNode = () => {
      const newName = prompt("Введите новое имя:", props.item.name);
      store.commit("list/editOrDeleteNode", {
        action: "edit",
        payload: {
          id: props.item.id,
          newName: newName.trim() || "Dir",
        },
      });
    };
    return {
      deleteNode,
      editNode,
    };
  },
};
</script>

<style scoped lang="scss">
.icon {
  cursor: pointer;
}
.node {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  &__left-side,
  &__right-side {
    display: flex;
    align-items: center;
  }
  &__left-side {
    width: 100px;
    .icon-type {
      margin-right: 5px;
    }
  }
}
</style>
