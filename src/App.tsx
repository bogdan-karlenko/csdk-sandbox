import { measures } from '@sisense/sdk-data';
import {
  Chart,
  CustomDrilldownResult,
  DataPoint,
  DrilldownWidget,
  ExecuteQuery,
  SisenseContextProvider,
} from '@sisense/sdk-ui';
import { CustomContextMenu } from './custom-context-menu';
import { CustomDrilldownBreadcrumbs } from './custom-drilldown-breadcrumbs';
import * as DM from './data-models/sample-ecommerce';
import { PlotlyBarChart } from './plotly-bar-chart';

function App() {
  const { VITE_APP_SISENSE_URL, VITE_APP_SISENSE_TOKEN } = import.meta.env;

  const sisenseColumnChart = ({
    drilldownFilters,
    drilldownDimension,
    onDataPointsSelected,
    onContextMenu,
  }: CustomDrilldownResult) => {
    const onPointsSelected = (points: DataPoint[], nativeEvent: MouseEvent) => {
      onDataPointsSelected(points, nativeEvent);
      onContextMenu({
        left: nativeEvent.clientX,
        top: nativeEvent.clientY,
      });
    };

    return (
      <Chart
        chartType="column"
        dataSet={DM.DataSource}
        styleOptions={{
          width: 600,
        }}
        dataOptions={{
          category: [drilldownDimension],
          value: [measures.sum(DM.Commerce.Revenue)],
        }}
        filters={drilldownFilters}
        onDataPointsSelected={onPointsSelected}
      />
    );
  };

  const plotlyBarChart = ({
    drilldownFilters,
    drilldownDimension,
    onDataPointsSelected,
    onContextMenu,
  }: CustomDrilldownResult) => (
    <ExecuteQuery
      dataSource={DM.DataSource}
      dimensions={[drilldownDimension]}
      measures={[measures.sum(DM.Commerce.Revenue)]}
      filters={drilldownFilters}
    >
      {(data) => (
        <PlotlyBarChart
          rawData={data}
          onContextMenu={onContextMenu}
          onDataPointsSelected={onDataPointsSelected}
        />
      )}
    </ExecuteQuery>
  );

  return (
    <SisenseContextProvider url={VITE_APP_SISENSE_URL} token={VITE_APP_SISENSE_TOKEN}>
      <DrilldownWidget
        initialDimension={DM.Commerce.AgeRange}
        drilldownDimensions={[DM.Commerce.Gender, DM.Commerce.Condition]}
        config={{
          contextMenuComponent: CustomContextMenu,
          breadcrumbsComponent: CustomDrilldownBreadcrumbs
        }}
      >
        {plotlyBarChart}
      </DrilldownWidget>
      <DrilldownWidget
        initialDimension={DM.Commerce.AgeRange}
        drilldownDimensions={[DM.Commerce.Gender, DM.Commerce.Condition]}
      >
        {sisenseColumnChart}
      </DrilldownWidget>
    </SisenseContextProvider>
  );
}

export default App;
