import React from "react";
import { AppDialog, TabData } from "@/components/ui/dialog/DialogStyles";
import Search from "./sections/Search";
import { SearchKeyword, SearchType } from "@toppick/common";
import { getSearchKeywords, updateSearchKeywords } from "@/services/search";
import { AuthContext } from "@/context/AuthContext";
import { validateCounter } from "@/utils/validators";

interface SearchDialogProps {
  open: boolean;
  id: number | null;
  onClose: () => void;
  headerText: string;
  titlePlaceholder?: string;
  descriptionPlaceholder?: string;
}

export default function SearchDialog(props: SearchDialogProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [keywords, setKeywords] = React.useState<SearchKeyword[]>([]);
  const { authToken } = React.useContext(AuthContext);

  React.useEffect(() => {
    (async () => {
      try {
        if (props.id) {
          const keywords = await getSearchKeywords(authToken, props.id);
          setKeywords(keywords);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [props.id]);

  const onConfirm = async () => {
    setLoading(true);
    try {
      await updateSearchKeywords(authToken, props.id!, keywords);
      props.onClose();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onKeywordCounterChange = (
    e: React.ChangeEvent<any>,
    pos: number,
    type: SearchType
  ) => {
    let counter = 0;
    for (let keyword of keywords) {
      if (keyword.type === type) {
        if (counter === pos) {
          if (validateCounter(e.currentTarget.value)) {
            keyword.counter = parseInt(e.currentTarget.value);
          }
          return setKeywords([...keywords]);
        }
        counter++;
      }
    }
  };

  const onKeywordAdd = (keyword: string, type: SearchType) => {
    const newKeywords = keywords.filter(
      (t) => !(t.type === type && t.title === keyword)
    );
    newKeywords.push({
      title: keyword,
      counter: 10,
      type,
    });
    setKeywords(newKeywords);
  };

  const onKeywordRemove = (pos: number, type: string) => {
    let counter = 0;
    let currIndex = 0;
    for (let keyword of keywords) {
      if (keyword.type === type) {
        if (counter === pos) {
          keywords.splice(currIndex, 1);
          return setKeywords([...keywords]);
        }
        counter++;
      }
      currIndex++;
    }
  };

  const getKeywordsByType = (type: SearchType) => {
    return keywords.filter((keyword) => keyword.type === type);
  };

  const isSubmitEnabled = (): boolean => true;

  const tabs: TabData[] = [
    {
      label: "Article",
      children: (
        <Search
          keywords={getKeywordsByType(SearchType.ARTICLE)}
          onKeywordAdd={(title) => onKeywordAdd(title, SearchType.ARTICLE)}
          onChangeCounter={(e, i) =>
            onKeywordCounterChange(e, i, SearchType.ARTICLE)
          }
          onKeywordRemove={(i) => onKeywordRemove(i, SearchType.ARTICLE)}
        />
      ),
    },
    {
      label: "Video",
      children: (
        <Search
          keywords={getKeywordsByType(SearchType.VIDEO)}
          onKeywordAdd={(title) => onKeywordAdd(title, SearchType.VIDEO)}
          onChangeCounter={(e, i) =>
            onKeywordCounterChange(e, i, SearchType.VIDEO)
          }
          onKeywordRemove={(i) => onKeywordRemove(i, SearchType.VIDEO)}
        />
      ),
    },
    {
      label: "Image",
      children: (
        <Search
          keywords={getKeywordsByType(SearchType.IMAGE)}
          onKeywordAdd={(title) => onKeywordAdd(title, SearchType.IMAGE)}
          onChangeCounter={(e, i) =>
            onKeywordCounterChange(e, i, SearchType.IMAGE)
          }
          onKeywordRemove={(i) => onKeywordRemove(i, SearchType.IMAGE)}
        />
      ),
    },
  ];
  return (
    <>
      <AppDialog
        open={props.open}
        headerText={props.headerText}
        minWidth={500}
        minHeight={560}
        loading={loading}
        tabData={tabs}
        confirmButtonDisabled={!isSubmitEnabled()}
        onConfirm={onConfirm}
        onRefuse={props.onClose}
      />
    </>
  );
}
