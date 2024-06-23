"use client";

import { useEffect, useMemo, useState } from "react";

export interface ChatConfig {
  chatAPI?: string;
  starterQuestions?: string[];
}

export function useClientConfig() {
  const API_ROUTE = "/api/chat/config";
  const chatAPI = process.env.NEXT_PUBLIC_CHAT_API;
  const [config, setConfig] = useState<ChatConfig>({
    chatAPI,
  });

  const configAPI = useMemo(() => {
    if (!chatAPI) {
      console.error("chatAPI is not defined");
      return "";
    }
    const backendOrigin = new URL(chatAPI).origin;
    const constructedAPI = `${backendOrigin}${API_ROUTE}`;
    console.log(`Constructed configAPI: ${constructedAPI}`);
    return constructedAPI;
  }, [chatAPI]);

  useEffect(() => {
    if (configAPI) {
      fetch(configAPI)
        .then((response) => response.json())
        .then((data) => setConfig({ ...data, chatAPI }))
        .catch((error) => console.error("Error fetching config", error));
    }
  }, [chatAPI, configAPI]);

  return config;
}
