import { ref } from "vue"

export const useApp = () => {
    const isAppLoading = ref<boolean>(true)
    const appError = ref<string>("")
    const appSuccess = ref<string>("")


    return {
        isAppLoading,
        appError,
        appSuccess
    }
}