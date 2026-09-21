# ONG Animales Ramallo — nueva versión

Proyecto web estático listo para subir a Vercel.

## Incluye
- Identidad visual de la ONG.
- 21 perros con sus fotos reales.
- Fichas de adopción y formulario integrado.
- Conexión preparada con Supabase.
- Campañas de donación dinámicas desde Supabase.
- Botones directos a Mercado Pago según los enlaces actuales del Linktree.
- Panel privado `admin.html` con login de Supabase.
- Asistente simple para crear campañas.
- Gestión básica de estados de solicitudes.

## Antes de producción
1. Ejecutar `supabase/setup.sql` en el SQL Editor de Supabase.
2. Crear el primer usuario del panel desde Supabase Authentication.
3. Verificar las políticas RLS incluidas.
4. Subir este proyecto a GitHub y conectarlo a Vercel.
5. Probar una solicitud de adopción y una campaña antes de publicar.


## Acceso al panel
El panel pide **email + contraseña** y autentica directamente contra Supabase Authentication.

Para crear el primer acceso: Supabase → Authentication → Users → Add user → Create new user. Usá el email real que quieras utilizar para administrar el panel y definí la contraseña. Luego ingresá esos mismos datos en `admin.html`.

No pongas la contraseña en el código ni en este ZIP.


## V7
- Logo recortado desde la imagen original y servido como `assets/logo.png`.
- Nombre de la ONG con tipografía Fraunces y mayor presencia en el encabezado.
- Menú móvil funcional con Adoptar, Cómo funciona, Donar y Panel.
- La campaña de respaldo comienza en $0 en lugar de $185.000.
- La recaudación real de Mercado Pago requiere webhook/API y credenciales privadas de Mercado Pago; no se incluye ningún token secreto en el frontend.


## Formulario de adopción
El formulario fue recreado siguiendo el formulario de adopción de referencia y se envía mediante FormSubmit a celinita3535@gmail.com. La primera vez que se use FormSubmit, el destinatario debe confirmar el formulario desde el correo de activación. El formulario exige completar todos los campos y adjuntar las fotos solicitadas antes de permitir el envío. FormSubmit admite archivos en formularios multipart y establece un límite total de 10 MB por envío.
