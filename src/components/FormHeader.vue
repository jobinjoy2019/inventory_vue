<template>
  <div class="w-full bg-white py-8 px-4 sm:px-6 lg:px-10 shadow-sm">
    <div class="flex items-center justify-between relative max-w-screen-xl mx-auto">
      <!-- Left -->
      <div class="flex-shrink-0">
        <img src="/data/WCC-logo-black.png" alt="Logo" class="h-28 w-auto sm:h-28" />
      </div>

      <!-- Center -->
      <div class="absolute left-1/2 transform -translate-x-1/2 text-center">
        <h1 class="text-2xl sm:text-3xl font-title font-bold text-gray-800 whitespace-nowrap">
          Kitchen Inventory Management
        </h1>
      </div>

      <!-- Right -->
      <div class="text-sm font-subtitle text-gray-600 text-right">
        <div>Date: {{ today }}</div>
        <div>Form ID: {{ formId }}</div>
      </div>
    </div>
  </div>
</template>


<script setup>
defineProps(['today', 'formId']);
</script>
