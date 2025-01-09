import { Github } from "lucide-react";
import Button from "../components/Buttons/Button";
import { useEffect } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import AppService from "../services/AppService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  
  const navigate = useNavigate();

  useEffect(() => { 
      const code = window.location.href.toString().split("=")[1];
      if (code) {
      try {
          AppService.login({ accessToken: code, loginType: "github" }).then(() => {
          window.location.href = "/";
          });
      } catch (error) {
          console.error(error);
      }
      }
  }, []);

  const loginWithGoogle = useGoogleLogin({
      onSuccess: tokenResponse => {
        AppService.login({ accessToken: tokenResponse.access_token, loginType: "google" }).then(() => {
            window.location.href = "/";
        });
      },
      onError: () => {
        toast.error("Erreur lors de la connexion avec Google");
      }
  });

  const loginWithGithub = () => {
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&scope=user:email`;
  }

  return (
    <section>
        <div className="mx-auto w-full max-w-3xl px-5 py-16 md:px-10 md:py-20">
            <div className="mx-auto max-w-xl bg-blue-200 px-8 py-12 text-center rounded-lg">
                <h2 className="text-3xl mx-auto text-center font-bold max-w-sm md:text-5xl">
                    Inscription
                </h2>
                <p className="mx-auto my-5 max-w-md text-sm text-gray-500 sm:text-base lg:mb-8">
                    Inscrivez-vous sur le site pour accéder à toutes les fonctionnalités de RessourceDev !
                </p>
                <div className="mx-auto w-full max-w-sm">
                    <div className="flex flex-col justify-center items-center gap-1">
                        <Button type="submit" onClick={loginWithGoogle}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 488 512"
                                className="w-6 fill-current group-hover::text-blue-500"
                            >
                                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                            </svg>
                            <p className="text-sm sm:text-base">Se connecter avec Google</p>
                        </Button>

                        <Button type="submit" onClick={loginWithGithub}>
                            <Github />
                            <p className="text-sm sm:text-base">Se connecter avec Github</p>
                        </Button>
                    </div>
                    <div className="mb-5 mt-5 flex w-full justify-around">
                        <img
                            src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a948ef4e6cf94_Line%203.svg"
                            alt=""
                            className="inline-block"
                        />
                        <p className="text-sm text-gray-500">
                            Et l'inscription classique ?
                        </p>
                        <img
                            src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a948ef4e6cf94_Line%203.svg"
                            alt=""
                            className="inline-block"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-sm text-gray-500">
                            Pour des raisons de sécurité, le login classique est désactivé afin de garantir la sécurité des mots de passes des utilisateurs.
                        </p>
                    </div>
                        <p className="text-sm text-gray-500 mt-5">
                        Vous avez un compte ?
                        <a onClick={() => { navigate('/login') }} className="font-bold cursor-pointer">
                            <span> Se connecter  </span>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </section>
  );
}
