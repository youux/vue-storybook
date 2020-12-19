<template>
  <el-container class="view">
    <!-- left -->
    <el-aside :width="isCollapse?'64px':'240px'">
      <div class="menu-top" :class="{ 'menu-close': isCollapse }">
        <div class="text" :class="{ 'small': isCollapse }">admin</div>
      </div>
      <el-menu :collapse="isCollapse" :default-active="menuActiveItem" :default-openeds="[menuOpenItem]" @select="selectItem" :unique-opened="true" :collapse-transition="false" background-color="#262a39" text-color="#ffffff99" active-text-color="#fff">
        <el-submenu :index="index.toString()" v-for="(item,index) in asideMenu" :key="item.name">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="li in item.child" :key="li.name" :index="li.link">{{li.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- header -->
      <el-header>
        <div class="header-left">
          <i class="el-icon-s-unfold icon-header" v-if="isCollapse" @click="setIsCollapse(!isCollapse)"></i>
          <i class="el-icon-s-fold icon-header" v-else @click="setIsCollapse(!isCollapse)"></i>
        </div>
        <div class="header-right">
          <el-dropdown @command="setHandler">
            <div class="header-user">
              <el-avatar icon="el-icon-user-solid" size="small"></el-avatar><span class="name">admin</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in setList" :key="item.key" :command="item.key">{{item.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <!-- content -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'home',
  computed: {
    ...mapGetters({
      isCollapse: 'home/isCollapse',
      menuActiveItem: 'home/menuActiveItem',
      menuOpenItem: 'home/menuOpenItem',
      asideMenu: 'home/asideMenu',
      setList: 'home/setList'
    }),
    // 判断是否是welcome页面
    isHome () {
      let type = true
      const route = this.$route
      if (route.name === 'welcome') {
        type = false
      }
      return type
    }
  },
  created () {
    const route = this.$route
    this.init(route)
  },
  methods: {
    ...mapActions({
      setIsCollapse: 'home/setIsCollapse',
      setMenuActiveItem: 'home/setMenuActiveItem',
      setMenuOpenItem: 'home/setMenuOpenItem'
    }),
    init (val) {
      this.setMenuActiveItem(val.name)
    },
    // 导航选中
    selectItem (key, indexPath) {
      this.setMenuActiveItem(key)
      this.setMenuOpenItem(indexPath[0])
      this.$router.push({ name: key })
    },
    // 跳转welcome页面
    linkHome () {
      const route = this.$route
      if (route.name !== 'welcome') {
        this.$router.push('/welcome')
        this.setMenuActiveItem(null)
        this.setMenuOpenItem(null)
      }
    },
    // 操作
    setHandler (key) {
      switch (key) {
        case 'exit':
          this.exit()
          break
        default:
          break
      }
    },
    // 退出
    exit () {
      this.jsCookie.remove('user')
      this.$router.go(0)
    }
  }
}
</script>

<style lang="scss" scoped>
.view {
  width: 100%;
  height: 100%;
}
.el-header {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  color: #333;
  background-color: #fff;
  box-shadow: 0 3px 3px rgba(216, 223, 227, .4);
  .icon-header {
    font-size: 30px;
    margin-right: 20px;
    cursor: pointer;
    color: #606266;
  }
  .header-right {
    display: flex;
    align-items: center;
    flex-direction: row;
    .code-box {
      margin-right: 40px;
      .code {
        font-size: 30px;
      }
    }
    .header-user {
      display: flex;
      align-items: center;
      flex-direction: row;
      cursor: pointer;
      .name {
        margin-left: 4px;
      }
    }
  }
}
.code-img {
  text-align: center;
}
.el-aside {
  position: relative;
  z-index: 2;
  transition: all .3s ease-in-out;
  color: #333;
  background-color: #262a39;
  box-shadow: 0 0 8px 0;
  .el-menu {
    border-right: none;
  }
  .menu-top {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 18px 10px;
    cursor: pointer;
    .text {
      font-size: 20px;
      font-weight: 700;
      font-style: oblique;
      transition: all .3s ease-in-out;
      text-align: center;
      color: #fff;
      background-color: transparent;
    }
    .small {
      font-size: 12px;
    }
  }
  .is-opened {
    .is-active {
      border-left: 4px solid #c73fe8;
    }
  }
}

</style>
