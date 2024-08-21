import { computed, ref, toRef } from "vue";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged ,
  getRedirectResult,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type User,
} from "firebase/auth";
import { delay } from "@/utils/delay";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

export const useAuth = () => {
  const provider = new GoogleAuthProvider();
 
  const {setUser} = useAuthStore()
  const {add} = useToast()
  const router = useRouter()

  const isLogin = ref<boolean>(true);
  const subTitleText = computed<string>(() =>
    isLogin.value ? "Нет аккаунта?" : "Уже есть аккаунт?"
  );
  const linkAccountText = computed<string>(() =>
    isLogin.value ? "Создайте сейчас" : "Ввойдите в аккаунт"
  );
  const submitButtonText = computed<string>(() =>
    isLogin.value ? "Вход" : "Регистрация"
  );

  const isLoading = ref<boolean>(false);
  const Error = ref<string>("");

  const email = ref<string>("");
  const password = ref<string>("");

  const toggleAuth = () => {
    isLogin.value = !isLogin.value;
  };

  const clearFields = () => {
    email.value = "";
    password.value = "";
  };

  const submitForm = async () => {
    handleAuth();
  };

  const handleAuth = async () => {
    try {
      isLoading.value = true;
      Error.value = "";

      if (isLogin.value) {
        const user = await signInWithEmailAndPassword(
          getAuth(),
          email.value,
          password.value
        );

        setUser(user.user)
        clearFields();
        router.replace({name: 'home'})
       
      } else {
        await createUserWithEmailAndPassword(
          getAuth(),
          email.value,
          password.value
        );

        await delay(1000);
        clearFields();
        isLogin.value = true

      }
    } catch (error: any) {
      console.log(error);
      Error.value = error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).' ? 'Пароль должен содержать не менее 6 символов' : 'Пользователь с таким email уже существует или неверные данные для входа';
      add({severity: 'error', summary: 'Error', detail: Error.value, life: 3000})

    } finally {
      await delay(500);
      isLoading.value = false;
    }
  };

  const checkIsAuth = async () => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    
  }

  const authViaGoogle = async () => {
    const auth = getAuth()
    await signInWithRedirect(auth, provider)

  
    
  }

  return {
    isLogin,
    subTitleText,
    linkAccountText,
    submitButtonText,
    isLoading,
    submitForm,
    checkIsAuth,
    authViaGoogle,
    email,
    Error,
    password,
    toggleAuth,
  };
};
