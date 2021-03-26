type ArticleState = {
  instance: Object | null;
  event: Object | null;
  items: IArticleOutput[];
  isPending: boolean;
};
type ContractState = {
  accounts: string[];
  admin: string;
  event: Object;
};
