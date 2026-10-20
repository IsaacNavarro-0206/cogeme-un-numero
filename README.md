**English** | [Español](README.es.md)

# Cógeme una rifa — Frontend

An app for creating raffles, sharing them, and managing the numbers participants pick.

Stack: React 19 · TypeScript · Vite · TanStack Query · TanStack Table · React Hook Form + Yup · react-aria-components (shadcn) · Tailwind CSS 4 · Zustand · Axios.

```bash
pnpm install
pnpm dev      # development server
pnpm build    # type-check + production build
pnpm lint
```

Requires a `.env` file with `VITE_API_URL_LOCAL` pointing to the backend.

> The UI and code comments are in Spanish, since the app targets Spanish-speaking users.

---

## About the `legacy/` folder

`legacy/` holds the **first version of the project, untouched**. I kept it on purpose as a reference, so the before and after of the refactor can be compared without digging through git history.

- It is not part of the build: `tsconfig` only includes `src/`, ESLint ignores it, and Tailwind does not scan it.
- It is not maintained. Anything worth keeping gets migrated into `src/`.

## What changed from the previous version

### 1. Server state: from Zustand to TanStack Query

**Before**, each resource had a Zustand store that hand-rolled what a data-fetching library does: `isLoading`, `error`, a `try/catch/finally` in every action, and manual array updates after each mutation. Pages triggered loading with `useEffect`.

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
// ...repeated for add, update and delete
```

**Now** each feature exposes query and mutation hooks. TanStack Query handles caching, loading states and revalidation; after a mutation, invalidating the query is enough.

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

Result: the raffles store is gone, data-loading `useEffect`s disappear from pages (from 9 files using `useEffect` down to 5), and data stays in sync across screens with no extra code. Zustand is kept only for what is truly client state: the session.

### 2. Architecture: from technical layers to features

**Before**, code was grouped by type (`components/`, `service/`, `store/`), so a single feature was spread across four or five folders.

**Now** each domain lives in its own folder with everything it needs:

```
src/features/
├── auth/          components · hooks · schemas · services
├── profile/       components · hooks · schemas · services
├── raffles/       components · hooks · schemas · services
└── raffle-sheet/  components · hooks · schemas · services
```

`pages/` are thin entry points that compose features, and `components/` only holds shared pieces (base UI, NavBar, empty states). The old global `src/service/` folder no longer exists: each feature owns its services, and `src/store/` only keeps the session store.

### 3. Forms: logic and validation moved out of components

**Before**, Yup schemas and submit logic lived inside each form's JSX (`LoginForm`, `SignupForm`, `RaffleForm`, `EditProfileForm`, `RaffleSheet`).

**Now** each form has its schema in `schemas/` (with the type inferred for `react-hook-form`) and its logic in a hook (`useLoginForm`, `useRaffleForm`, `useEditProfileForm`…). Components only render.

### 4. HTTP layer

- The Axios instance moved to `src/config/axiosConfig.ts`.
- Added a `_skipAuth` option (typed through Axios module augmentation) so public endpoints, such as picking a number in a raffle, neither send the token nor trigger the refresh flow on a 401.
- The backend derives the user from the token, so the frontend no longer sends `userId` (`GetRaffles()` instead of `GetRaffles(userId)`, and `usuarioId` was removed from `CreateRaffleType`).
- Responses are starting to be typed at the service level (`axiosInstance.get<ChoosenNumber[]>`) instead of reaching components as `any`.

### 5. UI and tooling

| | Before | Now |
|---|---|---|
| React | 18 | 19 |
| Vite | 6 | 8 |
| TypeScript | 5 | 7 |
| Tailwind | 3 (PostCSS + `tailwind.config.js`) | 4 (Vite plugin, CSS-based config) |
| Base components | shadcn on Radix | shadcn on react-aria-components |
| Notifications | Radix toast + custom `use-toast` | Sonner |
| Tables | — | TanStack Table v9 |
| Package manager | npm | pnpm |

React Aria provides consistent accessibility and interactions (keyboard, focus, `onPress`) across all base components.

## Migration status

The refactor is still in progress. Some leftovers from the old structure remain in `src/`:

- `src/helper/` is no longer used and can be deleted.
- Several services still return untyped responses (`res.data` as `any`).
- List pagination still uses the client-side `usePagination`; the plan is to move it to TanStack Table or to the server.
