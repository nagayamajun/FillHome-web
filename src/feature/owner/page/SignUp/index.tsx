import { Routing } from "@/Routing/routing";
import { SignUpForm } from "../../components/SignUpForm";
import { SignInSignUpToggle } from "../../components/SignInSignUpToggle";

export const OwnerSignUp = (): JSX.Element => (
  <div className="flex flex-col h-screen items-center justify-center ">
    <SignUpForm />
    <SignInSignUpToggle
      innerText="アカウントお持ちの方はこちらから"
      path={Routing.ownerSignIn.buildRoute().path}
      toggleText="ログイン"
    />
  </div>
);
