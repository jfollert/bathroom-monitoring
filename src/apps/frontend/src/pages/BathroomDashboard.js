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
	Button
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { Search, Edit, Delete, Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';


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
									<IconButton
										aria-label="toggle password visibility"
										edge="end"
										>
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
								<TableCell>ID</TableCell>
								<TableCell align="center">Edificio</TableCell>
								<TableCell align="center">Piso</TableCell>
								<TableCell align="center">Dispensadores</TableCell>
								<TableCell align="right">Acciones</TableCell>
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
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</>
	)
}

export default BathroomDashboard