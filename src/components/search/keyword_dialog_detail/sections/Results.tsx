import React from "react";
import { makeStyles, TextField, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
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
import { AuthContext } from "@/context/AuthContext";
import SearchResultDialog from "../../result_dialog";
import { getErrorMessage } from "@toppick/common/build/utils";

interface ResultsProps {
  keywordId: number;
  searchType: string;
}
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    maxHeight: 500,
  },
  textField: {
    width: "90%",
    marginRight: 20,
  },

  resultsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  editIcon: {
    cursor: "pointer",
    color: "orange",
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

  const classes = useStyles();
  const { authToken } = React.useContext(AuthContext);

  React.useEffect(() => {
    (async () => {
      try {
        switch (searchType) {
          case SearchType.Article:
            setResults(
              await getSearchResultsArticle(authToken, keywordId, 100, 0)
            );
            break;
          case SearchType.Video:
            setResults(
              await getSearchResultsVideo(authToken, keywordId, 100, 0)
            );
            break;

          case SearchType.Image:
            setResults(
              await getSearchResultsImage(authToken, keywordId, 100, 0)
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
        return await createSearchResultArticle(authToken, link, keywordId);
      case SearchType.Video:
        return await createSearchResultVideo(authToken, link, keywordId);

      case SearchType.Image:
        return await createSearchResultImage(authToken, link, keywordId);
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
        return await updateSearchResultArticle(authToken, id, link);
      case SearchType.Video:
        return await updateSearchResultVideo(authToken, id, link);
      case SearchType.Image:
        return await updateSearchResultImage(authToken, id, link);
    }
  };

  const deleteSearchResult = async (id: number): Promise<void> => {
    switch (searchType) {
      case SearchType.Article:
        await deleteSearchResultArticle(authToken, id);
        break;
      case SearchType.Video:
        await deleteSearchResultVideo(authToken, id);
        break;

      case SearchType.Image:
        await deleteSearchResultImage(authToken, id);
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
    <div className={classes.container}>
      {results.map((ex, i) => (
        <div className={classes.resultsContainer} key={i}>
          <TextField
            key={i}
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label={"Result " + (i + 1)}
            id="standard-helperText"
            value={ex.link}
            className={classes.textField}
            disabled={true}
          />
          <EditIcon
            className={classes.editIcon}
            onClick={() => {
              setCurrentSearchResult(ex);
              setIsShowEditDialog(true);
            }}
          />
        </div>
      ))}
      <div className={classes.addButtonContainer}>
        <Button
          color="primary"
          size="small"
          onClick={() => {
            setIsShowCreateDialog(true);
          }}
          className={classes.addButton}
        >
          Add New Result
        </Button>
      </div>
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
