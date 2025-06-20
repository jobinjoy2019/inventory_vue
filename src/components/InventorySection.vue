<template>
  <div class="grid grid-cols-1 sm:grid-cols-1 gap-10">
    <div v-for="(section, index) in inventory" :key="index" class="border border-gray-200 rounded-lg overflow-hidden">
      <!-- Header with toggle -->
      <div
        class="w-full px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white font-medium flex items-center justify-between cursor-pointer"
        @click="$emit('toggle-section', index)">
        <span class="text-lg font-body">{{ section.category }}</span>
        <i class="ri-arrow-down-s-line ri-lg transform transition-transform duration-200"
          :class="{ 'rotate-180': section.expanded }"></i>
      </div>

      <!-- Items list -->
      <div v-show="section.expanded" class="px-6 py-6 bg-white space-y-1">
        <div v-for="item in section.items" :key="item.name"
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-md pb-3 mb-3 border-b border-gray-200">
          <label class="font-medium text-gray-800 py-3 sm:w-1/3">{{ item.name }}</label>

          <!-- Toggle input -->
          <div v-if="section.inputType === 'toggle'" class="sm:w-2/3 flex justify-end">
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="item.selected" class="sr-only peer" />
              <div class="w-11 h-6 rounded-full relative transition-colors duration-200 ease-in-out"
                :class="{ 'bg-blue-600': item.selected, 'bg-gray-300': !item.selected }">
                <span
                  class="absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out"
                  :class="{ 'translate-x-full': item.selected }"></span>
              </div>
              <span class="ml-3 text-sm text-gray-600">{{ item.selected ? 'Yes' : 'No' }}</span>
            </label>
          </div>

          <!-- Weight + Packet input -->
          <div v-else-if="!section.hasToggle || !section.toggleOn" class="flex gap-2 sm:w-2/3">
            <input type="number" min="0" placeholder="Weight (kg)" v-model.number="item.weight"
              class="w-full sm:w-1/2 rounded-sm border border-gray-300 bg-white px-2 py-2 text-sm placeholder:text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <input type="number" min="0" placeholder="Packets" v-model.number="item.packets"
              class="w-full sm:w-1/2 rounded-sm border border-gray-300 bg-white px-2 py-2 text-sm placeholder:text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Additional Notes Section -->
  <div class="bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-md p-6 mb-8 border border-blue-100">
    <h2 class="text-xl font-bold mb-4">Additional Notes</h2>
    <textarea :value="notes" @input="emit('update:notes', $event.target.value)"
      class="w-full h-32 border border-gray-300 rounded-button px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
      name="notes" placeholder="Add any additional notes or special requirements here..."></textarea>
  </div>
</template>

<script setup>
defineProps({
  inventory: Array,
  notes: String,
});
const emit = defineEmits(['toggle-section', 'update:notes']);
</script>
