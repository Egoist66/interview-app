import type { IInterView } from "@/entities/interview.interface";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useInterviewsStore = defineStore('interviews', () => {

    const interviews = ref<IInterView[]>([])


    const setInterviews = (data: IInterView[]) => {
        interviews.value = data
    }



    return {interviews, setInterviews}
})
