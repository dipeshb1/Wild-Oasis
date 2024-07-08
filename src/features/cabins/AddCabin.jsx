import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <div>
          <Button>Add new Cabin</Button>
        </div>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

// function AddCabin() {
//   const [isShowModal, setShowModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setShowModal(!isShowModal)}>Show Form</Button>
//       {isShowModal && (
//         <Modal onClose={() => setShowModal(!isShowModal)}>
//           <CreateCabinForm onClose={() => setShowModal(!isShowModal)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
