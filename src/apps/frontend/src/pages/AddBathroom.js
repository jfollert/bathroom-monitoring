import { Menu as MenuIcon } from '@mui/icons-material'
import { AppBar, IconButton, Paper, TextField, Toolbar, Typography, Button, Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from 'reactstrap'

const AddBathroom = () => {
	const navigate = useNavigate()

	const handleCancelClick = () => {
		console.log('cancel')
		navigate('/bathrooms')
	}
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
			<Container maxWidth="sm">
				<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem', gap: '1rem', margin: '4rem' }}>
						<Typography variant="h4" color="inherit" component="div" textAlign="center">
							Agregar Baño
						</Typography>
						<TextField
							label={"Edificio"}
							variant="outlined"
						/>
						<TextField
							label={"Piso"}
							variant="outlined"
						/>
						<Box display="flex" gap="1rem">
							<Button type='submit' variant='contained' >Agregar</Button>
							<Button color='error' variant='contained' onClick={handleCancelClick} >Cancelar</Button>
						</Box>
					</Paper>
				</Box>
				
			</Container>
		</>
  )
}

export default AddBathroom