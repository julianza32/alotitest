Create database Aloti;

use Aloti;

Create table Categoria (
IDCategoria bigint  primary key auto_increment not null,
Nombre Varchar(30) not null,
Descripcion Varchar(120) not null
);

Create table productos (
IDProducto bigint auto_increment primary key,
Nombre Varchar(30) not null,
Valor bigint not null, 
IDCategoria bigint,
Foreign key (IDCategoria) references Categoria(IDCategoria) 
);

delimiter //
CREATE PROCEDURE sp_addCategoria (
in nombre varchar(30),
in descripcion varchar(120) 
)
BEGIN
INSERT INTO Categoria (Nombre,Descripcion)values (nombre,descripcion);
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE sp_editCategoria (
in id bigint,
in nombre varchar(30),
in descripcion varchar(120) 
)
BEGIN
UPDATE Categoria set Nombre=nombre,Descripcion=descripcion where IDCategoria=id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_deleteCategoria (
in id bigint
)
BEGIN
DELETE FROM Categoria where IDCategoria = id;
END //
DELIMITER ;


delimiter //
CREATE PROCEDURE sp_getAllCategoria ()
BEGIN
SELECT * FROM Categoria;
END //
DELIMITER ;
call sp_getAllCategoria();
Call sp_editCategoria(1,'Aseo', 'categoria de aseo');
Call sp_addCategoria('Aseo', 'categoria de aseo');
Call sp_deleteCategoria(1);







delimiter //
CREATE PROCEDURE sp_addProducto(
in nombre varchar(30),
in valor bigint,
in idCategoria bigint
)
BEGIN
INSERT INTO Productos (Nombre,Valor,IDCategoria) values (nombre,valor,idCategoria);
END //
DELIMITER ;

delimiter //
CREATE PROCEDURE sp_editProducto (
in idProducto bigint,
in nombre varchar(30),
in valor bigint,
in idCategoria bigint
)
BEGIN
UPDATE Productos set Nombre=nombre,Valor=valor, IDCategoria= idCategoria where IDProducto=idProducto;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE sp_deleteProducto(
in id bigint
)
BEGIN
DELETE FROM productos where IDProducto = id;
END //
DELIMITER ;


delimiter //
CREATE PROCEDURE sp_getAllProductos()
BEGIN
SELECT p.IDProducto, p.Nombre, c.Nombre  as Categoria , p.Valor From Productos as p Join Categoria as c on p.IDCategoria=c.IDCategoria;
END //
DELIMITER ;

Call sp_addProducto('Jabon en polvo', 7000, 2);
Call sp_editProducto(1,'Jabon en polvo', 8000, 2);
Call sp_deleteProducto(1);
call sp_getAllProductos();


use aloti;


create table Usuarios (
IDUsuario bigint primary key auto_increment,
Nombres varchar(100) not null,
Apellidos varchar(100) not null,
Correo varchar(100) not null,
Contrasena BLOB not null
)







delimiter //
CREATE PROCEDURE sp_addUser(
in nombres varchar(100),
in apellidos varchar(100),
in correo varchar(100),
in contrasena blob
)
BEGIN
INSERT INTO Usuarios (Nombres, Apellidos,Correo,Contrasena)values (nombres,apellidos,correo,MD5(contrasena));
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE sp_editUsuario (
in idUsuario bigint,
in nombres varchar(100),
in apellidos varchar(100),
in correo varchar(100),
in contrasena varchar(100)
)
BEGIN
UPDATE Usuarios set Nombres=nombres,Apellidos=apellidos, Correo=correo , Contrasena=MD5(contrasena)  where IDUsuario=idUsuario;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_deleteUsuario (
in id bigint
)
BEGIN
DELETE FROM Usuario where IDUsuario = id;
END //
DELIMITER ;


DELIMITER //
CREATE PROCEDURE sp_login (
in username varchar(100),
in password varchar(100)
)
BEGIN
select * from Usuarios where Correo = username and Contrasena = MD5(contrasena);
END //
DELIMITER ;




