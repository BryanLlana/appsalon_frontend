import { parseISO, format } from "date-fns"
import es from 'date-fns/locale/es'

export const formatCurrency = price => {
  return Number(price).toLocaleString('es-PE', {
    style: 'currency',
    currency: 'PEN'
  })
}

export const displayDate = isoDate => {
  const newDate = parseISO(isoDate)
  const formatterDate = format(newDate, 'PPPP', { locale: es })
  return formatterDate
}

export const convertToDDMMYYYY = isoDate => {
  const newDate = new Date(isoDate)
  const formatterDate = format(newDate, 'dd/MM/yyyy')
  return formatterDate
}