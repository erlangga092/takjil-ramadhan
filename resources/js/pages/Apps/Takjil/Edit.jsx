import { AppHeaderCard, InputApp } from "@/components";
import { LayoutApp } from "@/layouts";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Edit = ({ takjil, masjids, tahun_ramadhans, errors }) => {
  const [form, setForm] = useState(() => {
    return {
      jumlah_takjil: takjil?.jumlah_takjil,
      masjid_id: takjil?.masjid_id,
      tahun_ramadhan_id: takjil?.tahun_ramadhan_id,
    };
  });

  const onSubmit = (e) => {
    e.preventDefault();
    router.post(
      `/apps/takjils/${takjil?.id}`,
      {
        _method: "PUT",
        jumlah_takjil: form?.jumlah_takjil,
        masjid_id: form?.masjid_id,
        tahun_ramadhan_id: form?.tahun_ramadhan_id,
      },
      {
        onSuccess: () => {
          Swal.fire({
            title: "Success!",
            text: "Takjil updated successfully.",
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
      }
    );
  };

  return (
    <>
      <Head>
        <title>Edit Takjil - Takjil Ramadhan</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border border-top-purple rounded-3 shadow">
                  <AppHeaderCard title="EDIT TAKJIL" icon="fa fa-folder" />
                  <div className="card-body">
                    <form onSubmit={onSubmit}>
                      <InputApp
                        value={form?.jumlah_takjil}
                        name="jumlah_takjil"
                        type="number"
                        placeholder="Jumlah takjil"
                        label="Jumlah Takjil"
                        onChange={(e) =>
                          setForm({
                            ...form,
                            jumlah_takjil: e.target.value,
                          })
                        }
                        isError={errors?.jumlah_takjil}
                      />

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
                            <option
                              value={tahun_ramadhan?.id}
                              selected={
                                form?.tahun_ramadhan_id == tahun_ramadhan?.id
                              }
                            >
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
                            <option
                              value={masjid?.id}
                              selected={form?.masjid_id == masjid?.id}
                            >
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
                            UPDATE
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

export default Edit;
