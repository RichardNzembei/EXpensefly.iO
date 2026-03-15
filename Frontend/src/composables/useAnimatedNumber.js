import { ref, watch } from 'vue';

export function useAnimatedNumber(target, duration = 600) {
  const displayValue = ref(0);
  let animationFrame = null;

  watch(target, (newVal, oldVal) => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    const start = oldVal || 0;
    const end = newVal || 0;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      displayValue.value = Math.round(start + (end - start) * eased);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        displayValue.value = end;
      }
    };

    animationFrame = requestAnimationFrame(animate);
  }, { immediate: true });

  return displayValue;
}
