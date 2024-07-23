import { client } from "./sanity";

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
