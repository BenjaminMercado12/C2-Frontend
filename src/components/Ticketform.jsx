import { useRef, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { ListBox } from 'primereact/listbox';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { Toast } from 'primereact/toast';

import {
  createTicket,
  DAYS,
  PAY_TYPES,
  MOVIES
} from '../services/ticketService';

export default function TicketForm() {
  const [day, setDay] = useState(null);
  const [payType, setPayType] = useState(null);
  const [qty, setQty] = useState(1);
  const [city, setCity] = useState('');
  const [movie, setMovie] = useState(null);

  const msgs = useRef(null);
  const toast = useRef(null);

  const validate = () => {
    msgs.current.clear();
    const errors = [];
    if (!day) errors.push({ severity: 'error', detail: 'Seleccione un día.' });
    if (!payType) errors.push({ severity: 'error', detail: 'Seleccione tipo de pago.' });
    if (!qty || qty < 1) errors.push({ severity: 'error', detail: 'Cantidad debe ser un entero > 0.' });
    if (!city || !city.trim()) errors.push({ severity: 'error', detail: 'La ciudad es obligatoria.' });
    if (!movie) errors.push({ severity: 'error', detail: 'Seleccione una película.' });

    if (errors.length) {
      msgs.current.show(errors);
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    createTicket({
      day, payType, qty, city: city.trim(), movie
    });

    toast.current.show({
      severity: 'success',
      summary: 'Entrada registrada',
      detail: 'La entrada fue guardada en el sistema.',
      life: 2500
    });

    // limpiar
    setDay(null); setPayType(null); setQty(1); setCity(''); setMovie(null);
  };

  return (
    <div className="card p-4">
      <Toast ref={toast} />
      <h3 className="mb-3">Comprar Entrada</h3>
      <Messages ref={msgs} />

      <form onSubmit={handleSubmit} className="grid gap-3">
        <div className="flex flex-column gap-2">
          <label className="font-semibold">Día</label>
          <Dropdown value={day} onChange={(e) => setDay(e.value)} options={DAYS}
            placeholder="Seleccione día" className="w-full md:w-20rem" />
        </div>

        <div className="flex flex-column gap-2">
          <label className="font-semibold">Tipo de pago</label>
          <SelectButton value={payType} onChange={(e) => setPayType(e.value)}
            options={PAY_TYPES} optionLabel="label" optionValue="value" />
        </div>

        <div className="flex flex-column gap-2">
          <label className="font-semibold">Cantidad de entradas</label>
          <InputNumber inputId="qty" value={qty} onValueChange={(e) => setQty(e.value)}
            showButtons min={1} />
        </div>

        <div className="flex flex-column gap-2">
          <label className="font-semibold">Ciudad (obligatoria)</label>
          <InputText value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ej: Viña del Mar" />
        </div>

        <div className="flex flex-column gap-2">
          <label className="font-semibold">Película</label>
          <ListBox value={movie} onChange={(e) => setMovie(e.value)} options={MOVIES}
            optionLabel="label" optionValue="value" className="w-full md:w-20rem" />
        </div>

        <div className="mt-2">
          <Button type="submit" label="Registrar compra" icon="pi pi-check" />
        </div>
      </form>
    </div>
  );
}
