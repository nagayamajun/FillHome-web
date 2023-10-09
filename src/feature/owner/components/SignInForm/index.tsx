import { PlainButton } from "@/components/Button";
import { PlainInput } from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInInputSchema } from "../../type/schema";
import { useToast } from "@/hooks/useToast";
import { useCertainOwner } from "@/hooks/useCertainOwner";
import { authRepository } from "../../modules/auth.repository";
import { ToastResult } from "@/type/toast";
import { Routing } from "@/Routing/routing";
import { useRouter } from "next/router";


export const SignInForm = (): JSX.Element => {
  const router = useRouter();
  const { handleSubmit, register, formState: {errors}} = useForm({
    resolver: zodResolver(signInInputSchema)
  });

  const { showToast, hideToast } = useToast();
  const { setOwner } = useCertainOwner();

  const onSubmit = (createData: any): void => {
    authRepository.signIn(createData)
      .then(({ data, style, message }: ToastResult) => {
        showToast({ message, style });
        setTimeout(() => {
          hideToast();
          if (style === 'success') {
            //headerに認証情報を追加する

            setOwner(data);
            return router.push(Routing.adminRentalHouses.buildRoute().path)
          }
        }, 3000)
      });
  }

  return (
    <form className="flex flex-col w-md space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-bold text-xl text-center mb-2">Fill Home</h2>
      <PlainInput
        label="メールアドレス"
        register={register}
        registerValue="email"
        inputType="email"
        error={errors.email?.message as string}
      />
      <PlainInput
        label="パスワード"
        {...register('password')}
        register={register}
        registerValue="password"
        inputType="password"
        error={errors.password?.message as string}
      />
      <PlainButton
        innerText="ログイン"
        type="submit"
      />
    </form>
  )
}