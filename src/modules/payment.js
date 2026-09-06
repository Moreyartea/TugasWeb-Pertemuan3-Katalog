import { openPaymentSuccess } from './success.js'
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

function openPayment(product, orderData) {
  const quantity = orderData.quantity
  const discount = orderData.discount ?? getDiscount(quantity)
  const estimate = orderData.estimate ?? getEstimatedTime(product.estimate, quantity)

  const subtotal = product.price * quantity
  const discountAmount = subtotal * (discount / 100)
  const total = subtotal - discountAmount

  const paymentPage = document.createElement('div')

  paymentPage.id = 'payment-page'
  paymentPage.className = 'fixed inset-0 z-[70] overflow-y-auto bg-[#050505]'

  paymentPage.innerHTML = `
    <div class="min-h-screen">
      <header class="border-b border-red-900/30 bg-black">
        <div class="mx-auto flex max-w-4xl items-center justify-between px-5 py-4 sm:px-8">
          <div>
            <p class="text-[8px] font-bold tracking-[0.25em] text-red-500">
              NECROVAULT
            </p>

            <p class="mt-1 text-[8px] tracking-[0.18em] text-neutral-700">
              PEMBAYARAN SIMULASI
            </p>
          </div>

          <button
            type="button"
            id="close-payment"
            class="rounded border border-red-900 px-3 py-1.5 text-[8px] font-bold tracking-[0.15em] text-red-500 transition hover:bg-red-900 hover:text-white"
          >
            BATAL
          </button>
        </div>
      </header>

      <main class="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
        <div class="mb-8">
          <p class="text-[9px] font-bold tracking-[0.3em] text-red-500">
            PEMBAYARAN / SIMULASI
          </p>

          <h1 class="mt-3 text-3xl font-black tracking-tight text-white">
            Konfirmasi Pembayaran
          </h1>

          <p class="mt-3 max-w-xl text-sm leading-6 text-neutral-500">
            Periksa kembali data pesanan sebelum menjalankan simulasi pembayaran.
          </p>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
          <div class="rounded-lg border border-red-950/60 bg-black p-6">
            <p class="text-[8px] font-bold tracking-[0.2em] text-red-500">
              RINGKASAN PESANAN
            </p>

            <div class="mt-5 flex gap-4">
              <div class="h-20 w-24 shrink-0 overflow-hidden rounded border border-red-950/60">
                <img
                  src="${product.image}"
                  alt="${product.name}"
                  class="h-full w-full object-cover"
                  onerror="this.onerror=null;this.src='/products/biocore.svg';"
                >
              </div>

              <div>
                <h2 class="text-sm font-bold uppercase tracking-[0.08em] text-white">
                  ${product.name}
                </h2>

                <p class="mt-1 text-[8px] tracking-[0.15em] text-neutral-600">
                  NV-${String(product.id).padStart(3, '0')}
                </p>
              </div>
            </div>

            <div class="mt-6 space-y-4 border-t border-red-950/60 pt-5">
              <div class="flex justify-between gap-4">
                <span class="text-[9px] tracking-[0.12em] text-neutral-600">
                  PEMESAN
                </span>

                <span class="text-xs text-neutral-300">
                  ${orderData.name}
                </span>
              </div>

              <div class="flex justify-between gap-4">
                <span class="text-[9px] tracking-[0.12em] text-neutral-600">
                  EMAIL
                </span>

                <span class="max-w-[60%] truncate text-xs text-neutral-300">
                  ${orderData.email}
                </span>
              </div>

              <div class="flex justify-between gap-4">
                <span class="text-[9px] tracking-[0.12em] text-neutral-600">
                  ALAMAT
                </span>

                <span class="max-w-[60%] text-right text-xs leading-5 text-neutral-300">
                  ${orderData.address}
                </span>
              </div>

              <div class="flex justify-between gap-4">
                <span class="text-[9px] tracking-[0.12em] text-neutral-600">
                  HARGA / UNIT
                </span>

                <span class="text-xs text-neutral-300">
                  Rp ${formatPrice(product.price)}
                </span>
              </div>

              <div class="flex justify-between gap-4">
                <span class="text-[9px] tracking-[0.12em] text-neutral-600">
                  JUMLAH
                </span>

                <span class="text-xs text-neutral-300">
                  ${quantity} UNIT
                </span>
              </div>

              <div class="flex justify-between gap-4">
                <span class="text-[9px] tracking-[0.12em] text-neutral-600">
                  ESTIMASI
                </span>

                <span class="text-xs text-red-500">
                  ${estimate}
                </span>
              </div>

              <div class="flex justify-between gap-4">
                <span class="text-[9px] tracking-[0.12em] text-neutral-600">
                  METODE
                </span>

                <span class="text-xs text-red-500">
                  ${orderData.payment}
                </span>
              </div>
            </div>
          </div>

          <div class="rounded-lg border border-red-700/40 bg-red-950/10 p-6">
            <div class="flex items-center gap-3">
              <span class="text-red-600">
                ⚠
              </span>

              <p class="text-xs font-bold tracking-[0.15em] text-red-500">
                PEMBAYARAN FIKTIF
              </p>
            </div>

            <p class="mt-5 text-sm leading-6 text-neutral-500">
              Ini merupakan halaman pembayaran simulasi untuk keperluan pembelajaran web.
            </p>

            <div class="mt-6 rounded border border-red-900/50 bg-black p-4">
              <div class="flex justify-between gap-4">
                <span class="text-[8px] tracking-[0.15em] text-neutral-700">
                  SUBTOTAL
                </span>

                <span class="text-xs text-neutral-300">
                  Rp ${formatPrice(subtotal)}
                </span>
              </div>

              <div class="mt-3 flex justify-between gap-4">
                <span class="text-[8px] tracking-[0.15em] text-neutral-700">
                  DISKON
                </span>

                <span class="text-xs font-bold text-red-500">
                  ${discount}% (-Rp ${formatPrice(discountAmount)})
                </span>
              </div>

              <div class="mt-4 border-t border-red-950/60 pt-4">
                <p class="text-[8px] tracking-[0.15em] text-neutral-700">
                  TOTAL SIMULASI
                </p>

                <p class="mt-2 text-xl font-black tracking-[0.08em] text-white">
                  Rp ${formatPrice(total)}
                </p>

                <p class="mt-2 text-[8px] leading-4 tracking-[0.1em] text-neutral-700">
                  Rp ${formatPrice(product.price)} × ${quantity} UNIT
                </p>
              </div>
            </div>

            <button
              type="button"
              id="confirm-payment"
              class="mt-6 w-full rounded bg-red-600 px-4 py-3 text-[9px] font-bold tracking-[0.18em] text-white transition hover:bg-red-500"
            >
              KONFIRMASI PEMBAYARAN
            </button>
          </div>
        </div>
      </main>
    </div>
  `

  document.body.appendChild(paymentPage)

  paymentPage.querySelector('#close-payment').addEventListener('click', () => {
    paymentPage.remove()
  })

  paymentPage.querySelector('#confirm-payment').addEventListener('click', () => {
    paymentPage.remove()

    openPaymentSuccess(product, {
      ...orderData,
      discount,
      estimate
    })
  })
}

export { openPayment }