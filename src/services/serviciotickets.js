const STORAGE_KEY = 'sansanmark_tickets';

export function getTickets() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function createTicket(ticket) {
  const current = getTickets();
  const next = [...current, { id: crypto.randomUUID(), ...ticket }];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function filterTicketsByMovie(movie) {
  if (!movie) return getTickets();
  return getTickets().filter(t => t.movie === movie);
}

export const MOVIES = [
  { label: 'Wifi Ralph', value: 'Wifi Ralph' },
  { label: 'Dragon Ball Super Broly', value: 'Dragon Ball Super Broly' },
  { label: 'Cascanueces', value: 'Cascanueces' },
  { label: 'El Grinch', value: 'El Grinch' }
];

export const DAYS = [
  { label: 'Lunes', value: 'Lunes' },
  { label: 'Martes', value: 'Martes' },
  { label: 'Miércoles', value: 'Miércoles' },
  { label: 'Jueves', value: 'Jueves' },
  { label: 'Viernes', value: 'Viernes' }
];

export const PAY_TYPES = [
  { label: 'Efectivo', value: 'Efectivo' },
  { label: 'Tarjeta', value: 'Tarjeta' }
];

export const TICKET_PRICE = 5000;
