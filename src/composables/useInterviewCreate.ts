import { ref } from "vue"
import { useRefs } from "./common/useRefs"

export const useInterviewCreate = () => {

    // fields names
    const [
        company, 
        vacancyLink, 
        hrName,
        contactTelegram,
        contactWhatsApp,
        contactPhone
    ] = useRefs<string[]>(['', '', '', '','',''])

    // flags
    const isCreating = ref<boolean>(false)



    const createInterview = () => {

    }

    return {
        company,
        vacancyLink,
        hrName,
        contactTelegram,
        contactWhatsApp,
        contactPhone,
        isCreating,
        createInterview
    }
}