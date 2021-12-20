import React from "react";
import { CustomDialog, TabData } from "../DialogStyles";
import ArticlePreview from "./sections/ArticlePreview";
import ArticleOverview from "./sections/ArticleOverview";
import ExamplesPreview from "./sections/Examples";
import { Example, Question } from "../../../interfaces/Interfaces";
interface QuestionDialogProps {
  open: boolean;
  onConfirm: (q: Question) => void;
  onRefuse: () => void;
  question: Question;
  headerText: string;
}

export default function QuestionDialog(props: QuestionDialogProps) {
  const [title, setTitle] = React.useState<string>("");
  const [url, setUrl] = React.useState<string>("");
  const [examples, setExamples] = React.useState<Example[]>([]);
  const [preview, setPreview] = React.useState(false);

  React.useEffect(() => {
    setTitle(props.question.title);
    setUrl(props.question.article ? props.question.article.url : "");
    setExamples(props.question.examples ? props.question.examples : []);
    setPreview(false);
  }, [props.question]);

  const isSubmitEnabled = (): boolean => title != "";

  const onConfirm = async () => {
    const newQuestion = {
      ...props.question,
      title,
      examples: examples.filter((e) => e),
    };
    if (url) {
      newQuestion.article = { url };
    }
    props.onConfirm(newQuestion);
  };

  const onAddExample = (title: string) => {
    setExamples((examples) => [...examples, { title }]);
  };

  const onRemoveExample = (index: number) => {
    const newExamples = [...examples];
    newExamples.splice(index, 1);
    setExamples(newExamples);
  };

  const onExamplesChange = (e: React.ChangeEvent<any>, i: number) => {
    const newExamples = [...examples];
    newExamples[i].title = e.target.value;
    console.log("ADD ex", e.target.value, examples);
    setExamples(newExamples);
  };

  const tabs: TabData[] = [
    {
      label: "Article",
      children: (
        <>
          <ArticleOverview
            open={!preview}
            setTitle={(e) => setTitle(e.target.value)}
            openPreview={() => setPreview(true)}
            setUrl={(e) => setUrl(e.target.value)}
            title={title}
            url={url}
          />
          <ArticlePreview
            open={preview}
            closePreview={() => setPreview(false)}
            url={url}
          />
        </>
      ),
    },
    {
      label: "Examples",
      children: (
        <>
          <ExamplesPreview
            examples={examples}
            onAddExample={onAddExample}
            onExamplesChange={onExamplesChange}
            onRemoveExample={onRemoveExample}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <CustomDialog
        open={props.open}
        headerText={preview ? "Preview" : props.headerText}
        minWidth={600}
        tabData={tabs}
        confirmButtonDisabled={!isSubmitEnabled()}
        minHeigth={450}
        onConfirm={onConfirm}
        onRefuse={props.onRefuse}
        loading={false}
      />
    </>
  );
}
