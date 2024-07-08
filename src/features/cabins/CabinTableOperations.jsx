import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { label: "All", value: "all" },
          { label: "No Discount", value: "no-discount" },
          { label: "With Discount", value: "with-discount" },
        ]}
      />
      <SortBy
        options={[
          { label: "Sort by Name [A-Z]", value: "name-asc" },
          { label: "Sort by Name [Z-A]", value: "name-dsc" },
          { label: "Sort by Price [low]", value: "regularPrice-asc" },
          { label: "Sort by Price [high]", value: "regularPrice-dsc" },
          { label: "Sort by Capacity [Smallest]", value: "maxCapacity-asc" },
          { label: "Sort by Capacity [Largest]", value: "maxCapacity-dsc" },
          { label: "Sort by Discount [low]", value: "discount-asc" },
          { label: "Sort by Discount [high]", value: "discount-dsc" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
