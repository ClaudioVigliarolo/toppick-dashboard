import React from "react";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@material-ui/core";
import { COLORS } from "../constants/Colors";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import { useParams } from "react-router";
import { Category, Topic } from "../interfaces/Interfaces";
import ListItem from "@material-ui/core/ListItem";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import TransactionAlert from "../components/alerts/TransactionAlert";
import CustomButton from "../components/buttons/CustomButton";
import TopicDialog from "../components/dialogs/TopicDialog";
const MIN_QUESTIONS = 2;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
      maxWidth: 400,
      alignItems: "center",
      alignSelf: "center",
    },
    root: {
      width: "100%",
      height: 450,
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
    },

    chips: {
      display: "flex",
      flexWrap: "wrap",
      alignSelf: "center",
      alignItems: "center",
    },
    chip: {
      margin: 2,
      backgroundColor: "orange",
      color: "white",
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
    mainTextInput: {
      width: 500,
      padding: 20,
    },
  })
);

const NO_TOPIC = "Select A Topic";

interface InsertTopicsPageProps {
  topics: Topic[];
  categories: Category[];
}
export default function InsertTopicsPage(props: InsertTopicsPageProps) {
  const [startDialog, setStartDialog] = React.useState<boolean>(false);

  const [error, setError] = React.useState(false);
  const [isReview, setReview] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const [topic, setTopic] = React.useState<string>(NO_TOPIC);
  const [questions, setQuestions] = React.useState<string>("");
  const [questionsArray, setQuestionsArray] = React.useState<string[]>([]);

  const [topics, setTopics] = React.useState<Topic[]>([]);

  const { lang }: { lang: string } = useParams();

  React.useEffect(() => {
    setTopics(props.topics);
  }, [props.categories]);

  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;
    return (
      <ListItem button style={style} key={index}>
        <ListItemText secondary={questionsArray[index]} primary={index + 1} />
      </ListItem>
    );
  }

  const onSubmitReview = (): void => {
    const questionsArray = questions.match(/[^\r\n]+/g);
    if (questionsArray && questionsArray.length > MIN_QUESTIONS) {
      setReview(true);
      setQuestionsArray(questionsArray);
    }
  };

  const onSubmit = async (): Promise<void> => {
    if (questionsArray && questionsArray.length > MIN_QUESTIONS) {
      const val = true;
      if (val) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        setQuestions("");
      } else {
        setError(true);
        setTimeout(() => setError(false), 5000);
      }
      setReview(false);
    }
  };

  const handleTopicChange = (event: React.ChangeEvent<{ value: any }>) => {
    setTopic(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <CustomButton
        onClick={() => setStartDialog(true)}
        title="CLICK HERE TO START "
      />

      <TopicDialog
        open={startDialog}
        related={[]}
        preselectedCategories={[]}
        preselectedRelated={[]}
        categories={props.categories.map((categ) => categ.title)}
        headerText="Add New Topic"
        topic=""
        onConfirm={(topicTitle: string, selectedCategoriesTitle: string[]) => {
          //onTopicAdd(topicTitle, selectedCategoriesTitle);
          setStartDialog(false);
        }}
        onRefuse={() => {
          setStartDialog(false);
        }}
      />

      <TextField
        id="standard-basic"
        label="Standard"
        className={classes.mainTextInput}
      />

      <TransactionAlert success={success} error={error} />
    </div>
  );
}
