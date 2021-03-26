type ArticleAction = {
  type: string;
  payload: any;
};
type DispatchType = (args: ArticleAction) => ArticleAction;
