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
      children: [
        {
          path: ":id",
          name: "routeDetail",
          component: () => import("@/components/route/RouteDetail.vue"),
        },
      ],
    },
  ],
});

export default router;
