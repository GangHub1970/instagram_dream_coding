"use client";

import { providerMap } from "@/auth";
import React from "react";
import ColorButton from "./ui/ColorButton";
import { signIn } from "next-auth/react";

type Props = {
  callbackUrl: string;
};

export default function SignIn({ callbackUrl }: Props) {
  return (
    <>
      {Object.values(providerMap).map(({ id, name }) => (
        <ColorButton
          key={id}
          text={`Sign in with ${name}`}
          size="large"
          onClick={() => signIn(id, { callbackUrl })}
        />
      ))}
    </>
  );
}
