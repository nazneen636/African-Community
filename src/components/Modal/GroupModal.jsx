import React, { useRef, useState } from "react";
import Modal from "react-modal";
import { onChangeHandler } from "../../utils/OnChangeHandler.utils";
import { handleValidation } from "../../utils/Validation.utils";
import { setFirebaseData, uploadFile } from "../../utils/upload.utils";
import { useAuth } from "../../Context/AuthContext";
import lib from "../../lib/lib";
import { getAuth } from "firebase/auth";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "20px",
    width: "50%",
  },
};
const GroupModal = ({ modalIsOpen, closeModal }) => {
  const auth = getAuth();
  const { loading, setLoading } = useAuth();
  console.log(loading);

  const fileInputRef = useRef(null);
  const [groupInfo, setGroupInfo] = useState({
    title: "",
    tag: "",
    type: "",
    about: "",
    profile: "",
  });
  const [error, setError] = useState({});

  // handle create function
  const handleGroupCreate = async () => {
    const isValid = handleValidation(groupInfo, setError);
    if (!isValid) {
      console.log("Form is submitting", groupInfo);
      return;
    }
    const formData = new FormData();
    formData.append("file", groupInfo.profile);
    formData.append("upload_preset", "Nazneen");
    try {
      setLoading(true);
      const url = await uploadFile(formData);
      await setFirebaseData("/groups", {
        adminName: auth.currentUser.displayName,
        adminEmail: auth.currentUser.email,
        adminUid: auth.currentUser.uid,
        adminProfilePicture: auth.currentUser.photoURL || "Profile",
        groupTitle: groupInfo.title,
        groupType: groupInfo.type,
        groupTag: groupInfo.tag,
        groupAbout: groupInfo.about,
        groupProfile: url,
      });
      lib.SuccessToast("Group created successfully");
    } catch (err) {
      lib.ErrorToast("Group created failed", err);
      console.log(err);
    } finally {
      setLoading(false);
      closeModal();
      setGroupInfo({ title: "", tag: "", type: "", about: "", profile: "" });
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }
  };

  return (
    <div>
      {" "}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {" "}
        <button
          className="text-gray-700 absolute right-4 top-4"
          onClick={closeModal}
        >
          X
        </button>
        <form onSubmit={(e) => e.preventDefault()} class="space-y-5 py-5 ">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Group Title
            </label>
            <div className="relative">
              <input
                type="text"
                name="title"
                value={groupInfo.title}
                onChange={(e) => onChangeHandler(e, setGroupInfo, setError)}
                placeholder="Enter group title"
                class="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              />
              {error.titleError && (
                <p className="text-red-600 absolute, left-0 top-full">
                  {error?.titleError}
                </p>
              )}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Group Tag
            </label>
            <div className="relative">
              <input
                type="text"
                name="tag"
                value={groupInfo.tag}
                onChange={(e) => onChangeHandler(e, setGroupInfo, setError)}
                placeholder="#teamalpha"
                class="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              />
              {error.tagError && (
                <p className="text-red-600 absolute, left-0 top-full">
                  {error?.tagError}
                </p>
              )}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Group Type
            </label>
            <div className="relative">
              <input
                type="text"
                name="type"
                value={groupInfo.type}
                onChange={(e) => onChangeHandler(e, setGroupInfo, setError)}
                placeholder="Type"
                class="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              />
              {error.typeError && (
                <p className="text-red-600 absolute, left-0 top-full">
                  {error?.typeError}
                </p>
              )}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              About Group
            </label>
            <div className="relative">
              <textarea
                name="about"
                value={groupInfo.about}
                onChange={(e) => onChangeHandler(e, setGroupInfo, setError)}
                placeholder="Write something..."
                class="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              ></textarea>
              {error.aboutError && (
                <p className="text-red-600 absolute, left-0 top-full">
                  {error?.aboutError}
                </p>
              )}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Group Profile
            </label>
            <div class="flex items-center gap-4">
              {/* <div class="w-14 h-14 bg-gray-100 border rounded-full flex items-center justify-center text-gray-400 text-xl">
                <span>📷</span>
              </div> */}
              <div className="relative">
                <input
                  type="file"
                  name="profile"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={(e) => onChangeHandler(e, setGroupInfo, setError)}
                  className="text-sm w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-bg-green326548"
                />
                {error.profileError && (
                  <p className="text-red-600 absolute, left-0 top-full">
                    {error?.profileError}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3 pt-4">
            <button
              type="button"
              class="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleGroupCreate}
              type="submit"
              class="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default GroupModal;
