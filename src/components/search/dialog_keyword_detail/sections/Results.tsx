import React from "react";
import {
  SearchResultArticle,
  SearchResultCreated,
  SearchResultImage,
  SearchResultVideo,
  SearchType,
} from "@toppick/common/build/interfaces";
import {
  createSearchResultArticle,
  createSearchResultImage,
  createSearchResultVideo,
  deleteSearchResultArticle,
  deleteSearchResultImage,
  deleteSearchResultVideo,
  getSearchResultsArticle,
  getSearchResultsImage,
  getSearchResultsVideo,
  updateSearchResultArticle,
  updateSearchResultImage,
  updateSearchResultVideo,
} from "@toppick/common/build/api";

import SearchResultDialog from "../../dialog_result";
import { getErrorMessage } from "@toppick/common/build/utils";
import { useDialogStyles } from "@/components/ui/dialog/Dialog";
import DialogEditField from "@/components/ui/button/DialogEditField";
import DialogAddButton from "@/components/ui/button/DialogAddButton";
import { getAuthToken } from "@/utils/auth";

interface ResultsProps {
  keywordId: number;
  searchType: string;
}

export default function Results({ searchType, keywordId }: ResultsProps) {
  const [isShowCreateDialog, setIsShowCreateDialog] =
    React.useState<boolean>(false);
  const [isShowEditDialog, setIsShowEditDialog] =
    React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [currentSearchResult, setCurrentSearchResult] =
    React.useState<SearchResultCreated | null>(null);
  const [results, setResults] = React.useState<SearchResultCreated[]>([]);
  const classes = { ...useDialogStyles() };

  React.useEffect(() => {
    (async () => {
      try {
        switch (searchType) {
          case SearchType.Article:
            setResults(
              await getSearchResultsArticle(await getAuthToken(), {
                keyword_id: keywordId,
              })
            );
            break;
          case SearchType.Video:
            setResults(
              await getSearchResultsVideo(await getAuthToken(), {
                keyword_id: keywordId,
              })
            );
            break;

          case SearchType.Image:
            setResults(
              await getSearchResultsImage(await getAuthToken(), {
                keyword_id: keywordId,
              })
            );
            break;

          default:
            break;
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [keywordId]);

  const onCreateSearchResult = async (link: string) => {
    setIsLoading(true);
    setError("");
    try {
      const createdResult = (await createSearchResult(
        link
      )) as SearchResultArticle;
      const newResults = [
        ...results,
        { id: createdResult.id, link: createdResult.link },
      ];
      setResults(newResults);
      setCurrentSearchResult(null);
      setIsShowCreateDialog(false);
    } catch (error) {
      setError(getErrorMessage(error));
    }
    setIsLoading(false);
  };
  const onUpdateSearchResult = async (link: string) => {
    setIsLoading(true);
    setError("");
    try {
      const updatedResult = (await updateSearchResult(
        currentSearchResult!.id,
        link
      )) as SearchResultArticle;
      const index = results.findIndex(
        (res) => res.id === currentSearchResult!.id
      );
      results[index] = {
        id: updatedResult.id,
        link: updatedResult.link,
      };
      setResults([...results]);
      setCurrentSearchResult(null);
      setIsShowEditDialog(false);
    } catch (error) {
      setError(getErrorMessage(error));
    }
    setIsLoading(false);
  };

  const createSearchResult = async (
    link: string
  ): Promise<
    SearchResultArticle | SearchResultImage | SearchResultVideo | undefined
  > => {
    switch (searchType) {
      case SearchType.Article:
        return await createSearchResultArticle(
          await getAuthToken(),
          link,
          keywordId
        );
      case SearchType.Video:
        return await createSearchResultVideo(
          await getAuthToken(),
          link,
          keywordId
        );

      case SearchType.Image:
        return await createSearchResultImage(
          await getAuthToken(),
          link,
          keywordId
        );
    }
  };

  const updateSearchResult = async (
    id: number,
    link: string
  ): Promise<
    SearchResultArticle | SearchResultImage | SearchResultVideo | undefined
  > => {
    switch (searchType) {
      case SearchType.Article:
        return await updateSearchResultArticle(await getAuthToken(), id, link);
      case SearchType.Video:
        return await updateSearchResultVideo(await getAuthToken(), id, link);
      case SearchType.Image:
        return await updateSearchResultImage(await getAuthToken(), id, link);
    }
  };

  const deleteSearchResult = async (id: number): Promise<void> => {
    switch (searchType) {
      case SearchType.Article:
        await deleteSearchResultArticle(await getAuthToken(), id);
        break;
      case SearchType.Video:
        await deleteSearchResultVideo(await getAuthToken(), id);
        break;

      case SearchType.Image:
        await deleteSearchResultImage(await getAuthToken(), id);
        break;
      default:
        break;
    }
  };

  const onDeleteSearchResult = async (id: number) => {
    await deleteSearchResult(id);
    setResults(results.filter((res) => res.id !== id));
  };

  return (
    <div className={classes.tabContainer}>
      {results.map((res, i) => (
        <DialogEditField
          key={i}
          label={"Result " + (i + 1)}
          text={res.link}
          onEdit={() => {
            setCurrentSearchResult(res);
            setIsShowEditDialog(true);
          }}
        />
      ))}

      <DialogAddButton
        onClick={() => {
          setIsShowCreateDialog(true);
        }}
        title="Add New Result"
      />

      <SearchResultDialog
        headerText="Edit Search Result"
        open={isShowEditDialog}
        onSubmit={onUpdateSearchResult}
        link={currentSearchResult ? currentSearchResult.link : ""}
        loading={isLoading}
        error={error}
        onDelete={() => {
          onDeleteSearchResult(currentSearchResult!.id);
          setIsShowEditDialog(false);
        }}
        onClose={() => setIsShowEditDialog(false)}
      />
      <SearchResultDialog
        headerText="Create Search Result"
        open={isShowCreateDialog}
        onSubmit={onCreateSearchResult}
        link=""
        error={error}
        loading={isLoading}
        onClose={() => setIsShowCreateDialog(false)}
      />
    </div>
  );
}
