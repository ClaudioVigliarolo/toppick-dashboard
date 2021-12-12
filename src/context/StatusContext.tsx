import React from "react";
import { CONSTANTS } from "../constants/constants";
import CustomAlert from "../components/alerts";

export const StatusContext = React.createContext({
  loading: false,
  setLoading: (newVal: boolean) => {},
  onSuccess: () => {},
  onError: () => {},
  error: false,
  success: false,
});

const messageSuccess = "Successfully executed";
const messageError = "We encountered an error";

export const StatusProvider = ({ children }: { children: any }) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [success, setSuccess] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  const onSetSuccess = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), CONSTANTS.ALERT_TIME);
  };

  const onSetError = () => {
    setError(true);
    setTimeout(() => setError(false), CONSTANTS.ALERT_TIME);
  };

  const onSetLoading = (newVal: boolean) => {
    setLoading(newVal);
  };
  return (
    <StatusContext.Provider
      value={{
        setLoading: onSetLoading,
        loading,
        onSuccess: onSetSuccess,
        onError: onSetError,
        error,
        success,
      }}
    >
      <CustomAlert visible={success} text={messageSuccess} type="success" />
      <CustomAlert visible={error} text={messageError} type="error" />
      {children}
    </StatusContext.Provider>
  );
};
