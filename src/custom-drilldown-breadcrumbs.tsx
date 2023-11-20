import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material-next/Button";
import { DrilldownBreadcrumbsProps } from "@sisense/sdk-ui";
import NavigateNext from "@mui/icons-material/NavigateNext";

export const CustomDrilldownBreadcrumbs = ({
  filtersDisplayValues,
  currentDimension,
  clearDrilldownSelections,
  sliceDrilldownSelections,
}: DrilldownBreadcrumbsProps) => {
  if (!filtersDisplayValues.length) return null;

  return (
    <div
      style={{
        width: "100%",
        padding: "2px",
        paddingBottom: "2px",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Breadcrumbs separator={<NavigateNext />}>
        {filtersDisplayValues.map((filterDisplayValue, i) => {
          return (
            <div key={i}>
              <Button
                style={{ borderRadius: "5px", padding: "5px", outline: "none" }}
                variant="text"
                size="small"
                onClick={() => sliceDrilldownSelections(i + 1)}
              >
                {filterDisplayValue.join(" | ")}
              </Button>
            </div>
          );
        })}
        <Button
          size="small"
          style={{ borderRadius: "5px", padding: "5px", outline: "none" }}
          variant="text"
        >
          {`${
            currentDimension.expression.match(/\[(.*?)]/)?.[1]?.split(".")[1] ||
            ""
          }`}
        </Button>
      </Breadcrumbs>
      <Button
        style={{ padding: "5px", outline: "none" }}
        variant="elevated"
        size="small"
        color="tertiary"
        onClick={clearDrilldownSelections}
      >
        Clear
      </Button>
    </div>
  );
};
