<script setup lang="ts">
import {ref} from "vue";

const isNavbarOpen = ref(false);

const toggleNavbar = () => {
  isNavbarOpen.value = !isNavbarOpen.value;
}

</script>
<template>
  <div class="navbar w-full shadow bg-white  fixed top-0 z-10 p-4  text-xl">
    <div class="container flex justify-between items-center">
      <router-link to="/" class="logo">
        <img src="/images/svg/logo.svg" alt="logo">
      </router-link>
      <div class="flex justify-between items-center gap-4 nav_menu" :class="isNavbarOpen ? 'active' : '' ">
          <router-link to="/" class="font-bold max-md:text-5xl" @click="toggleNavbar">Characters</router-link>
          <router-link to="/locations" class="font-bold max-md:text-5xl" @click="toggleNavbar">Locations</router-link>
          <router-link to="/episodes" class="font-bold max-md:text-5xl" @click="toggleNavbar">Episodes</router-link>
      </div>
        <button
            @click="toggleNavbar"
            :class="isNavbarOpen ? 'active' : '' "
            class="nav_btn block md:hidden relative w-[50px] h-[35px]"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
    </div>

  </div>
</template>
<style scoped lang="scss">
//create burger menu button
.nav_btn {
  z-index: 55;
  span {
    position: absolute;
    width: 100%;
    height: 5px;
    background-color: #000;
    transition: all 0.3s ease-in-out;
    &:nth-child(1) {
      top: 0;
    }
    &:nth-child(2) {
      top: 50%;
      transform: translateY(-50%);
    }
    &:nth-child(3) {
      bottom: 0;
    }
  }

  &.active span {
    &:nth-child(1) {
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
    }
    &:nth-child(2) {
      opacity: 0;
    }
    &:nth-child(3) {
      bottom: 50%;
      transform: translateY(50%) rotate(-45deg);
    }
  }
}
//media for mobile
.navbar {
  @media (max-width: 767px) {
    .nav_menu {
      flex-direction: column;
      position: absolute;
      top: 0;
      left: -100%;
      width: 100vw;
      height: 100vh;
      background-color: #fff;
      z-index: 50;
      padding: 10px;
      transition: .4s ease-in-out all;
      justify-content: center;
      gap: 100px;
      &.active {
        left: 0;
      }
    }
  }
}
</style>