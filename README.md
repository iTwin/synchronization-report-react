# @itwin/synchronization-report-react

## Usage

### 1. Installation

```
npm i @itwin/synchronization-report-react
```

<details>
<summary>Yarn</summary>

```
yarn add @itwin/synchronization-report-react
```

</details>

### 2. Imports

Import the component and styles.

```tsx
import { Report } from '@itwin/synchronization-report-react';
import '@itwin/synchronization-report-react/style.css';
```

#### Export maps

If you get an error that `style.css` can not be found, it might be because your project cannot handle export maps correctly. You can work around this by importing from the actual path (i.e. `dist` folder):

```tsx
import '@itwin/synchronization-report-react/dist/style.css';
```

### 3. Basic usage

Simply pass your report data and workflow mapping into the `Report` component.

```tsx
export const App = () => {
  // ... load report data

  return (
    <>
      <Report data={report} workflowMapping={mapping} />
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
    <Report data={reportData} workflowMapping={mapping}>
      <ReportTitleWrapper>
        <ReportTitle />
        <ReportDebugIds />
      </ReportTitleWrapper>
      <ReportHeaderBannerWrapper>
        <ReportTimestamp />
        <ReportBanner />
      </ReportHeaderBannerWrapper>
      <ReportTableSelectWrapper>
        <Label as='span'>Issues Found</Label>
        <ReportTableSelect />
      </ReportTableSelectWrapper>
      <ReportInfoPanelWrapper>
        <ReportTableView>
          <FilesTable />
          <ProblemsTable />
          <WorkflowTable />
          <ElementsTable />
        </ReportTableView>
        <ReportInfoPanel />
      </ReportInfoPanelWrapper>
    </Report>
  );
};
```

## Development

This project was bootstrapped with [Vite](https://vitejs.dev/) and uses [Yarn v3 without PnP](https://yarnpkg.com/getting-started/migration).

The actual components are located in `src/components/` and are used by the test app located at `src/App.tsx`.

You can open the test app in Stackblitz without cloning the repo:

[![Open in Stackblitz](https://camo.githubusercontent.com/bf5c9492905b6d3b558552de2c848c7cce2e0a0f0ff922967115543de9441522/68747470733a2f2f646576656c6f7065722e737461636b626c69747a2e636f6d2f696d672f6f70656e5f696e5f737461636b626c69747a2e737667)](https://stackblitz.com/github/iTwin/synchronization-report-react)

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
