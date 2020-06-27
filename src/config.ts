const ApplicationConfig = {
  api: {
    BooksURL: '/books',
    BookTagsURL: '/book/:id/tags',
    BookTagURL: '/book/:id/tag/:tag',
    Book: '/book/:id',
    TagBooksURL: '/tag/:id/books',
    PagesURL: '/pages',
    auth: '/user/auth',
    register: '/user/register',
    user: '/user/:id',
    users: '/users',
    userGroups: '/usergroups',
    userGroupUsers: '/usergroup/:id/users',
    userGroupPermissions: '/usergroup/:id/permissions',
    permissions: '/permissions',
    userUserGroups: '/user/:id/groups',
    collections: '/collections',
    collection: '/collection/:id',
    collectionBooks: '/collection/:id/books',
    collectionUsers: '/collection/:id/users',
    tags: '/tags',
    tagBatch: '/tags/batch',
    pageBatch: '/pages/batch',
    userNickname: '/user/nickname',
    userPassword: '/user/password',
    libraries: '/libraries',
    library: '/library/:id',
    libraryImport: '/library/import',
  },
  storeKey: {
    token: 'youcomic-admin-token',
    userId: 'youcomic-admin-id',
  },
};
export default ApplicationConfig;
