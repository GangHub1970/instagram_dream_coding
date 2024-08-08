import {defineArrayMember, defineField, defineType} from 'sanity'

export const post = defineType({
  title: 'Post',
  name: 'post',
  type: 'document',
  fields: [
    defineField({
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{type: 'user'}],
    }),
    defineField({
      title: 'Photo',
      name: 'photo',
      type: 'image',
    }),
    defineField({
      title: 'Likes',
      name: 'likes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'user'}],
        }),
      ],
      validation: (Rule: any) => Rule.unique(),
    }),
    defineField({
      title: 'Comments',
      name: 'comments',
      type: 'array',
      of: [
        defineArrayMember({
          title: 'Comment',
          name: 'comment',
          type: 'document',
          fields: [
            defineField({
              title: 'Author',
              name: 'author',
              type: 'reference',
              to: [{type: 'user'}],
            }),
            defineField({
              title: 'Comment',
              name: 'comment',
              type: 'string',
            }),
          ],
        }), // Comment Schema는 독립적으로 사용되지 않고 Post 안에서 사용되므로 따로 파일을 생성하지 않고 바로 생성 후 사용
      ],
    }),
  ],
  preview: {
    select: {
      title: 'comments.0.comment',
      authorName: 'author.name',
      authorUsername: 'author.username',
      media: 'photo',
    },
    // prepare(selection: {title: string; authorName: string; authorUsername: string; media: string}) {
    prepare(selection: Record<string, any>) {
      const {title, authorName, authorUsername, media} = selection
      return {
        title,
        subtitle: `by ${authorName} (${authorUsername})`,
        media,
      }
    },
  },
})
