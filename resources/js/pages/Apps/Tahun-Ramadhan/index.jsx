import { AppHeaderCard, FormSearch, Pagination } from "@/components";
import { LayoutApp } from "@/layouts";
import { Head, Link, router, useForm } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";

const TahunRamadhan = ({ tahun_ramadhans }) => {
  const { data, setData } = useForm({
    search: "" || new URL(document.location).searchParams.get("q"),
  });

  const onSearch = (e) => {
    e.preventDefault();
    router.get("/apps/tahun-ramadhans", {
      q: data.search,
    });
  };

  const onReset = (e) => {
    e.preventDefault();
    router.get("/apps/tahun-ramadhans", {
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
          `/apps/tahun-ramadhans/${ID}`,
          {
            _method: "DELETE",
          },
          {
            onSuccess: () => {
              swal.fire({
                title: "Deleted",
                text: "Tahun Ramadhan deleted successfully",
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
        <title>Tahun Ramadhan - Takjil Ramadhan</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border-0 rounded-3 shadow border-top-purple">
                  <AppHeaderCard title="TAHUN RAMADHAN" icon="fa fa-folder" />
                  <div className="card-body">
                    <FormSearch
                      placeholder="search by tahun_ramadhan name..."
                      onChange={(e) => setData("search", e.target.value)}
                      onSearch={onSearch}
                      onReset={onReset}
                      addLink="/apps/tahun-ramadhans/create"
                    />
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Name</th>
                            <th scope="col" style={{ width: "20%" }}>
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {tahun_ramadhans?.data?.map((tahun_ramadhan, i) => (
                            <tr key={tahun_ramadhan.id}>
                              <td>
                                {++i +
                                  (tahun_ramadhans.current_page - 1) *
                                    tahun_ramadhans.per_page}
                              </td>
                              <td>{tahun_ramadhan.name}</td>
                              <td className="text-center">
                                <Link
                                  href={`/apps/tahun-ramadhans/${tahun_ramadhan.id}/edit`}
                                  className="btn btn-success btn-sm me-2"
                                >
                                  <i className="fa fa-pencil-alt me-1"></i>
                                </Link>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={(e) =>
                                    onDestroy(e, tahun_ramadhan.id)
                                  }
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <Pagination links={tahun_ramadhans.links} />
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

export default TahunRamadhan;
