<template>
  <el-container>
    <el-aside width="150px">
      <el-menu
        :default-active="defaultActive"
        :default-openeds="defaultOpeneds"
        @select="handleSelect"
      >
        <el-submenu
          v-for="(route, index) in routes"
          :index="route.name"
          :key="index"
        >
          <template slot="title" v-if="route.meta">{{ route.meta.title }}</template>
          <template v-for="(croute, cindex) in route.children">
            <el-menu-item
              v-if="!croute.meta.isHidden"
              :index="croute.name"
              :key="cindex"
            >
              {{ croute.meta.title }}
            </el-menu-item>
          </template>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view v-if="!refresh" />
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      refresh: false,
    };
  },
  computed: {
    routes() {
      return this.$router.options.routes
    },
    defaultActive() {
      return this.$route.name;
    },
    defaultOpeneds() {
      return this.routes.map((route) => route.name);
    },
  },
  methods: {
    handleSelect(path) {
      let billType = undefined;
      let tableId = undefined;
      let selectType = path.split("_")[1];

      this.$router.push({
        name: path,
      });
    },
  },
  watch: {
    $route() {
      this.refresh = !this.refresh;
      this.$nextTick(() => {
        this.refresh = !this.refresh;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  .el-aside {
    .el-menu {
      height: 100%;
      .el-submenu {
        .el-menu-item {
          min-width: inherit;
        }
      }
    }
  }
  .el-main {
    padding: 0;
  }
}
</style>
