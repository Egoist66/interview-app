import { onMounted, onUnmounted, ref } from "vue"

export const useDev = () => {

    const isDev = ref<boolean>(false)
    const word=ref<string>('')


    const toggleDev = (event: KeyboardEvent) => {

        word.value +=event.key
        

        if(event.altKey && event.key === 's'){
            isDev.value = !isDev.value
        }

    }


    onMounted(() => {
        document.addEventListener('keydown', toggleDev)
    })

    onUnmounted(() => {
        document.removeEventListener('keydown', toggleDev)
    })


    return {isDev, word}
}