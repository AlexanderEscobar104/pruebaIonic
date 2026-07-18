/**
 * Configura el feature flag feature_task_deadlines en Firebase Remote Config.
 *
 * Requisitos:
 *   1. npm install firebase-admin
 *   2. Descargar clave de servicio desde Firebase Console:
 *      Ajustes > Cuentas de servicio > Generar nueva clave privada
 *   3. Guardar como service-account.json en la raíz del proyecto
 *   4. Ejecutar: node scripts/set-remote-config.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('../service-account.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const remoteConfig = admin.remoteConfig();

remoteConfig.getTemplate()
  .then((template) => {
    template.parameters.feature_task_deadlines = {
      defaultValue: { value: 'true' },
      description: 'Habilita el campo de fecha límite en las tareas',
    };
    return remoteConfig.publishTemplate(template);
  })
  .then(() => {
    console.log('✅ Remote Config actualizado: feature_task_deadlines = true');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
