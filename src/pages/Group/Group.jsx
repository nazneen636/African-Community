import React from "react";
import GroupModal from "../../components/Modal/GroupModal";
import { FaPlus } from "react-icons/fa";
import { useFetchData } from "../../Hooks/useFetchData";
import GroupCard from "../../Cards/GroupCard";

const Group = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const { data, error, loading } = useFetchData("groups");
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error...{error}</p>;
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="">
      <button
        className="text-lg flex items-center justify-center bg-bg-green326548 text-white py-2 px-5 font-semibold rounded-lg"
        onClick={openModal}
      >
        <FaPlus className="text-sm mr-2" />
        Create Group
      </button>
      <GroupModal modalIsOpen={modalIsOpen} closeModal={closeModal} />

      {/* group data */}
      <div className="grid grid-cols-4 gap-5 mt-10">
        {data?.map((item) => (
          <GroupCard key={item.id} group={item} />
        ))}
      </div>
    </div>
  );
};

export default Group;
