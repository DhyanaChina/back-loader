// resource load use no-cors mode default
// html load must use cors
export const $fetch = (url: string, init: RequestInit = {}) => {
  return fetch(url, Object.assign({ mode: 'cors', cache: 'reload' }, init))
  .then(r => r.text())
}

// like './images/xxx' or '../images'
export const isRelativeURL = (path: string) => {
  return path.startsWith('./') || path.startsWith('..')
}


export const makeResourceReg = (str: string): RegExp => {
  return {
    script: /\<script\s+\S?src\=\"([^"]*)\"/g,
    style: /\<link\s+\S?\s?href\=\"([^"]*.css)\"/g,
  }[str]
}

// find scripts and styles in html string
export const filterResources = (source: string, type: string): string[] => {
  const reg: RegExp = makeResourceReg(type), arr: string[] = []
  let result: string[], num = 10
  while ((result = reg.exec(source)) && num --) {
    if (result[1] && !isRelativeURL(result[1])) {
      arr.push(result[1])
    }
  }
  return arr
}

export const listenImageLoad = (images: HTMLImageElement[], done: (url: string) => void)
: void => {
  images.forEach(img => img.onload = () => done(img.src))
}

export const hiddenIframe = (iframe: HTMLIFrameElement): HTMLIFrameElement => {
  iframe.style.opacity = '0'
  iframe.style.position = 'fixed'
  iframe.style.top = '-20000px'
  iframe.style.left = '-20000px'
  iframe.style.zIndex = '-100'
  iframe.style.width = '1px'
  iframe.style.height = '1px'
  return iframe
}
