# Bicycle Parts Configurator

A single-page application (SPA) that lets users configure a bicycle by choosing one product per part category, then see a preview and total price.

## App Features

### Layout
- **Two-column layout**: Left column shows bicycle parts; right column shows the summary and preview.
- **Parts list**: Each part is shown as a section with a header (part label + selected product thumbnail or “Por favor selecciona un producto”) and a list of products.

### Part categories and products
- **Cuadro** (frame): Diamond, Pull suspension, Step through  
- **Acabado cuadro** (frame finish): Brillo, Mate  
- **Tipo rueda** (wheel type): Carretera, Montaña, Fat wheel  
- **Color rueda** (wheel color): Negro, Rojo, Azul  
- **Tipo cambio** (gearing): 6 velocidades, Piñón fijo  

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
- Incompatible options are **disabled** in the list; hovering shows a tooltip with the reason (e.g. “Not selectable: incompatible with …”).
- Checks are **bidirectional**: disabling applies when either the current product forbids a selection or an existing selection forbids the current product.

### Preview
- **Combo image**: When the calculated price is shown, a preview image is displayed based on the current selection (frame + finish + wheel type + color + gearing).
- Image path is built from product slugs (e.g. `diamond--brillo--carretera--negro--6-velocidades.webp`). Missing or invalid combo images fall back to a default image.

### Persistence
- **Selections** and **“show calculated price”** state are stored in **localStorage**.
- On load, saved selections are restored when valid; otherwise defaults (first product per part) are used.
- Keys: `bike-parts-selections`, `bike-parts-show-calculated`.

### Technical notes
- **React** SPA (Create React App).
- Data: `src/data/parts.js` (parts and products with optional `incompatibleWith` and `comboSlug`).
- Utils: `src/utils/compatibility.js` (compatibility checks and reason messages), `src/utils/comboImage.js` (combo image path and default).
- Components: `Parts` (parts + product lists), `Summary` (final price, list, total, actions), `Preview` (combo image).

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
