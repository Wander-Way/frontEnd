import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("@/components/main/Main.vue"),
    },
    {
      path: "/mypage",
      name: "myPage",
      component: () => import("@/views/MyPageView.vue"),
      redirect: "/mypage/mypagehome",
      children: [
        {
          name: "myPageHome",
          path: "mypagehome",
          component: () => import("@/views/MyPageView/MyPageHome.vue"),
          redirect: "/mypage/mypagehome/myprofile",
          children: [
            {
              name: "myPageLikeList",
              path: "likelist",
              component: () =>
                import("@/views/MyPageView/MyPageMyLikeList.vue"),
            },
            {
              name: "myPageRouteList",
              path: "routelist",
              component: () => import("@/views/MyPageView/MyPageRouteList.vue"),
            },
            {
              name: "myPageMyProfile",
              path: "myprofile",
              component: () => import("@/views/MyPageView/MyPageMyProfile.vue"),
            },
          ],
        },
        {
          name: "myPageLogin",
          path: "login",
          component: () => import("@/views/MyPageView/MyPageLogin.vue"),
        },
      ],
    },
    {
      path: "/hotplace",
      name: "hotplace",
      component: () => import("@/views/HotplaceView.vue"),

      redirect: "/hotplace/boardhome",
      children: [
        // {
        //   name: "hotplaceTest",
        //   path: "test",
        //   component: () => import("@/views/HotplaceView/HotplaceTest.vue"),
        // },
        {
          path: "boardhome",
          name: "hotplaceBoardHome",
          component: () => import("@/views/HotplaceView/HotplaceHomeV2.vue"),
        },
        {
          path: "list",
          name: "hotplaceBoardList",
          component: () => import("@/views/HotplaceView/HotplaceBoardList.vue"),
        },
        {
          name: "article-detail",
          path: "article-detail/:id",
          component: () =>
            import("@/views/HotplaceView/HotplaceBoardDetail.vue"),
        },
      ],
    },

    {
      path: "/plan",
      name: "planYourRoute",
      component: () => import("@/components/plan/PlanYourRoute.vue"),
      redirect: "/plan/menu",
      children: [
        {
          path: "menu",
          name: "planMenu",
          component: () => import("@/components/plan/PlanMenu.vue"),
        },
        {
          path: "new-plan",
          name: "createNewRoute",
          component: () => import("@/components/plan/CreateNewRoute.vue"),
        },
        {
          path: "find-plan",
          name: "findAnotherRoute",
          component: () => import("@/components/plan/FindAnotherRoute.vue"),
        },
        {
          path: "ai-plan",
          name: "planWithAi",
          component: () => import("@/components/plan/PlanWithAi.vue"),
        },
        {
          path: "save",
          name: "planInput",
          component: () => import("@/components/plan/PlanInput.vue"),
        },
      ],
    },
    {
      path: "/route",
      name: "anotherRoute",
      component: () => import("@/components/route/AnotherRoute.vue"),
    },
    {
      path: "/route/:id",
      name: "routeDetail",
      component: () => import("@/components/route/RouteDetail.vue"),
    },
  ],
});

export default router;
