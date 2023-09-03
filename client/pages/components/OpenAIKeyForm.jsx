import { useState, useEffect } from "react";
import React from "react";

function OpenAIForm({ result }) {
  const [isLoading, setIsLoading] = useState(false);
  const [openAIKey, setOpenAIKey] = useState(null);
  const [apiKeyError, setApiKeyError] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("openAIKey")) {
      setOpenAIKey(localStorage.getItem("openAIKey"));
      result(true);
    }

    const handleOpenAIKeyUpdate = () => {
      const updatedValue = localStorage.getItem("openAIKey");
      setOpenAIKey(updatedValue);
      if (updatedValue) {
        result(true);
      } else {
        result(false);
      }
    };

    window.addEventListener("openAIKeyUpdate", handleOpenAIKeyUpdate);

    return () => {
      window.removeEventListener("openAIKeyUpdate", handleOpenAIKeyUpdate);
    };
  }, []);

  const handleOpenAIKeyChange = (openAIKey) => {
    setOpenAIKey(openAIKey);
    setApiKeyError(null);
  };

  const handleOpenAIKeySubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setApiKeyError(null);

    const headers = new Headers();
    headers.append("x-open-ai-key", openAIKey);

    const options = {
      method: "GET",
      headers: headers,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/set-open-ai-key`,
      options
    );

    if (response.status === 200) {
      const data = await response.json();
      localStorage.setItem("openAIKey", openAIKey);
      window.dispatchEvent(new Event("openAIKeyUpdate"));
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setApiKeyError(
        "Failed to get response from the API. Check your API key."
      );
    }
  };

  return (
    <div className="flex w-full flex-col items-center py-8">
      <div className="flex w-full flex-col items-center">
        <div className="rounded-lg border border-gray-700 bg-card text-card-foreground shadow-sm w-4/5">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-gray-300 text-2xl font-semibold leading-none tracking-tight pb-4 text-center">
              Add Your Open AI Key
            </h3>
            <p className="text-lg text-center text-gray-400">
              To get started, enter your Open AI Key below.
            </p>
            <p className="text-xs text-center text-gray-400">
              If you do not have Open AI key get one from{" "}
              <a href="https://openai.com">Open AI.</a>
            </p>
          </div>
          <div className="p-6 pt-0">
            <form>
              <div className="space-y-2">
                <div className="flex justify-center items-center gap-2">
                  <input
                    type="string"
                    className="flex h-10 w-2/3 rounded-md border border-gray-700 bg-gray-800 text-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    name="openAIKey"
                    placeholder="Enter API Key"
                    onChange={(e) => handleOpenAIKeyChange(e.target.value)}
                  />
                </div>
              </div>
              {apiKeyError && (
                <div className="flex justify-center align-middle text-red-700 mt-6">
                  {" "}
                  <p>{apiKeyError}</p>{" "}
                </div>
              )}
              <div className="mt-4 flex items-center justify-center">
                <button
                  className="bg-white inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 mt-4"
                  type="submit"
                  disabled={!openAIKey}
                  onClick={(e) => handleOpenAIKeySubmit(e)}
                >
                  {!isLoading ? "Submit" : "Submitting.."}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpenAIForm;