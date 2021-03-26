import { useState, useEffect } from "react";
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

const mapDispatch = {
  addArticle: (article: IArticleInput) => add(article),
};
const connector = connect(null, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Form = ({ addArticle }: PropsFromRedux) => {
  const classes = useStyles();
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
              onChange={handleOnChange}
              variant="outlined"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handleOnChange}
              variant="outlined"
              required
              fullWidth
              multiline
              rows={4}
              id="content"
              label="Your article"
              name="content"
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
export default connector(Form);
