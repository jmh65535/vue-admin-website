<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span><i class="el-icon-user-solid" /> 个人信息</span>
    </div>

    <div class="user-profile">
      <div class="box-center user-img-container">
        <img :src="user.avatar" class="user-img">
        <div class="user-img-edit" @click="imagecropperShow = true">更换头像</div>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.username }}</div>
        <div class="user-role text-center text-muted">{{ user.roles | uppercaseFirst }}</div>
      </div>

      <div class="user-intro bottom10">
        <div class="user-title"><i class="el-icon-info" /> 简介</div>
        <div class="user-intro-text text-muted">{{ user.introduction }}</div>
      </div>

      <div class="user-mobile bottom10">
        <div class="user-title"><i class="el-icon-mobile-phone" /> 手机</div>
        <div class="user-mobile-text text-muted">{{ user.mobile }}</div>
      </div>

      <div class="user-email bottom10">
        <div class="user-title"><svg-icon icon-class="email" /> 邮箱</div>
        <div class="user-email-text text-muted">{{ user.email }}</div>
      </div>
    </div>

    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      url="/admin/uploadAvatar"
      lang-type="en"
      :params="params"
      @close="close"
      @crop-upload-success="cropSuccess"
    />

  </el-card>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import { updateUser } from '@/api/user'
import actionLogConfig from '@/utils/actionLogConfig'

export default {
  components: { ImageCropper },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          username: '',
          email: '',
          avatar: '',
          roles: '',
          introduction: '',
          mobile: ''
        }
      }
    }
  },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      // avatarName: 'avatar_' + this.user.username,
      image: '',
      params: {
        filename: this.user.username + '_' + this.user.id
      }
    }
  },
  methods: {
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.filepath
      this.user.avatar = this.image
      updateUser({ id: this.user.id, avatar: this.user.avatar }).then(res => {
        this.$store.commit('user/SET_AVATAR', this.user.avatar)
        this.$store.dispatch('actionLog/createLog', {
          adminId: this.$store.getters.id,
          module: actionLogConfig['account'][1].module,
          action: actionLogConfig['account'][1].action,
          content: actionLogConfig['account'][1].content
        })
      })
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .user-img-container {
    position: relative;
    &:hover .user-img-edit{
      display: block;
      cursor: pointer;
    }
  }
  .user-img {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    // &:hover {
    //   cursor: pointer;
    // }
  }
  .user-img-edit {
    display: none;
    position: absolute;
    top: 10px;
    left: 0;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    line-height: 100px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    background: rgba(0,0,0,.5);
  }

  .user-intro{
    padding-top: 40px;
  }
  .user-title {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: 600;
      font-size: 15px;
  }
  .bottom10{
    padding-bottom: 10px;
  }
}
</style>
