<template>
  <el-dialog
    :title="isAdd == true ? '添加课程' : '编辑课程'"
    :visible.sync="dialogVisible"
    width="90%"
    :before-close="handleClose"
  >
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps
      :active="active"
      process-status="wait"
      align-center
      style="margin-bottom: 40px;"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="提交审核" />
    </el-steps>
    <template v-if="active == 1">
      <el-form label-width="120px">
        <el-form-item label="课程标题">
          <el-input
            v-model="courseBase.title"
            placeholder=" 示例：机器学习项目课：从基础到搭建项目视"
          />
        </el-form-item>
        <!-- 所属分类 TODO -->
        <!-- 所属分类：级联下拉列表 -->
        <!-- 一级分类 -->

        <el-form-item label="课程类别">
          <el-select
            v-model="courseBase.subjectParentId"
            @change="subjectChange"
            placeholder="请选择"
          >
            <el-option
              v-for="(subject, index) in subjectNestedList"
              :key="index"
              :label="subject.title"
              :value="subject.id"
            />
          </el-select>

          <!-- 二级分类 -->
          <el-select v-model="courseBase.subjectId" placeholder="请选择">
            <el-option
              v-for="subject in subSubjectList"
              :key="subject.value"
              :label="subject.title"
              :value="subject.id"
            />
          </el-select>
        </el-form-item>

        <!-- 课程讲师 TODO -->
        <!-- 课程讲师 -->
        <el-form-item label="课程讲师">
          <el-select v-model="courseBase.teacherId" placeholder="请选择">
            <el-option
              v-for="teacher in teacherList"
              :key="teacher.id"
              :label="teacher.name"
              :value="teacher.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="总课时">
          <el-input-number
            :min="0"
            v-model="courseBase.lessonNum"
            controls-position="right"
            placeholder="数"
          />
        </el-form-item>
        <!-- 课程简介 TODO -->
        <!-- 课程封面 TODO -->
        <el-form-item label="课程封面">
          <el-upload
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :action="BASE_API + '/admin/oss/file/upload?host=cover'"
            class="avatar-uploader"
          >
            <img v-if="courseBase.cover" :src="courseBase.cover" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="课程价格">
          <el-input-number
            :min="0"
            v-model="courseBase.price"
            controls-position="right"
            placeholder=""
          />
        </el-form-item>
      </el-form>
    </template>

    <template v-if="active == 2">
      <el-form label-width="120px">
        <el-form-item> </el-form-item>
      </el-form>
    </template>

    <template v-else>
      <el-form label-width="120px">
        <el-form-item> </el-form-item>
      </el-form>
    </template>

    <span slot="footer" class="dialog-footer">
      <el-button v-if="active > 1" @click="previous">返回修改</el-button>
      <el-button v-else @click="dialogVisible == false"></el-button>
      <el-button
        :disabled="saveBtnDisabled"
        type="primary"
        @click="save(active)"
        v-text="active != 3 ? '下一步' : '发布'"
        >下一步</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { addCourse } from "@/api/edu/course";
import { teacherAll } from "@/api/edu/teacher";
import { getList } from "@/api/edu/subject";

export default {
  data() {
    return {
      courseBase: {
        title: "",
        subjectId: "",
        teacherId: "",
        lessonNum: 0,
        description: "",
        cover: "",
        price: 0
      },
      teacherList: [],
      subjectNestedList: [],
      subSubjectList: [],
      active: 1,
      BASE_API: process.env.BASE_API,
      saveBtnDisabled: false, // 保存按钮是否禁用
      isAdd: true,
      dialogVisible: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    show(row) {
      if (!row) {
        this.isAdd = false;
      }
      this.dialogVisible = true;
    },
    init() {
      teacherAll().then(res => {
        this.teacherList = res.data.items;
      });
      getList().then(res => {
        this.subjectNestedList = res.data.items;
      });
    },
    subjectChange(value) {
      this.courseBase.subjectId = "";
      for (let index = 0; index < this.subjectNestedList.length; index++) {
        if (this.subjectNestedList[index].id == value) {
          this.subSubjectList = this.subjectNestedList[index].children;
        }
      }
    },
    handleAvatarSuccess(res) {
      this.courseBase.cover = res.data.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    save(active) {
      switch (active) {
        case 1: {
          this.active++;
          saveBaseMag();
          break;
        }
        case 2: {
          this.active++;
          break;
        }
        case 3: {
          break;
        }
      }
    },
    previous() {
      this.active--;
    },
    saveBaseMag(active) {},
    handleClose() {
      //   this.$set(this.dialogVisible, false);
      this.dialogVisible == false;
      console.log(this.dialogVisible);
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
