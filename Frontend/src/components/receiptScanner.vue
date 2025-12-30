<script setup>
import { ref } from 'vue';
import Tesseract from 'tesseract.js';
const props = defineProps({
  onReceiptScanned: {
    type: Function,
    required: true
  }
});
const scanning = ref(false);
const preview = ref(null);
const extractedData = ref(null);
const error = ref(null);
const fileInputRef = ref(null);
const progress = ref(0);

const extractReceiptInfo = (text) => {
  console.log('Raw OCR text:', text);
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  const amountPatterns = [
    /(?:TOTAL|Total|total)[:\s]*(?:KSH|Ksh|ksh|[$])?[:\s]*([\d,]+[.,]\d{2})/i,
    /(?:AMOUNT|Amount)[:\s]*(?:KSH|Ksh|ksh|[$])?[:\s]*([\d,]+[.,]\d{2})/i,
    /(?:GRAND|Grand)[:\s]+(?:TOTAL|Total)[:\s]*(?:KSH|Ksh|ksh|[$])?[:\s]*([\d,]+[.,]\d{2})/i,
    /(?:SUBTOTAL|Subtotal)[:\s]*(?:KSH|Ksh|ksh|[$])?[:\s]*([\d,]+[.,]\d{2})/i,
    /(?:M-PAY|M-pay|m-pay|MPAY)[:\s]*([\d,]+[.,]\d{2})/i,
    /(?:KSH|Ksh|ksh)[:\s]*([\d,]+[.,]\d{2})/i,
    /[$]\s*([\d,]+[.,]\d{2})/
  ];

  let amount = null;
  const allAmounts = [];
  const fullText = text;
  for (const pattern of amountPatterns) {
    const match = fullText.match(pattern);
    if (match) {
      const cleanNumber = match[1].replace(/,/g, '');
      const parsedAmount = parseFloat(cleanNumber);
      if (!isNaN(parsedAmount) && parsedAmount > 0) {
        allAmounts.push(parsedAmount);
      }
    }
  }
  const pricePattern = /([\d,]+\.\d{2})\s*$/;
  for (const line of lines) {
    const match = line.match(pricePattern);
    if (match) {
      const cleanNumber = match[1].replace(/,/g, '');
      const parsedAmount = parseFloat(cleanNumber);
      if (!isNaN(parsedAmount) && parsedAmount >= 100) {
        allAmounts.push(parsedAmount);
      }
    }
  }
  if (allAmounts.length > 0) {
    amount = Math.max(...allAmounts);
  }
  const datePatterns = [
    /(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/,
    /(\d{4})[\/\-.](\d{1,2})[\/\-.](\d{1,2})/,
    /(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[,.\s]+(\d{2,4})/i,
    /(?:Date|DATE|date)[:\s]*(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/i,
    /(?:Data|DATA)[:\s]*(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/i
  ];

  let date = null;
  for (const pattern of datePatterns) {
    const match = text.match(pattern);
    if (match) {
      if (match[0].toLowerCase().includes('jan') || match[0].toLowerCase().includes('feb') ||
          match[0].toLowerCase().includes('mar') || match[0].toLowerCase().includes('apr')) {
        const months = {
          'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04',
          'may': '05', 'jun': '06', 'jul': '07', 'aug': '08',
          'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12'
        };
        const monthKey = match[2].substring(0, 3).toLowerCase();
        let year = match[3];
        if (year.length === 2) year = '20' + year;
        date = `${year}-${months[monthKey]}-${match[1].padStart(2, '0')}`;
      } else if (match[1].length === 4) {
        date = `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`;
      } else {
        let year = match[3];
        if (year.length === 2) year = '20' + year;
        date = `${year}-${match[2].padStart(2, '0')}-${match[1].padStart(2, '0')}`;
      }
      break;
    }
  }
  if (!date) {
    date = new Date().toISOString().split('T')[0];
  }
  let merchant = 'Unknown Merchant';

  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i];
    if (line.length > 3 &&
        !line.match(/^[*\-=.]+$/) &&
        !line.toLowerCase().includes('receipt') &&
        !line.toLowerCase().includes('tax invoice') &&
        !line.match(/^\d+$/) &&
        !line.match(/^date/i) &&
        !line.match(/^tel/i) &&
        !line.match(/^address/i)) {
      merchant = line
          .replace(/[^a-zA-Z0-9\s&'-]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

      if (merchant.length > 3) {
        break;
      }
    }
  }
  const categories = {
    'Food': ['restaurant', 'cafe', 'hotel', 'pizza', 'burger', 'coffee', 'food', 'kitchen', 'deli', 'bakery', 'grocery', 'supermarket', 'carrefour', 'naivas', 'quickmart', 'mart', 'store'],
    'Transportation': ['fuel', 'petrol', 'gas', 'uber', 'taxi', 'bus', 'matatu', 'parking', 'toll', 'shell', 'total', 'bp'],
    'Shopping': ['shop', 'mall', 'boutique', 'fashion', 'clothing', 'electronics', 'store'],
    'Utilities': ['electricity', 'water', 'kplc', 'nairobi water', 'internet', 'safaricom', 'airtel'],
    'Outings': ['cinema', 'movie', 'theater', 'theatre', 'club', 'bar', 'pub', 'entertainment']
  };

  let category = 'Shopping'; // Default
  const lowerText = text.toLowerCase();

  for (const [cat, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      category = cat;
      break;
    }
  }
  return { merchant, amount, date, category };
};
const preprocessImage = async (imageFile) => {
  return new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
        const contrast = gray > 128 ? 255 : 0;

        data[i] = contrast;
        data[i + 1] = contrast;
        data[i + 2] = contrast;
      }

      ctx.putImageData(imageData, 0, 0);

      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/png');
    };

    img.src = URL.createObjectURL(imageFile);
  });
};

const processReceipt = async (imageFile) => {
  scanning.value = true;
  error.value = null;
  progress.value = 0;

  try {
    const preprocessedImage = await preprocessImage(imageFile);

    const result = await Tesseract.recognize(
        preprocessedImage,
        'eng',
        {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              progress.value = Math.round(m.progress * 100);
            }
          },
          tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz .,:/()-$'
        }
    );
    const extractedText = result.data.text;
    if (!extractedText || extractedText.trim().length < 10) {
      throw new Error('Could not read receipt. Please try a clearer image.');
    }
    const receiptInfo = extractReceiptInfo(extractedText);
    if (!receiptInfo.amount) {
      throw new Error('Could not detect total amount. Please try again or enter manually.');
    }
    extractedData.value = receiptInfo;
    scanning.value = false;
  } catch (err) {
    error.value = err.message || 'Failed to process receipt. Please try again with a clearer image.';
    scanning.value = false;
  }
};

const handleFileSelect = (event) => {
  const file = event.target.files?.[0];
  if (file && file.type.startsWith('image/')) {
    preview.value = URL.createObjectURL(file);
    processReceipt(file);
  }
};
const handleUseData = () => {
  if (extractedData.value) {
    props.onReceiptScanned(extractedData.value);
    handleReset();
  }
};
const handleReset = () => {
  preview.value = null;
  extractedData.value = null;
  error.value = null;
  scanning.value = false;
  progress.value = 0;
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
};
</script>

<template>
  <div class="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl shadow-lg p-4 sm:p-6 mb-8">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-600 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
          <circle cx="12" cy="13" r="4"/>
        </svg>
        Scan Receipt (OCR)
      </h3>
      <button
          v-if="preview"
          @click="handleReset"
          class="text-gray-500 hover:text-gray-700 transition-colors p-1"
          aria-label="Clear receipt"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>

    <div v-if="!preview" class="space-y-4">
      <p class="text-sm text-gray-600 mb-4">
        Scan or upload a receipt to automatically extract expense details
      </p>

      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
        <p class="text-xs text-yellow-800">
          <strong>Tips for best results:</strong> Use good lighting, keep receipt flat, ensure text is clear and readable
        </p>
      </div>

      <input
          ref="fileInputRef"
          type="file"
          accept="image/*"
          capture="environment"
          @change="handleFileSelect"
          class="hidden"
          id="receipt-upload"
      />

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label
            for="receipt-upload"
            class="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
          Take Photo
        </label>

        <label
            for="receipt-upload"
            class="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          Upload Image
        </label>
      </div>
    </div>

    <div v-else class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 class="text-sm font-medium text-gray-700 mb-2">Receipt Preview</h4>
          <img
              :src="preview"
              alt="Receipt preview"
              class="w-full h-64 object-contain bg-gray-100 rounded-lg border-2 border-gray-200"
          />
        </div>
        <div>
          <h4 class="text-sm font-medium text-gray-700 mb-2">Extracted Information</h4>
          <div class="bg-white rounded-lg p-4 space-y-3 border-2 border-gray-200">
            <!-- Scanning State -->
            <div v-if="scanning" class="flex items-center justify-center h-48">
              <div class="text-center w-full">
                <svg class="animate-spin h-8 w-8 mx-auto mb-2 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p class="text-sm text-gray-600 mb-2">Reading receipt...</p>
                <div class="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div class="bg-green-600 h-2 rounded-full transition-all duration-300" :style="{ width: progress + '%' }"></div>
                </div>
                <p class="text-xs text-gray-500">{{ progress }}%</p>
              </div>
            </div>
            <div v-else-if="error" class="text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto mb-2 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              <p class="text-sm text-red-600">{{ error }}</p>
              <button
                  @click="handleReset"
                  class="mt-3 text-sm text-blue-600 hover:text-blue-700 underline"
              >
                Try another image
              </button>
            </div>
            <div v-else-if="extractedData">
              <div class="flex items-center text-green-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <span class="text-sm font-medium">Successfully extracted</span>
              </div>
              <div class="space-y-2">
                <div>
                  <span class="text-xs text-gray-500">Merchant</span>
                  <p class="font-medium">{{ extractedData.merchant || 'Not detected' }}</p>
                </div>
                <div>
                  <span class="text-xs text-gray-500">Amount</span>
                  <p class="font-medium text-green-600">
                    Ksh {{ extractedData.amount ? extractedData.amount.toFixed(2) : '0.00' }}
                  </p>
                </div>
                <div>
                  <span class="text-xs text-gray-500">Date</span>
                  <p class="font-medium">{{ extractedData.date || 'Not detected' }}</p>
                </div>
                <div>
                  <span class="text-xs text-gray-500">Category</span>
                  <p class="font-medium">{{ extractedData.category || 'Not detected' }}</p>
                </div>
              </div>
              <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p class="text-xs text-blue-800">
                  Please review the extracted data before saving. You can edit it after clicking "Use This Data".
                </p>
              </div>
              <button
                  @click="handleUseData"
                  class="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Use This Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>