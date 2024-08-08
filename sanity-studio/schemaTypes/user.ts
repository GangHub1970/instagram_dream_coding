import {defineArrayMember, defineField, defineType} from 'sanity'

export const user = defineType({
  title: 'User',
  name: 'user',
  type: 'document',
  fields: [
    defineField({
      title: 'Username', // sanity studio UI에서 보는 이름
      name: 'username', // backend 데이터에 접근할 때 사용하는 이름
      type: 'string',
    }),
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
    }),
    defineField({
      title: 'Email',
      name: 'email',
      type: 'string',
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'string',
    }),
    defineField({
      title: 'Following',
      name: 'following',
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
      title: 'Followers',
      name: 'followers',
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
      title: 'Bookmarks',
      name: 'bookmarks',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'post'}],
        }),
      ],
      validation: (Rule: any) => Rule.unique(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'username',
    },
  },
})
