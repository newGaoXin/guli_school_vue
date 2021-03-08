<template>
  <div class="app-container">
    <el-button icon="el-icon-plus" type="primary" @click="handleAdd"
      >添加
    </el-button>
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.name" placeholder="讲师名" />
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="teacherQuery.level"
          clearable
          placeholder="讲师头衔"
        >
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="teacherQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()"
        >查 询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 列表 -->
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="name"> </el-table-column>
      <el-table-column
        label="讲师资历"
        prop="career"
        width="110"
        align="center"
      >
      </el-table-column>
      <el-table-column label="头衔" align="center">
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? "高级讲师" : "首席讲师" }}
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="sort" align="center">
      </el-table-column>
      <el-table-column label="添加时间" prop="gmtCreate" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger" @click="deleteById(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
    <edit ref="edit" @getList="getList"></edit>
  </div>
</template>

<script>
import { teacherList, deleteTeacherById } from "@/api/edu/teacher";
import edit from "./components/add";

export default {
  name: "teacher",
  components: {
    edit
  },
  data() {
    return {
      list: null,
      current: 1,
      limit: 10,
      total: 0,
      teacherQuery: {}
      //   loading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList(current = 1) {
      //   this.loading = false;
      this.current = current;
      teacherList(this.current, this.limit, this.teacherQuery).then(
        response => {
          this.list = response.data.rows;
          this.total = response.data.total;
        }
      );
      //   this.loading = true;
    },
    deleteById(id) {
      this.$confirm("此操作将永久删除讲师, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteTeacherById(id).then(res => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getList();
        });
      });
    },
    handleAdd() {
      this.$refs["edit"].show();
    },
    resetData() {
      this.teacherQuery = {};
      this.getList();
    }
  }
};
</script>

<style></style>
