import React from "react";
import { makeStyles } from "@material-ui/core";
import {
  SearchKeyword,
  SearchKeywordCreated,
  SearchType,
} from "@toppick/common/build/interfaces";
import KeywordDialog from "../../dialog_keyword_detail/index";
import {
  createSearchKeyword,
  deleteSearchKeyword,
  getSearchKeywords,
  sortSearchKeywords,
  updateSearchKeyword,
} from "@toppick/common/build/api";

import DragAndDrop from "@/components/ui/DragAndDrop";
import { getErrorMessage } from "@toppick/common/build/utils";
import DialogAddButton from "@/components/ui/button/DialogAddButton";
import { useDialogStyles } from "@/components/ui/dialog/Dialog";
import { getAuthToken } from "@/utils/auth";
const useStyles = makeStyles((theme) => ({
  switchContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    cursor: "pointer",
    color: "orange",
    fontSize: 30,
  },
  headerText: {
    color: "black",
    textAlign: "center",
  },
}));

interface SearchProps {
  searchType: SearchType;
  topicId: number;
}

export default function Search({ searchType, topicId }: SearchProps) {
  const classes = { ...useDialogStyles(), ...useStyles() };
  const [isKeywordCreateDialog, setIskeywordCreateModal] =
    React.useState<boolean>(false);
  const [isKeywordUpdateDialog, setIskeywordUpdateModal] =
    React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [currentKeywords, setCurrentKeywords] = React.useState<SearchKeyword[]>(
    []
  );
  const [currentKeyword, setCurrentKeyword] =
    React.useState<SearchKeyword | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const keywords = await getSearchKeywords(await getAuthToken(), {
          include_inactive: true,
          search_type: searchType,
          topic_id: topicId,
        });
        setCurrentKeywords(keywords);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const onCreateKeyword = async (createdKeyword: SearchKeywordCreated) => {
    setError("");
    setLoading(true);
    try {
      const keyword = await createSearchKeyword(
        await getAuthToken(),
        createdKeyword
      );
      setCurrentKeywords([...currentKeywords, keyword]);
      setIskeywordCreateModal(false);
      setCurrentKeyword(null);
    } catch (error) {
      setError(getErrorMessage(error));
    }
    setLoading(false);
  };

  const onDeleteKeyword = async () => {
    setError("");
    setLoading(true);
    try {
      await deleteSearchKeyword(await getAuthToken(), currentKeyword!.id);
      const newKeywords = currentKeywords.filter(
        (k) => k.id !== currentKeyword!.id
      );
      setCurrentKeywords(newKeywords);
      setIskeywordUpdateModal(false);
      setCurrentKeyword(null);
    } catch (error) {
      setError(getErrorMessage(error));
    }
    setLoading(false);
  };

  const onUpdateKeyword = async (updatedKeyword: SearchKeywordCreated) => {
    setError("");
    setLoading(true);
    try {
      const keyword = await updateSearchKeyword(
        await getAuthToken(),
        currentKeyword!.id,
        updatedKeyword
      );
      const newKeywords = [...currentKeywords];
      const index = newKeywords.findIndex((k) => k.id == keyword.id);
      newKeywords[index] = keyword;
      setCurrentKeywords(newKeywords);
      setIskeywordUpdateModal(false);
    } catch (error) {
      setError(getErrorMessage(error));
    }
    setLoading(false);
  };

  const onSortKeywords = async (keywords: { id: number }[]) => {
    const sortedKeywords: { id: number; index: number }[] = keywords.map(
      (k, i) => ({
        id: k.id,
        index: i,
      })
    );
    await sortSearchKeywords(await getAuthToken(), sortedKeywords);
  };

  return (
    <>
      <div className={classes.tabContainer}>
        <DialogAddButton
          onClick={() => {
            setIskeywordCreateModal(true);
          }}
          title="Add new Keyword"
        />

        <DragAndDrop
          items={currentKeywords}
          onDragEnd={onSortKeywords}
          itemStyles={{
            minWidth: 200,
            borderColor: "transparent",
            borderBottomColor: "orange",
            borderBottomWidth: 2,
            borderStyle: "solid",
          }}
          onEdit={(id: number) => {
            setCurrentKeyword(
              currentKeywords.find((keyword) => keyword.id === id)!
            );
            setIskeywordUpdateModal(true);
          }}
        />
        <KeywordDialog
          onClose={() => setIskeywordCreateModal(false)}
          open={isKeywordCreateDialog}
          topicId={topicId}
          error={error}
          loading={loading}
          headerText="Create Keyword"
          searchType={searchType}
          onConfirm={onCreateKeyword}
        />
        <KeywordDialog
          onClose={() => setIskeywordUpdateModal(false)}
          open={isKeywordUpdateDialog}
          topicId={topicId}
          headerText="Edit Keyword"
          loading={loading}
          isShowResults={true}
          error={error}
          searchType={searchType}
          keyword={currentKeyword!}
          onConfirm={onUpdateKeyword}
          onDelete={onDeleteKeyword}
        />
      </div>
    </>
  );
}
