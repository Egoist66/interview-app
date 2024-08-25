import { onMounted, ref } from "vue"
import { getDoc, doc } from 'firebase/firestore';
import {useAuthStore} from '@/stores/auth'
import type { IInterView } from '@/entities/interview.interface';
import { storeToRefs } from "pinia";
import { dbConnect } from "@/database/db-connect";
import { delay } from "@/utils/delay";


export const useInterviewEdit = (routeID: string) => {

    const currentInterview = ref<IInterView>()
    const {userId} = storeToRefs(useAuthStore())

    const docQuery = doc(
        dbConnect(), 
        `users/${userId.value}/interviews`,
        routeID
        
    )

    const isLoading = ref<boolean>(false)


    const getCurrentInterview = async () => {

    
        try {

            isLoading.value = true

            await delay(1000)

            const interview = await getDoc(docQuery)
            currentInterview.value  = interview.data() as IInterView
        }
        catch (error) {
            console.log(error)
        }
        finally {
            isLoading.value = false
        }
        
        
    }


    onMounted(async () => {
        
        await getCurrentInterview()       
    })

    return {
        currentInterview,
        isLoading,
    }
    
}