const ApplicationConfig = {
  apiURL: 'http://localhost:8080',
  api: {
    BooksURL: '/books',
    BookTagsURL: '/book/:id/tags',
    BookTagURL: '/book/:id/tag/:tag',
    Book: '/book/:id',
    TagBooksURL: '/tag/:id/books',
    PagesURL: '/pages',
    auth:'/user/auth',
    register:'/user/register',
    user:'/user/:id',
    userUserGroups:'/user/:id/groups',
    collections:'/collections',
    collection:'/collection/:id',
    collectionBooks:'/collection/:id/books',
    collectionUsers:'/collection/:id/users',
    tags:'/tags',
    tagBatch:'/tags/batch',
    pageBatch:'/pages/batch'
  },
  storeKey:{
    token:"youcomic-admin-token",
    userId:"youcomic-admin-id"
  }
};
export default ApplicationConfig;
