import { onMounted, ref, type Ref } from "vue";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { useAuthStore } from "@/stores/auth";
import type { IInterView, IStage } from "@/entities/interview.interface";
import { storeToRefs } from "pinia";
import { dbConnect } from "@/database/db-connect";
import { delay } from "@/utils/delay";
import { useToast } from "primevue/usetoast";
import dayjs from "dayjs";

export const useInterviewEdit = (routeID: string) => {
  const currentInterview = ref<IInterView>();
  const { userId } = storeToRefs(useAuthStore());
  const toast = useToast();

  const docQuery = doc(
    dbConnect(),
    `users/${userId.value}/interviews`,
    routeID
  );

  const isLoading = ref<boolean>(false);
  const isSaving = ref<boolean>(false);
  const isRefetching = ref<boolean>(false);

  const getCurrentInterview = async () => {
    try {
      isLoading.value = true;

      await delay(1000);

      const interview = await getDoc(docQuery);
      currentInterview.value = interview.data() as IInterView;
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  const refetchCurrentInterview = async () => {
    try {
        isRefetching.value = true;
        await delay(1000);

        const interview = await getDoc(docQuery);
        currentInterview.value = interview.data() as IInterView;
    }
    catch (error) {
        console.log(error);
    }
    finally {
        isRefetching.value = false;
    }
  };

  const addStage = () => {
    if (currentInterview.value) {
        if(!currentInterview.value.stages){
            currentInterview.value.stages = []
        }

        currentInterview.value.stages?.push(
        {id: crypto.randomUUID(), name: "", date: '', description: "",}
        );
     
    }
  }
  
  const removeStage = (id: string | number) => {
    if (currentInterview.value) {
        currentInterview.value.stages = currentInterview.value.stages?.filter(stage => stage.id !== id)
    }
  }

  const saveEdit = async () => {
    if (currentInterview.value) {
      try {
        isSaving.value = true;
        await delay(1000);

        if(currentInterview.value.stages?.length){
          currentInterview.value.stages = currentInterview.value.stages?.map((stage: IStage) => {
            return {
                ...stage,
                date: dayjs(stage.date).format("MM/DD/YYYY HH:mm"),

            }
          })

          await updateDoc(docQuery, {
            ...currentInterview.value
          });
        await refetchCurrentInterview();
        toast.add({
            severity: "success",
            summary: "Успешно",
            detail: "Интервью обновлено",
            life: 3000,
        })
        }

       

      } catch (error) {
        console.log(error);

        toast.add({
          severity: "error",
          summary: "Ошибка",
          detail: "Не удалось обновить интервью",
          life: 3000,
        })
      }
      finally {
        isSaving.value = false;
      }
    }
  };

  onMounted(async () => {
    await getCurrentInterview();
  });

  return {
    currentInterview,
    isLoading,
    isRefetching,
    isSaving,
    addStage,
    saveEdit,
    removeStage
  };
};
