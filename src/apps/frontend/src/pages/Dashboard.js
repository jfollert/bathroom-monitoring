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
	Drawer,
	Divider,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	CssBaseline,
	DialogTitle,
	Dialog,
	DialogContent,
	DialogActions,
	DialogContentText,
	// Modal
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// import MenuIcon from '@mui/icons-material/Menu';
import { Search, Edit, Delete, Add, KeyboardArrowUp as KeyboardArrowUpIcon, KeyboardArrowDown as KeyboardArrowDownIcon, Inbox, Mail, Wc, Sensors, Dashboard as DashboardIcon } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { List } from 'reactstrap';


function Row(props) {
	const { row } = props;
	const [open, setOpen] = useState(false);
	const [openNewDispenserDialog, setOpenNewDispenserDialog] = useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const newDispenserSensorInputRef = useRef()

	const handleClickOpenDeleteDialog = () => {
		setOpenDeleteDialog(true);
	};

	const handleCloseDeleteDialog = () => {
		setOpenDeleteDialog(false);
	};

	const handleDelete = async (bathroomId) => {
		console.log("Delete bathroom:", bathroomId);
		const response = await fetch(`https://wwocq05mxf.execute-api.sa-east-1.amazonaws.com/dev/bathrooms/${bathroomId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		console.log("Delete response:", response);

		handleCloseDeleteDialog();
	};

	const handleClickOpenNewDispenserDialog = () => {
		setOpenNewDispenserDialog(true);
	  };
	
	const handleCloseNewDispenserDialog = () => {
		setOpenNewDispenserDialog(false);
	};

	const handleNewDispenser = async (sensorId, value) => {
		const id = uuidv4();
		console.log("New dispenser:", id);
		// console.log("Sensor:", sensorId);
		// console.log("Value:", value);
		// const response = await fetch(`https://wwocq05mxf.execute-api.sa-east-1.amazonaws.com/dev/sensors/${sensorId}/records/${id}`, {
		// 	method: 'PUT',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({
		// 		value: value,
		// 	}),
		// });
		// handleCloseNewRecordDialog();
	};
  
	return (
	  <>
	  	<Dialog open={openNewDispenserDialog} onClose={handleCloseNewDispenserDialog}>
			<DialogTitle>Nuevo Dispensador</DialogTitle>
			<DialogContent>
				{/* <DialogContentText>
					To subscribe to this website, please enter your email address here. We
					will send updates occasionally.
				</DialogContentText> */}
				<TextField
					autoFocus
					margin="dense"
					id="sensorId"
					label="ID del Sensor"
					type="text"
					fullWidth
					variant="standard"
					inputRef={newDispenserSensorInputRef}
				/>
			</DialogContent>
			<DialogActions>
				<Button color="error" onClick={handleCloseNewDispenserDialog}>Cancelar</Button>
				<Button onClick={() => handleNewDispenser(row.id, newDispenserSensorInputRef.current.value)}>Registrar</Button>
			</DialogActions>
		</Dialog>
		<Dialog
			open={openDeleteDialog}
			onClose={handleCloseDeleteDialog}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				¿Está seguro que desea eliminar el baño?
			</DialogTitle>
			<DialogContent>
			<DialogContentText id="alert-dialog-description">
				Esta acción no se puede deshacer.
			</DialogContentText>
			</DialogContent>
			<DialogActions>
			<Button color="error" onClick={handleCloseDeleteDialog}>Cancelar</Button>
			<Button onClick={() => handleDelete(row.id)} autoFocus>
				Eliminar
			</Button>
			</DialogActions>
		</Dialog>
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
				<IconButton aria-label="delete" onClick={handleClickOpenDeleteDialog} size="large">
					<Delete color='error' />
				</IconButton>
			</TableCell>
		</TableRow>
		<TableRow>
		  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
			<Collapse in={open} timeout="auto" unmountOnExit>
			  <Box sx={{ margin: 1 }}>
				<Box sx={{ width: '100%' }} display="flex" justifyContent="space-between" alignItems="center">
					<Typography variant="h6" gutterBottom component="div">
						Dispensadores
					</Typography>
					<Button
						variant="contained"
						color="primary"
						size="small"
						sx={{ marginLeft: '1rem' }}
						startIcon={<Add />}
						onClick={handleClickOpenNewDispenserDialog}
					>
						Nuevo Dispensador
					</Button>
				</Box>
				
				{ row.dispensers.length > 0
				? <Table size="small" aria-label="purchases">
					<TableHead>
						<TableRow>
						<TableCell>ID</TableCell>
						<TableCell>Sensor</TableCell>
						<TableCell align="right">Estado del papel</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{row.dispensers.map((dispenser) => {
							var status;
							if (dispenser.status === 'UNKNOWN')
								status = 'Sin registros'
							else if (dispenser.status === 'NOT_EMPTY')
								status = '🟢 Con papel'
							else if (dispenser.status === 'EMPTY')
								status = '🔴 Sin papel'

							return (
							<TableRow key={dispenser.id}>
								<TableCell component="th" scope="row">
								{dispenser.id}
								</TableCell>
								<TableCell>{dispenser.sensorId}</TableCell>
								<TableCell align="right">{status}</TableCell>
							</TableRow>
						)})}
					</TableBody>
				</Table>
				: <Typography variant="body2" color="text.secondary">
					No hay dispensadores en este baño
				</Typography>
				}
			  </Box>
			</Collapse>
		  </TableCell>
		</TableRow>
	  </>
	);
  }


const Dashboard = () => {
	const [bathrooms, setBathrooms] = useState([])
	const [openNewBathroomDialog, setOpenNewBathroomDialog ] = useState(false)
	const newBathroomBuildingInputRef = useRef(null)
	const newBathroomFloorInputRef = useRef(null)

	const handleClickOpenNewBathroomDialog = () => setOpenNewBathroomDialog(true)
	const handleCloseNewBathroomDialog = () => setOpenNewBathroomDialog(false)

	const handleNewBathroom = async (building, floor) => {
		const id = uuidv4();
		console.log('id', id)

		const response = await fetch(`https://wwocq05mxf.execute-api.sa-east-1.amazonaws.com/dev/bathrooms/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				building: building,
				floor: parseInt(floor)
			})
		})
		console.log(response)

		handleCloseNewBathroomDialog();
	}

	const navigate = useNavigate();
	
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
		<Box sx={{ display: 'flex' }}> 
			<CssBaseline />
			<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
				<Toolbar >
					{/* <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton> */}
					<Typography variant="h6" color="inherit" component="div">
						Estado de los Baños
					</Typography>
					
				</Toolbar>			
			</AppBar>
			<Drawer
				variant="permanent"
				sx={{
				width: 240,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
				}}
			>
				<Toolbar />
				<Box sx={{ overflow: 'auto' }}>
				<List>
					<ListItem disablePadding>
						<ListItemButton onClick={() => navigate('/')}>
							<ListItemIcon>
								<DashboardIcon />
							</ListItemIcon>
							<ListItemText primary={'Dashboard'} />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton onClick={() => navigate('/bathrooms')}>
							<ListItemIcon>
								<Wc />
							</ListItemIcon>
							<ListItemText primary={'Baños'} />
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton onClick={() => navigate('/sensors')}>
							<ListItemIcon>
								<Sensors />
							</ListItemIcon>
							<ListItemText primary={'Sensores'} />
						</ListItemButton>
					</ListItem>
				</List>
				</Box>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
				<Typography variant="h4" gutterBottom component="div">
					Dashboard
				</Typography>
				
			</Box>
		</Box>
	)
}

export default Dashboard