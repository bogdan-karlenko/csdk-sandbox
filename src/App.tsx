import { measures } from '@sisense/sdk-data';
import {
  Chart,
  CustomDrilldownResult,
  DataPoint,
  DrilldownWidget,
  SisenseContextProvider,
} from '@sisense/sdk-ui';
import * as DM from './data-models/sample-ecommerce';

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

  // const plotlyBarChart = ({
  //   drilldownFilters,
  //   drilldownDimension,
  //   onDataPointsSelected,
  //   onContextMenu,
  // }: CustomDrilldownResult) => (
  // );

  return (
    <SisenseContextProvider url={VITE_APP_SISENSE_URL} token={VITE_APP_SISENSE_TOKEN}>
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
