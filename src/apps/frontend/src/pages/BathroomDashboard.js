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
	Breadcrumbs,
	Link,
	InputAdornment,
	TextField,
	Box,
	Button
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import Search from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';

function createData(
	name,
	calories,
	fat,
	carbs,
	protein,
  ) {
	return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];


const BathroomDashboard = () => {
	const [bathrooms, setBathrooms] = useState([])

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
				<Toolbar variant="dense">
					<IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" color="inherit" component="div">
						Gestión de Baños
					</Typography>
					
				</Toolbar>			
			</AppBar>
			<Container >
				<TableContainer sx={{ marginTop: '2rem' }}>
					<Box sx={{ width: '100%' }}>
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
									<IconButton
										aria-label="toggle password visibility"
										edge="end"
										>
											<Search />
										</IconButton>
								</InputAdornment>,
							}}
						/>
						<Button>
							Registrar
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
								<TableCell>ID</TableCell>
								<TableCell align="right">Edificio</TableCell>
								<TableCell align="right">Piso</TableCell>
								<TableCell align="right">Dispensadores</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{bathrooms.map((row) => (
							<TableRow
								key={row.id}
							>
								<TableCell component="th" scope="row">
								{row.id}
								</TableCell>
								<TableCell align="right">{row.building}</TableCell>
								<TableCell align="right">{row.floor}</TableCell>
								<TableCell align="right">{row.dispensers.length}</TableCell>
							</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</>
	)
}

export default BathroomDashboard