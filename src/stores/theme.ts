import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore('theme', () => {

    const theme = ref<'aura-light-blue' | 'aura-dark-blue'>('aura-light-blue')

    const setTheme = (mode: 'aura-light-blue' | 'aura-dark-blue') => {

        theme.value = mode
    }
    return { theme, setTheme }
})
