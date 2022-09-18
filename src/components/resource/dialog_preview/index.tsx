import React from "react";
import { Dialog, TabData } from "@/components/ui/dialog/Dialog";
import Overview from "./sections/Overview";
import { Resource, ValidationStatus } from "@toppick/common/build/interfaces";

interface ResourcePreviewDialogProps {
  open: boolean;
  resource: Resource | null;
  onClose: () => void;
  headerText: string;
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

export default function ResourcePreviewDialog({
  error,
  headerText,
  onClose,
  open,
  resource,
}: ResourcePreviewDialogProps) {
  const [currentResource, setCurrentResource] =
    React.useState<Resource>(DEFAULT_RESOURCE);

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
      <Dialog
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
