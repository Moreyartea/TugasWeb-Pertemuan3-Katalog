function initAccessWarning() {
  const accessGranted = sessionStorage.getItem('necroVaultAccess')

  if (accessGranted === 'true') {
    return
  }

  const overlay = document.createElement('div')

  overlay.id = 'access-warning'
  overlay.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-black p-6'

  overlay.innerHTML = `
    <div class="w-full max-w-xl">
      <div class="mb-8 text-center">
        <p class="text-[9px] font-bold tracking-[0.45em] text-red-600">
          NECROVAULT SYSTEM
        </p>

        <div
          id="access-status"
          class="mt-4 font-mono text-[10px] leading-6 tracking-[0.12em] text-neutral-600"
        >
          INITIALIZING ARCHIVE...
        </div>
      </div>

      <div
        id="access-panel"
        class="hidden rounded border border-red-900/50 bg-[#050505] p-6 shadow-2xl shadow-red-950/20 sm:p-8"
      >
        <div class="border-b border-red-950/60 pb-5">
          <p class="text-[9px] font-bold tracking-[0.35em] text-red-500">
            ⚠ ACCESS RESTRICTED
          </p>

          <h1 class="mt-4 text-2xl font-black uppercase tracking-[0.08em] text-white">
            Restricted Biological Archive
          </h1>
        </div>

        <div class="mt-6 space-y-4 text-[10px] leading-6 tracking-[0.08em] text-neutral-500">
          <p>
            Anda sedang mengakses antarmuka katalog fiksi
            bertema komponen biologis.
          </p>

          <p>
            Seluruh produk, harga, ketersediaan, estimasi,
            dan transaksi di dalam sistem ini merupakan
            <span class="font-bold text-neutral-300">
              SIMULASI UNTUK KEPERLUAN PEMBELAJARAN.
            </span>
          </p>

          <p>
            Tidak ada produk biologis nyata, layanan medis,
            maupun transaksi finansial nyata yang disediakan
            melalui sistem ini.
          </p>
        </div>

        <div class="mt-6 border-t border-red-950/60 pt-5">
          <p class="font-mono text-[8px] leading-5 tracking-[0.12em] text-neutral-700">
            ACCESSING THIS INTERFACE MEANS YOU ACKNOWLEDGE
            THE SIMULATED NATURE OF THIS ARCHIVE.
          </p>

          <button
            type="button"
            id="enter-archive"
            class="mt-5 w-full rounded border border-red-700 bg-red-600 px-4 py-3 text-[9px] font-bold tracking-[0.2em] text-white transition hover:bg-red-500"
          >
            ENTER ARCHIVE
          </button>
        </div>
      </div>

      <p
        id="access-footer"
        class="mt-6 text-center font-mono text-[8px] tracking-[0.2em] text-neutral-800"
      >
        SECURITY PROTOCOL // ACTIVE
      </p>
    </div>
  `

  document.body.appendChild(overlay)

  const status = overlay.querySelector('#access-status')
  const panel = overlay.querySelector('#access-panel')
  const enterButton = overlay.querySelector('#enter-archive')

  setTimeout(() => {
    status.innerHTML = `
      DATABASE ........ CONNECTED<br>
      ARCHIVE .......... CONNECTED<br>
      SECURITY ......... ACTIVE<br>
      SYSTEM ........... READY
    `

    setTimeout(() => {
      panel.classList.remove('hidden')
    }, 500)
  }, 900)

  enterButton.addEventListener('click', () => {
    sessionStorage.setItem('necroVaultAccess', 'true')

    overlay.style.transition = 'opacity 400ms ease'
    overlay.style.opacity = '0'

    setTimeout(() => {
      overlay.remove()
    }, 400)
  })
}

export { initAccessWarning }