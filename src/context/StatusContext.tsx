import React from "react";
import { CONSTANTS } from "../constants/app";
import CustomAlert from "../components/ui/Alert";

export const StatusContext = React.createContext({
  loading: true,
  onLoading: (val: boolean) => {},
  onSuccess: (val?: string) => {},
  onError: (val?: string) => {},
  error: "",
  success: "",
});

const DEFAULT_SUCCESS_MSG = "Successfully executed";
const DEFAULT_ERROR_MSG = "We encountered an error";

export const StatusProvider = ({ children }: { children: any }) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [success, setSuccess] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const onSetSuccess = (msg?: string) => {
    setSuccess(msg || DEFAULT_SUCCESS_MSG);
    setTimeout(() => setSuccess(""), CONSTANTS.ALERT_SUCCESS_TIME);
  };

  const onSetError = (msg?: string) => {
    setError(msg || DEFAULT_ERROR_MSG);
    setTimeout(() => setError(""), CONSTANTS.ALERT_ERROR_TIME);
  };

  const onSetLoading = (newVal: boolean) => {
    setLoading(newVal);
  };

  return (
    <StatusContext.Provider
      value={{
        onLoading: onSetLoading,
        loading,
        onSuccess: onSetSuccess,
        onError: onSetError,
        error,
        success,
      }}
    >
      <CustomAlert visible={!!success} text={success} severity="success" />
      <CustomAlert visible={!!error} text={error} severity="error" />
      {children}
    </StatusContext.Provider>
  );
};
