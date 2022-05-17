<template>
  <div class="container">
    <header
      class="sticky-top d-flex justify-content-between align-items-center bg-secondary py-3">
      <h1 class="fs-4 fw-bold">
        <span
          class="material-icons-outlined logo-icon fs-7 fw-bold align-middle text-primary me-2">
          check_box
        </span>
        <span>ONLINE TODO LIST</span>
      </h1>
      <p class="d-none d-md-block fw-bold ms-auto">
        {{ userData.nickname }} 的待辦清單
      </p>
      <button type="button" class="btn ms-3" @click="logout">登出</button>
    </header>

    <section class="d-flex flex-column align-items-center py-3 py-md-5">
      <div class="input-group w-100 w-lg-50 mb-3">
        <input type="text" class="form-control" placeholder="新增待辦事項"
          v-model="todo" />
        <button class="btn btn-primary text-white fs-4 fw-bold px-4 px-lg-3" type="button"
          @click="addTodo">
          +
        </button>
      </div>
      <div v-if="todoList.length !== 0" class="card w-100 w-lg-50">
        <ul class="d-flex justify-content-evenly">
          <li class="w-100">
            <button type="button" class="btn btn-tab w-100 py-3"
              :class="{ active: pageStatus === 'all' }" @click="changeTab('all')">
              全部
              <span class="badge rounded-pill bg-light ms-1">{{ todoList.length }}</span>
            </button>
          </li>
          <li class="w-100">
            <button type="button" class="btn btn-tab w-100 py-3"
              :class="{ active: pageStatus === 'work' }" @click="changeTab('work')">
              待完成
              <span class="badge rounded-pill bg-light ms-1">{{ unfinishedNum }}</span>
            </button>
          </li>
          <li class="w-100">
            <button type="button" class="btn btn-tab w-100 py-3"
              :class="{ active: pageStatus === 'done' }" @click="changeTab('done')">
              已完成
              <span class="badge rounded-pill bg-light ms-1">
                {{ todoList.length - unfinishedNum }}
              </span>
            </button>
          </li>
        </ul>
        <ul class="p-4 pb-0">
          <li v-for="todo in filterTodos" :key="todo" class="d-flex border-bottom py-3 mb-2">
            <div class="form-check d-flex align-items-center m-0 px-0">
              <input class="form-check-input fs-5 m-0" type="checkbox" :id="todo.id"
                :checked="todo.completed_at" @change="toggleTodo(todo.id)" />
              <label v-if="todo.completed_at" class="form-check-label px-3"
                :for="todo.id" :class="{ 'text-light': todo.completed_at }">
                <del class="fw-medium">{{ todo.content }}</del>
              </label>
              <div v-else-if="isEdit === todo.id" class="input-group">
                <input type="text" class="form-control border-end-0 ms-2"
                  v-model="todo.content" />
                <button type="button" class="btn border border-start-0"
                  @click="editTodo(todo)">
                  <span class="material-icons-outlined text-light align-middle">save</span>
                </button>
              </div>
              <label v-else class="form-check-label fw-medium px-3"
                :for="todo.id" :class="{ 'text-light': todo.completed_at }">
                {{ todo.content }}
              </label>
            </div>
            <div class="d-flex justify-content-end align-items-center w-25 ms-auto">
              <a href="#" v-if="!todo.completed_at"
                class="btn border-0 fw-medium text-light p-0 me-3"
                @click.prevent="openEdit(todo.id)">
                <span class="material-icons-outlined align-middle">edit</span>
              </a>
              <a href="#" class="btn border-0 fw-medium fs-4 text-light p-0"
                @click.prevent="deleteTodo(todo.id)">X</a>
            </div>
          </li>
        </ul>
        <div class="text-end p-4">
          <button type="button" class="btn text-light p-0"
            @click="deleteAllFinishedTodo">
            清除已完成項目
          </button>
        </div>
      </div>

      <div v-else class="p-3">
        <p class="fs-4 fw-bold text-center mb-4">目前無待辦事項</p>
        <div class="d-none d-md-block sec-icon"></div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myToken: '',
      userData: JSON.parse(localStorage.getItem('userData')) || [],
      todoList: [],
      unfinishedNum: [],
      filterTodos: [],
      todo: '',
      pageStatus: 'all',
      isEdit: false,
    };
  },
  methods: {
    checkUser() {
      if (this.myToken) {
        this.$http.defaults.headers.common.Authorization = this.myToken;
        this.$http
          .get(`${process.env.VUE_APP_TODOURL}/check`)
          .then(() => {
            this.getTodos();
          })
          .catch(() => {
            this.$httpMessage({ message: '使用者錯誤' });
            this.$router.push('/');
          });
      } else {
        this.$httpMessage({ message: '使用者錯誤' });
        this.$router.push('/');
      }
    },
    logout() {
      this.$http
        .delete(`${process.env.VUE_APP_TODOURL}/users/sign_out`)
        .then(() => {
          this.$router.push('/');
        })
        .catch((err) => {
          this.$httpMessage(err.response.data);
        });
    },
    getTodos() {
      this.$http
        .get(`${process.env.VUE_APP_TODOURL}/todos`)
        .then((res) => {
          this.todoList = res.data.todos;
          this.unfinishedNum = this.todoList.filter((item) => item.completed_at === null).length;
          this.changeTab();
        })
        .catch((err) => {
          this.$httpMessage(err.response.data);
        });
    },
    addTodo() {
      const todo = { content: this.todo };
      this.$http
        .post(`${process.env.VUE_APP_TODOURL}/todos`, { todo })
        .then(() => {
          this.todo = '';
          this.getTodos();
        })
        .catch(() => {
          this.$httpMessage({ message: '新增失敗' });
        });
    },
    deleteTodo(todoId) {
      this.$http
        .delete(`${process.env.VUE_APP_TODOURL}/todos/${todoId}`)
        .then(() => {
          this.getTodos();
        })
        .catch(() => {
          this.$httpMessage({ message: '刪除失敗' });
        });
    },
    toggleTodo(todoId) {
      this.$http
        .patch(`${process.env.VUE_APP_TODOURL}/todos/${todoId}/toggle`, {})
        .then(() => {
          this.getTodos();
        })
        .catch(() => {
          this.$httpMessage({ message: '操作失敗' });
        });
    },
    changeTab(pageStatus = 'all') {
      this.pageStatus = pageStatus;
      if (pageStatus === 'all') {
        this.filterTodos = this.todoList;
      } else if (pageStatus === 'work') {
        this.filterTodos = this.todoList.filter((item) => item.completed_at === null);
      } else if (pageStatus === 'done') {
        this.filterTodos = this.todoList.filter((item) => Boolean(item.completed_at) === true);
      }
    },
    deleteAllFinishedTodo() {
      this.todoList.forEach((item) => {
        if (item.completed_at) {
          this.$http
            .delete(`${process.env.VUE_APP_TODOURL}/todos/${item.id}`)
            .then(() => {
              this.getTodos();
            })
            .catch(() => {
              this.$httpMessage({ message: '刪除失敗' });
            });
        } else {
          this.$httpMessage({ message: '無已完成項目' });
        }
      });
    },
    openEdit(todoId) {
      if (!this.isEdit) {
        this.isEdit = todoId;
      } else {
        this.isEdit = false;
      }
    },
    editTodo(todo) {
      const todoContent = { todo: { content: todo.content } };
      this.$http
        .put(`${process.env.VUE_APP_TODOURL}/todos/${todo.id}`, todoContent)
        .then(() => {
          this.isEdit = false;
          this.getTodos();
        })
        .catch(() => {
          this.$httpMessage({ message: '修改失敗' });
        });
    },
  },
  mounted() {
    this.myToken = document.cookie.replace(/(?:(?:^|.*;\s*)gillToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1');
    this.checkUser();
  },
};
</script>
