import { dbConnect } from "@/database/db-connect";
import type { IInterView } from "@/entities/interview.interface";
import { useAuthStore } from "@/stores/auth";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { storeToRefs } from "pinia";
import { useConfirm } from "primevue/useconfirm";
import { onBeforeMount, ref, watch } from "vue";

export const useStatistics = () => {
  const chartData = ref();
  const chartOptions = ref();
  const isLoading = ref<boolean>(true);

  const { userId } = storeToRefs(useAuthStore());

  const confirm = useConfirm();
  const interviews = ref<IInterView[]>([]);

  const getInterviews = async () => {
    try {
      isLoading.value = true;

      const getData = query(
        collection(dbConnect(), `users/${userId.value}/interviews`),
        orderBy("createdAt", "desc")
      );

      const data = await getDocs(getData);
      const interviews = data.docs.map((doc) => doc.data() as IInterView);

      return interviews ?? [];
    } catch (error) {
      console.log(error);
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  const setChartData = () => {
    const documentStyle = getComputedStyle(document.body);
    const data: number[] = [0, 0, 0];
    if(interviews.value.length){
        interviews.value.forEach((interview: IInterView) => {
            if(interview.result === 'Оффер'){
                data[0]++
            }
            else if(interview.result === 'Отказ'){
                data[1]++
            }
            else if(interview.result === '' || (interview.result == null || undefined)){
                data[2]++

            }
        })
    }
  

    return {
      labels: ["Оффер", "Отказ", "В ожидании"],
      datasets: [
        {
          data,
          backgroundColor: [
            documentStyle.getPropertyValue("--cyan-500"),
            documentStyle.getPropertyValue("--orange-500"),
            documentStyle.getPropertyValue("--gray-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--cyan-400"),
            documentStyle.getPropertyValue("--orange-400"),
            documentStyle.getPropertyValue("--gray-400"),
          ],
        },
      ],
    };
  };

  const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");

    return {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };
  };

  onBeforeMount(async () => {
    const data = await getInterviews();
    if(data.length){
      interviews.value = data
    }
    
  })

  watch(interviews, () => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
  });

  
  return {
    chartData,
    chartOptions,
    interviews,
  };
};
