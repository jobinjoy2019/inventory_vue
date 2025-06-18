<template>
  <div class="w-full bg-white py-6 px-4 sm:px-6 lg:px-10 shadow-sm">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between max-w-screen-xl mx-auto gap-4 sm:gap-0">
      
      <!-- Left: Logo -->
      <div class="flex justify-center sm:justify-start">
        <img src="/data/WCC-logo-black.png" alt="Logo" class="h-20 sm:h-28 w-auto" />
      </div>

      <!-- Center: Title -->
      <div class="text-center sm:text-center">
        <h1 class="text-xl sm:text-2xl md:text-3xl font-title font-bold text-gray-800">
          Kitchen Inventory Management
        </h1>
      </div>

      <!-- Right: Date & Form ID -->
      <div class="text-center sm:text-right text-sm font-subtitle text-gray-600">
        <div>Date: {{ today }}</div>
        <div>Form ID: {{ formId }}</div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
defineProps(['today', 'formId']);
</script>