export const price = (n: number) => (Number.isInteger(n) ? `£${n}` : `£${n.toFixed(2)}`)

/** Menu-style price, as printed: 3.5, 14pp */
export const menuPrice = (n: number) => String(n)

export const mapsLinks = (q: string, lat: number, lng: number) => ({
  google: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`,
  apple: `https://maps.apple.com/?q=${encodeURIComponent(q)}&ll=${lat},${lng}`,
  citymapper: `https://citymapper.com/directions?endcoord=${lat}%2C${lng}&endname=${encodeURIComponent(q)}`,
})
