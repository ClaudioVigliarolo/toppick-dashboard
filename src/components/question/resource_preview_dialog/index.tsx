import React from "react";
import { AppDialog, TabData } from "@/components/ui/dialog/DialogStyles";
import Overview from "./sections/Overview";
import {
  QuestionResource,
  ValidationStatus,
} from "@toppick/common/build/interfaces";

interface ResourcePreviewDialogProps {
  open: boolean;
  resource: QuestionResource | null;
  onClose: () => void;
  headerText: string;
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

export default function ResourcePreviewDialog({
  error,
  headerText,
  onClose,
  open,
  resource,
}: ResourcePreviewDialogProps) {
  const [currentResource, setCurrentResource] =
    React.useState<QuestionResource>(DEFAULT_RESOURCE);

  React.useEffect(() => {
    if (resource) {
      setCurrentResource(resource);
    } else {
      setCurrentResource(DEFAULT_RESOURCE);
    }
  }, [resource, open]);

  const tabs: TabData[] = [
    {
      label: "Overview",
      children: (
        <Overview
          description={currentResource.snippet!}
          image={currentResource.thumbnail!}
          title={currentResource.title!}
        />
      ),
    },
  ];
  return (
    <>
      <AppDialog
        open={open}
        headerText={headerText}
        minWidth={600}
        minHeight={400}
        tabData={tabs}
        showTabs={false}
        onRefuse={onClose}
        error={error}
      />
    </>
  );
}
