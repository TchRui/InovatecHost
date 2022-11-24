<?php
    error_reporting(0);
    session_start();
    $sesion_i = $_SESSION["Usuario"];

    include '../conexiones.php';
    $nombre_buscador = $_POST['busqueda'];

    $resultado_productos = sqlsrv_query($conexion, "SELECT productos.Id_producto, productos.nombre, precio_ven, ruta, cantidad
    FROM $tabla_productos, $tabla_imagenes, $tabla_carrito, $tabla 
    WHERE (Productos.id_producto like '%".$q."%' or 
    Productos.nombre like '%".$q."%')
    
    
    Apartado = Apartados.ID_ap and Productos.Subapartado = Id_subap and Apartados.nombre = '$nombre_categoria' and Subapartados.SubApartado = '$nombre_subcategoria' and Productos.id_producto = imagenes.id_prod");

    /* Verficamos que la consulta se haya realizado de manera correcta */
    if($resultado_computadoras === false){
        $mensaje = die(print_r(sqlsrv_errors(), true));
        echo json_encode($mensaje);
    }
    else{
        /* Creamos un arreglo para almacenar los datos de la consulta */
        $nombres_productos = array();
        $precios_productos = array();
        $categorias_productos = array();
        $subcategorias_productos = array();
        $rutas_productos = array();
        $id_productos = array();

        /* Recorremos los datos de la consulta */
        while($fila = sqlsrv_fetch_array($resultado_computadoras, SQLSRV_FETCH_ASSOC)){
            $nombres_productos[] = $fila['nombre'];
            $precios_productos[] = $fila['precio_ven'];
            $categorias_productos[] = $fila['categoria'];
            $subcategorias_productos[] = $fila['subcategoria'];
            $rutas_productos[] = $fila['ruta'];
            $id_productos[] = $fila['id_producto'];
        }

        /* Elimina los dos ulimos digitos a los precios */
        $precios_productos = array_map(function($precio){
            return substr($precio, 0, -2);
        }, $precios_productos);

        /* Creamos un arreglo para almacenar los datos de la consulta */
        $data = array('nombres' => $nombres_productos, 'precios' => $precios_productos, 'categorias' => $categorias_productos, 'subcategorias' => $subcategorias_productos, 'rutas' => $rutas_productos, 'id_productos' => $id_productos);
        echo json_encode($data);
    }
?>