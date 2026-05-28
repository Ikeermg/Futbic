# Futbic - Entregable 5

## Descripcion del proyecto

Futbic es una aplicacion web pensada para aficionados al futbol. Su objetivo es permitir que cada usuario cree su cuenta, registre partidos vistos de LALIGA EA SPORTS o Premier League, consulte su historial y revise estadisticas personales.

## Patron utilizado

Para este entregable se utiliza el patron **MVVM**:

- **Model**: gestiona los datos de usuarios y partidos. En esta maqueta se simulan con `localStorage`.
- **View**: corresponde al archivo HTML que ve el usuario.
- **ViewModel**: conecta el modelo con la vista, valida datos y prepara las estadisticas.

## Estructura de directorios

```text
Futbic/
  views/
    index.html
  assets/
    css/
      styles.css
    js/
      main.js
  models/
    UsuarioModel.js
    PartidoModel.js
  viewmodel/
    PartidoViewModel.js
  config/
    config.js
  database/
    futbic.sql
  docs/
    README.md
  tests/
    checklist.md
```

## Maquetacion

La maqueta incluye:

- Cabecera con navegacion.
- Logo de Futbic como imagen de la aplicacion.
- Registro e inicio de sesion de usuario.
- Seleccion de equipo favorito en el registro.
- Formulario para registrar partidos vistos.
- Seleccion de liga entre LALIGA EA SPORTS y Premier League.
- Seleccion de equipos segun la liga elegida.
- Preparacion de escudos en `assets/img/escudos/`.
- Historial de partidos.
- Filtro por equipo.
- Resultado destacado con ganador o empate.
- Valoracion del partido del 1 al 5.
- Estadisticas personales: equipo favorito, partidos del favorito, equipo mas visto, mayor goleada y valoracion media.
- Diseno responsive para ordenador, tablet y movil.

## Validacion de formularios

La validacion se realiza en JavaScript en el cliente:

- Nombre, email y contrasena obligatorios para el registro.
- Equipo favorito obligatorio para el registro.
- Email y contrasena obligatorios para iniciar sesion.
- Liga obligatoria.
- Fecha obligatoria.
- Hora obligatoria.
- Equipo local obligatorio.
- Equipo visitante obligatorio.
- Los equipos no pueden ser iguales.
- Los goles no pueden ser negativos.
- Lugar obligatorio.
- Valoracion obligatoria.

## Imagenes y escudos

El logo de la aplicacion se encuentra en `assets/img/logo-futbic.svg`.

Los equipos se cargan desde `config/config.js`. Cada liga tiene sus equipos y cada equipo tiene una ruta de escudo preparada en `assets/img/escudos/`. Los escudos se han guardado con nombres simples para que conecten directamente con el codigo de la maqueta.

Si alguna imagen no estuviera disponible, la maqueta muestra una inicial como sustituto.

## W3C y WAI

Se han tenido en cuenta buenas practicas basicas:

- Uso de etiquetas semanticas como `header`, `nav`, `main`, `section` y `footer`.
- Formularios con `label` asociado a cada campo.
- Contraste adecuado entre texto y fondo.
- Navegacion clara.
- Tabla con `caption` y cabeceras.
- Maquetacion adaptable mediante CSS responsive.

## Base de datos

El archivo `database/futbic.sql` contiene la creacion inicial de la base de datos, con las tablas:

- `usuarios`
- `partidos`

En esta fase la interfaz no se conecta todavia a MySQL. La base de datos queda preparada para una fase posterior de backend. En la maqueta, cada usuario guarda sus partidos de forma separada en el navegador.
