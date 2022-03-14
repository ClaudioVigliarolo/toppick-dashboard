import React from "react";
import { AppDialog, TabData } from "@/components/ui/dialog/DialogStyles";
import ArticlePreview from "./sections/ExtResourcePreview";
import ArticleOverview from "./sections/ExtResourceOverview";
import ExamplesPreview from "./sections/Examples";
import {
  Example,
  QuestionExtResource,
  CreatedQuestion,
  CreatedExample,
} from "@/interfaces/dash_topics";
import { AuthContext } from "@/context/AuthContext";
import { getHash } from "@/utils/utils";
interface QuestionDialogProps {
  open: boolean;
  onConfirm: (q: CreatedQuestion) => void;
  onRefuse: () => void;
  question: CreatedQuestion;
  headerText: string;
}

export default function QuestionDialog(props: QuestionDialogProps) {
  const [title, setTitle] = React.useState<string>("");
  const [extResources, setExtResources] = React.useState<QuestionExtResource[]>(
    []
  );
  const [currentPreviewUrl, setCurrentPreviewUrl] = React.useState<string>("");
  const [examples, setExamples] = React.useState<CreatedExample[]>([]);
  const { userId } = React.useContext(AuthContext);

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
    const newQuestion: CreatedQuestion = {
      ...props.question,
      title,
      examples: examples.filter((e) => e.title !== ""),
      ext_resources: extResources.filter((e) => e.url !== ""),
    };
    props.onConfirm(newQuestion);
  };

  const onExamplesChange = (e: React.ChangeEvent<any>, i: number) => {
    const newExample = [...examples];
    newExample[i].title = e.target.value;
    setExamples(newExample);
  };
  const onChangeExtResource = (e: React.ChangeEvent<any>, i: number) => {
    const newResource = [...extResources];
    newResource[i].url = e.target.value;
    newResource[i].id = getHash(newResource[i].url);
    setExtResources(newResource);
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
              setExtResources((extResources) => [
                ...extResources,
                { url: "", user_id: userId, id: 0 },
              ])
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
              setExamples((examples) => [
                ...examples,
                { title: "", user_id: userId, id: 0 },
              ])
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
      <AppDialog
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
