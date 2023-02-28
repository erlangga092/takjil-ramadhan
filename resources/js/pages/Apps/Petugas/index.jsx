import { AppHeaderCard, FormSearch, Pagination } from "@/components";
import { LayoutApp } from "@/layouts";
import { Head, Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Petugas = ({ petugas }) => {
  const [search, setSearch] = useState(
    "" || new URL(document.location).searchParams.get("q")
  );

  const onSearch = (e) => {
    e.preventDefault();
    router.get("/apps/petugas", {
      q: search,
    });
  };

  const onReset = (e) => {
    e.preventDefault();
    router.get("/apps/petugas", {
      q: "",
    });
  };

  const onDestroy = (e, ID) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        router.post(
          `/apps/petugas/${ID}`,
          {
            _method: "DELETE",
          },
          {
            onSuccess: () => {
              Swal.fire({
                title: "Deleted",
                text: "Petugas deleted successfully",
                icon: "success",
                timer: 1000,
                showConfirmButton: false,
              });
            },
            onError: (errors) => {
              Swal.fire({
                title: "Failed!",
                text: errors[0],
                icon: "failed",
                showConfirmButton: true,
              });
            },
          }
        );
      }
    });
  };

  return (
    <>
      <Head>
        <title>Warga - Takjil Ramadhan</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border-0 rounded-3 shadow border-top-purple">
                  <AppHeaderCard title="PETUGAS" icon="fa fa-folder" />
                  <div className="card-body">
                    <FormSearch
                      placeholder="search by petugas name..."
                      onChange={(e) => setSearch(e.target.value)}
                      onSearch={onSearch}
                      onReset={onReset}
                      addLink="/apps/petugas/create"
                      importLink="/apps/petugas/import"
                    />
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">RT</th>
                            <th scope="col">Masjid</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {petugas?.data?.map((v, i) => (
                            <tr key={v.id}>
                              <td>
                                {++i +
                                  (petugas.current_page - 1) * petugas.per_page}
                              </td>
                              <td>{v?.name}</td>
                              <td>{v?.rt?.name}</td>
                              <td>{v?.masjid?.name}</td>
                              <td className="text-center">
                                <Link
                                  href={`/apps/petugas/${v.id}/edit`}
                                  className="btn btn-success btn-sm me-2"
                                >
                                  <i className="fa fa-pencil-alt me-1"></i>
                                </Link>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={(e) => onDestroy(e, v.id)}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <Pagination links={petugas.links} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </LayoutApp>
    </>
  );
};

export default Petugas;
