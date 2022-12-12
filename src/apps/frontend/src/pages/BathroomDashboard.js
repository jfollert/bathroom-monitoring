import { 
	Container,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	InputAdornment,
	TextField,
	Box,
	Button,
	Collapse,
	// Modal
} from '@mui/material';

import { useNavigate } from 'react-router-dom';



// import MenuIcon from '@mui/icons-material/Menu';
import { Search, Edit, Delete, Add, KeyboardArrowUp as KeyboardArrowUpIcon, KeyboardArrowDown as KeyboardArrowDownIcon } from '@mui/icons-material';
import { useEffect, useState } from 'react';


// const style = {
// 	position: 'absolute',
// 	top: '50%',
// 	left: '50%',
// 	transform: 'translate(-50%, -50%)',
// 	maxWidth: 500,
// 	bgcolor: 'background.paper',
// 	// border: '2px solid #000',
// 	boxShadow: 24,
// 	p: 4,
// };

function Row(props) {
	const { row } = props;
	const [open, setOpen] = useState(false);
  
	return (
	  <>
		<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
		  <TableCell>
			<IconButton
			  aria-label="expand row"
			  size="small"
			  onClick={() => setOpen(!open)}
			>
			  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
			</IconButton>
		  </TableCell>
			<TableCell component="th" scope="row">
				{row.id}
			</TableCell>
			<TableCell align="center">{row.building}</TableCell>
			<TableCell align="center">{row.floor}</TableCell>
			<TableCell align="center">{row.dispensers.length}</TableCell>
			<TableCell align="right">
				<IconButton aria-label="edit" size="large">
					<Edit color='primary' />
				</IconButton>
				<IconButton aria-label="delete" size="large">
					<Delete color='error' />
				</IconButton>
			</TableCell>
		</TableRow>
		<TableRow>
		  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
			<Collapse in={open} timeout="auto" unmountOnExit>
			  <Box sx={{ margin: 1 }}>
				<Typography variant="h6" gutterBottom component="div">
				  Dispensadores
				</Typography>
				<Table size="small" aria-label="purchases">
				  <TableHead>
					<TableRow>
					  <TableCell>ID</TableCell>
					  <TableCell>Sensor</TableCell>
					  <TableCell align="right">Estado</TableCell>
					</TableRow>
				  </TableHead>
				  <TableBody>
					{row.dispensers.map((dispenser) => (
					  <TableRow key={dispenser.id}>
						<TableCell component="th" scope="row">
						  {dispenser.id}
						</TableCell>
						<TableCell>{dispenser.sensorId}</TableCell>
						<TableCell align="right">{dispenser.status}</TableCell>
					  </TableRow>
					))}
				  </TableBody>
				</Table>
			  </Box>
			</Collapse>
		  </TableCell>
		</TableRow>
	  </>
	);
  }


const BathroomDashboard = () => {
	const [bathrooms, setBathrooms] = useState([])
	// const [open, setOpen] = useState(false)
	// const handleOpen = () => setOpen(true);
  	// const handleClose = () => setOpen(false);

	const navigate = useNavigate();
	const handleClick = () => navigate('/bathrooms/add')
	
	useEffect(() => {
		const getData = async () => {
			const response = await fetch('https://wwocq05mxf.execute-api.sa-east-1.amazonaws.com/dev/bathrooms/')
			return response.json()
		}
		getData().then(data => {
			setBathrooms(data)
			console.log(data)
		})
		}, [])
	
	return (
		<>
			
			<AppBar position="static">
				<Toolbar >
					{/* <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton> */}
					<Typography variant="h6" color="inherit" component="div">
						Estado de los Baños
					</Typography>
					
				</Toolbar>			
			</AppBar>
			<Container >
				{/* <Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
					>
						<Box sx={style}>
							<Typography id="modal-modal-title" variant="h6" component="h2">
							Text in a modal
							</Typography>
							<Typography id="modal-modal-description" sx={{ mt: 2 }}>
							Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
							</Typography>
						</Box>
				</Modal> */}
				<TableContainer sx={{ marginTop: '2rem' }}>
					<Box sx={{ width: '100%' }} display="flex" justifyContent="space-between" alignItems="center">
						{/* <Typography variant="h4" color="inherit" component="div">
							Gestión de Baños
						</Typography> */}
						<TextField 
							id="outlined-basic" 
							label="Buscar" 
							variant="outlined"
							size='small'
							InputProps={{
								endAdornment: <InputAdornment position="end">
									<IconButton edge="end">
										<Search />
									</IconButton>
								</InputAdornment>,
							}}
						/>
						<Button
							variant="contained"
							color="primary"
							size="large"
							sx={{ marginLeft: '1rem' }}
							endIcon={<Add />}
							onClick={handleClick}
						>
							Agregar
						</Button>
						{/* <Breadcrumbs aria-label="breadcrumb">
							<Link underline="hover" color="inherit" href="/">
								MUI
							</Link>
							<Link
								underline="hover"
								color="inherit"
								href="/material-ui/getting-started/installation/"
							>
								Core
							</Link>
							<Typography color="text.primary">Breadcrumbs</Typography>
						</Breadcrumbs> */}
					</Box>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell />
								<TableCell>ID</TableCell>
								<TableCell align="center">Edificio</TableCell>
								<TableCell align="center">Piso</TableCell>
								<TableCell align="center">Dispensadores</TableCell>
								<TableCell align="right">Acciones</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{bathrooms.map((row) => {
								
							return (
								<Row key={row.id} row={row} />
								// 	<>
								// 	<TableRow
								// 		key={row.id}
								// 	>	
								// 		<TableCell>
								// 			<IconButton
								// 				aria-label="expand row"
								// 				size="small"
								// 				onClick={() => setOpen(!open)}
								// 			>
								// 				{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
								// 			</IconButton>
								// 		</TableCell>
										// <TableCell component="th" scope="row">
										// {row.id}
										// </TableCell>
										// <TableCell align="center">{row.building}</TableCell>
										// <TableCell align="center">{row.floor}</TableCell>
										// <TableCell align="center">{row.dispensers.length}</TableCell>
										// <TableCell align="right">
										// 	<IconButton aria-label="edit" size="large">
										// 		<Edit color='primary' />
										// 	</IconButton>
										// 	<IconButton aria-label="delete" size="large">
										// 		<Delete color='error' />
										// 	</IconButton>
										// </TableCell>
								// 	</TableRow>
								// 	<TableRow>
								// 		<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
								// 		<Collapse in={open} timeout="auto" unmountOnExit>
								// 			<Box sx={{ margin: 1 }}>
								// 			<Typography variant="h6" gutterBottom component="div">
								// 				History
								// 			</Typography>
								// 			<Table size="small" aria-label="purchases">
								// 				<TableHead>
								// 				<TableRow>
								// 					<TableCell>Date</TableCell>
								// 					<TableCell>Customer</TableCell>
								// 					<TableCell align="right">Amount</TableCell>
								// 					<TableCell align="right">Total price ($)</TableCell>
								// 				</TableRow>
								// 				</TableHead>
								// 				<TableBody>
								// 				{row.history.map((historyRow) => (
								// 					<TableRow key={historyRow.date}>
								// 					<TableCell component="th" scope="row">
								// 						{historyRow.date}
								// 					</TableCell>
								// 					<TableCell>{historyRow.customerId}</TableCell>
								// 					<TableCell align="right">{historyRow.amount}</TableCell>
								// 					<TableCell align="right">
								// 						{Math.round(historyRow.amount * row.price * 100) / 100}
								// 					</TableCell>
								// 					</TableRow>
								// 				))}
								// 				</TableBody>
								// 			</Table>
								// 			</Box>
								// 		</Collapse>
								// 		</TableCell>
								// 	</TableRow>
								// </>
							)})}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</>
	)
}

export default BathroomDashboard