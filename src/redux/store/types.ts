export interface IAppState {
  user: IUserState | undefined,
  tag: ITagState | undefined,
  collection: ICollectionState | undefined,
  article: IArticleState | undefined,
  pageUser:IPageUserState|undefined

}

export interface IUserState {
  isLoading: boolean,
  loginSuccess: boolean,
  id: string,
  userType: string,
  email: string,
  userList?: any,
}

export interface ITagState {
  isLoading: boolean,
  isAdding: boolean,
  isEditing: boolean,
  isRemoving: boolean,
  isActing: boolean,
  isRefreshing: boolean,
  tagList: any,
  pagination: object,
  tagItem: object
}
export interface ICollectionState {
  isLoading: boolean,
  isAdding: boolean,
  isEditing: boolean,
  isRemoving: boolean,
  isActing: boolean,
  collectionList: any,
  collectionItem: object,
  pagination: object,
  isRefreshing: boolean,

}
export interface IArticleState {
  isLoading: boolean,
  isAdding: boolean,
  isEditing: boolean,
  isRemoving: boolean,
  isActing: boolean,
  isRefreshing: boolean,
  articleList: any,
  pagination: object,
  articleItem: object
}

export interface IPageUserState {
  isLoading: boolean,
  isAdding: boolean,
  isEditing: boolean,
  isRemoving: boolean,
  isActing: boolean,
  userList: any,
  userItem: object,
  pagination: object,
  isRefreshing: boolean,
}