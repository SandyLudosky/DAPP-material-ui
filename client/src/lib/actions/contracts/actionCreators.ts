import { DEPLOY } from "./actionTypes";

export const deploy = () => {
  return (
    dispatch: DispatchType,
    { instances: { Article }, accounts, admin }: any
  ) => {
    dispatch({
      type: DEPLOY,
      payload: {
        accounts,
        admin,
        articles: { instance: Article },
      },
    });
  };
};
