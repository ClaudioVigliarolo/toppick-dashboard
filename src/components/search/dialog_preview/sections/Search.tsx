import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import {
  SearchKeyword,
  SearchKeywordCreated,
  SearchType,
  SearchResultCreated,
} from "@toppick/common";
import TagItem from "@/components/ui/select/TagItem";
import KeywordDialogue from "../../dialog_detail/index";
import {
  createSearchKeyword,
  deleteSearchKeyword,
  getSearchKeywords,
  updateSearchKeyword,
  updateSearchResultsArticle,
} from "@/services/search";
import { AuthContext } from "@/context/AuthContext";
import { AxiosError } from "axios";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  },
  selectedKeywordsContainer: {
    marginTop: 10,
  },
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
  defaultKeywordsContainer: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: "90%",
  },
  addButtonContainer: {
    alignSelf: "center",
    width: "100%",
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
  },
  addButton: {
    width: 200,
  },
}));

interface SearchProps {
  searchType: SearchType;
  topicId: number;
}

export default function Search({ searchType, topicId }: SearchProps) {
  const classes = useStyles();
  const [isKeywordCreateDialogue, setIskeywordCreateModal] =
    React.useState<boolean>(false);
  const [isKeywordUpdateDialogue, setIskeywordUpdateModal] =
    React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [currentKeywords, setCurrentKeywords] = React.useState<SearchKeyword[]>(
    []
  );
  const [currentKeyword, setCurrentKeyword] =
    React.useState<SearchKeyword | null>(null);
  const { authToken } = React.useContext(AuthContext);

  React.useEffect(() => {
    (async () => {
      try {
        const keywords = await getSearchKeywords(
          authToken,
          topicId,
          searchType,
          true
        );
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
      const keyword = await createSearchKeyword(authToken, createdKeyword);
      setCurrentKeywords([...currentKeywords, keyword]);
      setIskeywordCreateModal(false);
    } catch (error) {
      const err = error as AxiosError;
      setError(err.response?.data);
    }
    setLoading(false);
  };

  const onDeleteKeyword = async () => {
    setError("");
    setLoading(true);
    try {
      await deleteSearchKeyword(authToken, currentKeyword!.id);
      const newKeywords = currentKeywords.filter(
        (k) => k.id !== currentKeyword!.id
      );
      setCurrentKeywords(newKeywords);
      setIskeywordUpdateModal(false);
    } catch (error) {
      const err = error as AxiosError;
      setError(err.response?.data);
    }
    setLoading(false);
  };

  const onUpdateKeyword = async (
    updatedKeyword: SearchKeywordCreated,
    updatedResults: SearchResultCreated[]
  ) => {
    setError("");
    setLoading(true);
    try {
      const keyword = await updateSearchKeyword(
        authToken,
        currentKeyword!.id,
        updatedKeyword
      );

      switch (keyword.search_type) {
        case SearchType.Article:
          await updateSearchResultsArticle(
            authToken,
            currentKeyword!.id,
            updatedResults
          );
          break;

        default:
          break;
      }

      const newKeywords = [...currentKeywords];
      const index = newKeywords.findIndex((k) => k.id == keyword.id);
      newKeywords[index] = keyword;
      setCurrentKeywords(newKeywords);
      setIskeywordUpdateModal(false);
    } catch (error) {
      const err = error as AxiosError;
      setError(err.response?.data);
    }
    setLoading(false);
  };

  return (
    <>
      <div className={classes.container}>
        <h4 className={classes.headerText}>Keywords</h4>
        <div className={classes.addButtonContainer}>
          <Button
            color="primary"
            size="small"
            onClick={() => {
              setIskeywordCreateModal(true);
            }}
            className={classes.addButton}
          >
            Create new Keyword
          </Button>
        </div>
        <div className={classes.selectedKeywordsContainer}>
          {currentKeywords.map((keyword, i) => (
            <TagItem
              editable={true}
              tag={keyword.title}
              onSelect={() => {
                setCurrentKeyword(keyword);
                setIskeywordUpdateModal(true);
              }}
              key={i}
            />
          ))}
        </div>
        <KeywordDialogue
          onClose={() => setIskeywordCreateModal(false)}
          open={isKeywordCreateDialogue}
          topicId={topicId}
          error={error}
          loading={loading}
          headerText="Create Keyword"
          searchType={searchType}
          onConfirm={onCreateKeyword}
        />
        <KeywordDialogue
          onClose={() => setIskeywordUpdateModal(false)}
          open={isKeywordUpdateDialogue}
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