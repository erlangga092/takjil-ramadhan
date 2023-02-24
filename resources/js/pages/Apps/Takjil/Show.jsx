import { AppHeaderCard, FormSearch, Pagination } from "@/components";
import { LayoutApp } from "@/layouts";
import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";

const Show = ({ takjil }) => {
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
        router.delete(
          `/apps/takjils/${takjil.id}/tanggal-ramadhans/${ID}/destroy`,
          {
            onSuccess: () => {
              Swal.fire({
                title: "Deleted!",
                text: "Tanggal Ramadhan Berhasil Dihapus!",
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
        <title>Takjil - Takjil Ramadhan</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border-0 rounded-3 shadow border-top-purple">
                  <AppHeaderCard title="TAKJIL" icon="fa fa-folder" />
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-centered rounded">
                        <tbody>
                          <tr>
                            <td className="fw-bold" style={{ width: "30%" }}>
                              Nama Masjid
                            </td>
                            <td>{takjil?.masjid?.name}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Tahun Ramadhan</td>
                            <td>{takjil?.tahun_ramadhan?.name}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Alamat Dusun</td>
                            <td>{takjil?.masjid?.dusun?.name}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Jumlah Takjil</td>
                            <td>@{takjil?.jumlah_takjil}</td>
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
                    title="TAMBAH TANGGAL RAMADHAN"
                    icon="fa fa-folder"
                  />
                  <div className="card-body">
                    <FormSearch
                      placeholder="search by tanggal..."
                      onChange={(e) => setData("search", e.target.value)}
                      addLink={`/apps/takjils/${takjil.id}/tanggal-ramadhans/create`}
                      pdfLink={`/apps/takjils/${takjil?.id}/pdf`}
                    />
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">No. </th>
                            <th scope="col">Tanggal</th>
                            <th scope="col">Jumlah Warga</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {takjil?.tanggal_ramadhans?.data?.map(
                            (tanggal_ramadhan, i) => (
                              <tr key={i}>
                                <td>
                                  {++i +
                                    (takjil?.tanggal_ramadhans?.current_page -
                                      1) *
                                      takjil?.tanggal_ramadhans?.per_page}
                                </td>
                                <td scope="col">{tanggal_ramadhan?.tanggal}</td>
                                <td scope="col">
                                  {tanggal_ramadhan?.takjil_groups?.length}
                                </td>
                                <td className="text-center">
                                  <Link
                                    href={`/apps/takjils/${takjil?.id}/tanggal-ramadhans/${tanggal_ramadhan?.id}`}
                                    className="btn btn-primary btn-sm me-2"
                                  >
                                    <i className="fa fa-plus-circle me-1"></i>
                                  </Link>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={(e) =>
                                      onDestroy(e, tanggal_ramadhan?.id)
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
                      <Pagination links={takjil?.tanggal_ramadhans?.links} />
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
