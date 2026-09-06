import { products } from '../data/products.js'
import { filterData } from '../data/filters.js'
import { openModal } from './modal.js'

const productGrid = document.querySelector('#product-grid')
const productCount = document.querySelector('#product-count')
const filterButtons = document.querySelectorAll('[data-filter]')
const catalogTitle = document.querySelector('#catalog-title')
const catalogArchive = document.querySelector('#catalog-archive')

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID').format(price)
}

function renderProducts(list) {
  if (!productGrid) return

  productGrid.innerHTML = list.map((product) => `
    <article class="group flex h-full flex-col overflow-hidden rounded-lg border border-red-950/60 bg-black transition hover:border-red-700">
      <div class="aspect-[5/3] overflow-hidden border-b border-red-950/60 bg-black">
        <img
          src="${product.image}"
          alt="${product.name}"
          class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onerror="this.onerror=null;this.src='/products/biocore.svg';"
        >
      </div>

      <div class="flex flex-1 flex-col p-4">
        <div class="mb-2 flex items-center justify-between gap-3">
          <span class="min-w-0 flex-1 truncate text-[8px] tracking-[0.18em] text-red-500">
            ${product.category}
          </span>

          <span class="shrink-0 text-[8px] tracking-[0.14em] text-gray-500">
            #${String(product.id).padStart(2, '0')}
          </span>
        </div>

        <h3 class="min-h-12 text-base font-semibold uppercase tracking-[0.08em] text-white">
          ${product.name}
        </h3>

        <p class="mt-2 text-xs leading-5 text-gray-500">
          ${product.description}
        </p>

        <div class="mt-4 border-t border-red-950/60 pt-3">
          <div class="flex items-end justify-between gap-3">
            <div class="min-w-0 flex-1">
              <p class="text-[8px] tracking-[0.16em] text-gray-600">
                HARGA
              </p>

              <p class="mt-1 truncate text-[10px] font-bold tracking-[0.05em] text-white">
                Rp ${formatPrice(product.price)}
              </p>
            </div>

            <div class="min-w-0 shrink-0 text-right">
              <p class="text-[8px] tracking-[0.16em] text-gray-600">
                STATUS
              </p>

              <p class="mt-1 truncate text-[10px] tracking-[0.12em] text-red-500">
                ${product.status}
              </p>
            </div>
          </div>

          <button
            type="button"
            class="mt-3 w-full rounded border border-red-900 px-3 py-1.5 text-[7px] font-medium tracking-[0.15em] text-red-500 transition hover:bg-red-900 hover:text-white"
            data-product-id="${product.id}"
          >
            LIHAT SPESIFIKASI
          </button>
        </div>
      </div>
    </article>
  `).join('')

  if (productCount) {
    productCount.textContent = `${String(list.length).padStart(2, '0')} ITEM`
  }

  productGrid.querySelectorAll('[data-product-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const product = products.find(
        (item) => item.id === Number(button.dataset.productId)
      )

      if (product) {
        openModal(product)
      }
    })
  })
}

function setActiveFilter(filter) {
  const selectedFilter = filterData[filter]

  if (!selectedFilter) return

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === filter

    if (isActive) {
      button.classList.remove(
        'border-neutral-800',
        'bg-[#0b0b0b]',
        'text-neutral-400'
      )

      button.classList.add(
        'border-red-600',
        'bg-red-600',
        'text-white'
      )
    } else {
      button.classList.remove(
        'border-red-600',
        'bg-red-600',
        'text-white'
      )

      button.classList.add(
        'border-neutral-800',
        'bg-[#0b0b0b]',
        'text-neutral-400'
      )
    }
  })

  if (catalogArchive) {
    catalogArchive.textContent = selectedFilter.archive
  }

  if (catalogTitle) {
    catalogTitle.textContent = selectedFilter.title
  }

  renderProducts(selectedFilter.products)
}

function initCatalog() {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setActiveFilter(button.dataset.filter)
    })
  })

  setActiveFilter('PALING POPULER')
}

export { initCatalog }