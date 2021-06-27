<template>
  <div class="pagination">
      <ul>
          <!-- 总数量 -->
          <li class="total-text"></li>
          <li class="pagination-prev"></li>
          <li class="pagination-item"></li>
          <li class="pagination-next"></li>
          <!-- 页面快速跳转 -->
          <li class="pagination-options-quick-jumper"></li>
      </ul>
  </div>
</template>

<script>
export default {
    props: {
        total: {
            type: Number
        }
    }
}
</script>

<style>

</style>