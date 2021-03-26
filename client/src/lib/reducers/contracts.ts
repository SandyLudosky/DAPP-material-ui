import { DEPLOY, LOG_EVENT } from "../actions/contracts/actionTypes";

export const initialState: ContractState = {
  accounts: [],
  admin: Object.create(null),
  event: Object.create(null),
};

const contracts = (
  state: ContractState = initialState,
  { type, payload }: ArticleAction
) => {
  switch (type) {
    case DEPLOY:
      return {
        admin: payload.admin,
        accounts: payload.accounts,
      };
    case LOG_EVENT:
      const { event, returnValues, transactionHash } = payload;
      return {
        ...state,
        event: { event, returnValues, transactionHash },
      };
    default:
      return state;
  }
};
export default contracts;
