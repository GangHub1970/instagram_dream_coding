import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default function UserPage({ params: { slug } }: Props) {
  return <div>UserPage</div>;
}
