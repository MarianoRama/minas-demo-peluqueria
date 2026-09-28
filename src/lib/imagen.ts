/**
 * Redimensiona una imagen elegida por el usuario a un máximo de `maxLado` px
 * (relación de aspecto preservada) y la devuelve como dataURL JPEG. Pensado
 * para que las fotos que se cargan desde el panel no llenen localStorage.
 */
export function redimensionarAJpegDataUrl(
  archivo: File,
  maxLado = 1200,
  calidad = 0.75,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const lector = new FileReader()
    lector.onerror = () => reject(new Error('No se pudo leer el archivo.'))
    lector.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('El archivo no parece ser una imagen válida.'))
      img.onload = () => {
        let { width, height } = img
        if (width > maxLado || height > maxLado) {
          if (width >= height) {
            height = Math.round((height * maxLado) / width)
            width = maxLado
          } else {
            width = Math.round((width * maxLado) / height)
            height = maxLado
          }
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('No se pudo procesar la imagen en este navegador.'))
          return
        }
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', calidad))
      }
      img.src = lector.result as string
    }
    lector.readAsDataURL(archivo)
  })
}
