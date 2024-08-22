import type { IInterView } from "@/entities/interview.interface"
import { useAuthStore } from "@/stores/auth"
import { DateUtils } from "@/utils/date"
import { delay } from "@/utils/delay"
import {getFirestore, doc, setDoc} from 'firebase/firestore'
import { storeToRefs } from "pinia"
import { computed, ref } from "vue"
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router"


export const useInterviewCreate = () => {

    const {userId} = storeToRefs(useAuthStore())
    const router = useRouter()
    const toast = useToast()

    // fields names
    const company = ref<string>('')
    const vacancyLink = ref<string>('')
    const hrName = ref<string>('')
    const contactTelegram = ref<string>('')
    const contactPhone = ref<string>('')

    // flags
    const isCreating = ref<boolean>(false)
    const disabledCreateButton = computed<boolean>(() => !(company.value && vacancyLink.value && hrName.value))

;

    const createInterview = async() => {
        isCreating.value = true
        const payload: IInterView = {
            id: crypto.randomUUID(),
            company: company.value,
            vacancyLink: vacancyLink.value,
            hrName: hrName.value,
            contactTelegram: contactTelegram.value,
            contactPhone: contactPhone.value,
            createdAt: DateUtils.getDateTime(new Date())
        }

        const userID = userId.value
        const db = getFirestore()

        if(userID){
            console.log(userID);
            
            try {
                await setDoc(
                    doc(db, `users/${userID}/interviews`, payload.id), 
                    payload
                )
                await delay(1000)
                toast.add({severity: 'success', summary: 'Успешно', detail: 'Интервью создано💫', life: 3000});
                await delay(1200)
                await router.push({name: 'interview-list'})
            }
            catch (e) {
                console.error(e)
                toast.add({severity: 'error', summary: 'Ошибка', detail: 'Не удалось создать интервью', life: 3000});
            }
            finally {
                isCreating.value = false
                company.value = ''
                contactPhone.value = ''
                contactTelegram.value = ''
                hrName.value = ''
                vacancyLink.value = ''
            }
        }
    }

    return {
        company,
        vacancyLink,
        hrName,
        contactTelegram,
        contactPhone,
        disabledCreateButton,
        isCreating,
        createInterview
    }
}