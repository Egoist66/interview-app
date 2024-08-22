import { computed, ref } from "vue"

export const useInterviewCreate = () => {

    // fields names
    const company = ref<string>('')
    const vacancyLink = ref<string>('')
    const hrName = ref<string>('')
    const contactTelegram = ref<string>('')
    const contactWhatsApp = ref<string>('')
    const contactPhone = ref<string>('')

    // flags
    const isCreating = ref<boolean>(false)
    const disabledCreateButton = computed<boolean>(() => !(company.value && vacancyLink.value && hrName.value))



    const createInterview = () => {

    }

    return {
        company,
        vacancyLink,
        hrName,
        contactTelegram,
        contactWhatsApp,
        contactPhone,
        disabledCreateButton,
        isCreating,
        createInterview
    }
}