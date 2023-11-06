<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const API_URL = runtimeConfig.public.apiUrl;

// パスのChatRoom.idを取得
const route = useRoute();
const chat_room_id = route.params.id;

// Loadingの状態
const loading = ref(false);

// 会話の部屋を取得
const { data: chat_room_res } = await useFetch<ChatRoom>(
  `${API_URL}/chat-room/${chat_room_id}`
);
const chat_room = chat_room_res.value;

// 会話の履歴を取得
const { data: chat_messages_res } = await useFetch<ChatMessage[]>(
  `${API_URL}/chat-room/${chat_room_id}/chat-message`
);
const chat_messages = chat_messages_res.value;

// 追加の質問を送信
const question = ref("");
const post_message = async () => {
  // Loadingを読み込み中にする
  loading.value = true;
  // ChatGptに質問する
  await useFetch<ChatMessage>(
    `${API_URL}/chat-room/${chat_room_id}/chat-message`,
    {
      method: "post",
      body: { content: question.value },
    }
  )
    .then(() => {
      // 成功したら再読み込み
      location.reload();
    })
    .catch(async ({ error }) => {
      // 失敗したらエラーページへ
      console.log(error);
      await navigateTo(`/chat-room/error`);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<template>
  <UContainer>
    <UCard class="my-10">
      <ULink
        to="/"
        active-class="text-primary"
        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
      >
        TOP
      </ULink>
      <div class="space-y-6">
        <h1 class="text-center text-3xl font-bold mb-16">
          {{ chat_room?.title }}
        </h1>
        <div v-for="chat_message in chat_messages">
          <!-- ↓コンポーネント化したい↓ -->
          <!-- ChatGPTなら以下を表示 -->
          <div
            v-if="
              chat_message.role === 'assistant' ||
              chat_message.role === 'system'
            "
            class="flex justify-start items-center"
          >
            <UAvatar class="w-1/12" src="/img/robot.jpg" alt="robot" />
            <UCard class="w-10/12">
              <p class="w-full px-3 whitespace-pre-wrap">
                {{ chat_message.content }}
              </p>
            </UCard>
          </div>
          <!-- 質問者なら以下を表示 -->
          <div
            v-if="chat_message.role === 'user'"
            class="flex justify-end items-center"
          >
            <UCard class="w-10/12">
              <p class="w-full px-3 whitespace-pre-wrap">
                {{ chat_message.content }}
              </p>
            </UCard>
            <UAvatar class="w-1/12" src="/img/men.jpg" alt="men" />
          </div>
        </div>
        <!-- ↓コンポーネント化したい↓ -->
        <div class="flex justify-between">
          <UInput
            v-model="question"
            color="white"
            variant="outline"
            placeholder="メッセージを入力..."
            class="w-5/6"
            icon="i-heroicons-magnifying-glass-20-solid"
            :loading="loading"
          />
          <UButton @click="post_message()"> 送信 </UButton>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>
