<template>
    <div class="bg-gray-50 font-body text-sm sm:text-base">
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">

            <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 w-full">

                <!-- Left side: Save as Draft + Reset + Export to PDF -->
                <div class="flex gap-4">
                    <!-- Save as Draft -->
                    <button type="button" @click="$emit('save-draft')"
                        class="bg-white text-black border border-gray-300 px-4 py-2 rounded hover:bg-gray-100">
                        Save as Draft
                    </button>

                    <!-- Reset -->
                    <button type="button" @click="$emit('reset-form')"
                        class="bg-white text-black border border-gray-300 px-4 py-2 rounded hover:bg-gray-100">
                        Reset
                    </button>

                    <!-- Export to PDF Button -->
                    <button type="button" @click="$emit('export-pdf')"
                        class="bg-white text-black border border-gray-300 px-4 py-2 rounded hover:bg-gray-100">
                        Export to PDF
                    </button>
                </div>

                <!-- Right side: Submit -->
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Submit Inventory
                </button>

            </div>

        </main>
    </div>
    <footer class="bg-gray-800 text-white py-6 md:py-8">
        <div class="container mx-auto px-4">
            <div class="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <!-- Left: Copyright -->
                <div class="mb-4 md:mb-0">
                    <p class="text-sm">© 2025 Kitchen Inventory System. All rights reserved.</p>
                </div>

                <!-- Right: Menu Links -->
                <div class="flex items-center space-x-4">
                    <a class="text-gray-300 hover:text-white flex items-center" href="#">
                        <i class="ri-settings-line mr-1"></i>
                        <span>Settings</span>
                    </a>
                    <a class="text-gray-300 hover:text-white flex items-center" href="#">
                        <i class="ri-history-line mr-1"></i>
                        <span>History</span>
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
const emit = defineEmits([
    'save-draft',
    'reset-form',
    'export-pdf'
])
</script>