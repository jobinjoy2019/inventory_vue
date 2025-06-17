<script setup>
const { department, submittedBy } = defineProps(['department', 'submittedBy'])
const emit = defineEmits(['update:department', 'update:submittedBy'])
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
    <div class="flex justify-start">
      <div class="w-full">
        <label class="block font-medium text-md text-gray-700">Department</label>
        <input
          :value="department"
          @input="emit('update:department', $event.target.value)"
          type="text"
          class="w-full max-w-md rounded-sm border border-blue-400 bg-blue-50 text-gray-800 placeholder:text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 py-2 px-3 mt-1"
        />
      </div>
    </div>
    <div class="flex justify-end">
      <div class="w-full max-w-md">
        <label class="block font-medium text-md text-gray-700">Submitted By</label>
        <input
          :value="submittedBy"
          @input="emit('update:submittedBy', $event.target.value)"
          type="text"
          class="w-full rounded-sm border border-blue-400 bg-blue-50 text-gray-800 placeholder:text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 py-2 px-3 mt-1"
          placeholder="Your Name"
        />
      </div>
    </div>
  </div>
</template>

