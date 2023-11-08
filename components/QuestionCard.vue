<script setup lang="ts">
interface Props {
  content: string;
}
defineProps<Props>();
</script>

<template>
  <div class="flex justify-end items-center">
    <UCard class="w-10/12">
      <p class="w-full px-3 whitespace-pre-wrap">
        {{ content }}
      </p>
    </UCard>
    <UAvatar class="w-1/12" src="/img/men.jpg" alt="men" />
  </div>
</template>
