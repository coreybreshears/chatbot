import { useEffect } from "react";
import { setApiKey } from "@features/apiKey/apiKeySlice";
import {
  LOCAL_STORAGE_API_TOKEN,
  LOCAL_STORAGE_EXPIRE_AT,
} from "@constants/localStorage";
import { useAppDispatch, useAppSelector } from "./hooks";
import ApiKeyInput from "@features/apiKey/ApiKeyInput";
import Chat from "@features/chat/Chat";

function App() {
  const dispatch = useAppDispatch();
  const apiKey = useAppSelector((state) => state.apiKey.value);

  useEffect(() => {
    if (
      localStorage.getItem(LOCAL_STORAGE_API_TOKEN) &&
      localStorage.getItem(LOCAL_STORAGE_EXPIRE_AT)
    ) {
      const expireAt = parseInt(
        localStorage.getItem(LOCAL_STORAGE_EXPIRE_AT) as string,
        10
      );
      const curTime = new Date().getTime();

      if (curTime < expireAt) {
        dispatch(
          setApiKey(localStorage.getItem(LOCAL_STORAGE_API_TOKEN) as string)
        );
      } else {
        localStorage.removeItem(LOCAL_STORAGE_API_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_EXPIRE_AT);
      }
    }
  }, []);

  return <>{apiKey ? <Chat /> : <ApiKeyInput />}</>;
}

export default App;
