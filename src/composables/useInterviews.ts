import { useAuthStore } from "@/stores/auth"
import { getFirestore, collection, query, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { storeToRefs } from "pinia"
import { useInterviewsStore } from '@/stores/interviews';
import { onMounted, ref } from "vue";
import { delay } from "@/utils/delay";
import type { IInterView } from "@/entities/interview.interface";
import { useToast } from "primevue/usetoast";


export const useInterviews = () => {

    const toast = useToast()

    // main data

    const interviewStore = useInterviewsStore()
    const {userId} = storeToRefs(useAuthStore())
    const db = getFirestore()


    // state flags

    const isLoading = ref<boolean>(true)
    const isRefetching = ref<boolean>(false)
    const isDeleting = ref<boolean>(false)


    const getInterviews = async () => {
        try {
            isLoading.value = true

            const getData =  query(collection(db, `users/${userId.value}/interviews`), orderBy('createdAt', 'desc'))
            const data = await getDocs(getData)
            const interviews = data.docs.map(doc => doc.data() as IInterView)

            return interviews ?? []            
            
            
            
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
        interviewStore.setInterviews(interviews ?? [])
        
        
        isRefetching.value = false
    }

    const removeInterview = async (id: string | number) => {

        const db = getFirestore()

        try {
           
            await delay(1000)

            await deleteDoc(doc(db, `users/${userId.value}/interviews/${id}`))
            await refetchInterviews()
            toast.add({severity: 'success', summary: 'Успешно', detail: 'Интервью удалено', life: 3000})

        }
        catch (error) {
            console.log(error)
            toast.add({severity: 'error', summary: 'Ошибка', detail: 'Не удалось удалить интервью', life: 3000})
        }
       
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
        removeInterview,
        isLoading
    }

}