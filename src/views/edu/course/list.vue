<template>
  <div class="app-container">
    <el-button icon="el-icon-plus" type="primary" @click="handleAdd"
      >添加
    </el-button>
    <edit ref="edit"></edit>
  </div>
</template>

<script>
import edit from "./components/edit";
export default {
  components: {
    edit
  },
  data() {
    return {};
  },
  methods: {
    handleAdd(row) {
      this.$refs["edit"].show(row);
    }
  }
};
</script>

<style></style>
