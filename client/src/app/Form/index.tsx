import { useState, useEffect, useRef } from "react";
import { connect, ConnectedProps } from "react-redux";
import { useFormValidation } from "../../hooks/useFormValidation";
import { add } from "../../lib/actions/articles/actionCreators";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  border: {
    marginBottom: 20,
    borderBottom: "1px solid #ccc",
  },
}));

interface IArticleActionProps {
  addArticle: (article: IArticleInput) => (article: IArticleInput) => any;
}

const Form = ({ addArticle }: IArticleActionProps) => {
  const classes = useStyles();
  const titleRef: React.MutableRefObject<undefined> = useRef();
  const titleElement = (titleRef.current as unknown) as HTMLInputElement;
  const contentRef: React.MutableRefObject<undefined> = useRef();
  const contentElement = (contentRef.current as unknown) as HTMLInputElement;
  const initialValues = {
    title: null,
    content: null,
  };
  const [article, setArticle] = useState({ ...initialValues });
  const { validate, isValid } = useFormValidation();

  const handleOnChange = (e: any) => {
    setArticle((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    const newArticle: IArticleInput = { date: `${new Date()}`, ...article };
    addArticle(newArticle);
    setArticle({ ...initialValues });
    titleElement.value = "";
    contentElement.value = "";
  };
  useEffect(() => {
    validate(article);
  }, [article, validate]);

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5" className={classes.border}>
        Add Article
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              inputRef={titleRef}
              onChange={handleOnChange}
              variant="outlined"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              value={article.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              inputRef={contentRef}
              onChange={handleOnChange}
              variant="outlined"
              required
              fullWidth
              multiline
              rows={4}
              id="content"
              label="Your article"
              name="content"
              value={article.content}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={!isValid}
          className={classes.submit}
        >
          Add
        </Button>
      </form>
    </div>
  );
};

function mapDispatchToProps(dispatch: any): IArticleActionProps {
  return {
    addArticle: (article: IArticleInput) => dispatch(add(article)),
  };
}
export default connect(null, mapDispatchToProps)(Form);
