<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const API_URL = runtimeConfig.public.apiUrl;

// 会話の履歴を取得
const { data } = await useFetch<ChatRoom[]>(`${API_URL}/chat-room`);
const chat_rooms = data.value;
</script>

<template>
  <UCard class="my-10">
    <div class="text-center space-y-6">
      <h1 class="text-3xl font-bold mb-16">履歴</h1>
      <div v-for="chat_room in chat_rooms">
        <!-- 履歴をループで表示 -->
        <TitleCard :id="chat_room.id" :title="chat_room.title" />
      </div>
      <div class="py-6">
        <UButton to="chat-room">新しく会話を始める</UButton>
      </div>
    </div>
  </UCard>
</template>
