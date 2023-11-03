const treeData = [
  {
    name: "Dir 1",
    id: 1,
    type: "dir",
    child: [
      {
        name: "Dir 1-1",
        id: 2,
        type: "dir",
        child: [
          {
            name: "File 1-1-1",
            id: 3,
            type: "file",
          },
        ],
      },
      {
        name: "File 1-2",
        type: "file",
        id: 4,
      },
    ],
  },
  {
    name: "Dir 2",
    type: "dir",
    id: 5,
    child: [
      {
        name: "Dir 2-1",
        type: "dir",
        id: 6,
      },
      {
        name: "Dir 2-2",
        type: "dir",
        id: 7,
      },
    ],
  },
  {
    name: "File 2",
    type: "file",
    id: 8,
  },
];

const state = {
  list: treeData,
};
const getters = {
  getList: (state) => state.list,
};

const actions = {};

const mutations = {
  editOrDeleteNode(state, { action, payload }) {
    const editOrDeleteRecursive = (tree) => {
      const index = tree.findIndex((item) => item.id === payload.id);
      if (index !== -1) {
        if (action === "edit") {
          tree[index].name = payload.newName;
        } else if (action === "delete") {
          tree.splice(index, 1);
        }
      } else {
        for (const item of tree) {
          if (item.type === "dir" && item.child) {
            editOrDeleteRecursive(item.child);
          }
        }
      }
    };
    editOrDeleteRecursive(state.list);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
