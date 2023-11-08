<script setup lang="ts">
interface Props {
  question: string;
  loading: boolean;
  on_click: () => any;
}
defineProps<Props>();
defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex justify-between">
    <UInput
      :value="question"
      @input="$emit('update:modelValue', $event.target.value)"
      color="white"
      variant="outline"
      placeholder="メッセージを入力..."
      class="w-5/6"
      icon="i-heroicons-magnifying-glass-20-solid"
      :loading="loading"
    />
    <UButton @click="on_click"> 送信 </UButton>
  </div>
</template>
