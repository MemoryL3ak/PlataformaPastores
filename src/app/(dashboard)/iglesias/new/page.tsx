import { crearIglesia } from "./actions";

export default function Page() {
  return (
    <div className="max-w-2xl space-y-3">
      <h1 className="text-xl font-semibold">Nueva Iglesia</h1>
      <form action={crearIglesia} className="space-y-3">
        <input name="nombre" className="input" placeholder="Nombre" required />
        <input name="slug" className="input" placeholder="Slug (auto si lo dejas vacÃ­o)" />
        <div className="grid sm:grid-cols-2 gap-3">
          <input name="direccion" className="input" placeholder="DirecciÃ³n" />
          <input name="ciudad" className="input" placeholder="Ciudad" />
          <input name="region" className="input" placeholder="RegiÃ³n" />
          <input name="telefono" className="input" placeholder="TelÃ©fono" />
        </div>
        <input name="email" type="email" className="input" placeholder="Email" />
        <div className="flex gap-2">
          <button className="btn" type="submit">Guardar</button>
          <button type="button" className="btn outline" onClick={()=>history.back()}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
