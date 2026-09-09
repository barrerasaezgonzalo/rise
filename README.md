# Rise 🌿

Rise es una aplicación de bienestar personal que ayuda a convertir cómo te sientes en acciones pequeñas, concretas y realistas.

La experiencia comienza con un breve check-in guiado. A partir de tus respuestas, Rise genera un plan de 7 días con acciones adaptadas a tu momento actual.

## Qué puedes hacer

- Responder un check-in breve
- Generar un plan personalizado de 7 días
- Marcar acciones como realizadas
- Marcar acciones que fueron difíciles
- Completar o cancelar un plan
- Revisar planes anteriores
- Ver el detalle y progreso de cada ciclo
- Eliminar planes del historial
- Consultar un resumen general de tu recorrido
- Iniciar sesión con Google para guardar tu progreso

## Flujo principal

```text
Check-in
   ↓
Generación del plan
   ↓
Plan activo de 7 días
   ↓
Seguimiento de acciones
   ↓
Completar / cancelar
   ↓
Historial y progreso
```

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase
  - Auth
  - PostgreSQL
  - Row Level Security
- Groq
- Lucide React

## Arquitectura

Rise separa responsabilidades entre estado, lógica y acceso a datos.

```text
Components
   ↓
Hooks
   ↓
Providers / API hooks
   ↓
Next.js Route Handlers
   ↓
Supabase / Groq
```

### Hooks principales

- `useRise`  
  Estado global y datos derivados del plan actual.

- `useRiseFlow`  
  Flujo del check-in, generación y gestión del plan.

- `useRiseApi`  
  Comunicación con los endpoints de Rise.

- `useHistory`  
  Estado y lógica del historial.

- `useAuth`  
  Autenticación con Google.

- `useToast`  
  Notificaciones globales.

## Seguridad

Las operaciones privadas se realizan mediante Route Handlers de Next.js.

Cada endpoint valida la sesión del usuario antes de acceder a los datos:

```ts
const {
  data: { user },
} = await supabase.auth.getUser();
```

Las consultas también se restringen por `user_id`, junto con políticas RLS en Supabase.

## Estados del plan

```ts
"active" | "completed" | "cancelled"
```

## Estados de las acciones

```ts
"pending" | "completed" | "rejected"
```

## Desarrollo

Instala las dependencias:

```bash
npm install
```

Inicia el entorno de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:3000
```

## Variables de entorno

Crea un archivo `.env.local` con las variables necesarias para Supabase y Groq.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
GROQ_API_KEY=
```

## Verificación

Antes de publicar cambios:

```bash
npm run lint
npm run build
npx knip
```

## Estado del proyecto

Rise v1 incluye el flujo completo:

```text
Check-in
✓

Generación de plan
✓

Seguimiento diario
✓

Completar / cancelar
✓

Historial
✓

Detalle de planes
✓

Eliminación
✓

Autenticación
✓

Notificaciones
✓

Responsive
✓
```

## Idea detrás de Rise

Rise no busca que completes todo perfectamente.

Busca ayudarte a identificar qué pequeñas acciones puedes realizar hoy, cuáles fueron más difíciles y qué puedes aprender de cada ciclo para construir el siguiente de una forma más realista.

## Capturas

<img width="1551" height="892" alt="Captura desde 2026-09-09 08-28-20" src="https://github.com/user-attachments/assets/49cd5d0f-b69c-4c93-a415-65b494eafbca" />
<img width="1398" height="910" alt="Captura desde 2026-09-09 08-36-50" src="https://github.com/user-attachments/assets/466cd342-388f-4403-8b68-54d86650640c" />
<img width="1398" height="910" alt="Captura desde 2026-09-09 08-38-04" src="https://github.com/user-attachments/assets/c712832a-482d-476e-bbfb-99d011e49d09" />
<img width="1398" height="910" alt="Captura desde 2026-09-09 08-38-12" src="https://github.com/user-attachments/assets/533a992c-0e73-47e1-851e-f9d1981f8557" />
<img width="1398" height="910" alt="Captura desde 2026-09-09 08-38-29" src="https://github.com/user-attachments/assets/c8035409-cc56-4125-a740-1a0b8005780b" />
<img width="1398" height="910" alt="Captura desde 2026-09-09 08-38-44" src="https://github.com/user-attachments/assets/6f2a3e39-25c9-4ed9-a983-e595a517dfba" />

## Vercel URL

https://rise-inky-rho.vercel.app/login
