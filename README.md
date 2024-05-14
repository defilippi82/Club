ReservaCanchas

ReservaCanchas es una aplicación desarrollada en React y Firebase que facilita la reserva de canchas deportivas para diferentes actividades y horarios, al mismo tiempo que ofrece la funcionalidad de registro y edición de usuarios.
Características principales

    Reserva de canchas: Los usuarios pueden explorar diferentes opciones de canchas deportivas disponibles y realizar reservas para el día y la hora que deseen.
    Gestión de usuarios: La aplicación permite a los usuarios registrarse, iniciar sesión y editar su información personal, lo que proporciona una experiencia personalizada y segura.
    Integración con Firebase: La aplicación utiliza Firebase como backend, lo que garantiza un almacenamiento de datos seguro, autenticación de usuarios y un rendimiento eficiente en tiempo real.

Instalación

Para comenzar a utilizar ReservaCanchas en tu entorno local, sigue estos pasos:

    Clona este repositorio en tu máquina:

    bash

git clone https://github.com/defilippi82/Club.git

Navega hasta el directorio del proyecto:

bash

cd reserva-canchas

Instala las dependencias del proyecto:

bash

npm install

Crea un proyecto en Firebase y configura las credenciales en el archivo .env:

makefile

REACT_APP_FIREBASE_API_KEY=TuApiKey
REACT_APP_FIREBASE_AUTH_DOMAIN=TuDominioDeAuth
REACT_APP_FIREBASE_DATABASE_URL=TuURLDeBaseDeDatos
REACT_APP_FIREBASE_PROJECT_ID=TuIDDeProyecto
REACT_APP_FIREBASE_STORAGE_BUCKET=TuBucketDeAlmacenamiento
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=TuIDDeSender
REACT_APP_FIREBASE_APP_ID=TuIDDeApp

Inicia la aplicación:

bash

    npm run dev

¡Y eso es todo! La aplicación estará disponible

Contribución

¡Las contribuciones son bienvenidas! Si deseas contribuir a este proyecto, asegúrate de revisar las pautas de contribución antes de comenzar.