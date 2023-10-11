import { Routing } from "@/Routing/routing";
import { SignInForm } from "../../components/SignInForm";
import { SignInSignUpToggle } from "../../components/SignInSignUpToggle";

export const OwnerSignIn = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center ">
      <SignInForm />
      <SignInSignUpToggle
        innerText="新規登録はこちら"
        toggleText="新規登録"
        path={Routing.ownerSignUp.buildRoute().path}
      />
    </div>
  );
};
