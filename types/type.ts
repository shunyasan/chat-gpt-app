type ChatRoom = {
  id: number;
  title: string;
  created_at: Date;
};

const ROLE_TYPE = {
  SYSTEM: "system", // 最初の会話
  USER: "user", // 質問者
  ASSISTANT: "assistant", // ChatGPTの回答
} as const;
type RoleType = (typeof ROLE_TYPE)[keyof typeof ROLE_TYPE];

type ChatMessage = {
  id: number;
  role: RoleType;
  content: string;
  created_at: Date;
  chat_room_id: number;
};
