export const useDeviceDetection = () => {
  const getUserAgent = () => {
    return navigator.userAgent.toLowerCase()
  }

  const isAndroid = () => {
    const ua = getUserAgent()
    return ua.indexOf('android') > -1
  }

  const isIOS = () => {
    const ua = getUserAgent()
    return (
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    )
  }

  const isMobile = () => {
    return isAndroid() || isIOS()
  }

  return {
    isAndroid,
    isIOS,
    isMobile,
  }
}
