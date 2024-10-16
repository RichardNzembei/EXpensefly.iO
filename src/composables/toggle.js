import { ref } from 'vue';
export function useTogglePassword() {
    const isPassVisible = ref(false)
    function togglePassword() {
        isPassVisible.value = !isPassVisible.value
    }
    return { isPassVisible, togglePassword }
}