<template>
    <div class="min-h-screen bg-gray-100 text-gray-800 space-y-10">
        <form @submit.prevent="submitForm">
            <!-- Exportable content wrapper -->
            <div class="report-content">
                <!-- White page header -->
                <FormHeader :today="today" :formId="formId" />

                <!-- Main inner card container -->
                <div class="bg-white shadow-md rounded-xl p-4 sm:p-6 space-y-6 mx-auto max-w-7xl mt-6">
                    <!-- Form fields: Department, Submitted By -->
                    <FormMeta :department="department" @update:department="department = $event"
                        :submittedBy="submittedBy" @update:submittedBy="submittedBy = $event" />

                    <!-- Expand/Collapse + Search -->
                    <ControlsBar :searchQuery="searchQuery" @update:searchQuery="searchQuery = $event"
                        @expand-all="expandAll" @collapse-all="collapseAll" />

                    <!-- Inventory Items -->
                    <InventorySection :inventory="filteredInventory" @toggle-section="toggleSection" />
                </div>
            </div>
            <!-- Footer Controls (Submit, Reset, Save as Draft) -->
            <div class="mt-10">
                <FooterControls @save-draft="showSaveDraftConfirmation" @reset-form="showResetConfirmation"
                    @export-pdf="exportToPdf" />
            </div>
        </form>

        <CustomModal :show="showModal" :type="modalType" :title="modalTitle" :message="modalMessage"
            @modal-resolve="handleModalResolve" @modal-reject="handleModalReject" />
    </div>
</template>



<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import FormHeader from './components/FormHeader.vue'
import FormMeta from './components/FormMeta.vue'
import ControlsBar from './components/ControlsBar.vue'
import InventorySection from './components/InventorySection.vue'
import FooterControls from './components/FooterControls.vue'
import CustomModal from './components/CustomModal.vue'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const today = new Date().toISOString().split('T')[0]
const formId = ref('')
const department = ref('')
const submittedBy = ref('')
const searchQuery = ref('')
const originalInventory = ref([])
const showModal = ref(false)
const modalType = ref('alert')
const modalTitle = ref('')
const modalMessage = ref('')
const appScriptURL = ref('https://script.google.com/macros/s/AKfycbxfYhuSVgCmuIujH5XpCLi80h5uL3YzFfkEEGn7JfzeyR0FUROXiayHtJfl2zPJbOek/exec');
let modalCallback = null

// Fetch inventory from public/inventory.json
onMounted(async () => {
    const hasDraft = localStorage.getItem('draftSaved') === 'true';
    const savedDraft = localStorage.getItem('inventoryDraft');
    if (hasDraft && savedDraft) {
        const draft = JSON.parse(hasDraft);
        department.value = draft.department || '';
        submittedBy.value = draft.submittedBy || '';
        formId.value = draft.formId || generateFormId(); // Use saved formId
        originalInventory.value = draft.inventoryData || [];
    } else {
        // No draft: start clean
        localStorage.removeItem('inventoryDraft');
        localStorage.removeItem('currentFormId');
        formId.value = generateFormId();
        department.value = '';
        submittedBy.value = '';
        originalInventory.value = [];
    }
    try {
        const res = await fetch(`./data/inventory.json`)
        if (res.ok) {
            const fetchedData = await res.json();
            originalInventory.value = fetchedData.map(section => {
                // Data transformation for initial state
                const mappedItems = section.items.map(item => {
                    if (section.inputType === 'toggle') {
                        return { ...item, selected: false };
                    } else {
                        return { ...item, weight: null, packets: null };
                    }
                });
                return {
                    ...section,
                    expanded: false, // Start with all sections collapsed
                    items: mappedItems
                };
            });
        } else {
            console.error('Failed to load inventory:', res.status)
        }
    } catch (err) {
        console.error('Error loading inventory:', err)
    }
})

watch(
    [department, submittedBy, originalInventory],
    () => {
        const draft = {
            department: department.value,
            submittedBy: submittedBy.value,
            formId: formId.value,
            inventoryData: originalInventory.value
        };
        localStorage.setItem('inventoryDraft', JSON.stringify(draft));
        localStorage.setItem('currentFormId', formId.value); // optional
    },
    { deep: true }
);
// Filter inventory based on searchQuery
const filteredInventory = computed(() => {
    if (!searchQuery.value.trim()) {
        return originalInventory.value.map(section => ({
            ...section,
            // Ensure we're not mutating original
            items: [...section.items],
        }));
    }

    const query = searchQuery.value.toLowerCase();

    return originalInventory.value
        .map(section => {
            const filteredItems = section.items.filter(item =>
                item.name.toLowerCase().includes(query)
            );

            return {
                ...section,
                items: filteredItems,
                expanded: filteredItems.length > 0, // auto-expand matched sections
            };
        })
        .filter(section => section.items.length > 0); // Remove empty ones
});


watch(searchQuery, (newVal) => {
    if (!newVal.trim()) {
        originalInventory.value.forEach(section => section.expanded = false);
    }
});

function expandAll() {
    originalInventory.value.forEach(section => {
        if (section) section.expanded = true;
    });
}

function collapseAll() {
    originalInventory.value.forEach(section => {
        if (section) section.expanded = false;
    });
}

function toggleSection(index) {
    const filteredSection = filteredInventory.value[index];
    if (!filteredSection) return;

    // Find the original section by category
    const originalSection = originalInventory.value.find(s => s.category === filteredSection.category);
    if (originalSection) {
        originalSection.expanded = !originalSection.expanded;
    }
}



const generateFormId = () => {
    return 'INV-' + today.replace(/-/g, '') + Math.floor(Math.random() * 1000);
};

// Show custom modal
function showCustomModal(type, title, message) {
    return new Promise((resolve) => {
        modalType.value = type;
        modalTitle.value = title;
        modalMessage.value = message;
        showModal.value = true;
        modalCallback = resolve; // resolve(true/false) will be triggered on resolve/reject
    });
}

function handleModalResolve() {
    showModal.value = false;
    if (modalCallback) modalCallback(true);
}

function handleModalReject() {
    showModal.value = false;
    if (modalCallback) modalCallback(false);
}

// --- Save Draft ---
async function showSaveDraftConfirmation() {
    try {
        saveDraft();
        showCustomModal('success', 'Draft Saved', 'Your inventory draft has been saved.')
    } catch (err) {
        console.error(err);
        showCustomModal('error', 'Error', 'Failed to save draft.');
    }
}

function saveDraft() {
    try {
        const draft = JSON.stringify(originalInventory.value);
        localStorage.setItem('inventoryDraft', draft);
        localStorage.setItem('draftSaved', 'true');
        localStorage.setItem('currentFormId', formId.value); // Save current formId
        console.log('Draft saved to localStorage.');
    } catch (error) {
        console.error('Error saving draft:', error);
        showCustomModal('error', 'Error Saving Draft', 'Could not save draft. Please try again.');
    }
}

// --- Reset Form ---
async function showResetConfirmation() {
    try {
        const confirmed = await showCustomModal(
            'confirm',
            'Confirm Reset',
            'Are you sure you want to reset the form? All unsaved changes will be lost.'
        );

        if (confirmed) {
            resetForm();
            await showCustomModal('success', 'Form Reset', 'The form has been reset successfully!');
        }
    } catch (error) {
        console.log('Reset cancelled or error occurred.', error);
    }
}

function resetForm() {
    localStorage.removeItem('inventoryDraft');
    localStorage.removeItem('currentFormId');

    // Wait a short moment to let the success modal render before reloading
    setTimeout(() => {
        location.reload();
    }, 1500); // Delay reload by 1.5 seconds
}
// --- PDF Export ---
async function exportToPdf() {
    const element = document.querySelector('.report-content');

    if (!element) {
        await showCustomModal('error', 'Export Error', 'Content for PDF export not found!');
        return;
    }

    const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const doc = new jsPDF();
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = canvas.height * imgWidth / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
    }

    doc.save('inventory-report.pdf');
    await showCustomModal('success', 'PDF Generated', 'PDF generated successfully!');
}

// --- Submit Form ---
async function submitForm() {
    if (
        !appScriptURL.value ||
        !appScriptURL.value.startsWith('https://script.google.com/macros/s/')
    ) {
        showCustomModal('error', 'Configuration Error', 'Please set your Google Apps Script Web App URL.');
        return;
    }

    const formData = {
        timestamp: new Date().toLocaleString(),
        department: department.value,
        submittedBy: submittedBy.value,
        formId: formId.value,
        inventoryData: JSON.stringify(originalInventory.value)
    };

    try {
        await fetch(appScriptURL.value, {
            method: 'POST',
            mode: 'no-cors', // Use 'no-cors' to avoid CORS issues with Apps Script
            headers: {
                "Content-Type": "text/plain"
            },
            body: JSON.stringify(formData)
        });
        // This will likely be false because Apps Script returns 302 or opaque response
        await showCustomModal('success', 'Form Submitted', 'Your inventory has been submitted successfully!');
        localStorage.removeItem('inventoryDraft');
        localStorage.removeItem('currentFormId');
        originalInventory.value = []; // Clear inventory
    } catch (error) {
        console.warn('Submit Error:', error);
        await showCustomModal('error', 'Validate the submission by checking the sheet');
    }
}
</script>
