<script setup>
import { ref, watch } from "vue";
import { onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

import { useMyPageStore } from "../../stores/mypage.js";
import { storeToRefs } from "pinia";

const myPageStore = useMyPageStore();
const collapsed = ref(false);
const miniMenu = ref(false);
const router = useRouter();

onMounted(() => {
  if (collapsed.value) {
    document.getElementById("app").style.paddingLeft = "65px";
  } else {
    document.getElementById("app").style.paddingLeft = "290px";
  }
});

onUnmounted(() => {
  document.getElementById("app").style.paddingLeft = "0px";
});

const sideOpenEvent = (isMini) => {
  //  console.log("메뉴최소화여부 : ", isMini);
  if (isMini) {
    document.getElementById("app").style.paddingLeft = "65px";
  } else {
    document.getElementById("app").style.paddingLeft = "290px";
  }
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const logOutButtonClick = async () => {
    const result = await myPageStore.logout();
    console.log('result : ', result);
    await router.push({ name: "main" });
    return;
};
/*
const sideOpenEvent = async (isMini) => {
  console.log("메뉴최소화여부 : ", isMini);
  if (isMini) {
    while (document.getElementById("app").style.paddingLeft !== "65px") {
      const curr = document.getElementById("app").style.paddingLeft;
      document.getElementById("app").style.paddingLeft =
        curr.slice(0, curr.length - 1) - 1 + "px";
      await sleep(20);
    }
  } else {
    while (document.getElementById("app").style.paddingLeft != "200px") {
      const curr = document.getElementById("app").style.paddingLeft;
      document.getElementById("app").style.paddingLeft =
        curr.slice(0, curr.length - 1) + 1 + "px";
      await sleep(20);
    }
  }
};
*/
const menuClickHandler = (e) => {
  if (e.name === "내 프로필") {
    router.push({ name: "myPageMyProfile" });
  } else if (e.name === "여행 계획") {
    router.push({ name: "myPageRouteList" });
  } else if (e.name === "찜 목록") {
    router.push({ name: "myPageLikeList" });
  }else if (e.name === "로그아웃") {
    logOutButtonClick();
    router.push({ name: "myPageLikeList" });
  }

  console.log("menu 클릭:", e);
};

const testMenu = [
  {
    name: "내 프로필",
    icon: { text: "M", class: "material-icons-outlined" },
  },
  {
    name: "여행 계획",
    icon: { text: "P", class: "material-icons-outlined" },
  },
  {
    name: "찜 목록",
    icon: { text: "W", class: "material-icons-outlined" },
  },
  {
    name: "로그아웃",
    icon: { text: "L", class: "material-icons-outlined" },
  },
  /*children: [
      {
        name: "level 1.1",
        href: "/a",
        icon: { text: "home", class: "material-icons-outlined" },
        children: [
          {
            href: "/b",
            name: "level 1.1.1",
          },
        ],
      },
      {
        name: "level 1.2",
      },
    ],
  },
  {
    header: "Settings",
  },*/
  /*{
    name: "Dashboard",
    icon: { class: "material-icons-outlined", text: "dashboard" },
    children: [
      {
        href: "/c",
        name: "level 2.1",
      },
    ],
  },
  {
    name: "close menu",
    icon: { text: "settings", class: "material-icons-outlined" },
  },*/
];
</script>

<template>
  <VueAwesomeSideBar
    paddingTop="150px"
    :menu="testMenu"
    @update:miniMenu="sideOpenEvent"
    @item-click="menuClickHandler"
    vueRouterEnabel
  ></VueAwesomeSideBar>
  <!-- <div>
    <StepBackwardOutlined />
    <h3>SideNavBar</h3>
    <ul>
      <li>
        <router-link :to="{ name: 'myPageMyProfile' }">내 프로필</router-link> 
      </li>
      <li>
        <router-link :to="{ name: 'myPageRouteList' }">여행 계획</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'myPageLikeList' }">찜 목록</router-link>
      </li>
    </ul>
  </div> -->
</template>

<style scoped></style>
