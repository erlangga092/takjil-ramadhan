import { Head, Link, router, useForm } from "@inertiajs/react";
import React from "react";
import swal from "sweetalert2";
import { AppHeaderCard, FormSearch, Pagination } from "../../../components";
import { LayoutApp } from "../../../layouts";

const Category = ({ wargas }) => {
  const { data, setData } = useForm({
    search: "" || new URL(document.location).searchParams.get("q"),
  });

  const onSearch = (e) => {
    e.preventDefault();
    router.get("/apps/wargas", {
      q: data.search,
    });
  };

  const onReset = (e) => {
    e.preventDefault();
    router.get("/apps/wargas", {
      q: "",
    });
  };

  const onDestroy = (e, ID) => {
    e.preventDefault();
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          router.delete(`/apps/wargas/${ID}`);
          swal.fire({
            title: "Deleted",
            text: "Rt deleted successfully",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          });
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
                  <AppHeaderCard title="WARGA" icon="fa fa-folder" />
                  <div className="card-body">
                    <FormSearch
                      placeholder="search by rt name..."
                      onChange={(e) => setData("search", e.target.value)}
                      onSearch={onSearch}
                      onReset={onReset}
                      addLink="/apps/wargas/create"
                      importLink="/apps/wargas/import"
                    />
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
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
                          {wargas?.data?.map((warga, i) => (
                            <tr key={warga.id}>
                              <td>
                                {++i +
                                  (wargas.current_page - 1) * wargas.per_page}
                              </td>
                              <td>{warga?.name}</td>
                              <td>{warga?.rt?.name}</td>
                              <td>{warga?.masjid?.name}</td>
                              <td className="text-center">
                                <Link
                                  href={`/apps/wargas/${warga.id}/edit`}
                                  className="btn btn-success btn-sm me-2"
                                >
                                  <i className="fa fa-pencil-alt me-1"></i>
                                </Link>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={(e) => onDestroy(e, warga.id)}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <Pagination links={wargas.links} />
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

export default Category;
