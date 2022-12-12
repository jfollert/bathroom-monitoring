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

import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// import MenuIcon from '@mui/icons-material/Menu';
import { Search, Edit, Delete, Add, KeyboardArrowUp as KeyboardArrowUpIcon, KeyboardArrowDown as KeyboardArrowDownIcon, Inbox, Mail, Wc, Sensors, Dashboard as DashboardIcon } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { Row, Col, Spinner, Alert, Input, InputGroupText, InputGroup, List, Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

// function downloadFile(url, fileName){
// 	fetch(url, { method: 'get', mode: 'no-cors', referrerPolicy: 'no-referrer' })
// 	  .then(res => res.blob())
// 	  .then(res => {
// 		const aElement = document.createElement('a');
// 		aElement.setAttribute('download', fileName);
// 		const href = URL.createObjectURL(res);
// 		aElement.href = href;
// 		// aElement.setAttribute('href', href);
// 		aElement.setAttribute('target', '_blank');
// 		aElement.click();
// 		URL.revokeObjectURL(href);
// 	  });
//   };
//   document.querySelector('button').onclick =function () {
// 	downloadFile('https://wwocq05mxf.execute-api.sa-east-1.amazonaws.com/dev/bathrooms.js', 'study.js');
//   }

function createData(building, floor, sensorId) {
	return {building, floor, sensorId};
}

function Rowto(props) {
	const { row } = props;
	const [open, setOpen] = useState(false);
	const [openNewDispenserDialog, setOpenNewDispenserDialog] = useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const newDispenserSensorInputRef = useRef()
	const [emptys, setEmpty] = useState(false);
	const [numbersensors,setSensors] = useState(false);
	const [numberactive, setActive] = useState(false);

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
	
	useEffect(()=> {
		const getData = async() => {
			const response = await fetch('https://wwocq05mxf.execute-api.sa-east-1.amazonaws.com/dev/bathrooms/')
			const data = await response.json()

			//Lista de los sensores con falta de papel
			let emptysensors = []
			for (const element of data) {
				for (const count of element.dispensers) {
					if (count.status === "UNKNOWN"){
						emptysensors.push(createData(element.building,element.floor, count.sensorId))
					}
				}
			}
			console.log(emptysensors)
			setEmpty(emptysensors)

			//Numero de sensores que hay
			let totalsensors = 0
			for (const element of data){
				totalsensors += element.dispensers.length
			}
			console.log(totalsensors)
			setSensors(totalsensors)
		}

		const getDataSensor = async() => {
			const response = await fetch('https://wwocq05mxf.execute-api.sa-east-1.amazonaws.com/dev/sensors/')
			const data = await response.json()

			//Numero de sensores activos que hay, es decir, los que estan entregando informacion
			let totalactive = 0
			for (const element of data){
				if (element.records.length > 0){
					totalactive += 1
				}
			}
			console.log(totalactive)
			setActive(totalactive)
		}

		
		getData()

		getDataSensor()
	}, []);

	return (
		<Container className="mt-5">

      
      <Row>

	  <Col sm="4">
        <Card className="Card-indiv-show">
          <CardBody style={{textAlign:"center"}}>
            <CardTitle tag="h4">Número de sensores instalados</CardTitle>
            <CardSubtitle tag="h5" className="text-success mt-3">{numbersensors}</CardSubtitle>
          </CardBody>
        </Card>
        </Col>
		<Col sm="4">
        <Card className="Card-indiv-show">
          <CardBody style={{textAlign:"center"}}>
            <CardTitle tag="h4">Número de sensores con actividad</CardTitle>
            <CardSubtitle tag="h5" className="text-success mt-3">{numberactive}</CardSubtitle>
          </CardBody>
        </Card>
        </Col>
	  </Row>
      <TableContainer sx={{ marginTop: '2rem' }}>
	  <CardTitle tag="h4">Sensores sin papel</CardTitle>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Edificio</TableCell>
            <TableCell align="right">Piso</TableCell>
            <TableCell align="right">Sensor Id</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {emptys.map((row) => (
            <TableRow
              key={row.building}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.building}
              </TableCell>
              <TableCell align="right">{row.floor}</TableCell>
              <TableCell align="right">{row.sensorId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
	//   
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
				<Rowto />
				
			</Box>
		</Box>
	)
}

export default Dashboard