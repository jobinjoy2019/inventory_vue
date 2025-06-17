<!-- components/CustomModal.vue -->
<template>
  <div v-if="show" class="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full relative">
      <h3 class="text-lg font-bold mb-4">{{ title }}</h3>
      <p class="text-gray-700 mb-6">{{ message }}</p>
      <div class="flex justify-end gap-3">
        <button
          v-if="type === 'confirm'"
          @click="$emit('modal-reject')"
          class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          @click="$emit('modal-resolve')"
          :class="{
            'bg-blue-600 hover:bg-blue-700 text-white': type === 'alert' || type === 'success',
            'bg-green-600 hover:bg-green-700 text-white': type === 'confirm'
          }"
          class="px-4 py-2 rounded"
        >
          {{ type === 'confirm' ? 'Confirm' : 'OK' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  title: String,
  message: String,
  type: {
    type: String,
    default: 'alert' // or 'confirm', 'success'
  }
})

const emit = defineEmits(['modal-resolve', 'modal-reject'])
</script>