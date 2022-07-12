// 提供复用逻辑的函数
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
export const useLazyData = (target, apiFn) => {
  const result = ref([])
  const { stop } = useIntersectionObserver(
    // 监听的目标元素
    target,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        stop()
        apiFn().then((data) => {
          result.value = data.result
        })
      }
    }
  )
  return result
}
