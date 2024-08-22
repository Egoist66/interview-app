import { useAuthStore } from "@/stores/auth"
import { getFirestore, collection, query, orderBy, getDocs } from "firebase/firestore";
import { storeToRefs } from "pinia"
import { useInterviewsStore } from '@/stores/interviews';
import { onMounted, ref, watch } from "vue";
import { delay } from "@/utils/delay";
import type { IInterView } from "@/entities/interview.interface";


export const useInterviews = () => {

    // main data

    const interviewStore = useInterviewsStore()
    const {userId} = storeToRefs(useAuthStore())
    const db = getFirestore()


    // state flags

    const isLoading = ref<boolean>(true)
    const isRefetching = ref<boolean>(false)


    const getInterviews = async () => {
        try {
            isLoading.value = true

            const getData =  query(collection(db, `users/${userId.value}/interviews`), orderBy('createdAt', 'desc'))
            const data = await getDocs(getData)
            const interviews = data.docs.map(doc => doc.data() as IInterView)

            return interviews            
            
            
            
        }

        catch (error) {
            console.log(error)
        }
        finally {
            isLoading.value = false
        }
    }

    const refetchInterviews = async () => {
        isRefetching.value = true
        await delay(1000)

        const interviews = await getInterviews()
        if(interviews?.length){
            interviewStore.setInterviews(interviews)
        }
        
        isRefetching.value = false
    }

    
    onMounted(async () => {
      const interviews = await getInterviews()
      if(interviews?.length){
        interviewStore.setInterviews(interviews)
      }
    })

    
   
    return {
        getInterviews,
        refetchInterviews,
        isRefetching,
        isLoading
    }

}