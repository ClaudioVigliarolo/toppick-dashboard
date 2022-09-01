import React from "react";
import { AppDialog, TabData } from "@/components/ui/dialog/DialogStyles";
import Overview from "./sections/Overview";
import {
  QuestionResource,
  ValidationStatus,
} from "@toppick/common/build/interfaces";

interface ResourceDialogProps {
  open: boolean;
  resource: QuestionResource | null;
  onClose: () => void;
  onDelete?: () => void;
  onSubmit: (resource: QuestionResource) => void;
  headerText: string;
  loading: boolean;
  error: string;
}

const DEFAULT_RESOURCE: QuestionResource = {
  id: -1,
  url: "",
  user_id: "",
  title: "",
  snippet: "",
  status: ValidationStatus.Active,
  thumbnail: "",
};

export default function ResourceDialog({
  error,
  headerText,
  loading,
  onClose,
  onSubmit,
  open,
  resource,
  onDelete,
}: ResourceDialogProps) {
  const [currentResource, setCurrentResource] =
    React.useState<QuestionResource>(DEFAULT_RESOURCE);

  React.useEffect(() => {
    if (resource) {
      setCurrentResource(resource);
    } else {
      setCurrentResource(DEFAULT_RESOURCE);
    }
  }, [resource, open]);

  const setUrl = (e: React.ChangeEvent<any>) => {
    setCurrentResource({ ...currentResource, url: e.currentTarget.value });
  };

  const tabs: TabData[] = [
    {
      label: "Overview",
      children: (
        <Overview
          url={currentResource.url}
          setUrl={setUrl}
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
        onConfirm={() => {
          onSubmit(currentResource);
        }}
        error={error}
      />
    </>
  );
}
