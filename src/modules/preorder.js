import { openPayment } from './payment.js'
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

function openPreorder(product) {
  const existingPage = document.querySelector('#preorder-page')

  if (existingPage) {
    existingPage.remove()
  }

  const page = document.createElement('div')

  page.id = 'preorder-page'
  page.className = 'fixed inset-0 z-[60] overflow-y-auto bg-[#050505]'

  page.innerHTML = `
    <div class="min-h-screen">
      <header class="border-b border-red-900/30 bg-black">
        <div class="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <div class="min-w-0">
            <p class="truncate text-[8px] font-bold tracking-[0.25em] text-red-500">
              NECROVAULT
            </p>

            <p class="mt-1 truncate text-[8px] tracking-[0.18em] text-neutral-700">
              MODUL PRAPESAN
            </p>
          </div>

          <button
            type="button"
            id="close-preorder"
            class="shrink-0 rounded border border-red-900 px-3 py-1.5 text-[8px] font-bold tracking-[0.15em] text-red-500 transition hover:bg-red-900 hover:text-white"
          >
            KEMBALI
          </button>
        </div>
      </header>

      <main class="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        <div class="mb-8">
          <p class="text-[9px] font-bold tracking-[0.3em] text-red-500">
            PRAPESAN / FORMULIR 01
          </p>

          <h1 class="mt-3 text-3xl font-black tracking-tight text-white">
            Formulir Prapesan
          </h1>

          <p class="mt-3 max-w-xl text-sm leading-6 text-neutral-500">
            Lengkapi data berikut untuk melanjutkan ke simulasi pembayaran.
          </p>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
          <div class="overflow-hidden rounded-lg border border-red-950/60 bg-black">
            <div class="aspect-[5/3] overflow-hidden border-b border-red-950/60">
              <img
                src="${product.image}"
                alt="${product.name}"
                class="h-full w-full object-cover"
                onerror="this.onerror=null;this.src='/products/biocore.svg';"
              >
            </div>

            <div class="p-5">
              <p class="text-[8px] tracking-[0.2em] text-red-500">
                ${product.category}
              </p>

              <h2 class="mt-2 text-xl font-bold uppercase tracking-[0.08em] text-white">
                ${product.name}
              </h2>

              <div class="mt-5 grid grid-cols-2 gap-4 border-t border-red-950/60 pt-4">
                <div class="min-w-0">
                  <p class="text-[8px] tracking-[0.15em] text-neutral-700">
                    HARGA / UNIT
                  </p>

                  <p class="mt-1 truncate text-xs font-bold text-white">
                    Rp ${formatPrice(product.price)}
                  </p>
                </div>

                <div class="min-w-0">
                  <p class="text-[8px] tracking-[0.15em] text-neutral-700">
                    ESTIMASI PRAPESAN
                  </p>

                  <p
                    id="preorder-estimate"
                    class="mt-1 truncate text-xs font-bold text-red-500"
                  >
                    ${product.estimate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form
            id="preorder-form"
            class="rounded-lg border border-red-950/60 bg-black p-5 sm:p-6"
          >
            <div>
              <label
                for="preorder-name"
                class="text-[8px] font-bold tracking-[0.18em] text-neutral-500"
              >
                NAMA PEMESAN
              </label>

              <input
                id="preorder-name"
                type="text"
                required
                class="mt-2 w-full rounded border border-neutral-800 bg-[#090909] px-3 py-2.5 text-sm text-white outline-none transition focus:border-red-600"
                placeholder="Masukkan nama"
              >
            </div>

            <div class="mt-5">
              <label
                for="preorder-email"
                class="text-[8px] font-bold tracking-[0.18em] text-neutral-500"
              >
                EMAIL
              </label>

              <input
                id="preorder-email"
                type="email"
                required
                class="mt-2 w-full rounded border border-neutral-800 bg-[#090909] px-3 py-2.5 text-sm text-white outline-none transition focus:border-red-600"
                placeholder="nama@email.com"
              >
            </div>

            <div class="mt-5">
              <label
                for="preorder-address"
                class="text-[8px] font-bold tracking-[0.18em] text-neutral-500"
              >
                ALAMAT PENGIRIMAN
              </label>

              <textarea
                id="preorder-address"
                required
                rows="3"
                class="mt-2 w-full resize-none rounded border border-neutral-800 bg-[#090909] px-3 py-2.5 text-sm text-white outline-none transition focus:border-red-600"
                placeholder="Masukkan alamat pengiriman"
              ></textarea>
            </div>

            <div class="mt-5">
              <label
                for="preorder-quantity"
                class="text-[8px] font-bold tracking-[0.18em] text-neutral-500"
              >
                JUMLAH
              </label>

              <select
                id="preorder-quantity"
                class="mt-2 w-full rounded border border-neutral-800 bg-[#090909] px-3 py-2.5 text-sm text-white outline-none transition focus:border-red-600"
              >
                <option value="1">01 UNIT</option>
                <option value="2">02 UNIT</option>
                <option value="3">03 UNIT</option>
                <option value="4">04 UNIT</option>
                <option value="5">05 UNIT</option>
              </select>
            </div>

            <div class="mt-5">
              <p class="text-[8px] font-bold tracking-[0.18em] text-neutral-500">
                METODE PEMBAYARAN
              </p>

              <div class="mt-2 space-y-2">
                <label class="flex cursor-pointer items-center gap-3 rounded border border-neutral-800 bg-[#090909] p-3 transition hover:border-red-700">
                  <input
                    type="radio"
                    name="payment"
                    value="Kartu Simulasi"
                    checked
                    class="accent-red-600"
                  >

                  <span class="text-xs text-neutral-400">
                    Kartu Simulasi
                  </span>
                </label>

                <label class="flex cursor-pointer items-center gap-3 rounded border border-neutral-800 bg-[#090909] p-3 transition hover:border-red-700">
                  <input
                    type="radio"
                    name="payment"
                    value="Transfer Simulasi"
                    class="accent-red-600"
                  >

                  <span class="text-xs text-neutral-400">
                    Transfer Simulasi
                  </span>
                </label>

                <label class="flex cursor-pointer items-center gap-3 rounded border border-neutral-800 bg-[#090909] p-3 transition hover:border-red-700">
                  <input
                    type="radio"
                    name="payment"
                    value="QR Simulasi"
                    class="accent-red-600"
                  >

                  <span class="text-xs text-neutral-400">
                    QR Simulasi
                  </span>
                </label>
              </div>
            </div>

            <div class="mt-6 rounded border border-red-950/60 bg-[#090909] p-4">
              <div class="flex items-center justify-between gap-4">
                <span class="shrink-0 text-[8px] tracking-[0.15em] text-neutral-700">
                  HARGA / UNIT
                </span>

                <span class="min-w-0 flex-1 truncate text-right text-xs font-bold text-white">
                  Rp ${formatPrice(product.price)}
                </span>
              </div>

              <div class="mt-3 flex items-center justify-between gap-4">
                <span class="shrink-0 text-[8px] tracking-[0.15em] text-neutral-700">
                  ESTIMASI
                </span>

                <span
                  id="preorder-estimate-summary"
                  class="min-w-0 flex-1 truncate text-right text-xs font-bold text-red-500"
                >
                  ${product.estimate}
                </span>
              </div>

              <div class="mt-3 flex items-center justify-between gap-4">
                <span class="shrink-0 text-[8px] tracking-[0.15em] text-neutral-700">
                  DISKON
                </span>

                <span
                  id="preorder-discount"
                  class="min-w-0 flex-1 truncate text-right text-xs font-bold text-red-500"
                >
                  0%
                </span>
              </div>
            </div>

            <div class="mt-6 border-t border-red-950/60 pt-5">
              <p class="text-[8px] leading-4 tracking-[0.12em] text-neutral-700">
                SISTEM PEMBAYARAN INI SEPENUHNYA FIKTIF DAN TIDAK MEMPROSES TRANSAKSI NYATA.
              </p>

              <button
                type="submit"
                class="mt-4 w-full rounded bg-red-600 px-4 py-3 text-[9px] font-bold tracking-[0.18em] text-white transition hover:bg-red-500"
              >
                LANJUTKAN PEMBAYARAN
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  `

  document.body.appendChild(page)

  const quantitySelect = page.querySelector('#preorder-quantity')
  const estimateElement = page.querySelector('#preorder-estimate')
  const estimateSummary = page.querySelector('#preorder-estimate-summary')
  const discountElement = page.querySelector('#preorder-discount')

  function updateOrderInfo() {
    const quantity = Number(quantitySelect.value)
    const discount = getDiscount(quantity)
    const estimate = getEstimatedTime(product.estimate, quantity)

    estimateElement.textContent = estimate
    estimateSummary.textContent = estimate
    discountElement.textContent = `${discount}%`
  }

  quantitySelect.addEventListener('change', updateOrderInfo)

  page.querySelector('#close-preorder').addEventListener('click', () => {
    page.remove()
  })

  page.querySelector('#preorder-form').addEventListener('submit', (event) => {
    event.preventDefault()

    const name = page.querySelector('#preorder-name').value
    const email = page.querySelector('#preorder-email').value
    const address = page.querySelector('#preorder-address').value
    const quantity = Number(quantitySelect.value)
    const payment = page.querySelector('input[name="payment"]:checked').value
    const discount = getDiscount(quantity)
    const estimate = getEstimatedTime(product.estimate, quantity)

    openPayment(product, {
      name,
      email,
      address,
      quantity,
      payment,
      discount,
      estimate
    })

    page.remove()
  })
}

export { openPreorder }