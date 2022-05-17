<template>
  <div class="col-md-6 d-flex flex-column align-items-center">
    <h2 class="fw-bold mb-3">註冊帳號</h2>
    <form class="fw-bold w-75" @submit.prevent="signUp">
      <div class="mb-3">
        <label for="signUpEmail1" class="form-label">
          <span class="text-danger fw-bold me-1">*</span>帳號
        </label>
        <input type="email" class="form-control" id="signUpEmail1" placeholder="請輸入 Email 格式"
          required v-model.trim="user.email" />
      </div>
      <div class="mb-3">
        <label for="nickname" class="form-label">
          <span class="text-danger fw-bold me-1">*</span>姓名
        </label>
        <input type="text" class="form-control" id="nickname" placeholder="請輸入您的姓名"
          required v-model.trim="user.nickname" />
      </div>
      <div class="mb-3">
        <label for="signUpPassword" class="form-label">
          <span class="text-danger fw-bold me-1">*</span>密碼
        </label>
        <input type="password" class="form-control" id="signUpPassword"
          placeholder="請輸入密碼，至少六位數" required pattern="^.{6,}$"
          v-model.trim="user.password" />
      </div>
      <div class="mb-5">
        <label for="passwordCheck" class="form-label">
          <span class="text-danger fw-bold me-1">*</span>再次輸入密碼
        </label>
        <input type="password" class="form-control" id="passwordCheck"
          placeholder="請再次輸入密碼" required pattern="^.{6,}$"
          v-model.trim="user.passwordCheck" />
      </div>
      <div class="d-flex justify-content-evenly align-items-center">
        <RouterLink to="/"
          class="btn btn-outline-light w-50 me-2">
          登入
        </RouterLink>
        <button type="submit" class="btn btn-primary text-white w-50">
          註冊
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
        nickname: '',
        password: '',
        passwordCheck: '',
      },
    };
  },
  methods: {
    signUp() {
      const { user } = this;
      this.$http
        .post(`${process.env.VUE_APP_URL}`, { user })
        .then(() => {
          this.user = {
            email: '',
            nickname: '',
            password: '',
            passwordCheck: '',
          };

          this.$router.push('/');
        })
        .catch((err) => {
          this.$httpMessage(err.response.data);
        });
    },
  },
};
</script>
