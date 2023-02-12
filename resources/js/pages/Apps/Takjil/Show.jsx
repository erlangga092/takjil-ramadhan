import { AppHeaderCard, FormSearch, Pagination } from "@/components";
import { LayoutApp } from "@/layouts";
import { Head, Link } from "@inertiajs/react";
import React from "react";

const Show = ({ takjil }) => {
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
                      placeholder="search by rt name..."
                      onChange={(e) => setData("search", e.target.value)}
                      addLink={`/apps/takjils/${takjil.id}/createTanggalRamadhan`}
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
                                <td scope="col">0</td>
                                <td className="text-center">
                                  <Link className="btn btn-success btn-sm me-2">
                                    <i className="fa fa-pencil-alt me-1"></i>
                                  </Link>
                                  <button className="btn btn-danger btn-sm">
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
