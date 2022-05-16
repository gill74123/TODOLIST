<template>
  <div class="container vh-100">
    <div class="row align-items-center h-50 h-md-100 py-5">
      <div class="col-md-6 d-flex flex-column align-items-center">
        <h1 class="fs-6 fw-bold mb-5">
          <span
            class="material-icons-outlined logo-icon fs-7 fw-bold align-middle text-primary me-2">
            check_box
          </span>
          <span>ONLINE TODO LIST</span>
        </h1>
        <div class="d-none d-md-block main-icon"></div>
      </div>
      <RouterView />
    </div>
  </div>
</template>
