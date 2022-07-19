/* eslint-disable import/no-anonymous-default-export */
export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'postedBy',
      title: 'PostedBy',
      type: 'PostedBy',
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'string',
    },
  ],
};
