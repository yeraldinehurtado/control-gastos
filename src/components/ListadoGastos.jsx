import React from 'react';
import Gastos from './Gastos';

const ListadoGastos = ({ gasto, setGastoEditar, eliminarGasto, filtro, gastosFiltrados }) => {
	return (
		<div className='listado-gastos contenedor'>
			{filtro ? (
				<>
					<h2>{gastosFiltrados.length ? 'Gastos' : 'No hay gastos en esta categoria'}</h2>
					{gastosFiltrados.map((gastos) => (
						<Gastos
							key={gastos.id}
							gastos={gastos}
							setGastoEditar={setGastoEditar}
							eliminarGasto={eliminarGasto}
						/>
					))}
				</>
			) : (
				<>
					<h2>{gasto.length ? 'Gastos' : 'No hay gastos'}</h2>
					{gasto.map((gastos) => (
						<Gastos
							key={gastos.id}
							gastos={gastos}
							setGastoEditar={setGastoEditar}
							eliminarGasto={eliminarGasto}
						/>
					))}
				</>
			)}
		</div>
	);
};

export default ListadoGastos;
