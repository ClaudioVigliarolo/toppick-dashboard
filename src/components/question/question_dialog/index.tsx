import React from "react";
import { AppDialog, TabData } from "@/components/ui/dialog/DialogStyles";
import Answers from "./sections/Answers";
import { AuthContext } from "@/context/AuthContext";
import Question from "./sections/Question";
import { getQuestionDetails } from "@toppick/common/build/api";
import Resources from "./sections/Resources";
import { QuestionDetail, QuestionType } from "@toppick/common/build/interfaces";
interface QuestionDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (question: QuestionDetail) => void;
  questionId?: number;
  loading: boolean;
  headerText: string;
  onDelete?: () => void;
  error: string;
}

/*
option 1: load all examples and resources subito
option 2: 0 answers and resources. caricate nella propria schermata (passo solo counter!)

*/

const DEFAULT_STATE: QuestionDetail = {
  answers: [],
  id: -1,
  resources: [],
  title: "",
  user_id: "",
  users: {
    image: "",
    uid: "",
    username: "",
  },
  active: true,
  type: QuestionType.Default,
  answers_count: 0,
  resources_count: 0,
};

export default function QuestionDialog({
  questionId,
  open,
  onClose,
  headerText,
  error,
  loading,
  onConfirm,
  onDelete,
}: QuestionDialogProps) {
  const [currentQuestion, setCurrentQuestion] =
    React.useState<QuestionDetail>(DEFAULT_STATE);
  const { authToken, userId } = React.useContext(AuthContext);

  React.useEffect(() => {
    (async () => {
      try {
        if (questionId) {
          setCurrentQuestion(
            await getQuestionDetails({
              id: questionId,
              token: authToken,
              include_answers: false,
              include_resources: false,
            })
          );
        } else {
          setCurrentQuestion(DEFAULT_STATE);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [questionId, open]);

  const setTitle = (e: React.ChangeEvent<any>) => {
    setCurrentQuestion({ ...currentQuestion, title: e.currentTarget.value });
  };

  const handleActiveChange = (e: React.ChangeEvent<any>) => {
    setCurrentQuestion({
      ...currentQuestion,
      active: e.target.value === "true",
    });
  };

  const handleTypeChange = (e: React.ChangeEvent<any>) => {
    setCurrentQuestion({
      ...currentQuestion,
      type: e.target.value,
    });
  };

  const tabs: TabData[] = [
    {
      label: "Question",
      children: (
        <>
          <Question
            setTitle={setTitle}
            title={currentQuestion.title}
            onDelete={onDelete}
            active={currentQuestion.active!.toString()}
            handleActiveChange={handleActiveChange}
            handleTypeChange={handleTypeChange}
            type={currentQuestion.type!}
          />
        </>
      ),
    },
    // {
    //   label: "Article",
    //   children: (
    //     <>
    //       <ArticleOverview
    //         open={!currentPreviewUrl}
    //         setTitle={(e) => setTitle(e.target.value)}
    //         onPreview={(url) => setCurrentPreviewUrl(url)}
    //         onChange={onChangeExtResource}
    //         onDelete={(delIndex) =>
    //           setResources(resources.filter((item, i) => i !== delIndex))
    //         }
    //         onAdd={() =>
    //           setResources((resources) => [
    //             ...resources,
    //             {
    //               url: "",
    //               user_id: userId,
    //               id: 0,
    //               status: ValidationStatus.Confirmed,
    //             },
    //           ])
    //         }
    //         title={title}
    //         resources={resources}
    //       />
    //       <ArticlePreview
    //         open={currentPreviewUrl !== ""}
    //         closePreview={() => setCurrentPreviewUrl("")}
    //         url={currentPreviewUrl}
    //       />
    //     </>
    //   ),
    // },
    {
      label: "Answers",
      children: (
        <>
          <Answers questionId={questionId} />
        </>
      ),
    },
    {
      label: "Resources",
      children: (
        <>
          <Resources questionId={questionId} />
        </>
      ),
    },
  ];

  return (
    <>
      <AppDialog
        open={open}
        headerText={headerText}
        minWidth={600}
        tabData={tabs}
        minHeight={450}
        onConfirm={() => {
          onConfirm(currentQuestion);
        }}
        onRefuse={onClose}
        loading={loading}
        error={error}
      />
    </>
  );
}
