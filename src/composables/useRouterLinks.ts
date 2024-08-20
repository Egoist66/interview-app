import { useAuthStore } from "@/stores/auth";
import { computed, ref } from "vue";
import type {ComputedRef} from 'vue'

type RouteLinkType = {
  label: string;
  icon: string;
  path: string;
  show?: ComputedRef<boolean>;
};

export const useRouterLinks = () => {
    
  const auth = useAuthStore()
  const routeLinks = ref<RouteLinkType[]>([
    {
      label: "Авторизация",
      icon: "pi pi-user",
      path: "/auth",
      show: computed(() => !auth.userId.length),
    },
    {
      label: "Добавить",
      icon: "pi pi-plus",
      path: "/",
      show: computed(() => auth.userId.length > 0),
    },

    {
      label: "Список собеседований",
      icon: "pi pi-list",
      path: "/interview-list",
      show: computed(() => auth.userId.length > 0),

    },

    {
      label: "Статистика",
      icon: "pi pi-chart-pie",
      path: "/statistics",
      show: computed(() => auth.userId.length > 0),

    },
  ]);

  return { routeLinks };
};
