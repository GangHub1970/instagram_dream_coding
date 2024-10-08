import { client, urlFor } from "./sanity";
import { SimplePost } from "../model/post";

const simplePostProjection = `
  ...,
  "id": _id,
  "username": author->username,
  "userImage": author->image,
  "image": photo,
  "likes": likes[]->username,
  "text": comments[0].comment,
  "comments": count(comments),
  "createAt": _createdAt
`;

export async function getFollowingPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"
      || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
      | order(_createdAt desc)
      {${simplePostProjection}}
    `
    )
    .then(mapPosts);
}

export async function getPost(id: string) {
  return client
    .fetch(
      `*[_type == "post" && _id == "${id}"][0]{
      ...,
      "id": _id,
      "username": author->username,
      "userImage": author->image,
      "image": photo,
      "likes": likes[]->username,
      "createAt": _createdAt,
      comments[]{comment, "username": author->username, "image": author->image}
    }
    `
    )
    .then((post) => ({ ...post, image: urlFor(post.image) }));
}

export async function getPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"]
      | order(_createdAt desc)
      {${simplePostProjection}}
    `,
      {},
      {
        cache: "no-cache",
      }
    )
    .then(mapPosts);
}

export async function getLikedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && "${username}" in likes[]->username]
      | order(_createdAt desc)
      {${simplePostProjection}}
    `,
      {},
      {
        cache: "no-cache",
      }
    )
    .then(mapPosts);
}

export async function getSavedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && _id in *[_type == "user" && username == "${username}"].bookmarks[]._ref]
      | order(_createdAt desc)
      {${simplePostProjection}}
    `,
      {},
      {
        cache: "no-cache",
      }
    )
    .then(mapPosts);
}

function mapPosts(posts: SimplePost[]) {
  return posts.map((post: SimplePost) => ({
    ...post,
    likes: post.likes ?? [],
    image: urlFor(post.image),
  }));
}

export async function likePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .setIfMissing({ likes: [] })
    .append("likes", [
      {
        _ref: userId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function dislikePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .unset([`likes[_ref == "${userId}"]`])
    .commit();
}

export async function addComment(
  postId: string,
  userId: string,
  comment: string
) {
  return client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .append("comments", [
      {
        author: {
          _ref: userId,
          _type: "reference",
        },
        comment,
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function createPost(userId: string, text: string, file: Blob) {
  console.log(text);
  return client.assets.upload("image", file).then((imageAsset) => {
    console.log(imageAsset);
    return client.create(
      {
        _type: "post",
        author: { _ref: userId },
        photo: {
          asset: { _ref: imageAsset._id },
        },
        likes: [],
        comments: [
          {
            author: {
              _ref: userId,
              _type: "reference",
            },
            comment: text,
          },
        ],
      },
      { autoGenerateArrayKeys: true }
    );
  });
}
