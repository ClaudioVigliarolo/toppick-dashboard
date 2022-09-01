import React from "react";
import { makeStyles, TextField, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { Resource, ResourceCreated } from "@toppick/common/build/interfaces";
import {
  createResource,
  deleteResource,
  getResources,
  updateResource,
} from "@toppick/common/build/api";
import { AuthContext } from "@/context/AuthContext";
import ResourceDialog from "@/components/question/resource_dialog";
import ResourcePreviewDialog from "@/components/question/resource_preview_dialog";
import { AxiosError } from "axios";
import { getErrorMessage } from "@toppick/common/build/utils";
interface ResourcesProps {
  questionId: number;
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    width: "90%",
    marginRight: 20,
  },

  resourceContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  deleteIcon: {
    cursor: "pointer",
    color: "orangered",
  },

  editIcon: {
    cursor: "pointer",
    color: "orange",
  },

  previewIcon: {
    cursor: "pointer",
    color: "orange",
    marginLeft: 10,
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

export default function Resources({ questionId }: ResourcesProps) {
  const [resources, setResources] = React.useState<Resource[]>([]);
  const [isShowCreateDialog, setIsShowCreateDialog] =
    React.useState<boolean>(false);
  const [isShowPreviewDialog, setIsShowPreviewDialog] =
    React.useState<boolean>(false);
  const [isShowEditDialog, setIsShowEditDialog] =
    React.useState<boolean>(false);
  const [currentResource, setCurrentResource] = React.useState<Resource | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const { authToken, userId } = React.useContext(AuthContext);
  const classes = useStyles();

  React.useEffect(() => {
    (async () => {
      try {
        setResources([]);
        if (questionId) {
          setResources(
            await getResources(authToken, {
              question_id: questionId,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [questionId]);

  const onCreateResource = async (createdResource: ResourceCreated) => {
    setIsLoading(true);
    setError("");
    try {
      const resource = await createResource(authToken, createdResource);
      setResources([...resources, resource]);
      setCurrentResource(null);
      setIsShowCreateDialog(false);
    } catch (error) {
      setError(getErrorMessage(error));
    }
    setIsLoading(false);
  };
  const onUpdateResource = async (updatedResource: ResourceCreated) => {
    setIsLoading(true);
    setError("");
    try {
      const resource = await updateResource(
        authToken,
        currentResource!.id,
        updatedResource
      );
      const index = resources.findIndex(
        (res) => res.id === currentResource!.id
      );
      resources[index] = resource;
      setResources([...resources]);
      setCurrentResource(null);
      setIsShowEditDialog(false);
    } catch (error) {
      setError(getErrorMessage(error));
    }
    setIsLoading(false);
  };

  const onDeleteResource = async () => {
    setError("");
    setIsLoading(true);
    try {
      await deleteResource(authToken, currentResource!.id);
      const newResources = resources.filter(
        (k) => k.id !== currentResource!.id
      );
      setResources(newResources);
      setIsShowEditDialog(false);
      setCurrentResource(null);
    } catch (error) {
      const err = error as AxiosError;
      setError(err.response?.data);
    }
    setIsLoading(false);
  };

  return (
    <div className={classes.container}>
      {resources.map((resource, i) => (
        <div className={classes.resourceContainer} key={i}>
          <TextField
            key={i}
            InputLabelProps={{ shrink: true }}
            margin="dense"
            label={"Resource " + (i + 1)}
            id="standard-helperText"
            value={resource.title}
            className={classes.textField}
            disabled={true}
          />
          <EditIcon
            className={classes.editIcon}
            onClick={() => {
              setCurrentResource(resource);
              setIsShowEditDialog(true);
            }}
          />
          <VisibilityOutlinedIcon
            className={classes.previewIcon}
            onClick={() => {
              setCurrentResource(resource);
              setIsShowPreviewDialog(true);
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
          Add New Resource
        </Button>
      </div>
      <ResourceDialog
        onClose={() => setIsShowCreateDialog(false)}
        open={isShowCreateDialog}
        loading={isLoading}
        error={error}
        headerText="Create Resource"
        onSubmit={onCreateResource}
        resource={null}
        questionId={questionId}
      />
      <ResourceDialog
        onClose={() => setIsShowEditDialog(false)}
        open={isShowEditDialog}
        loading={isLoading}
        error={error}
        headerText="Edit Resource"
        onSubmit={onUpdateResource}
        onDelete={onDeleteResource}
        resource={currentResource}
        questionId={questionId}
      />

      <ResourcePreviewDialog
        onClose={() => setIsShowPreviewDialog(false)}
        open={isShowPreviewDialog}
        error={error}
        headerText="Preview Resource"
        resource={currentResource}
      />
    </div>
  );
}
