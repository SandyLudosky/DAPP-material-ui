import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { remove, getArticles } from "../lib/actions/articles/actionCreators";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Form from "./Form";
import List, { renderRow } from "./List";
import contracts from "../lib/reducers/contracts";

interface RootState {
  contracts: {
    accounts: string[];
    admin: Object;
    event: any;
  };
  articles: {
    instance: Object;
    event: Object;
    isPending: boolean;
    items: IArticleOutput[];
  };
}

interface IArticleProps {
  isArticlesPending: boolean;
  items: IArticleOutput[];
  instance: Object;
  event: Object;
}
interface IArticleActionProps {
  readArticles: () => any;
  removeArticle: (id: number) => (index: number) => any;
}

type Props = IArticleProps & IArticleActionProps;

function App({ readArticles, removeArticle, event, items }: Props) {
  useEffect(() => {
    readArticles();
  }, []);
  useEffect(() => {
    readArticles();
  }, [event]);
  return (
    <Container component="main" maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Form />
        </Grid>
        <Grid item xs={6}>
          <List items={items} heading="Articles">
            {(item) => renderRow(item, removeArticle)}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}

const mapStateToProps = ({ articles, contracts }: RootState) => ({
  isArticlesPending: articles.isPending,
  items: articles.items,
  event: contracts.event?.transactionHash,
  instance: articles.instance,
});

function mapDispatchToProps(dispatch: any): IArticleActionProps {
  return {
    readArticles: () => dispatch(getArticles()),
    removeArticle: (id: number) => dispatch(remove(id)),
  };
}
const mapDispatch = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
