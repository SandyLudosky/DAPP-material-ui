import {
  TRANSACTION_PENDING,
  TRANSACTION_SUCCESS,
  TRANSACTION_ERROR,
  READ_ARTICLES,
} from "./actionTypes";

const transactionPending = () => {
  const action: ArticleAction = {
    type: TRANSACTION_PENDING,
    payload: { isPending: true },
  };
  return action;
};

const transactionSuccess = () => {
  const action: ArticleAction = {
    type: TRANSACTION_SUCCESS,
    payload: { isPending: false },
  };
  return action;
};

const transactionError = (err: Object) => {
  const action: ArticleAction = {
    type: TRANSACTION_ERROR,
    payload: { error: err, isPending: false },
  };
  return action;
};

const readArticles = (items: IArticleOutput[]) => {
  const action: ArticleAction = {
    type: READ_ARTICLES,
    payload: { items },
  };
  return action;
};

const mapArticles = (count: number, contract: any) =>
  new Promise(async (resolve) => {
    let list = [];
    for (let i = 0; i < count; i++) {
      const task = await contract.methods.articles(i).call();
      list.push(task);
    }
    resolve(list);
  });

export const add = (article: IArticleInput) => {
  return (dispatch: DispatchType, { instances: { Article }, admin }: any) => {
    dispatch(transactionPending());
    Article.methods
      .write(article.date, article.title, article.content)
      .send({ from: admin })
      .then(() => {
        dispatch(transactionSuccess());
      })
      .catch(transactionError);
  };
};

export const remove = (index: number) => {
  return (dispatch: DispatchType, { instances: { Article }, admin }: any) => {
    dispatch(transactionPending());
    Article.methods
      .remove(index)
      .send({ from: admin })
      .then(() => {
        dispatch(transactionSuccess());
      })
      .catch(transactionError);
  };
};

export const getArticles = () => {
  return (dispatch: DispatchType, { instances: { Article } }: any) => {
    dispatch(transactionPending());
    Article.methods
      .count()
      .call()
      .then((count: number) => mapArticles(count, Article))
      .then((items: IArticleOutput[]) => {
        dispatch(readArticles(items));
        dispatch(transactionSuccess());
      })
      .catch(transactionError);
  };
};
