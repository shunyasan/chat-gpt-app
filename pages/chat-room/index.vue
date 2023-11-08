<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const API_URL = runtimeConfig.public.apiUrl;

// 質問内容を保存
const question = ref("");

// Loadingの状態
const loading = ref(false);
// 新規の質問を送信
const post_message = async () => {
  // Loadingを読み込み中にする
  loading.value = true;
  // ChatGptに質問する
  await useFetch<ChatMessage>(`${API_URL}/chat-room/first/chat-message`, {
    method: "post",
    body: { content: question.value },
  })
    .then(async ({ data }) => {
      // chat_message.idが取得できればチャットを継続
      const chat_message = data.value;
      if (chat_message != null && chat_message.chat_room_id) {
        await navigateTo(`/chat-room/${chat_message.chat_room_id}`);
      } else {
        // ない場合はエラー
        await navigateTo(`/chat-room/error`);
      }
    })
    .catch(async ({ error }) => {
      console.log(error);
      await navigateTo(`/chat-room/error`);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<template>
  <UCard class="my-10">
    <div class="space-y-6">
      <ResponseCard :content="'聞きたいことは何ですか？'" />
      <div>
        <QuestionForm
          v-model="question"
          :question="question"
          :loading="loading"
          :on_click="post_message"
        />
      </div>
    </div>
  </UCard>
</template>
