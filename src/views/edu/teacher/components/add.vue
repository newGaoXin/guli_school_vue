<template>
  <el-dialog
    :title="isAdd == 1 ? '新增' : '编辑'"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
  >
    <el-form :model="teacher" ref="form" :rules="rules" label-width="120px">
      <el-form-item label="讲师名称" prop="name">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序" prop="sort">
        <el-input-number
          v-model="teacher.sort"
          controls-position="right"
          :min="0"
        />
      </el-form-item>
      <el-form-item label="讲师头衔" prop="level">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
        数据类型一定要和取出的json中的一致，否则没法回填
        因此，这里value使用动态绑定的值，保证其数据类型是number
        -->
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历" prop="career">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介" prop="intro">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>
      <!-- 讲师头像：TODO -->
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存</el-button
        >
        <el-button type="danger" @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addTeacher, updateTeacher } from "@/api/edu/teacher";
export default {
  name: "edit",
  data() {
    return {
      isAdd: true,
      teacher: {},
      rules: {
        name: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        sort: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        level: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        career: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        intro: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      },
      dialogVisible: false,
      saveBtnDisabled: false
    };
  },
  methods: {
    show(row) {
      if (row) {
        this.isAdd = false;
      } else {
        this.isAdd = true;
      }
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$refs["form"].resetFields();
      this.dialogVisible = false;
    },
    saveOrUpdate() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.saveBtnDisabled = true;
          const req =
            this.isAdd == true
              ? addTeacher(this.teacher)
              : updateTeacher(this.teacher);
          req.then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.handleClose();
            this.$emit("getList");
          });

          this.saveBtnDisabled = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style></style>
