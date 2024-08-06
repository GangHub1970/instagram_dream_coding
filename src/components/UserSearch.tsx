"use client";

import { UserSearchResult } from "@/model/user";
import React, { FormEvent, useState } from "react";
import useSWR from "swr";
import GridSpinner from "./ui/GridSpinner";
import UserCard from "./UserCard";

export default function UserSearch() {
  const [keyword, setKeyword] = useState("");
  const {
    data: users,
    error,
    isLoading,
  } = useSWR<UserSearchResult[]>(`/api/search/${keyword}`);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <section className="flex flex-col w-full max-w-2xl items-center my-4">
      <form onSubmit={handleSubmit} className="mb-4 w-full">
        <input
          type="text"
          autoFocus
          placeholder="Search for a username or name"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="p-3 w-full text-xl outline-none border border-gray-400"
        />
      </form>
      {error && <p>무언가가 잘못 되었음🫣</p>}
      {isLoading && <GridSpinner />}
      {!isLoading && !error && users?.length === 0 && <p>찾는 사용자가 없음</p>}
      <ul className="p-4 w-full">
        {users &&
          users.map((user) => (
            <li key={user.username}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}
