import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../pages/Shared/Loading";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const ActiveRiders = () => {
  const axiosSecure = UseAxiosSecure();
  const [searchEmail, setSearchEmail] = useState("");

  const {
    data: riders = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["active-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/approved");
      return res.data;
    },
  });

  const filteredRiders = riders.filter((rider) =>
    rider.email?.toLowerCase().includes(searchEmail.toLowerCase())
  );

  const handleDeactivate = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This rider will be deactivated!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, deactivate!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/riders/deactivate/${id}`).then(() => {
          Swal.fire("Deactivated!", "The rider has been deactivated.", "success");
          refetch();
        });
      }
    });
  };

  if (isPending) return <Loading />;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Active Riders</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by email..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="input input-bordered w-full max-w-sm"
        />
      </div>

      {filteredRiders.length === 0 ? (
        <p>No active riders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Region</th>
                <th>District</th>
                <th>Warehouse</th>
                <th>Contact</th>
                <th>Bike Model</th>
                <th>Bike Reg.</th>
                <th>Submitted At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRiders.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td>{rider.email || "N/A"}</td>
                  <td>{rider.region || "N/A"}</td>
                  <td>{rider.district || "N/A"}</td>
                  <td>{rider.warehouse || "N/A"}</td>
                  <td>{rider.contact || "N/A"}</td>
                  <td>{rider.bike_model || "N/A"}</td>
                  <td>{rider.bike_registration || "N/A"}</td>
                  <td>
                    {rider.created_at
                      ? new Date(rider.created_at).toLocaleString()
                      : "N/A"}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeactivate(rider._id)}
                      className="btn btn-xs btn-error"
                      title="Deactivate Rider"
                    >
                      <MdDelete className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActiveRiders;
