import { useEffect, useMemo, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { getTickets, filterTicketsByMovie, MOVIES, TICKET_PRICE } from '../services/ticketService';

export default function TicketsTable() {
  const [movieFilter, setMovieFilter] = useState(null);
  const [rows, setRows] = useState([]);

  const movieOptions = useMemo(() => [{ label: 'Todas', value: null }, ...MOVIES], []);

  const load = (movie) => {
    const data = movie ? filterTicketsByMovie(movie) : getTickets();
    setRows(data);
  };

  useEffect(() => { load(movieFilter); }, [movieFilter]);

  const priceBody = (row) => (row.qty * TICKET_PRICE).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });

  return (
    <div className="card p-4">
      <div className="flex align-items-center justify-content-between mb-3">
        <h3 className="m-0">Entradas Compradas</h3>
        <div className="flex align-items-center gap-2">
          <span className="font-semibold">Filtrar por película:</span>
          <Dropdown value={movieFilter} onChange={(e) => setMovieFilter(e.value)} options={movieOptions} />
        </div>
      </div>

      <DataTable value={rows} emptyMessage="No hay entradas registradas.">
        <Column field="day" header="Día" />
        <Column field="movie" header="Película" />
        <Column field="qty" header="Cantidad de Entradas" />
        <Column header="Valor a Pagar" body={priceBody} />
      </DataTable>
    </div>
  );
}
