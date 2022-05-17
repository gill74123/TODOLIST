<template>
  <div class="toast-container position-fixed end-0 p-2">
    <div v-for="(msg, index) in messages" :key="msg"
      class="toast d-flex justify-content-between align-items-center
      border-0 border-start border-5 p-3 show" :class="`border-${msg.state}`" role="alert">
      <div class="toast-body p-0">{{ msg.content }}</div>
      <button type="button" class="btn-close" @click="removeToast(index)"></button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    showToast() {
      setTimeout(() => {
        this.messages.shift();
      }, 3000);
    },
    removeToast(index) {
      this.messages.splice(index, 1);
    },
  },
  mounted() {
    // 跨元件監聽 push-message 事件
    this.$emitter.on('push-message', (message) => {
      const { state, content } = message;
      this.messages.push({ state, content });
      this.showToast();
    });
  },
};
</script>

<style lang="scss">
.toast-container{
  z-index: 10000;
}
</style>
