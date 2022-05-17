<template>
  <div class="col-md-6 d-flex flex-column align-items-center">
    <h2 class="fw-bold mb-3">線上待辦事項服務</h2>
    <form action="" class="fw-bold w-75" @submit.prevent="login">
      <div class="mb-3">
        <label for="loginEmail" class="form-label">
          <span class="text-danger fw-bold me-1">*</span>Email
        </label>
        <input type="email" class="form-control" id="loginEmail" placeholder="請輸入 Email"
          required v-model.trim="user.email" />
      </div>
      <div class="mb-5">
        <label for="password" class="form-label">
          <span class="text-danger fw-bold me-1">*</span>Password
        </label>
        <input type="password" class="form-control" id="password" placeholder="請輸入密碼"
          required v-model.trim="user.password" />
      </div>
      <div class="d-flex justify-content-evenly align-items-center">
        <RouterLink to="/signUp"
          class="btn btn-outline-light w-50 me-2">
          註冊
        </RouterLink>
        <button type="submit" class="btn btn-primary text-white w-50">
          登入
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      const user = {
        email: this.user.email,
        password: this.user.password,
      };
      this.$http
        .post(`${process.env.VUE_APP_URL}/sign_in`, { user })
        .then((res) => {
          const token = res.headers.authorization;
          document.cookie = `gillToken=${token}; expires=${new Date()}; path=/`;

          // 將使用者資料用 localStorage 的方式存取
          localStorage.setItem('userData', JSON.stringify(res.data));

          this.user = {
            email: '',
            password: '',
          };

          this.$router.push('/todo');
        })
        .catch((err) => {
          this.$httpMessage(err.response.data);
        });
    },
  },
  mounted() {},
};
</script>
