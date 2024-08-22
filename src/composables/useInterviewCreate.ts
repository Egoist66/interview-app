import type { IInterView } from "@/entities/interview.interface"
import { useAuthStore } from "@/stores/auth"
import { DateUtils } from "@/utils/date"
import { delay } from "@/utils/delay"
import { getAuth } from "firebase/auth"
import {getFirestore, doc, setDoc} from 'firebase/firestore'
import { storeToRefs } from "pinia"
import { computed, ref } from "vue"

export const useInterviewCreate = () => {

    const {userId} = storeToRefs(useAuthStore())

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

        const userID = getAuth().currentUser?.uid
        const db = getFirestore()

        if(userID){
            console.log(userID);
            
            try {
                await setDoc(
                    doc(db, `users/${userID}/interviews`, payload.id), 
                    payload
                )
            }
            catch (e) {
                console.error(e)
            }
            finally {
                await delay(1000)
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