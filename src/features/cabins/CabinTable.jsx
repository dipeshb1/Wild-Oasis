import { useSearchParams } from "react-router-dom";
import useCabin from "./useCabin";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isPending, cabins } = useCabin();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;
  if (!cabins.length) return <Empty resource="bookings" />;

  //Filter
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;

  switch (filterValue) {
    case "no-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
      break;
    case "with-discount":
      filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
      break;
    default:
      filteredCabins = cabins;
      break;
  }

  //Sort
  const sortByValue = searchParams.get("sortBy") || "";

  let sortedCabins;

  const [field, direction] = sortByValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  sortedCabins = filteredCabins.sort((a, b) => {
    if (typeof a[field] === "string") {
      return modifier * a[field].localeCompare(b[field]);
    } else {
      return (a[field] - b[field]) * modifier;
    }
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        ></Table.Body>
      </Table>
    </Menus>
  );
}

export default CabinTable;
