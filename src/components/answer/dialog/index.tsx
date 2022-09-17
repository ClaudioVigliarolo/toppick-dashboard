import React from "react";
import { AppDialog, TabData } from "@/components/ui/dialog/Dialog";
import Overview from "./sections/Overview";
import {
  Answer,
  AnswerCreated,
  ValidationStatus,
} from "@toppick/common/build/interfaces";

interface AnswerDialogProps {
  open: boolean;
  answer: Answer | null;
  questionId: number;
  onClose: () => void;
  onDelete?: () => void;
  onSubmit: (answer: AnswerCreated) => void;
  headerText: string;
  loading: boolean;
  error: string;
}

const DEFAULT_ANSWER: Answer = {
  id: -1,
  user_id: "",
  title: "",
  status: ValidationStatus.Active,
};

export default function AnswerDetailDialog({
  answer,
  questionId,
  error,
  headerText,
  loading,
  onClose,
  onSubmit,
  open,
  onDelete,
}: AnswerDialogProps) {
  const [currentAnswer, setCurrentAnswer] =
    React.useState<Answer>(DEFAULT_ANSWER);

  React.useEffect(() => {
    if (answer) {
      setCurrentAnswer(answer);
    } else {
      setCurrentAnswer(DEFAULT_ANSWER);
    }
  }, [answer, open]);

  const setTitle = (e: React.ChangeEvent<any>) => {
    setCurrentAnswer({ ...currentAnswer, title: e.currentTarget.value });
  };

  const onConfirm = () => {
    const newAnswer: AnswerCreated = {
      question_id: questionId,
      title: currentAnswer.title,
    };
    onSubmit(newAnswer);
  };

  const tabs: TabData[] = [
    {
      label: "Overview",
      children: (
        <Overview
          title={currentAnswer.title}
          setTitle={setTitle}
          onDelete={onDelete}
        />
      ),
    },
  ];
  return (
    <>
      <AppDialog
        open={open}
        headerText={headerText}
        minWidth={400}
        minHeight={100}
        tabData={tabs}
        showTabs={false}
        loading={loading}
        onRefuse={onClose}
        onConfirm={onConfirm}
        error={error}
      />
    </>
  );
}
