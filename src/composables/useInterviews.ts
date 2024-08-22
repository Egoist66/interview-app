import { useAuthStore } from "@/stores/auth"
import { getFirestore, collection, query, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore"
import { storeToRefs } from "pinia"
import { useInterviewsStore } from '@/stores/interviews';
import { onMounted, ref } from "vue";
import { delay } from "@/utils/delay";


export const useInterviews = () => {

    // main data

    const {setInterviews} = useInterviewsStore()
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
            
            console.log(data.docs);
            
            
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
        await getInterviews()
        isRefetching.value = false
    }

    onMounted(async () => {
        await getInterviews()
    })

    return {
        getInterviews,
        refetchInterviews,
        isRefetching,
        isLoading
    }

}