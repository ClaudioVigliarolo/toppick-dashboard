import React from "react";
import { AppDialog, TabData } from "@/components/ui/dialog/Dialog";
import Overview from "./sections/Overview";
import {
  Resource,
  ResourceCreated,
  ValidationStatus,
} from "@toppick/common/build/interfaces";

interface ResourceDialogProps {
  open: boolean;
  resource: Resource | null;
  questionId: number;
  onClose: () => void;
  onDelete?: () => void;
  onSubmit: (resource: ResourceCreated) => void;
  headerText: string;
  loading: boolean;
  error: string;
}

const DEFAULT_RESOURCE: Resource = {
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
  questionId,
  onDelete,
}: ResourceDialogProps) {
  const [currentResource, setCurrentResource] =
    React.useState<Resource>(DEFAULT_RESOURCE);

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

  const onConfirm = () => {
    const newResource: ResourceCreated = {
      question_id: questionId,
      url: currentResource.url,
    };
    onSubmit(newResource);
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
          onConfirm();
        }}
        error={error}
      />
    </>
  );
}
