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
