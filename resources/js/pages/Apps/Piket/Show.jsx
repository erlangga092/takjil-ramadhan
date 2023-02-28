import { AppHeaderCard, FormSearch, Pagination } from "@/components";
import { LayoutApp } from "@/layouts";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";

const Show = ({ piket }) => {
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
        router.delete(`/apps/pikets/${piket.id}/tanggal-pikets/${ID}/destroy`, {
          onSuccess: () => {
            Swal.fire({
              title: "Deleted!",
              text: "Tanggal Piket Berhasil Dihapus!",
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
        });
      }
    });
  };

  return (
    <>
      <Head>
        <title>Detail Piket - Piket Ramadhan</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border-0 rounded-3 shadow border-top-purple">
                  <AppHeaderCard title="PIKET" icon="fa fa-folder" />
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-centered rounded">
                        <tbody>
                          <tr>
                            <td className="fw-bold" style={{ width: "30%" }}>
                              Nama Masjid
                            </td>
                            <td>{piket?.masjid?.name}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Tahun Ramadhan</td>
                            <td>{piket?.tahun_ramadhan?.name}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Alamat Dusun</td>
                            <td>{piket?.masjid?.dusun?.name}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card border-0 rounded-3 shadow border-top-purple">
                  <AppHeaderCard
                    title="TAMBAH TANGGAL PIKET"
                    icon="fa fa-folder"
                  />
                  <div className="card-body">
                    <FormSearch
                      placeholder="search by tanggal..."
                      onChange={(e) => setData("search", e.target.value)}
                      addLink={`/apps/pikets/${piket?.id}/tanggal-pikets/create`}
                      pdfLink={`/apps/pikets/${piket?.id}/pdf`}
                    />
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">No. </th>
                            <th scope="col">Tanggal</th>
                            <th scope="col">Jumlah Petugas</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {piket?.tanggal_pikets?.data?.map(
                            (tanggal_piket, i) => (
                              <tr key={i}>
                                <td>
                                  {++i +
                                    (piket?.tanggal_pikets?.current_page - 1) *
                                      piket?.tanggal_pikets?.per_page}
                                </td>
                                <td scope="col">{tanggal_piket?.tanggal}</td>
                                <td scope="col">
                                  {tanggal_piket?.piket_groups?.length}
                                </td>
                                <td className="text-center">
                                  <Link
                                    href={`/apps/pikets/${piket?.id}/tanggal-pikets/${tanggal_piket?.id}`}
                                    className="btn btn-primary btn-sm me-2"
                                  >
                                    <i className="fa fa-plus-circle me-1"></i>
                                  </Link>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={(e) =>
                                      onDestroy(e, tanggal_piket?.id)
                                    }
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                      <Pagination links={piket?.tanggal_pikets?.links} />
                    </div>
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

export default Show;
