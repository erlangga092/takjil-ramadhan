import { AppHeaderCard, InputApp } from "@/components";
import { LayoutApp } from "@/layouts";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Create = ({ masjids, tahun_ramadhans, errors }) => {
  const [form, setForm] = useState(() => {
    return {
      masjid_id: masjids[0]?.id,
      tahun_ramadhan_id: tahun_ramadhans[0]?.id,
    };
  });

  const onSubmit = (e) => {
    e.preventDefault();
    router.post("/apps/pikets", form, {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Takjil saved successfully.",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
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
    });
  };

  return (
    <>
      <Head>
        <title>Tambah Piket - Takjil Ramadhan</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border border-top-purple rounded-3 shadow">
                  <AppHeaderCard title="TAMBAH PIKET" icon="fa fa-folder" />
                  <div className="card-body">
                    <form onSubmit={onSubmit}>
                      <div className="mb-3">
                        <label htmlFor="" className="fw-bold">
                          Tahun Ramadhan
                        </label>
                        <select
                          className="form-select"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              tahun_ramadhan_id: e.target.value,
                            })
                          }
                        >
                          {tahun_ramadhans?.map((tahun_ramadhan) => (
                            <option value={tahun_ramadhan?.id}>
                              {tahun_ramadhan?.name}
                            </option>
                          ))}
                        </select>

                        {errors?.tahun_ramadhan && (
                          <div className="alert alert-danger mt-3">
                            {errors?.tahun_ramadhan}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="" className="fw-bold">
                          Masjid
                        </label>
                        <select
                          className="form-select"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              masjid_id: e.target.value,
                            })
                          }
                        >
                          {masjids?.map((masjid) => (
                            <option value={masjid?.id}>
                              {masjid?.name} - {masjid?.dusun?.name}
                            </option>
                          ))}
                        </select>

                        {errors?.masjid_id && (
                          <div className="alert alert-danger mt-3">
                            {errors?.masjid_id}
                          </div>
                        )}
                      </div>

                      <div className="row">
                        <div className="col-12">
                          <button className="btn btn-primary shadow-sm rounded-sm">
                            SAVE
                          </button>
                          <button className="btn btn-warning shadow-sm rounded-sm ms-3">
                            RESET
                          </button>
                        </div>
                      </div>
                    </form>
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

export default Create;
