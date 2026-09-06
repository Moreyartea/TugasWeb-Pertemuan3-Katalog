import { products } from './products.js'

const filterData = {
  'PALING POPULER': {
    archive: 'ARSIP 01',
    title: 'Katalog Populer',
    products: products.filter((product) => product.popular)
  },

  'ORGAN VITAL': {
    archive: 'ARSIP 02',
    title: 'Organ Vital',
    products: products.filter((product) => product.group === 'ORGAN VITAL')
  },

  'SISTEM NEURAL': {
    archive: 'ARSIP 03',
    title: 'Sistem Neural',
    products: products.filter((product) => product.group === 'SISTEM NEURAL')
  },

  'JARINGAN TUBUH': {
    archive: 'ARSIP 04',
    title: 'Jaringan Tubuh',
    products: products.filter((product) => product.group === 'JARINGAN TUBUH')
  },

  'SEL & CAIRAN': {
    archive: 'ARSIP 05',
    title: 'Sel & Cairan',
    products: products.filter((product) => product.group === 'SEL & CAIRAN')
  },

  'TRANSPLANTASI KOMPOSIT': {
    archive: 'ARSIP 06',
    title: 'Transplantasi Komposit',
    products: products.filter((product) => product.group === 'TRANSPLANTASI KOMPOSIT')
  }
}

export { filterData }