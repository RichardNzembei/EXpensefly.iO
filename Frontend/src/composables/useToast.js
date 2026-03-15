import { ref } from 'vue';

const toasts = ref([]);
let idCounter = 0;

export function useToast() {
  const addToast = (message, type = 'info', duration = 3000) => {
    const id = ++idCounter;
    toasts.value.push({ id, message, type });
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id);
    }, duration);
  };

  const success = (msg) => addToast(msg, 'success');
  const error = (msg) => addToast(msg, 'error');
  const info = (msg) => addToast(msg, 'info');

  return { toasts, success, error, info };
}
