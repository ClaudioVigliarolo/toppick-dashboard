import React from "react";
import { Dialog, TabData } from "@/components/ui/dialog/Dialog";
import Answers from "./sections/Answers";
import { AuthContext } from "@/context/AuthContext";
import Overview from "./sections/Overview";
import { getQuestionDetails } from "@toppick/common/build/api";
import Resources from "./sections/Resources";
import {
  Question,
  QuestionCreated,
  QuestionType,
} from "@toppick/common/build/interfaces";
import { getAuthToken } from "@/utils/auth";
interface QuestionDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (question: QuestionCreated) => void;
  questionId?: number;
  topicId: number;
  loading: boolean;
  headerText: string;
  onDelete?: () => void;
  error: string;
}

const DEFAULT_QUESTION: Question = {
  answers: [],
  id: -1,
  resources: [],
  title: "",
  user_id: "",
  users: {
    image: "",
    uid: "",
    username: "",
    email: "",
  },
  picker_active: false,
  active: true,
  type: QuestionType.Default,
  answer_count: 0,
  resource_count: 0,
};

export default function QuestionDialog({
  questionId,
  topicId,
  open,
  onClose,
  headerText,
  error,
  loading,
  onSubmit,
  onDelete,
}: QuestionDialogProps) {
  const [currentQuestion, setCurrentQuestion] =
    React.useState<Question>(DEFAULT_QUESTION);

  React.useEffect(() => {
    (async () => {
      try {
        if (questionId) {
          setCurrentQuestion(
            await getQuestionDetails(await getAuthToken(), {
              id: questionId,
            })
          );
        } else {
          setCurrentQuestion(DEFAULT_QUESTION);
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

  const handlePickerActiveChange = (e: React.ChangeEvent<any>) => {
    setCurrentQuestion({
      ...currentQuestion,
      picker_active: e.target.value === "true",
    });
  };

  const handleTypeChange = (e: React.ChangeEvent<any>) => {
    setCurrentQuestion({
      ...currentQuestion,
      type: e.target.value,
    });
  };

  const onConfirm = () => {
    const newQuestion: QuestionCreated = {
      title: currentQuestion.title,
      topic_id: topicId,
      active: currentQuestion.active,
      picker_active: currentQuestion.picker_active,
      type: currentQuestion.type,
    };
    onSubmit(newQuestion);
  };

  const tabs: TabData[] = [
    {
      label: "Question",
      children: (
        <>
          <Overview
            setTitle={setTitle}
            title={currentQuestion.title}
            onDelete={onDelete}
            active={currentQuestion.active!.toString()}
            handleActiveChange={handleActiveChange}
            handleTypeChange={handleTypeChange}
            type={currentQuestion.type!}
            pickerActive={currentQuestion.picker_active.toString()}
            handlePickerActiveChange={handlePickerActiveChange}
          />
        </>
      ),
    },
    {
      label: "Answers",
      isHidden: !questionId,
      children: (
        <>
          <Answers questionId={questionId!} />
        </>
      ),
    },
    {
      label: "Resources",
      isHidden: !questionId,
      children: (
        <>
          <Resources questionId={questionId!} />
        </>
      ),
    },
  ];

  return (
    <>
      <Dialog
        open={open}
        headerText={headerText}
        minWidth={600}
        tabData={tabs}
        minHeight={450}
        onConfirm={onConfirm}
        onRefuse={onClose}
        loading={loading}
        error={error}
      />
    </>
  );
}
