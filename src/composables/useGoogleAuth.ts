import { useAuthStore } from "@/stores/auth";
import { delay } from "@/utils/delay";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";

export const useGoogleAuth = () => {
  const { setUser } = useAuthStore();
  const provider = new GoogleAuthProvider();
  const router = useRouter()


  const authViaGoogle = async () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;
        const user = result.user;
        if(user){
          setUser(user)
          window.location.reload()
          await delay(500)
          await router.replace('/')
        }

        
    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.log(error);
    });
  };


  return {
    authViaGoogle,
  }
};
