<template>
  <div class="relative">
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <!-- Expand/Collapse on the left -->
      <div class="flex gap-4">
        <button type="button" @click="$emit('expand-all')" class="text-blue-600 flex items-center gap-1">
          <i class="ri-arrow-down-s-line ri-lg mr-1"></i> Expand All
        </button>

        <button type="button" @click="$emit('collapse-all')" class="text-blue-600 flex items-center gap-1">
          <i class="ri-arrow-up-s-line ri-lg mr-1"></i> Collapse All
        </button>
      </div>

      <!-- Search bar on the right -->
      <div class="relative">
        <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor"
          stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input type="text" class="pl-10 pr-4 py-2 border rounded w-full sm:w-64" placeholder="Search..."
          :value="searchQuery" @input="$emit('update:searchQuery', $event.target.value)" />
      </div>
    </div>

    <!-- Floating scroll buttons -->
    <div class="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      <button type="button" @click="scrollToTop"
        class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow hover:bg-blue-500">
        <i class="ri-arrow-up-line text-xl"></i>
      </button>
      <button type="button" @click="scrollToBottom"
        class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow hover:bg-blue-500">
        <i class="ri-arrow-down-line text-xl"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['searchQuery'])
const emit = defineEmits(['update:searchQuery', 'expand-all', 'collapse-all'])

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}
</script>

<style scoped></style>
