import { client } from "./sanity";
import { UserSearchResult } from "../model/user";

type OAuthUser = {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string | null;
};

export async function addUser({ id, email, name, username, image }: OAuthUser) {
  client.createIfNotExists({
    _id: id,
    _type: "user",
    email,
    name,
    image,
    username,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUserByUsername(username: string) {
  return client.fetch(
    `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id": _id,
      following[]->{image, username},
      followers[]->{image, username},
      "bookmarks": bookmarks[]->_id
    }`
  );
}

export async function getSearchUsers(keyword?: string) {
  const query = keyword
    ? `&& (username match "*${keyword}*") || (name match "*${keyword}*")`
    : "";

  return client
    .fetch(
      `*[_type == "user" ${query}]{
      ...,
      "id": _id,
      "following": count(following),
      "followers": count(followers)
    }
    `
    )
    .then((users) =>
      users.map((user: UserSearchResult) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    );
}
