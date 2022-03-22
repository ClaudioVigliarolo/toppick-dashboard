import React from "react";
import { AppDialog, TabData } from "@/components/ui/dialog/DialogStyles";
import ArticlePreview from "./sections/ExtResourcePreview";
import ArticleOverview from "./sections/ExtResourceOverview";
import ExamplesPreview from "./sections/Examples";
import { AuthContext } from "@/context/AuthContext";
import {
  QuestionCreated,
  QuestionExampleCreated,
  QuestionResourceCreated,
} from "@toppick/common";
interface QuestionDialogProps {
  open: boolean;
  onConfirm: (q: QuestionCreated) => void;
  onRefuse: () => void;
  question: QuestionCreated;
  headerText: string;
}

export default function QuestionDialog(props: QuestionDialogProps) {
  const [title, setTitle] = React.useState<string>("");
  const [resources, setResources] = React.useState<QuestionResourceCreated[]>(
    []
  );
  const [currentPreviewUrl, setCurrentPreviewUrl] = React.useState<string>("");
  const [examples, setExamples] = React.useState<QuestionExampleCreated[]>([]);
  const { userId } = React.useContext(AuthContext);

  React.useEffect(() => {
    setTitle(props.question.title);
    setResources(props.question.resources ? props.question.resources : []);
    setExamples(props.question.examples ? props.question.examples : []);
    setCurrentPreviewUrl("");
  }, [props.question]);

  const isSubmitEnabled = (): boolean => title !== "";

  const onConfirm = async () => {
    const newQuestion: QuestionCreated = {
      ...props.question,
      title,
      examples: examples.filter((e) => e.title !== ""),
      resources: resources.filter((e) => e.url !== ""),
    };
    props.onConfirm(newQuestion);
  };

  const onExamplesChange = (e: React.ChangeEvent<any>, i: number) => {
    const newExample = [...examples];
    newExample[i].title = e.target.value;
    setExamples(newExample);
  };
  const onChangeExtResource = (e: React.ChangeEvent<any>, i: number) => {
    const newResource = [...resources];
    newResource[i].url = e.target.value;
    setResources(newResource);
  };

  const onAddExample = () => {
    setExamples((examples) => [
      ...examples,
      {
        user_id: userId,
        title: "",
      },
    ]);
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
              setResources(resources.filter((item, i) => i !== delIndex))
            }
            onAdd={() =>
              setResources((resources) => [
                ...resources,
                { url: "", user_id: userId, id: 0 },
              ])
            }
            title={title}
            resources={resources}
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
            onAdd={onAddExample}
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
