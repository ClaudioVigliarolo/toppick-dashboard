import React from "react";
import { CustomDialog, TabData } from "../DialogStyles";
import ArticlePreview from "./sections/ArticlePreview";
import ArticleOverview from "./sections/ArticleOverview";
import { Question } from "../../../interfaces/Interfaces";
interface QuestionDialogProps {
  open: boolean;
  onConfirm: (q: Question) => void;
  onRefuse: () => void;
  question: Question;
  headerText: string;
}

export default function QuestionDialog(props: QuestionDialogProps) {
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [url, setUrl] = React.useState<string>("");
  const [preview, setPreview] = React.useState(false);

  React.useEffect(() => {
    setTitle(props.question.title);
    setDescription(
      props.question.description ? props.question.description : ""
    );
    setUrl(props.question.link ? props.question.link : "");
    setPreview(false);
  }, [props.question]);

  const isSubmitEnabled = (): boolean => title != "";

  const onConfirm = async () => {
    props.onConfirm({ ...props.question, description, link: url, title });
  };

  const tabs: TabData[] = [
    {
      label: "Article",
      children: (
        <>
          <ArticleOverview
            open={!preview}
            description={description}
            setTitle={(e) => setTitle(e.target.value)}
            setDescription={(e) => setDescription(e.target.value)}
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
      children: <></>,
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
