import { AppHeaderCard, FormSearch, Pagination } from "@/components";
import { LayoutApp } from "@/layouts";
import { Head, Link, router, useForm } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";

const Kelurahan = ({ kelurahans }) => {
  const { data, setData } = useForm({
    search: "" || new URL(document.location).searchParams.get("q"),
  });

  const onSearch = (e) => {
    e.preventDefault();
    router.get("/apps/kelurahans", {
      q: data.search,
    });
  };

  const onReset = (e) => {
    e.preventDefault();
    router.get("/apps/kelurahans", {
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
          `/apps/kelurahans/${ID}`,
          {
            _method: "DELETE",
          },
          {
            onSuccess: () => {
              Swal.fire({
                title: "Deleted",
                text: "Kelurahan deleted successfully",
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
        <title>Kelurahan - Takjil Ramadhan</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border-0 rounded-3 shadow border-top-purple">
                  <AppHeaderCard title="KELURAHAN" icon="fa fa-folder" />
                  <div className="card-body">
                    <FormSearch
                      placeholder="search by kelurahan name..."
                      onChange={(e) => setData("search", e.target.value)}
                      onSearch={onSearch}
                      onReset={onReset}
                      addLink="/apps/kelurahans/create"
                    />
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Kecamatan</th>
                            <th scope="col" style={{ width: "20%" }}>
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {kelurahans?.data?.map((kelurahan, i) => (
                            <tr key={kelurahan.id}>
                              <td>
                                {++i +
                                  (kelurahans.current_page - 1) *
                                    kelurahans.per_page}
                              </td>
                              <td>{kelurahan.name}</td>
                              <td>{kelurahan?.kecamatan?.name}</td>
                              <td className="text-center">
                                <Link
                                  href={`/apps/kelurahans/${kelurahan.id}/edit`}
                                  className="btn btn-success btn-sm me-2"
                                >
                                  <i className="fa fa-pencil-alt me-1"></i>
                                </Link>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={(e) => onDestroy(e, kelurahan.id)}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <Pagination links={kelurahans.links} />
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

export default Kelurahan;
