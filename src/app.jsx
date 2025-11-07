import { useNavigate, Outlet } from 'react-router-dom';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';

export default function App() {
  const navigate = useNavigate();

  const left = (
    <div className="flex align-items-center gap-2">
      {/* Si quieres un logo, colócalo en assets y descomenta: */}
      {/* <img src="/assets/logo.svg" alt="logo" width={28} /> */}
      <span className="text-xl font-bold">SansanMark</span>
    </div>
  );

  const right = (
    <div className="flex align-items-center gap-2">
      <Button label="Comprar" icon="pi pi-plus" onClick={() => navigate('/')} />
      <Button label="Entradas" icon="pi pi-list" severity="secondary" onClick={() => navigate('/entradas')} />
    </div>
  );

  return (
    <div className="p-3">
      <Toolbar className="mb-4" start={left} end={right} />
      <Outlet />
    </div>
  );
}

