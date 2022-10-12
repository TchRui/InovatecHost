<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Lista Productos</title>

	<script src="https://kit.fontawesome.com/f8c41f1595.js" crossorigin="anonymous"></script>
	<link rel="stylesheet" href="administrativo.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<script src="js/consulProductos.js"></script>
</head>
<body>
	<!--Script de funcionaminto del menu desplegable-->
	<script src="funcionamiento.js"></script>

	<!--Estructura Header Superior-->
	<header>
		<div class="header_superior">
			<div class="titulo">
				<h1>Administrativo</h1>
				<div class="logo">
					<img src="assets-administrativo/Nombre.svg" alt="">
				</div>
			</div>

			<div class="btn-header">
				<button class="btn-cerrar-session" type="button">Cerrar session</button>
			</div>
		</div>

		<!-- Menu Desplegable -->
		<div class="container_menu">
			<div class="menu">
				<input type="checkbox" id="check__menu">
				<label id="label__check" for="check__menu">
					<i class="fa-sharp fa-solid fa-bars icon__menu"></i>
				</label>
				<nav>
					<ul>
						<li><a href="#">Productos</a>
							<ul>
								<li><a id="menuProducto1" href="alta_producto.php">Nuevo producto</a></li>
								<li><a id="menuProducto2" href="lista_productos.php">Productos</a></li>
							</ul>
						</li>

						<li><a href="#">Sucursales</a>
							<ul>
								<li><a id="menuSucursal1" href="alta_sucursal.php" >Nueva sucursal</a></li>
								<li><a id="menuSucursal2" href="lista_sucursal.php" >Lista de sucursales</a></li>
							</ul>
						</li>

						<li><a href="#">Trabajadores</a>
							<ul>
								<li><a id="menuTrabajador1" href="alta_trabajador.php">Nuevo trabajador</a></li>
								<li><a id="menuTrabajador2" href="lista_trabajador.php">Lista de trabajadores</a></li>
							</ul>
						</li>

						<li><a href="#">Proveedores</a>
							<ul>
								<li><a id="menuProveedor1" href="alta_proveedor.php">Nuevo proveedor</a></li>
								<li><a id="menuProveedor2" href="lista_proveedor.php">Lista de proveedores</a></li>
							</ul>
						</li>

						<li><a href="#">Inventario</a>
							<ul>
								<li><a id="menuInventario1" href="producto_inventario.php">Productos</a></li>
								<li><a id="menuInventario2" href="consulta_inventario.php">Consulta inventario</a></li>
							</ul>
						</li>

						<li><a href="#">Ventas</a>
							<ul>
								<li><a id="menuVentas1" href="registro_ventas.php" >Registro de ventas</a></li>
								<li><a id="menuVentas2" href="informe_ventas.php">Reporte de ventas</a></li>
							</ul>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</header>

    <!--Main General-->
	<main>
		<!--Contenido de la parte LISTA PRODUCTOS-->
	
		<div class="contenidoListaProd" id="contenidoListaProd">
			<article>
				<h1 align="center">Productos</h1>
				<div class="contenido-barra-buscar">
					<input type="text" name="busqueda" id="busqueda" placeholder="Buscar..." required >
					<button class="btn-buscar">
						<i class="fas fa-search icon"></i>

					</button>
				</div>
				<br>
				<section class="tablas" id="tabla_resultado">
					<table>
						<thead>
						<?php
							$serverName='localhost';
							$connectionInfo=array("Database"=>"PagVentas", "UID"=>"usuario", "PWD"=>"123", "CharacterSet"=>"UTF-8");
							$conn_sis=sqlsrv_connect($serverName, $connectionInfo);
							?>
							<tr>
								<th>Id</th> 
								<th>Nombre</th> 
								<th>Descripcion</th> 
								<th>Categoria</th> 
								<th>Subcategoria</th> 
								<th>Precio compra</th> 
								<th>Precio venta</th> 
								<th>Proveedor</th>
								<th>Imagen</th>
								<th>Acciones</th>
								<th></th>
							</tr>
						</thead>
						<?php
						$query="SELECT * FROM Productos";
						$res= sqlsrv_query($conn_sis, $query);
						if( $res === false) {
							die( print_r( sqlsrv_errors(), true) );
						}
						while( $row = sqlsrv_fetch_array($res) ) {
							$id=$row["id_producto"];
							$nombre=$row["nombre"];
							$descri=$row["descripcion"];
							$cate=$row["Apartado"];
							$subcate=$row["Subapartado"];
							$pre_com=$row["precio_com"];
							$pre_ven=$row["precio_ven"];
							$prove=$row["id_proveedor"];
							$edi='Editar';
							$eli='Eliminar';
							echo '<tr>
									<td>'.$id.'</td>
									<td>'.$nombre.'</td>
									<td>'.$descri.'</td>
									<td>'.$cate.'</td>
									<td>'.$subcate.'</td>
									<td>'.$pre_com.'</td>
									<td>'.$pre_ven.'</td>
									<td>'.$prove.'</td>
									<td>'.'</td>
									<td>'.'<a href="LOGActualizar.php?item='.$id.'">'.$edi. '</a>'.'</td>
									<td>'.'<a href="#">'.$eli. '</a>'.'</td>
									</tr>';
						}
						?>
					</table>
				</section>
			</article>
		</div>
    </main>

</body>
</html>