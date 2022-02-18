import React from "react";
import { CustomDialog, TabData } from "../DialogStyles";
import ArticlePreview from "./sections/ExtResourcePreview";
import ArticleOverview from "./sections/ExtResourceOverview";
import ExamplesPreview from "./sections/Examples";
import {
  Example,
  QuestionExtResource,
  Question,
} from "../../../interfaces/Interfaces";
interface QuestionDialogProps {
  open: boolean;
  onConfirm: (q: Question) => void;
  onRefuse: () => void;
  question: Question;
  headerText: string;
}

export default function QuestionDialog(props: QuestionDialogProps) {
  const [title, setTitle] = React.useState<string>("");
  const [extResources, setExtResources] = React.useState<QuestionExtResource[]>(
    []
  );
  const [currentPreviewUrl, setCurrentPreviewUrl] = React.useState<string>("");
  const [examples, setExamples] = React.useState<Example[]>([]);

  React.useEffect(() => {
    setTitle(props.question.title);
    setExtResources(
      props.question.ext_resources ? props.question.ext_resources : []
    );
    setExamples(props.question.examples ? props.question.examples : []);
    setCurrentPreviewUrl("");
  }, [props.question]);

  const isSubmitEnabled = (): boolean => title !== "";

  const onConfirm = async () => {
    const newQuestion: Question = {
      ...props.question,
      title,
      examples: examples.filter((e) => e.title !== ""),
      ext_resources: extResources.filter((e) => e.url !== ""),
    };
    props.onConfirm(newQuestion);
  };

  const onExamplesChange = (e: React.ChangeEvent<any>, i: number) => {
    const newExamples = [...examples];
    newExamples[i].title = e.target.value;
    setExamples(newExamples);
  };
  const onChangeExtResource = (e: React.ChangeEvent<any>, i: number) => {
    const newUrls = [...extResources];
    newUrls[i].url = e.target.value;
    setExtResources(newUrls);
  };

  const tabs: TabData[] = [
    {
      label: "Article",
      children: (
        <>
          <ArticleOverview
            open={!currentPreviewUrl}
            setTitle={(e) => setTitle(e.target.value)}
            onPreview={(url) => setCurrentPreviewUrl(url)}
            onChange={onChangeExtResource}
            onDelete={(delIndex) =>
              setExtResources(extResources.filter((item, i) => i !== delIndex))
            }
            onAdd={() =>
              setExtResources((extResources) => [...extResources, { url: "" }])
            }
            title={title}
            extResources={extResources}
          />
          <ArticlePreview
            open={currentPreviewUrl !== ""}
            closePreview={() => setCurrentPreviewUrl("")}
            url={currentPreviewUrl}
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
            onAdd={() =>
              setExamples((examples) => [...examples, { title: "" }])
            }
            onChange={onExamplesChange}
            onDelete={(delIndex) =>
              setExamples(examples.filter((item, i) => i !== delIndex))
            }
          />
        </>
      ),
    },
  ];

  return (
    <>
      <CustomDialog
        open={props.open}
        headerText={currentPreviewUrl ? "Preview" : props.headerText}
        minWidth={600}
        tabData={tabs}
        confirmButtonDisabled={!isSubmitEnabled()}
        minHeight={450}
        onConfirm={onConfirm}
        onRefuse={props.onRefuse}
        loading={false}
      />
    </>
  );
}
