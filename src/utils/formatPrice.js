function formatPrice(price) {
  return new Intl.NumberFormat('id-ID').format(price)
}

export { formatPrice }