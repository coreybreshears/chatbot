import { FormEvent, useState } from "react";
import { setApiKey } from "./apiKeySlice";
import Button from "@components/Button";
import {
  LOCAL_STORAGE_API_TOKEN,
  LOCAL_STORAGE_EXPIRE_AT,
} from "@constants/localStorage";
import { useAppDispatch } from "@src/hooks";

function ApiKeyInput() {
  const dispatch = useAppDispatch();
  const [apiKeyValue, setApiKeyValue] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setApiKey(apiKeyValue));

    localStorage.setItem(LOCAL_STORAGE_API_TOKEN, apiKeyValue);
    localStorage.setItem(
      LOCAL_STORAGE_EXPIRE_AT,
      String(new Date().getTime() + 3600000)
    );
  };

  return (
    <div className="w-full flex flex-col items-center p-16">
      <div className="w-full max-w-xs">
        <form
          className="bg-slate-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={onSubmit}
        >
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="api-key"
            >
              OpenAI API Key
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="api-key"
              type="password"
              placeholder="******************"
              value={apiKeyValue}
              onChange={(e) => setApiKeyValue(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit" disabled={!apiKeyValue}>
              Try out
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApiKeyInput;
