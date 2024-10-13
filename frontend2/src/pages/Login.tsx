import Google from "../assets/icons/google.svg";
import { Github, LockIcon, Send } from "lucide-react";
import { Mail, Lock } from "lucide-react";
import Input from "../components/Inputs/Input";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Button from "../components/Buttons/Button";
import { useState } from "react";

export default function Login() {
  const validationSchema = Yup.object({
    email: Yup.string().required("Vous devez saisir un email."),
    password: Yup.string().required("Vous devez saisir un mot de passe."),
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const handleInputChange = (values: any) => {
    console.log(values);
    console.log(values.email);
    console.log(values.password);
    if (values.email && values.password) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  return (
    <section>
      <div className="mx-auto w-full max-w-3xl px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-xl bg-yellow-100 px-8 py-12 text-center">
          <h2 className="text-3xl mx-auto text-center font-bold max-w-sm md:text-5xl">
            Connexion
          </h2>
          <p className="mx-auto my-5 max-w-md text-sm text-gray-500 sm:text-base lg:mb-8">
            Connectez vous pour accéder à votre compte et profiter pleinement du
            site.
          </p>
          <div className="mx-auto w-full max-w-sm">
            <div className="flex flex-col justify-center items-center gap-1">
              <Button type="submit" onClick={() => {}} className="group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                  className="w-6 fill-current group-hover::text-blue-500"
                >
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
                <p className="text-sm sm:text-base ml-2">
                  Se connecter avec Google
                </p>
              </Button>
              <Button type="submit" onClick={() => {}}>
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
                ou se connecter avec email
              </p>
              <img
                src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a948ef4e6cf94_Line%203.svg"
                alt=""
                className="inline-block"
              />
            </div>
            <div className="mx-auto mb-4 max-w-sm pb-4">
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log(values);
                }}
                validateOnChange={true}
                validate={(values) => {
                  const errors: any = {};
                  if (!values.email) {
                    errors.email = "Vous devez saisir un email.";
                  }
                  if (!values.password) {
                    errors.password = "Vous devez saisir un mot de passe.";
                  }

                  if (!errors.email && !errors.password) {
                    setIsDisabled(false);
                  } else {
                    setIsDisabled(true);
                  }
                  return errors;
                }}
              >
                {() => (
                  <Form>
                    <Input
                      name="email"
                      type="text"
                      placeholder="Votre email"
                      icon={<Mail />}
                    />
                    <Input
                      name="password"
                      type="password"
                      placeholder="Votre mot de passe"
                      icon={<LockIcon />}
                    />
                    <Button
                      type="submit"
                      onClick={() => {}}
                      disabled={isDisabled}
                    >
                      Se connecter
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
            <p className="text-sm text-gray-500">
              Vous n'avez pas de compte ?
              <a href="#" className="font-bold">
                <span> </span> S'inscrire
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
