"use client";

import { useEffect, useMemo, useState } from "react";

export interface ChatConfig {
  chatAPI?: string;
  starterQuestions?: string[];
}

export function useClientConfig() {
  const API_ROUTE = "/api/chat/config";
  const backendURL = "https://chatbotsoc-backend-lnk4vu7nua-et.a.run.app";
  const [config, setConfig] = useState<ChatConfig>({
    chatAPI: backendURL,
  });

  const configAPI = useMemo(() => {
    const backendOrigin = new URL(backendURL).origin;
    return `${backendOrigin}${API_ROUTE}`;
  }, [backendURL]);

  useEffect(() => {
    fetch(configAPI)
      .then((response) => response.json())
      .then((data) => setConfig({ ...data, chatAPI: backendURL }))
      .catch((error) => console.error("Error fetching config", error));
  }, [configAPI]);

  return config;
}
