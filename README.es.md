[English](README.md) | **Español**

# Cógeme una rifa — Frontend

Aplicación para crear rifas, compartirlas y gestionar los números que eligen los participantes.

Stack: React 19 · TypeScript · Vite · TanStack Query · TanStack Table · React Hook Form + Yup · react-aria-components (shadcn) · Tailwind CSS 4 · Zustand · Axios.

```bash
pnpm install
pnpm dev      # servidor de desarrollo
pnpm build    # type-check + build de producción
pnpm lint
```

Requiere un `.env` con `VITE_API_URL_LOCAL` apuntando al backend.

---

## Sobre la carpeta `legacy/`

`legacy/` contiene la **primera versión del proyecto, sin modificar**. La dejé a propósito como referencia: permite comparar el antes y el después de la refactorización sin tener que navegar el historial de git.

- No forma parte del build: `tsconfig` solo incluye `src/`, ESLint la ignora y Tailwind no la escanea.
- No se mantiene ni se actualiza. Si algo de ahí sirve, se migra a `src/`.

## Qué cambió respecto a la versión anterior

### 1. Estado del servidor: de Zustand a TanStack Query

**Antes**, cada recurso tenía un store de Zustand que replicaba a mano lo que hace una librería de data fetching: `isLoading`, `error`, `try/catch/finally` en cada acción y actualizaciones manuales del array tras cada mutación. Las páginas disparaban la carga con `useEffect`.

```ts
// legacy/src/store/raffles/slice.tsx
fetchRaffles: async (userId) => {
  set({ isLoading: true });
  try {
    const response = await GetRaffles(userId);
    set({ raffles: response.data, error: null });
  } catch (error) {
    set({ error: "Error al cargar las rifas" });
  } finally {
    set({ isLoading: false });
  }
},
// ...repetido para add, update y delete
```

**Ahora** cada feature expone hooks de query y mutation. La caché, los estados de carga y la revalidación los gestiona TanStack Query; tras una mutación basta con invalidar la query.

```ts
// src/features/raffles/hooks/useRaffle.ts
export const useRaffles = () =>
  useQuery({
    queryKey: ["raffles", "user"],
    queryFn: () => GetRaffles().then((res) => res.data),
  });

export const useCreateRaffle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CreateRaffle,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["raffles"] }),
  });
};
```

Resultado: se eliminó el store de rifas, desaparecen los `useEffect` de carga en las páginas (de 9 archivos con `useEffect` a 5) y los datos quedan sincronizados entre pantallas sin código extra. Zustand se mantiene solo para lo que realmente es estado de cliente: la sesión.

### 2. Arquitectura: de capas técnicas a features

**Antes** el código estaba agrupado por tipo (`components/`, `service/`, `store/`), así que una sola funcionalidad quedaba repartida en cuatro o cinco carpetas.

**Ahora** cada dominio vive en su propia carpeta con todo lo que necesita:

```
src/features/
├── auth/          components · hooks · schemas · services
├── profile/       components · hooks · schemas · services
├── raffles/       components · hooks · schemas · services
└── raffle-sheet/  components · hooks · schemas · services
```

`pages/` quedan como puntos de entrada finos que componen features, y `components/` solo guarda piezas compartidas (UI base, NavBar, estados vacíos). La antigua carpeta global `src/service/` ya no existe: cada feature tiene sus propios servicios, y `src/store/` solo conserva el store de sesión.

### 3. Formularios: lógica y validación fuera de los componentes

**Antes** los esquemas de Yup y la lógica de envío estaban dentro del JSX de cada formulario (`LoginForm`, `SignupForm`, `RaffleForm`, `EditProfileForm`, `RaffleSheet`).

**Ahora** cada formulario tiene su esquema en `schemas/` (con el tipo inferido para `react-hook-form`) y su lógica en un hook (`useLoginForm`, `useRaffleForm`, `useEditProfileForm`…). Los componentes solo renderizan.

### 4. Capa HTTP

- La instancia de Axios pasa a `src/config/axiosConfig.ts`.
- Se añadió la opción `_skipAuth` (tipada mediante module augmentation de Axios) para que los endpoints públicos, como elegir un número de una rifa, no envíen el token ni disparen el flujo de refresh cuando reciben un 401.
- El backend obtiene el usuario a partir del token, así que el frontend ya no envía `userId` en las peticiones (`GetRaffles()` en lugar de `GetRaffles(userId)`, y `usuarioId` se eliminó de `CreateRaffleType`).
- Las respuestas empiezan a tiparse en el servicio (`axiosInstance.get<ChoosenNumber[]>`) en lugar de llegar como `any` a los componentes.

### 5. UI y tooling

| | Antes | Ahora |
|---|---|---|
| React | 18 | 19 |
| Vite | 6 | 8 |
| TypeScript | 5 | 7 |
| Tailwind | 3 (PostCSS + `tailwind.config.js`) | 4 (plugin de Vite, configuración en CSS) |
| Componentes base | shadcn sobre Radix | shadcn sobre react-aria-components |
| Notificaciones | toast de Radix + `use-toast` propio | Sonner |
| Tablas | — | TanStack Table v9 |
| Package manager | npm | pnpm |

React Aria aporta accesibilidad e interacciones (teclado, foco, `onPress`) consistentes en todos los componentes base.

## Estado de la migración

La refactorización sigue en curso. Todavía quedan restos de la estructura anterior en `src/`:

- `src/helper/` ya no se usa y se puede borrar.
- Quedan respuestas sin tipar (`res.data` como `any`) en varios servicios.
- La paginación de listas todavía usa el `usePagination` de cliente; el plan es moverla a TanStack Table o al servidor.
