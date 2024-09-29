export function checkRenderingType() {
  const isServer = typeof window === 'undefined'

  if (isServer) {
    console.log('Rendering on the server side')
  } else {
    console.log('Rendering on the client side')
  }
}
