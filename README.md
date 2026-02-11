# Bicycle Parts Configurator

A single-page application (SPA) that lets users configure a bicycle by choosing one product per part category, then see a preview and total price. The app title is **Configura tu bicicleta**.

## App Features

### Layout
- **Parts in rows**: Each part category is shown as a full-width card, stacked vertically. Part titles are **numbered** (e.g. 1. Cuadro, 2. Acabado cuadro).
- **Part card**: Header with part label, selected product thumbnail (or “Por favor selecciona un producto”), and a list of products to choose from.
- **Summary and preview**: Below the parts, a row shows the **Final price** summary and (after calculating) the **Tu bicicleta** preview image.

### Part categories and products
- **1. Cuadro** (frame): Diamond, Pull suspension, Step through  
- **2. Acabado cuadro** (frame finish): Brillo, Mate  
- **3. Tipo rueda** (wheel type): Carretera, Montaña, Fat wheel  
- **4. Color rueda** (wheel color): Negro, Rojo, Azul  
- **5. Tipo cambio** (gearing): 6 velocidades, Piñón fijo  

Each product has a **name**, **description**, **image**, and **price**.

### Selection and summary
- **Select product**: Click a product in a part’s list to set it as the selection for that part (one product per part).
- **Summary panel**: Shows “Final price” and a **Calculate price** button. After clicking it, the summary shows:
  - List of chosen products (part label + product name + price)
  - **Total price** (sum of all selected product prices)
  - **Remove** (×) per part to clear that part’s selection
  - **Clear all** to reset all selections and hide the calculated summary

### Compatibility rules
- Some products are **incompatible** with others (e.g. Piñón fijo with Pull suspension frame or Montaña/Fat wheel).
- Rules are stored in a **central list** in `src/data/parts.js`: **`INCOMPATIBILITIES`** is an array of pairs of product IDs that cannot be selected together (e.g. `["cuadro-pull-suspension", "cambio-pinon-fijo"]`). Each pair is entered **once**; the check is **bidirectional** (works both ways automatically).
- Incompatible options are **disabled** in the list; hovering shows a tooltip with the reason (e.g. “Not selectable: incompatible with …”).

### Preview
- **Tu bicicleta**: When the calculated price is shown, a preview image is displayed based on the current selection (frame + finish + wheel type + color + gearing).
- Image path is built from product slugs (e.g. `diamond--brillo--carretera--negro--6-velocidades.webp`). Missing or invalid combo images fall back to a default image.

### Persistence
- **Selections** and **“show calculated price”** state are stored in **localStorage**.
- On load, saved selections are restored when valid; otherwise defaults (first product per part) are used.
- Keys: `bike-parts-selections`, `bike-parts-show-calculated`.

### Technical notes
- **React** SPA (Create React App, React 19).
- **Data** (`src/data/parts.js`): **`PARTS`** (part categories and products with id, name, description, image, price); **`INCOMPATIBILITIES`** (array of `[productIdA, productIdB]` pairs). Products do not store compatibility rules.
- **Utils**: `src/utils/compatibility.js` (uses `INCOMPATIBILITIES` for symmetric compatibility check and reason messages), `src/utils/comboImage.js` (combo image path and default).
- **Components**: `Parts` (numbered part cards and product lists), `Summary` (final price, list, total, actions), `Preview` (Tu bicicleta combo image).

---

## Available Scripts

In the project directory you can run:

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000). The page reloads when you edit; lint errors appear in the console.

### `npm test`
Launches the test runner in interactive watch mode. See [running tests](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build`
Builds the app for production into the `build` folder (minified, with hashed filenames). Ready to deploy. See [deployment](https://facebook.github.io/create-react-app/docs/deployment).

### `npm run eject`
**Note: one-way operation.** Ejects from Create React App and copies build config into the project. You can still run the above commands on the copied scripts. See [Create React App docs](https://github.com/facebook/create-react-app).

## Learn more
- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React documentation](https://reactjs.org/)
