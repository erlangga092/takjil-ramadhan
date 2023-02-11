import { Head, Link, router, useForm } from "@inertiajs/react";
import React from "react";
import swal from "sweetalert2";
import { AppHeaderCard, FormSearch, Pagination } from "../../../components";
import { LayoutApp } from "../../../layouts";

const Category = ({ rws }) => {
  const { data, setData } = useForm({
    search: "" || new URL(document.location).searchParams.get("q"),
  });

  const onSearch = (e) => {
    e.preventDefault();
    router.get("/apps/rws", {
      q: data.search,
    });
  };

  const onReset = (e) => {
    e.preventDefault();
    router.get("/apps/rws", {
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
          router.delete(`/apps/rws/${ID}`);
          swal.fire({
            title: "Deleted",
            text: "Rw deleted successfully",
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
        <title>RW - Takjil Ramadhan</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border-0 rounded-3 shadow border-top-purple">
                  <AppHeaderCard title="RW" icon="fa fa-folder" />
                  <div className="card-body">
                    <FormSearch
                      placeholder="search by rw name..."
                      onChange={(e) => setData("search", e.target.value)}
                      onSearch={onSearch}
                      onReset={onReset}
                      addLink="/apps/rws/create"
                    />
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th scope="col">No.</th>
                            <th scope="col">RW</th>
                            <th scope="col">Dusun</th>
                            <th scope="col" style={{ width: "20%" }}>
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {rws?.data?.map((rw, i) => (
                            <tr key={rw.id}>
                              <td>
                                {++i + (rws.current_page - 1) * rws.per_page}
                              </td>
                              <td>{rw.name}</td>
                              <td>{rw?.dusun?.name}</td>
                              <td className="text-center">
                                <Link
                                  href={`/apps/rws/${rw.id}/edit`}
                                  className="btn btn-success btn-sm me-2"
                                >
                                  <i className="fa fa-pencil-alt me-1"></i>
                                </Link>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={(e) => onDestroy(e, rw.id)}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <Pagination links={rws.links} />
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
