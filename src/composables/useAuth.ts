import { computed, ref } from "vue"
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const useAuth = () => {

    // const provider = new GoogleAuthProvider();
    // const auth = getAuth();
    // signInWithPopup(auth, provider).then((result) => {
    //     console.log(result);
        
    // })



    const isLogin = ref<boolean>(true)
    const subTitleText = computed<string>(() => isLogin.value ? "Нет аккаунта?" : "Уже есть аккаунт?")
    const linkAccountText = computed<string>(() => isLogin.value ? "Создайте сейчас" : "Ввойдите в аккаунт")


    const toggleAuth = () => {
        isLogin.value = !isLogin.value
    }

    return { 
        isLogin, 
        subTitleText,
        linkAccountText,
        toggleAuth
    }
}