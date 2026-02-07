export type ToolType = "video" | "image" | "text";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export const MODEL_CONFIG: Record<ToolType, Record<string, string>> = {
  video: {
    "aws-nova-reel": "/api/video/nova",
    "text-to-video-ms-1.7b": "/api/video/ali-vilab/text-to-video-ms-1.7b",
    "cerspense/zeroscope_v2_576w": "/api/video/cerspense/zeroscope_v2_576w",
    "Lightricks/LTX-Video-0.9.7-dev":
      "/api/video/Lightricks/LTX-Video-0.9.7-dev",
    "camenduru/potat1": "/api/video/camenduru/potat1",
  },
  image: {
    "stabilityai/stable-diffusion-xl-base-1.0":
      "/api/image/stabilityai/stable-diffusion-xl-base-1.0",
    "stable-diffusion-v1-5/stable-diffusion-v1-5":
      "/api/image/stable-diffusion-v1-5/stable-diffusion-v1-5",
    "Lykon/DreamShaper": "/api/image/Lykon/DreamShaper",
    "CompVis/stable-diffusion-v1-4": "/api/image/CompVis/stable-diffusion-v1-4",
    "dreamlike-art/dreamlike-photoreal-2.0":
      "/api/image/dreamlike-art/dreamlike-photoreal-2.0",
  },
  text: {
    "openai/gpt-oss-20b": "/api/text/openai/gpt-oss-20b",
    "inference-net/Schematron-3B": "/api/text/inference-net/Schematron-3B",
  },
};

export const TOOL_SETTINGS: Record<
  ToolType,
  { label: string; description: string; acceptsFiles: boolean }
> = {
  video: {
    label: "Generate Video",
    description: "Send prompts to AWS Nova or other video models",
    acceptsFiles: true,
  },
  image: {
    label: "Generate Image",
    description: "Create reference art or thumbnails",
    acceptsFiles: true,
  },
  text: {
    label: "Chat & Write",
    description: "Ask questions or co-write scripts",
    acceptsFiles: false,
  },
};

export const TOOL_ORDER: ToolType[] = ["video", "image", "text"];

export const API_ENDPOINTS = {
  modelPath: (path: string) => `${API_BASE_URL}${path}`,
  status: (jobId: string) => `${API_BASE_URL}/status/${jobId}`,
};

export const getDefaultModel = (tool: ToolType) => {
  const [firstModel] = Object.keys(MODEL_CONFIG[tool]);
  return firstModel;
};
