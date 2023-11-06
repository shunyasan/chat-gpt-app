<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const API_URL = runtimeConfig.public.apiUrl;

// 会話の履歴を取得
const { data } = await useFetch<ChatRoom[]>(`${API_URL}/chat-room`);
const chat_rooms = data.value;
</script>

<template>
  <UContainer>
    <UCard class="my-10">
      <div class="text-center space-y-6">
        <h1 class="text-3xl font-bold mb-16">履歴</h1>
        <UCard class="ml-6 m-auto" v-for="chat_room in chat_rooms">
          <div class="w-full flex justify-between">
            <div class="flex items-center">
              <UIcon name="i-heroicons-chat-bubble-left" />
              <a class="pl-5">{{ chat_room.title }}</a>
            </div>
            <UButton
              class="text-right"
              :to="{
                name: 'chat-room-id',
                params: { id: chat_room.id },
              }"
              >会話に戻る</UButton
            >
          </div>
        </UCard>
        <div class="py-6">
          <UButton to="chat-room">新しく会話を始める</UButton>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>
