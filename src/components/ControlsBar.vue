<template>
  <div class="relative">
    <!-- Wrapper -->
    <div class="mb-6">
      <!-- Row 1: Expand / Collapse -->
      <div class="flex justify-start gap-4 mb-2 sm:mb-0 sm:justify-start sm:flex-row">
        <button type="button" @click="$emit('expand-all')" class="text-blue-600 flex items-center gap-1">
          <i class="ri-arrow-down-s-line ri-lg mr-1"></i> Expand All
        </button>
        <button type="button" @click="$emit('collapse-all')" class="text-blue-600 flex items-center gap-1">
          <i class="ri-arrow-up-s-line ri-lg mr-1"></i> Collapse All
        </button>
      </div>

      <!-- Row 2: Search Bar -->
      <div class="flex justify-end sm:justify-end">
        <div class="relative w-full sm:w-64">
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor"
            stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" class="pl-10 pr-4 py-2 border rounded w-full" placeholder="Search..." :value="searchQuery"
            @input="$emit('update:searchQuery', $event.target.value)" />
        </div>
      </div>
    </div>

    <!-- Floating scroll buttons -->
    <div class="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      <!-- Scroll to Top Button -->
      <button type="button" @click="scrollToTop" :class="[
        'w-10 h-10 rounded-full flex items-center justify-center shadow transition-colors',
        atTop ? 'bg-gray-400 cursor-default' : 'bg-gradient-to-br from-primary to-secondary hover:from-primary hover:to-secondary text-white'
      ]">
        <i class="ri-arrow-up-line text-xl"></i>
      </button>

      <!-- Scroll to Bottom Button -->
      <button type="button" @click="scrollToBottom" :class="[
        'w-10 h-10 rounded-full flex items-center justify-center shadow transition-colors',
        atBottom ? 'bg-gray-400 cursor-default' : 'bg-gradient-to-br from-primary to-secondary hover:from-primary hover:to-secondary text-white'
      ]">
        <i class="ri-arrow-down-line text-xl"></i>
      </button>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted, onUnmounted } from 'vue';
const props = defineProps(['searchQuery'])
const emit = defineEmits(['update:searchQuery', 'expand-all', 'collapse-all'])

const atTop = ref(true);
const atBottom = ref(false);

const checkScrollPosition = () => {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;

  atTop.value = scrollTop === 0;
  atBottom.value = scrollTop + windowHeight >= scrollHeight - 1; // tolerate 1px offset
};

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
const scrollToBottom = () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

onMounted(() => {
  window.addEventListener('scroll', checkScrollPosition);
  checkScrollPosition();
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScrollPosition);
});
</script>
