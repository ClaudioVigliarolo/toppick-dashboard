import React from "react";
import { AppDialog, TabData } from "@/components/ui/dialog/Dialog";
import Overview from "./sections/Overview";

interface ResultDialogProps {
  open: boolean;
  link: string;
  onClose: () => void;
  onDelete?: () => void;
  onSubmit: (link: string) => void;
  headerText: string;
  loading: boolean;
  error: string;
}

export default function ResultDialog(props: ResultDialogProps) {
  const [currentLink, setCurrentLink] = React.useState<string>("");

  React.useEffect(() => {
    setCurrentLink(props.link);
  }, [props.link, props.open]);

  const onSubmit = () => {
    props.onSubmit(currentLink);
  };

  const tabs: TabData[] = [
    {
      label: "Overview",
      children: (
        <Overview
          link={currentLink}
          setLink={(e) => {
            setCurrentLink(e.target.value);
          }}
          onDelete={props.onDelete}
        />
      ),
    },
  ];
  return (
    <>
      <AppDialog
        open={props.open}
        headerText={props.headerText}
        minWidth={400}
        minHeight={100}
        tabData={tabs}
        showTabs={false}
        loading={props.loading}
        onRefuse={props.onClose}
        onConfirm={onSubmit}
        error={props.error}
      />
    </>
  );
}
