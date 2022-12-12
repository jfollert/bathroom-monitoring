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
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	// Modal
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';



// import MenuIcon from '@mui/icons-material/Menu';
import { Search, Edit, Delete, Add, KeyboardArrowUp as KeyboardArrowUpIcon, KeyboardArrowDown as KeyboardArrowDownIcon, Inbox, Mail, Wc, Sensors } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { List } from 'reactstrap';


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
	const [openNewRecordDialog, setOpenNewRecordDialog] = useState(false);
	const newRecordInputRef = useRef()

	const handleClickOpenNewRecordDialog = () => {
		setOpenNewRecordDialog(true);
	  };
	
	const handleCloseNewRecordDialog = () => {
		setOpenNewRecordDialog(false);
	};

	const handleNewRecord = async (sensorId, value) => {
		const id = uuidv4();
		console.log("New record:", id);
		console.log("Sensor:", sensorId);
		console.log("Value:", value);
		const response = await fetch(`https://wwocq05mxf.execute-api.sa-east-1.amazonaws.com/dev/sensors/${sensorId}/records/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				value: value,
			}),
		});
		// row.records.push({
		// 	id: id,
		// 	value: value,
		// 	ocurredOn: data.timestamp,
		// });
		handleCloseNewRecordDialog();
	};
  
	return (
	  <>
		<Dialog open={openNewRecordDialog} onClose={handleCloseNewRecordDialog}>
			<DialogTitle>Nuevo Registro</DialogTitle>
			<DialogContent>
				{/* <DialogContentText>
					To subscribe to this website, please enter your email address here. We
					will send updates occasionally.
				</DialogContentText> */}
				<TextField
					autoFocus
					margin="dense"
					id="value"
					label="Valor"
					type="number"
					fullWidth
					variant="standard"
					// value="0"
					defaultValue={0}
					inputRef={newRecordInputRef}
				/>
			</DialogContent>
			<DialogActions>
				<Button color="error" onClick={handleCloseNewRecordDialog}>Cancelar</Button>
				<Button onClick={() => handleNewRecord(row.id, newRecordInputRef.current.value)}>Registrar</Button>
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
			<TableCell align="center">{row.name}</TableCell>
			<TableCell align="center">{row.records.length}</TableCell>
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
				<Box sx={{ width: '100%' }} display="flex" justifyContent="space-between" alignItems="center">
					<Typography variant="h6" gutterBottom component="div">
						Registros
					</Typography>
					<Button
							variant="contained"
							color="primary"
							size="small"
							sx={{ marginLeft: '1rem' }}
							startIcon={<Add />}
							onClick={handleClickOpenNewRecordDialog}
						>
							Nuevo Registro
					</Button>
				</Box>
				{ row.records.length > 0
					? <Table size="small" aria-label="purchases">
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>Ocurrido a las</TableCell>
								<TableCell align="right">Valor</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
						{row.records.map((record) => {
							const a = new Date(record.ocurredOn);
							const year = a.getFullYear();
							const month = a.getMonth();
							const date = a.getDate();
							const hours = "0" + a.getHours();
							const minutes = "0" + a.getMinutes();
							const seconds = "0" + a.getSeconds();
							const time =`${date}/${month}/${year} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
							return (
								<TableRow key={record.id}>
									<TableCell component="th" scope="row">
										{record.id}
									</TableCell>
									<TableCell>{time}</TableCell>
									<TableCell align="right">{record.value}</TableCell>
								</TableRow>
							);
						})}
						</TableBody>
				  </Table>
					: <Typography variant="body1" gutterBottom component="div">
						No hay registros
					</Typography>
				}
				
			  </Box>
			</Collapse>
		  </TableCell>
		</TableRow>
	  </>
	);
  }


const SensorsDashboard = () => {
	const [sensors, setSensors] = useState([])

	const navigate = useNavigate();
	const handleClick = () => navigate('/bathrooms/add')
	
	useEffect(() => {
		const getData = async () => {
			const response = await fetch('https://wwocq05mxf.execute-api.sa-east-1.amazonaws.com/dev/sensors/')
			return response.json()
		}
		getData().then(data => {
			setSensors(data)
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
					Sensores
				</Typography>
				<TableContainer sx={{ marginTop: '2rem' }}>
					<Box sx={{ width: '100%' }} display="flex" justifyContent="space-between" alignItems="center">
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
							size="small"
							sx={{ marginLeft: '1rem' }}
							startIcon={<Add />}
							onClick={handleClick}
						>
							Nuevo Sensor
						</Button>
					</Box>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell />
								<TableCell>ID</TableCell>
								<TableCell align="center">Nombre</TableCell>
								<TableCell align="center">Registros</TableCell>
								<TableCell align="right">Acciones</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{sensors.map((row) => {
							return (
								<Row key={row.id} row={row} />
							)})}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Box>
	)
}

export default SensorsDashboard