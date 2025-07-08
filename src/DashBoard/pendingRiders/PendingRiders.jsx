import React, { useEffect, useState } from "react";
import { FiEye, FiCheck, FiX } from "react-icons/fi";
import { Dialog } from "@headlessui/react";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../pages/Shared/Loading";
import Swal from "sweetalert2";

const PendingRiders = () => {
  const [selectedRider, setSelectedRider] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = UseAxiosSecure();

  const {
    isPending,
    data: riders = [],
    refetch,
  } = useQuery({
    queryKey: ["pending-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });
  if (isPending) {
    return <Loading></Loading>;
  }

  const handleView = (rider) => {
    setSelectedRider(rider);
    setIsOpen(true);
  };

  const handleAccept = async (id) => {
    await axiosSecure.patch(`/riders/approve/${id}`, { status: "approved" });
    Swal.fire("Accepted!", "Rider has been approved.", "success");
    refetch();
  };

  const handleReject = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This rider will be permanently rejected!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/riders/reject/${id}`, { status: "rejected" });

        Swal.fire("Rejected!", "Rider has been rejected.", "error");
        refetch();
      }
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-6">
        Pending Riders {riders.length}
      </h2>
      <div>
        {Array.isArray(riders) && riders.length === 0 ? (
          <div className="text-center text-gray-500 font-medium py-10">
            No pending riders found.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl">
            <table className="table w-full">
              <thead className="bg-green-100 text-green-800">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Region</th>
                  <th>District</th>
                  <th>Contact</th>
                  <th>Applied </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {riders.map((rider, index) => (
                  <tr key={rider._id}>
                    <td>{index + 1}</td>
                    <td>{rider.name || "N/A"}</td>
                    <td>{rider.email}</td>
                    <td>{rider.region}</td>
                    <td>{rider.district || "N/A"}</td>
                    <td>{rider.contact}</td>
                    <td>
                      {rider.created_at
                        ? new Date(rider.created_at).toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="space-x-1 flex items-center">
                      <button
                        onClick={() => handleView(rider)}
                        className="btn btn-xs btn-info"
                        aria-label="View"
                      >
                        <FiEye />
                      </button>
                      <button
                        onClick={() => handleAccept(rider._id)}
                        className="btn btn-xs btn-success"
                        aria-label="Accept"
                      >
                        <FiCheck />
                      </button>
                      <button
                        onClick={() => handleReject(rider._id)}
                        className="btn btn-xs btn-error"
                        aria-label="Reject"
                      >
                        <FiX />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Rider Info Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-lg bg-white text-black p-6 shadow-lg">
            <Dialog.Title className="text-xl font-bold mb-4 text-green-600">
              Rider Information
            </Dialog.Title>
            {selectedRider && (
              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> {selectedRider.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedRider.email}
                </p>
                <p>
                  <strong>Contact:</strong> {selectedRider.contact}
                </p>
                <p>
                  <strong>Age:</strong> {selectedRider.age}
                </p>
                <p>
                  <strong>Region:</strong> {selectedRider.region}
                </p>
                <p>
                  <strong>District:</strong> {selectedRider.district}
                </p>
                <p>
                  <strong>Warehouse:</strong> {selectedRider.warehouse}
                </p>
                <p>
                  <strong>NID:</strong> {selectedRider.nid}
                </p>
                <p>
                  <strong>Bike Model:</strong> {selectedRider.bike_model}
                </p>
                <p>
                  <strong>Registration No:</strong>{" "}
                  {selectedRider.registration_no}
                </p>
                <p>
                  <strong>Applied At:</strong>{" "}
                  {new Date(selectedRider.created_at).toLocaleString()}
                </p>
              </div>
            )}
            <div className="mt-4 text-right">
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-sm btn-neutral"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default PendingRiders;
