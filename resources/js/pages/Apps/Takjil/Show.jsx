import { AppHeaderCard } from "@/components";
import { LayoutApp } from "@/layouts";
import { Head } from "@inertiajs/react";
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
                    <form action=""></form>
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
