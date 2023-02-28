import { Head, Link, router, useForm } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";
import { AppHeaderCard, FormSearch, Pagination } from "@/components";
import { LayoutApp } from "@/layouts";

const Piket = ({ pikets }) => {
  const { data, setData } = useForm({
    search: "" || new URL(document.location).searchParams.get("q"),
  });

  const onSearch = (e) => {
    e.preventDefault();
    router.get("/apps/pikets", {
      q: data.search,
    });
  };

  const onReset = (e) => {
    e.preventDefault();
    router.get("/apps/pikets", {
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
          `/apps/pikets/${ID}`,
          {
            _method: "DELETE",
          },
          {
            onSuccess: () => {
              Swal.fire({
                title: "Deleted",
                text: "piket deleted successfully",
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
        <title>Piket - piket Ramadhan</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border-0 rounded-3 shadow border-top-purple">
                  <AppHeaderCard title="PIKET" icon="fa fa-folder" />
                  <div className="card-body">
                    <FormSearch
                      placeholder="search by rt name..."
                      onChange={(e) => setData("search", e.target.value)}
                      onSearch={onSearch}
                      onReset={onReset}
                      addLink="/apps/pikets/create"
                    />
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Masjid</th>
                            <th scope="col">Tahun Ramadhan</th>
                            <th scope="col">Dusun</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pikets?.data?.map((piket, i) => (
                            <tr key={piket.id}>
                              <td>
                                {++i +
                                  (pikets.current_page - 1) * pikets.per_page}
                              </td>
                              <td>{piket?.masjid?.name}</td>
                              <td>{piket?.tahun_ramadhan?.name}</td>
                              <td>{piket?.masjid?.dusun?.name}</td>
                              <td className="text-center">
                                <Link
                                  href={`/apps/pikets/${piket.id}`}
                                  className="btn btn-primary btn-sm me-2"
                                >
                                  <i className="fa fa-plus-circle me-1"></i>
                                </Link>
                                <Link
                                  href={`/apps/pikets/${piket.id}/edit`}
                                  className="btn btn-success btn-sm me-2"
                                >
                                  <i className="fa fa-pencil-alt me-1"></i>
                                </Link>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={(e) => onDestroy(e, piket.id)}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <Pagination links={pikets.links} />
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

export default Piket;
