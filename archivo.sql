-- Database: Proyecto



CREATE DATABASE "Proyecto"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Spain.1252'
    LC_CTYPE = 'Spanish_Spain.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;


-- Table: public.usuarios

-- DROP TABLE IF EXISTS public.usuarios;

CREATE TABLE IF NOT EXISTS public.usuarios
(
    nombre character varying COLLATE pg_catalog."default" NOT NULL,
    apellido character varying COLLATE pg_catalog."default" NOT NULL,
    correo character varying COLLATE pg_catalog."default" NOT NULL,
    contrasena character varying COLLATE pg_catalog."default" NOT NULL,
    tipodoc character varying COLLATE pg_catalog."default" NOT NULL,
    numdoc character varying COLLATE pg_catalog."default" NOT NULL,
    ciudad character varying COLLATE pg_catalog."default",
    edad character varying COLLATE pg_catalog."default",
    id integer NOT NULL DEFAULT nextval('usuario_id_seq'::regclass),
    CONSTRAINT usuario_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.usuarios
    OWNER to postgres;