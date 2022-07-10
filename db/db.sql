CREATE TABLE roles(
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(180) NOT NULL,
	image VARCHAR(255) NULL,
	route varchar(255) NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL
);


CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    phone VARCHAR(80) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    password VARCHAR(255) NOT NULL,
    is_available BOOLEAN NULL,
    session_token VARCHAR(255) NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL   

);

CREATE TABLE users_has_roles(
	id_user BIGSERIAL NOT NULL,
	id_rol BIGSERIAL NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	updated_at TIMESTAMP(0) NOT NULL,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY(id_user, id_rol)
);


INSERT INTO public.roles(
	name, image, route, created_at, updated_at)
	VALUES ('CLIENTE',  'assets/img/cliente.png', 'client/products/list', '2022-06-16', '2022-06-16');
	
INSERT INTO public.roles(
	name, image, route, created_at, updated_at)
	VALUES ('PROPIETARIO', 'assets/img/tienda.png', 'stores/orders/list', '2022-06-16', '2022-06-16');
	
INSERT INTO public.roles(
	name, image, route, created_at, updated_at)
	VALUES ('REPARTIDOR', 'assets/img/delivery2.png', 'delivery/orders/list', '2022-06-16', '2022-06-16');