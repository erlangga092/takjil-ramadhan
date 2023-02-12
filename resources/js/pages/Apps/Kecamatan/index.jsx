import { AppHeaderCard, FormSearch, Pagination } from "@/components";
import { LayoutApp } from "@/layouts";
import { Head, Link, router, useForm } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";

const Kecamatan = ({ kecamatans }) => {
  const { data, setData } = useForm({
    search: "" || new URL(document.location).searchParams.get("q"),
  });

  const onSearch = (e) => {
    e.preventDefault();
    router.get("/apps/kecamatans", {
      q: data.search,
    });
  };

  const onReset = (e) => {
    e.preventDefault();
    router.get("/apps/kecamatans", {
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
          `/apps/kecamatans/${ID}`,
          {
            _method: "DELETE",
          },
          {
            onSuccess: () => {
              Swal.fire({
                title: "Deleted",
                text: "Kecamatan deleted successfully",
                icon: "success",
                timer: 1000,
                showConfirmButton: false,
              });
            },
            onError: (errors) => {
              Swal.fire({
                title: "Failed!",
                text: errors[0],
                icon: "error",
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
        <title>Kecamatan - Takjil Ramadhan</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border-0 rounded-3 shadow border-top-purple">
                  <AppHeaderCard title="KECAMATAN" icon="fa fa-folder" />
                  <div className="card-body">
                    <FormSearch
                      placeholder="search by kecamatan name..."
                      onChange={(e) => setData("search", e.target.value)}
                      onSearch={onSearch}
                      onReset={onReset}
                      addLink="/apps/kecamatans/create"
                    />
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Kabupaten</th>
                            <th scope="col" style={{ width: "20%" }}>
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {kecamatans?.data?.map((kecamatan, i) => (
                            <tr key={kecamatan.id}>
                              <td>
                                {++i +
                                  (kecamatans.current_page - 1) *
                                    kecamatans.per_page}
                              </td>
                              <td>{kecamatan.name}</td>
                              <td>{kecamatan?.kabupaten?.name}</td>
                              <td className="text-center">
                                <Link
                                  href={`/apps/kecamatans/${kecamatan.id}/edit`}
                                  className="btn btn-success btn-sm me-2"
                                >
                                  <i className="fa fa-pencil-alt me-1"></i>
                                </Link>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={(e) => onDestroy(e, kecamatan.id)}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <Pagination links={kecamatans.links} />
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

export default Kecamatan;
