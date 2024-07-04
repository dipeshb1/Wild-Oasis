import Heading from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable";
import Row from "../ui/Row";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>
      <Row type="horizontal">
        <CabinTable />
      </Row>
      <Button onClick={() => setShowForm(!showForm)}>Show Form</Button>
      {showForm && <CreateCabinForm />}
    </>
  );
}

export default Cabins;
