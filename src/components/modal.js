import { openPreorder } from '../modules/preorder.js'
import { formatPrice } from '../utils/formatPrice.js'

function openModal(product) {
  const existingModal = document.querySelector('#product-modal')

  if (existingModal) {
    existingModal.remove()
  }

  const modal = document.createElement('div')

  modal.id = 'product-modal'
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/90 p-4'

  modal.innerHTML = `
    <div class="relative my-8 w-full max-w-2xl overflow-hidden rounded-lg border border-red-900 bg-black shadow-2xl shadow-red-950/40">
      <button
        type="button"
        id="close-modal"
        class="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded border border-red-900 bg-black text-sm text-red-500 transition hover:bg-red-900 hover:text-white"
        aria-label="Tutup"
      >
        ×
      </button>

      <div class="grid md:grid-cols-2">
        <div class="aspect-square overflow-hidden bg-black">
          <img
            src="${product.image}"
            alt="${product.name}"
            class="h-full w-full object-cover"
            onerror="this.onerror=null;this.src='/products/biocore.svg';"
          >
        </div>

        <div class="p-6">
          <p class="text-[8px] tracking-[0.2em] text-red-500">
            ${product.category}
          </p>

          <h2 class="mt-3 text-xl font-semibold uppercase tracking-[0.08em] text-white">
            ${product.name}
          </h2>

          <p class="mt-4 text-sm leading-6 text-gray-500">
            ${product.description}
          </p>

          <div class="mt-6 border-t border-red-950/60 pt-4">
            <p class="text-[8px] tracking-[0.16em] text-gray-600">
              STATUS ARSIP
            </p>

            <p class="mt-2 text-xs tracking-[0.14em] text-red-500">
              ${product.status}
            </p>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <div class="min-w-0 rounded border border-red-950/60 bg-[#090909] p-3">
              <p class="text-[8px] tracking-[0.15em] text-neutral-700">
                HARGA
              </p>

              <p class="mt-1 truncate text-xs font-bold text-white">
                Rp ${formatPrice(product.price)}
              </p>
            </div>

            <div class="min-w-0 rounded border border-red-950/60 bg-[#090909] p-3">
              <p class="text-[8px] tracking-[0.15em] text-neutral-700">
                ESTIMASI
              </p>

              <p class="mt-1 truncate text-xs font-bold text-red-500">
                ${product.estimate}
              </p>
            </div>
          </div>

          <div class="mt-4">
            <button
              type="button"
              id="preorder-button"
              class="w-full rounded border border-red-600 bg-red-600 px-4 py-2.5 text-[9px] font-bold tracking-[0.18em] text-white transition hover:bg-red-500"
            >
              PRAPESAN
            </button>
          </div>

          <p class="mt-4 text-[8px] leading-4 tracking-[0.12em] text-gray-700">
            KATALOG FIKSI. SELURUH DATA DAN PROSES PEMESANAN BERSIFAT SIMULASI.
          </p>
        </div>
      </div>
    </div>
  `

  document.body.appendChild(modal)

  modal.querySelector('#close-modal').addEventListener('click', () => {
    modal.remove()
  })

  modal.querySelector('#preorder-button').addEventListener('click', () => {
    modal.remove()
    openPreorder(product)
  })

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.remove()
    }
  })
}

export { openModal }