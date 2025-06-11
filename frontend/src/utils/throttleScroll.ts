export const throttleScroll = (fn: () => void, timeout: number) => {
  let timer: NodeJS.Timeout | null = null

  return function perform() {
    if (timer) return

    timer = setTimeout(() => {
      fn()

      if (timer !== null) {
        clearTimeout(timer)
        timer = null
      }
    }, timeout)
  }
}
