import React, { useState } from "react";
import Modal from "react-modal";
import { onChangeHandler } from "../../utils/OnChangeHandler.utils";
import { handleValidation } from "../../utils/Validation.utils";
import { setFirebaseData, uploadFile } from "../../utils/upload.utils";
import { getAuth, updateProfile } from "firebase/auth";
import lib from "../../lib/lib";
import { useAuth } from "../../Context/AuthContext";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
    border: "none",
  },
};

const EditProfileModal = ({ modalIsOpen, closeModal }) => {
  const auth = getAuth();
  const { loading, setLoading, setUser } = useAuth();
  const [editProfileInfo, setEditProfileInfo] = useState({
    fullName: "",
    profileImage: "",
  });
  const [editProfileError, setEditProfileError] = useState({});

  // handle submit
  const handleSaveChanges = async () => {
    const isValid = handleValidation(editProfileInfo, setEditProfileError);
    if (!isValid) {
      console.log("Form is submitting", editProfileInfo);
      return;
    }

    const formData = new FormData();
    formData.append("file", editProfileInfo.profileImage);
    formData.append("upload_preset", "Nazneen");
    console.log(formData);

    try {
      setLoading(true);
      const url = await uploadFile(formData);
      await updateProfile(auth.currentUser, {
        displayName: editProfileInfo.fullName,
        photoURL: url,
      });
      // Reload user info and update in context
      await auth.currentUser.reload();
      setUser({ ...auth.currentUser });
      closeModal();
      lib.SuccessToast("Profile Updated Successfully").catch((err) => {
        lib.ErrorToast("Something went wrong");
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      {/* <button onClick={closeModal}>close</button> */}
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Edit Profile
        </h2>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              onChange={(e) =>
                onChangeHandler(e, setEditProfileInfo, setEditProfileError)
              }
              name="fullName"
              placeholder="Your name"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                onChangeHandler(e, setEditProfileInfo, setEditProfileError)
              }
              name="profileImage"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            {loading ? (
              <button
                disabled
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Updating...
              </button>
            ) : (
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Save Changes
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
