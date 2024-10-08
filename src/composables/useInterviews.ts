import { useAuthStore } from "@/stores/auth"
import {collection, query, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore";
import { storeToRefs } from "pinia"
import { useInterviewsStore } from '@/stores/interviews';
import { onBeforeMount, onMounted, ref } from "vue";
import { delay } from "@/utils/delay";
import type { IInterView } from "@/entities/interview.interface";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { dbConnect } from "@/database/db-connect";



export const useInterviews = () => {

    const toast = useToast()
    const confirm = useConfirm()

    // main data

    const interviewStore = useInterviewsStore()
    const {userId} = storeToRefs(useAuthStore())


    // state flags

    const isLoading = ref<boolean>(true)
    const isRefetching = ref<boolean>(false)
    const isDeleting = ref<boolean>(false)


    const getInterviews = async () => {
        try {
            isLoading.value = true

            const getData =  query(collection(dbConnect(), `users/${userId.value}/interviews`),
             orderBy('createdAt', 'desc')
            )
            
            const data = await getDocs(getData)
            const interviews = data.docs.map(doc => doc.data() as IInterView)

            return interviews ?? []           
            
            
            
        }

        catch (error) {
            console.log(error)
            return []
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


        confirm.require({
            message: 'Вы уверены, что хотите удалить запись c интервью?',
            header: 'Подтвердите действие',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Отмена',
            rejectClass: 'p-button-secondary p-button-outlined',
            acceptClass: 'p-button-danger',
            acceptLabel: 'Удалить',
            acceptIcon: 'pi pi-check',
            blockScroll: true,
           
        
            accept: async () => {
                isDeleting.value = true

                await delay(500)
                try {
                    await deleteDoc(doc(dbConnect(), `users/${userId.value}/interviews/${id}`))
                    await refetchInterviews()
                    toast.add({severity: 'success', summary: 'Успешно', detail: 'Интервью удалено', life: 3000})
                }
                catch (error) {
                    console.log(error)
                    toast.add({severity: 'error', summary: 'Ошибка', detail: 'Не удалось удалить интервью', life: 3000})
                }
                finally {
                    isDeleting.value = false
                }
                
            }
        })

     
       
    }

    
    onBeforeMount(async () => {
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
        isLoading,
        isDeleting
    }

}