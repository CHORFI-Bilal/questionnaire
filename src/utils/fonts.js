export const loadFonts = () => {
  if (typeof window !== 'undefined') {
    const link1 = document.createElement('link')
    link1.rel = 'preconnect'
    link1.href = 'https://fonts.googleapis.com'
    document.head.appendChild(link1)

    const link2 = document.createElement('link')
    link2.rel = 'preconnect'
    link2.href = 'https://fonts.gstatic.com'
    link2.crossOrigin = true
    document.head.appendChild(link2)

    const link3 = document.createElement('link')
    link3.rel = 'stylesheet'
    link3.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
    document.head.appendChild(link3)

    const link4 = document.createElement('link')
    link4.rel = 'stylesheet'
    link4.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap'
    document.head.appendChild(link4)
  }
}