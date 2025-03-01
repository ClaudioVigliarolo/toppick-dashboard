import React from "react";
import { Dialog, TabData } from "@/components/ui/dialog/Dialog";
import {
  SearchKeyword,
  SearchKeywordCreated,
  SearchKeywordType,
  SearchType,
} from "@toppick/common/build/interfaces";
import Overview from "./sections/Overview";
import Results from "./sections/Results";
import { validateTitle } from "@toppick/common/build/validators";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (keyword: SearchKeywordCreated) => void;
  keyword?: SearchKeyword;
  topicId: number;
  loading: boolean;
  headerText: string;
  onDelete?: () => void;
  searchType: SearchType;
  error: string;
  isShowResults?: boolean;
}

const DEFAULT_STATE = {
  query: "",
  title: "",
  active: false,
};

export default function SearchDialog({
  open,
  onClose,
  onConfirm,
  keyword,
  topicId,
  headerText,
  loading,
  onDelete,
  searchType,
  isShowResults,
  error,
}: SearchDialogProps) {
  const [currentKeyword, setCurrentKeyword] =
    React.useState<SearchKeywordCreated>({
      keyword_type: SearchKeywordType.Automatic,
      search_type: searchType,
      topic_id: topicId,
      ...DEFAULT_STATE,
    });

  React.useEffect(() => {
    try {
      if (keyword) {
        setCurrentKeyword({
          keyword_type: keyword.keyword_type,
          query: keyword.query,
          search_type: keyword.search_type!,
          title: keyword.title,
          topic_id: topicId,
          active: keyword.active,
        });
      } else {
        setCurrentKeyword({
          keyword_type: SearchKeywordType.Automatic,
          search_type: searchType,
          topic_id: topicId,
          ...DEFAULT_STATE,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [keyword, open, searchType, topicId]);

  const onSubmit = async () => {
    onConfirm(currentKeyword);
  };

  const handleKeywordTypeChange = (e: React.ChangeEvent<any>) => {
    setCurrentKeyword({ ...currentKeyword, keyword_type: e.target.value });
  };

  const handleKeywordActiveChange = (e: React.ChangeEvent<any>) => {
    setCurrentKeyword({ ...currentKeyword, active: e.target.value === "true" });
  };

  const setQuery = (e: React.ChangeEvent<any>) => {
    setCurrentKeyword({ ...currentKeyword, query: e.currentTarget.value });
  };

  const setTitle = (e: React.ChangeEvent<any>) => {
    setCurrentKeyword({ ...currentKeyword, title: e.currentTarget.value });
  };

  const isShowSubmit = (): boolean =>
    validateTitle(currentKeyword.title) && validateTitle(currentKeyword.query);

  const tabs: TabData[] = [
    {
      label: "Overview",
      children: (
        <Overview
          handleKeywordTypeChange={handleKeywordTypeChange}
          handleActiveChange={handleKeywordActiveChange}
          keywordType={currentKeyword.keyword_type}
          active={currentKeyword.active.toString()}
          query={currentKeyword.query}
          title={currentKeyword.title}
          setQuery={setQuery}
          setTitle={setTitle}
          onDelete={onDelete}
        />
      ),
    },
    {
      label: "Search Results",
      isHidden: !isShowResults,
      children: (
        <Results
          keywordId={keyword ? keyword.id : -1}
          searchType={searchType}
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
        minHeight={560}
        loading={loading}
        tabData={tabs}
        confirmButtonDisabled={!isShowSubmit()}
        onConfirm={onSubmit}
        onRefuse={() => {
          onClose();
          setCurrentKeyword({ ...currentKeyword, ...DEFAULT_STATE });
        }}
        error={error}
      />
    </>
  );
}
