<template>
  <footer class="basic-footer">
    <!-- <p>&copy; {{ currentYear }} PlantQuest. All rights reserved.</p> -->
  </footer>
</template>

<script>
const currentYear = new Date().getFullYear();

export default {
  name: 'BasicFoot',
  data() {
    return {
      currentYear
    }
  }
}
</script>

<style lang="scss" scoped>
.basic-footer {
  text-align: center;
  color: #333;
  position: absolute;
  bottom: 0;
  z-index: 9999;
  width: max-content;
  height: 23px;
  right: 0;
  background: transparent;
}
</style>
