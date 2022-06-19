import React from "react";
import { AppDialog, TabData } from "@/components/ui/dialog/DialogStyles";
import {
  SearchKeyword,
  SearchKeywordCreated,
  SearchKeywordType,
  SearchType,
  validateTitle,
  SearchResultCreated,
} from "@toppick/common";
import Overview from "./sections/Overview";
import Results from "./sections/Results";
import { getSearchResultsArticle } from "@/services/search";
import { AuthContext } from "@/context/AuthContext";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (
    keyword: SearchKeywordCreated,
    results: SearchResultCreated[]
  ) => void;
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

  const [results, setResults] = React.useState<SearchResultCreated[]>([]);
  const { authToken } = React.useContext(AuthContext);

  React.useEffect(() => {
    (async () => {
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

          switch (searchType) {
            case SearchType.Article:
              setResults(
                await getSearchResultsArticle(authToken, keyword.id, 100, 0)
              );
              break;

            default:
              break;
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [keyword, open]);

  const onSubmit = async () => {
    onConfirm(currentKeyword, results);
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

  const onAddResult = () => {
    setResults((results) => [...results, { link: "" }]);
  };

  const onDeleteResult = (index: number) => {
    const newResults = [...results];
    newResults.splice(index, 1);
    setResults(newResults);
  };

  const onChangeResultLink = (e: React.ChangeEvent<any>, index: number) => {
    const newResults = [...results];
    newResults[index].link = e.currentTarget.value;
    setResults(newResults);
  };

  const isSubmitEnabled = (): boolean =>
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
          results={results}
          onAdd={onAddResult}
          onChangeLink={onChangeResultLink}
          onDelete={onDeleteResult}
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
        minHeight={560}
        loading={loading}
        tabData={tabs}
        confirmButtonDisabled={!isSubmitEnabled()}
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
