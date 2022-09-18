import React from "react";
import { Resource, ResourceCreated } from "@toppick/common/build/interfaces";
import {
  createResource,
  deleteResource,
  getResources,
  updateResource,
} from "@toppick/common/build/api";
import { AuthContext } from "@/context/AuthContext";
import ResourceDialog from "@/components/resource/dialog";
import ResourcePreviewDialog from "@/components/resource/dialog_preview";
import { AxiosError } from "axios";
import { getErrorMessage } from "@toppick/common/build/utils";
import DialogAddButton from "@/components/ui/button/DialogAddButton";
import { useDialogStyles } from "@/components/ui/dialog/Dialog";
import DialogEditField from "@/components/ui/button/DialogEditField";
interface ResourcesProps {
  questionId: number;
}

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

  const { authToken } = React.useContext(AuthContext);
  const classes = useDialogStyles();

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
        <DialogEditField
          key={i}
          label={"Resource " + (i + 1)}
          text={resource.title}
          onEdit={() => {
            setCurrentResource(resource);
            setIsShowEditDialog(true);
          }}
          onPreview={() => {
            setCurrentResource(resource);
            setIsShowPreviewDialog(true);
          }}
          showPreview={true}
        />
      ))}
      <DialogAddButton
        onClick={() => {
          setIsShowCreateDialog(true);
        }}
        title="Add New Resource"
      />
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

      <ResourcePreviewDialog
        onClose={() => setIsShowPreviewDialog(false)}
        open={isShowPreviewDialog}
        error={error}
        headerText="Preview Resource"
        resource={currentResource}
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
