import React from "react";
import { Dialog, TabData } from "@/components/ui/dialog/Dialog";
import { SearchType } from "@toppick/common/build/interfaces";
import Search from "./sections/Search";

interface SearchDialogProps {
  open: boolean;
  topicId: number;
  onClose: () => void;
  headerText: string;
  titlePlaceholder?: string;
  descriptionPlaceholder?: string;
}

export default function SearchDialog(props: SearchDialogProps) {
  const tabs: TabData[] = [
    {
      label: "Article",
      children: (
        <Search topicId={props.topicId} searchType={SearchType.Article} />
      ),
    },
    {
      label: "Video",
      children: (
        <Search topicId={props.topicId} searchType={SearchType.Video} />
      ),
    },
    {
      label: "Image",
      children: (
        <Search topicId={props.topicId} searchType={SearchType.Image} />
      ),
    },
  ];
  return (
    <>
      <Dialog
        open={props.open}
        headerText={props.headerText}
        minWidth={500}
        minHeight={560}
        tabData={tabs}
        onRefuse={props.onClose}
      />
    </>
  );
}
