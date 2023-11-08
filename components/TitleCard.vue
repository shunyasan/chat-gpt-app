<script setup lang="ts">
interface Props {
  id: number;
  title: string;
}
defineProps<Props>();
</script>

<template>
  <UCard class="ml-6 m-auto">
    <div class="w-full flex justify-between">
      <div class="flex items-center">
        <UIcon name="i-heroicons-chat-bubble-left" />
        <a class="pl-5">{{ title }}</a>
      </div>
      <UButton
        class="text-right"
        :to="{
          name: 'chat-room-id',
          params: { id: id },
        }"
        >会話に戻る</UButton
      >
    </div>
  </UCard>
</template>
