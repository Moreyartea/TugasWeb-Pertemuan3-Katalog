import { formatPrice } from '../utils/formatPrice.js'

function getDiscount(quantity) {
  if (quantity >= 5) return 20
  if (quantity === 4) return 15
  if (quantity === 3) return 10
  if (quantity === 2) return 5
  return 0
}

function getEstimatedTime(estimate, quantity) {
  const match = estimate.match(/(\d+)\D+(\d+)/)

  if (!match) {
    return estimate
  }

  const min = Number(match[1]) * quantity
  const max = Number(match[2]) * quantity

  return `${min}–${max} hari`
}

function openPaymentSuccess(product, orderData) {
  const quantity = orderData.quantity
  const discount = orderData.discount ?? getDiscount(quantity)
  const estimate = orderData.estimate ?? getEstimatedTime(product.estimate, quantity)

  const subtotal = product.price * quantity
  const discountAmount = subtotal * (discount / 100)
  const total = subtotal - discountAmount

  const successPage = document.createElement('div')

  successPage.id = 'success-page'
  successPage.className = 'fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-black/95 p-5'

  successPage.innerHTML = `
    <div class="w-full max-w-lg rounded-lg border border-red-700/50 bg-[#080808] p-7 text-center shadow-2xl shadow-red-950/30">
      <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-red-600 bg-red-600/10 text-xl text-red-500">
        ✓
      </div>

      <p class="mt-6 text-[9px] font-bold tracking-[0.3em] text-red-500">
        PEMBAYARAN BERHASIL
      </p>

      <h1 class="mt-3 text-2xl font-black uppercase tracking-[0.06em] text-white">
        Prapesan Terkonfirmasi
      </h1>

      <p class="mt-4 text-sm leading-6 text-neutral-500">
        Simulasi prapesan untuk
        <span class="text-white">${product.name}</span>
        telah berhasil diproses.
      </p>

      <div class="mt-6 rounded border border-red-950/60 bg-black p-5 text-left">
        <div class="flex justify-between gap-4">
          <span class="text-[8px] tracking-[0.15em] text-neutral-700">
            PEMESAN
          </span>

          <span class="text-xs text-neutral-300">
            ${orderData.name}
          </span>
        </div>

        <div class="mt-4 flex justify-between gap-4">
          <span class="text-[8px] tracking-[0.15em] text-neutral-700">
            PRODUK
          </span>

          <span class="text-xs text-neutral-300">
            ${product.name}
          </span>
        </div>

        <div class="mt-4 flex justify-between gap-4">
          <span class="text-[8px] tracking-[0.15em] text-neutral-700">
            HARGA / UNIT
          </span>

          <span class="text-xs text-neutral-300">
            Rp ${formatPrice(product.price)}
          </span>
        </div>

        <div class="mt-4 flex justify-between gap-4">
          <span class="text-[8px] tracking-[0.15em] text-neutral-700">
            JUMLAH
          </span>

          <span class="text-xs text-neutral-300">
            ${quantity} UNIT
          </span>
        </div>

        <div class="mt-4 flex justify-between gap-4">
          <span class="text-[8px] tracking-[0.15em] text-neutral-700">
            SUBTOTAL
          </span>

          <span class="text-xs text-neutral-300">
            Rp ${formatPrice(subtotal)}
          </span>
        </div>

        <div class="mt-4 flex justify-between gap-4">
          <span class="text-[8px] tracking-[0.15em] text-neutral-700">
            DISKON
          </span>

          <span class="text-xs font-bold text-red-500">
            ${discount}% (-Rp ${formatPrice(discountAmount)})
          </span>
        </div>

        <div class="mt-4 flex justify-between gap-4">
          <span class="text-[8px] tracking-[0.15em] text-neutral-700">
            TOTAL SIMULASI
          </span>

          <span class="text-xs font-bold text-white">
            Rp ${formatPrice(total)}
          </span>
        </div>

        <div class="mt-4 flex justify-between gap-4">
          <span class="text-[8px] tracking-[0.15em] text-neutral-700">
            ESTIMASI
          </span>

          <span class="text-xs text-red-500">
            ${estimate}
          </span>
        </div>

        <div class="mt-4 flex justify-between gap-4">
          <span class="text-[8px] tracking-[0.15em] text-neutral-700">
            ALAMAT
          </span>

          <span class="max-w-[60%] text-right text-xs leading-5 text-neutral-300">
            ${orderData.address}
          </span>
        </div>

        <div class="mt-4 flex justify-between gap-4">
          <span class="text-[8px] tracking-[0.15em] text-neutral-700">
            STATUS
          </span>

          <span class="text-xs text-red-500">
            TERKONFIRMASI
          </span>
        </div>
      </div>

      <p class="mt-6 text-[8px] leading-4 tracking-[0.12em] text-neutral-700">
        TRANSAKSI INI HANYA SIMULASI DAN TIDAK MELIBATKAN PEMBAYARAN NYATA.
      </p>

      <button
        type="button"
        id="back-to-catalog"
        class="mt-6 w-full rounded bg-red-600 px-4 py-3 text-[9px] font-bold tracking-[0.18em] text-white transition hover:bg-red-500"
      >
        KEMBALI KE KATALOG
      </button>
    </div>
  `

  document.body.appendChild(successPage)

  successPage.querySelector('#back-to-catalog').addEventListener('click', () => {
    successPage.remove()

    const catalog = document.querySelector('#katalog')

    if (catalog) {
      catalog.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  })
}

export { openPaymentSuccess }