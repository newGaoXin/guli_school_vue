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
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar" />
        <!-- 文件上传按钮 -->
        <el-button
          type="primary"
          icon="el-icon-upload"
          @click="imagecropperShow = true"
          >上传头像
        </el-button>
        <!--
        v-show：是否显示上传组件
        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
        :url：后台上传的url地址
        @close：关闭上传组件
        @crop-upload-success：上传成功后的回调 -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API + '/oss/file/uploadFile'"
          field="file"
          @close="imageClose"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>
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
import { uploadFile } from "@/api/oss/file";
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";

export default {
  name: "edit",
  components: {
    ImageCropper,
    PanThumb
  },
  data() {
    return {
      isAdd: true,
      teacher: {
        name: "",
        sortL: "",
        level: "",
        career: "",
        intro: "",
        avatar: ""
      },
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
      BASE_API: process.env.BASE_API,
      imagecropperShow: false,
      imagecropperKey: 0,
      dialogVisible: false,
      saveBtnDisabled: false
    };
  },
  methods: {
    show(row) {
      if (row) {
        this.isAdd = false;
        this.teacher = row;
      } else {
        this.isAdd = true;
      }
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$refs["form"].resetFields();
      this.dialogVisible = false;
    },
    imageClose() {
      this.imagecropperShow = false;
      // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1;
    },
    cropSuccess(data) {
      this.teacher.avatar = data.url;
      // 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1;
      this.imagecropperShow = false;
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
            let text;
            this.isAdd == true ? (text = "添加") : (text = "修改");
            this.$message({
              type: "success",
              message: text + "成功!"
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
