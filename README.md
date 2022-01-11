# @itwin/itwin-synchronization-report-ui

## Usage

### 1. Installation

```
npm i @itwin/itwin-synchronization-report-ui
```

<details>
<summary>Yarn</summary>

```
yarn add @itwin/itwin-synchronization-report-ui
```

</details>

### 2. Imports

Import the component and styles.

```tsx
import { Report } from '@itwin/itwin-synchronization-report-ui';
import '@itwin/itwin-synchronization-report-ui/style.css';
```

<details>
<summary>Export maps</summary>

If you get an error that `style.css` can not be found, it might be because your project cannot handle export maps correctly. You can work around this by importing from the actual path (i.e. `dist` folder):

```tsx
import '@itwin/itwin-synchronization-report-ui/dist/style.css';
```

</details>

### 3. Basic usage

Simply pass your report data into the `Report` component.

```tsx
export const App = () => {
  // ... load report data

  return (
    <>
      <Report data={report} />
    </>
  );
};
```

### 4. Advanced usage

This package uses a composition approach to provide extreme flexibility. Smaller components are exported and can be passed as `children` of `Report`, which
makes the report data available through the context API without prop drilling. However, most of the smaller components do accept props to allow using outside `Report`.

Additionally, all the smaller components also support these props:

- `displayStrings` for localization and for modifying verbiage.
- `className` for specifying custom styles.
- `rest` props for specifying any delegated props (e.g. `data` or `aria` attributes).

```tsx
export const App = () => {
  // ... load report data

  return (
    <Report data={reportData}>
      <ReportTitle />
      <ReportTimestamp />
      <ReportBanner />

      <ReportTablistWrapper>
        <ReportTablist />
        <ReportDebugIds />
        <ReportSearchbar />
      </ReportTablistWrapper>

      <ReportTabpanel>
        <FilesTable />
        <DetailsTable />
      </ReportTabpanel>
      <FeedbackModal onFeedbackSubmit={(feedback: Feedback) => void} />
    </Report>
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
