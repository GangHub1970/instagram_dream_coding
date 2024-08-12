import { client } from "./sanity";
import { SearchUser } from "../model/user";

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
      users.map((user: SearchUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    );
}

export async function getUserForProfile(username: string) {
  return client
    .fetch(
      `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id": _id,
      "following": count(following),
      "followers": count(followers),
      "posts": count(*[_type == "post" && author->username == "${username}"])
    }
    `
    )
    .then((user) => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
      posts: user.posts ?? 0,
    }));
}

export async function addBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .setIfMissing({ bookmarks: [] })
    .append("bookmarks", [
      {
        _ref: postId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref == "${postId}"]`])
    .commit();
}
