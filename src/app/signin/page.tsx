import React from "react";
import SignIn from "@/components/SignIn";

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

export default function SignInPage({ searchParams: { callbackUrl } }: Props) {
  return (
    <section className="flex justify-center mt-[20%]">
      <SignIn callbackUrl={callbackUrl} />
    </section>
  );
}
