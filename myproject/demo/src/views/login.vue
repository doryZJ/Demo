<template>
  <div class="login-view">
    <div class="login-main">
      <div class="main-item">
        <img src="../assets/images/login-bg.png" alt="" class="main-item-bg">
      </div>
      <div class="main-item">
        <img src="../assets/images/logo.png" alt="" class="item-logo">
        <div class="item-inp">
          <label for="">用户名：</label>
          <input type="text" name="username" v-model="user.username">
        </div>
        <div class="item-inp">
          <label for="">密码：</label>
          <input type="password" name="pwd" v-model="user.password">
        </div>
        <div class="item-btn">
          <button @click='handleLogin'>登录</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Login from '../api/login'
  export default {
    name: 'login',
    data() {
      return {
        user: {
          username: '',
          password: ''
        },
      }
    },
    methods: {
      handleLogin() {
        Login.login(this.user)
          .then( res => {
            res = res.data
            const code = res.code
            if ( code === 0) {
              const data = res.data
              const token = data.token
              window.localStorage['token'] = token
              this.$message.success(res.msg)
              const redirect = this.$route.query.redirect
              this.$router.push({
                path: redirect
              })
            } else {
              this.$meassage.error(res.msg)
            }
          })
          .catch( err => {
            console.log(err)
          })
      }
    }
  }
</script>
<style lang="scss">
  .login-view {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #ececec;
  }

  .login-main {
    display: flex;
    min-width: 1120px;
    height: 640px;
    background: #fff;
    border-radius: 6px;
  }

  .main-item {
    flex: 1;
    padding: 40px;
    position: relative;

    .main-item-bg {
      position: absolute;
      top: 0px;
      left: 0px;
    }

    .item-logo {
      text-align: center;
      margin-bottom: 100px;
    }

    .item-inp {
      margin-bottom: 30px;
    }

    .item-btn {
      display: flex;
      justify-content: flex-end;

      button {
        outline: none;
        background-color: #195989;
        margin-top: -10px;
        font-size: 18px;
        color: #fff;
        border: none;
        width: 110px;
        height: 45px;
        border-radius: 6px;
      }
    }

    label {
      display: block;
      color: #969696;
      font-size: 16px;
      margin-bottom: 10px;
    }

    input {
      outline: none;
      border: 1px solid #e3e3e3;
      border-radius: 4px;
      width: 100%;
      box-sizing: border-box;
      padding: 10px 20px;
    }
  }
  .login-foot {
    position: absolute;
    bottom: 15px;
    width: 100%;
    text-align: center;

    span {
      font-size: 14px;
      color: #9c9c9c;
    }
  }
</style>