import { useState, useEffect } from 'react';
import Header from './components/Header';
import Filtros from './components/Filtros';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg';

function App() {
	const [gasto, setGasto] = useState(
		localStorage.getItem('gasto') ? JSON.parse(localStorage.getItem('gasto')) : []
	);

	const [presupuesto, setPresupuesto] = useState(
		Number(localStorage.getItem('presupuesto')) ?? 0
	);
	const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

	const [modal, setModal] = useState(false);
	const [animarModal, setAnimarModal] = useState(false);

	const [gastoEditar, setGastoEditar] = useState({});

	const [filtro, setFiltro] = useState('');
	const [gastosFiltrados, setGastosFiltrados] = useState([]);

	useEffect(() => {
		if (Object.keys(gastoEditar).length > 0) {
			setModal(true);

			setTimeout(() => {
				setAnimarModal(true);
			}, 100);
		}
	}, [gastoEditar]);

	useEffect(() => {
		localStorage.setItem('presupuesto', presupuesto ?? 0);
	}, [presupuesto]);

	useEffect(() => {
		localStorage.setItem('gasto', JSON.stringify(gasto) ?? []);
	}, [gasto]);

	useEffect(() => {
		if (filtro) {
			const gastosFiltrados = gasto.filter((gastos) => gastos.categoria === filtro);
			setGastosFiltrados(gastosFiltrados);
		}
	}, [filtro]);

	useEffect(() => {
		const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

		if (presupuestoLS > 0) {
			setIsValidPresupuesto(true);
		}
	}, []);

	const handleNuevoGasto = () => {
		setModal(true);
		setGastoEditar({});

		setTimeout(() => {
			setAnimarModal(true);
		}, 100);
	};

	const guardarGasto = (gastos) => {
		console.log(gastos);
		if (gastos.id) {
			//act
			const gastosActualizados = gasto.map((gastoState) =>
				gastoState.id === gastos.id ? gastos : gastoState
			);
			setGasto(gastosActualizados);
			setGastoEditar({});
		} else {
			gastos.id = generarId();
			gastos.fecha = Date.now();
			setGasto([...gasto, gastos]);
		}

		setAnimarModal(false);

		setTimeout(() => {
			setModal(false);
		}, 300);
	};

	const eliminarGasto = (id) => {
		const gastosActualizados = gasto.filter((gastos) => gastos.id !== id);

		setGasto(gastosActualizados);
	};

	return (
		<div className={modal ? 'fijar' : ''}>
			<Header
				gasto={gasto}
				setGasto={setGasto}
				presupuesto={presupuesto}
				setPresupuesto={setPresupuesto}
				isValidPresupuesto={isValidPresupuesto}
				setIsValidPresupuesto={setIsValidPresupuesto}
			/>

			{isValidPresupuesto && (
				<>
					<main>
						<Filtros
							filtro={filtro}
							setFiltro={setFiltro}
						/>
						<ListadoGastos
							gasto={gasto}
							setGastoEditar={setGastoEditar}
							eliminarGasto={eliminarGasto}
							filtro={filtro}
							gastosFiltrados={gastosFiltrados}
						/>
					</main>
					<div className='nuevo-gasto'>
						<img
							src={IconoNuevoGasto}
							alt='Ícono nuevo gasto'
							onClick={handleNuevoGasto}
						/>
					</div>
				</>
			)}

			{modal && (
				<Modal
					setModal={setModal}
					animarModal={animarModal}
					setAnimarModal={setAnimarModal}
					guardarGasto={guardarGasto}
					gastoEditar={gastoEditar}
					setGastoEditar={setGastoEditar}
				/>
			)}
		</div>
	);
}

export default App;
