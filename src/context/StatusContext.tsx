import React from "react";
import { CONSTANTS } from "../constants/app";
import CustomAlert from "../components/ui/Alert";

export const StatusContext = React.createContext({
  isAppLoading: true,
  setIsAppLoading: (value: boolean) => {},
  setAppSuccess: (msg?: string) => {},
  setAppError: (msg?: string) => {},
});

const DEFAULT_SUCCESS_MSG = "Successfully executed";
const DEFAULT_ERROR_MSG = "We encountered an error";

export const StatusProvider = ({ children }: { children: any }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [success, setSuccess] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const setAppSuccess = (msg?: string) => {
    setSuccess(msg || DEFAULT_SUCCESS_MSG);
    setTimeout(() => setSuccess(""), CONSTANTS.ALERT_SUCCESS_TIME);
  };

  const setAppError = (msg?: string) => {
    setError(msg || DEFAULT_ERROR_MSG);
    setTimeout(() => setError(""), CONSTANTS.ALERT_ERROR_TIME);
  };

  const setIsAppLoading = (value: boolean) => {
    setIsLoading(value);
  };

  return (
    <StatusContext.Provider
      value={{
        setIsAppLoading,
        isAppLoading: isLoading,
        setAppSuccess,
        setAppError,
      }}
    >
      <CustomAlert visible={!!success} text={success} severity="success" />
      <CustomAlert visible={!!error} text={error} severity="error" />
      {children}
    </StatusContext.Provider>
  );
};
