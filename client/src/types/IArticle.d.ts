type IArticleInput = {
  date: string;
  title: string | null;
  content: string | null;
};

type IArticleOutput = {
  id: number;
  date: string;
  title: string;
  content: string;
};
