export default function (response) {
  this.$emitter.emit('push-message', {
    state: 'danger',
    content: response.message,
  });
}
