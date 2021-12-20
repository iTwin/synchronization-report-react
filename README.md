# @itwin/itwin-synchronization-report-ui

## Installation

```
npm i @itwin/itwin-synchronization-report-ui
```

```
yarn add @itwin/itwin-synchronization-report-ui
```

## Usage

Import the components and styles and start using them with your report!

```tsx
import { Report } from '@itwin/itwin-synchronization-report-ui';
import '@itwin/itwin-synchronization-report-ui/style.css';

export const App = () => {
  // ... load report data

  return (
    <>
      <Report data={report} />
    </>
  );
};
```

## Development

This project was bootstrapped with [Vite](https://vitejs.dev/) and uses [Yarn v3 without PnP](https://yarnpkg.com/getting-started/migration).

The actual components are located in `src/components/` and are used by the test app located at `src/App.tsx`.

### Available scripts

#### `yarn start`

Runs the test app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `yarn test`

Launches the [Cypress](https://docs.cypress.io/) test runner environment.\
See the section about [component testing](https://docs.cypress.io/guides/component-testing/introduction) for more information.

#### `yarn build`

Generates bundled output in the `dist/` directory.\
Three files are generated — one each for the ES module, type declarations, and styles.
