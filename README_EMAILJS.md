# Configuración de EmailJS

Este proyecto utiliza EmailJS para el envío de correos electrónicos desde el formulario de contacto. A continuación se detallan los pasos para configurar EmailJS en tu entorno:

## Pasos para configurar EmailJS

1. **Crear una cuenta en EmailJS**:
   - Visita [EmailJS](https://www.emailjs.com/) y crea una cuenta gratuita.

2. **Crear un servicio de correo electrónico**:
   - En el panel de control de EmailJS, ve a "Email Services" y agrega un nuevo servicio.
   - Puedes elegir entre Gmail, Outlook, o cualquier otro proveedor de correo electrónico compatible.
   - Sigue las instrucciones para conectar tu cuenta de correo electrónico.
   - Una vez creado el servicio, anota el ID del servicio (Service ID).

3. **Crear una plantilla de correo electrónico**:
   - Ve a "Email Templates" en el panel de control.
   - Crea una nueva plantilla para el formulario de contacto.
   - Asegúrate de que la plantilla contenga las siguientes variables que corresponden a los campos del formulario:
     - `{{name}}`: Nombre del remitente
     - `{{email}}`: Correo electrónico del remitente
     - `{{subject}}`: Asunto del mensaje
     - `{{message}}`: Contenido del mensaje
   - Anota el ID de la plantilla (Template ID).

4. **Obtener la clave pública**:
   - Ve a "Account" > "API Keys".
   - Anota tu clave pública (Public Key).

5. **Configurar variables de entorno**:
   - Crea un archivo `.env` en la raíz del proyecto (o usa el existente) con el siguiente contenido:
   ```
   VITE_EMAILJS_SERVICE_ID=tu_service_id
   VITE_EMAILJS_TEMPLATE_ID=tu_template_id
   VITE_EMAILJS_PUBLIC_KEY=tu_public_key
   ```
   - Reemplaza `tu_service_id`, `tu_template_id` y `tu_public_key` con los valores que anotaste en los pasos anteriores.

## Verificación

Para verificar que EmailJS está configurado correctamente:

1. Asegúrate de haber instalado la dependencia con `npm install @emailjs/browser`.
2. Completa y envía el formulario de contacto en la aplicación.
3. Deberías recibir el correo electrónico en la cuenta que configuraste en el servicio de EmailJS.
4. Revisa la consola del navegador para ver si hay mensajes de error en caso de problemas.

## Solución de problemas

- Si el formulario no envía correos, verifica que las credenciales en el archivo `.env` sean correctas.
- Asegúrate de que los nombres de los campos en el formulario coinciden con los de la plantilla de EmailJS.
- Revisa la consola del navegador para ver si hay mensajes de error específicos de EmailJS. 