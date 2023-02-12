import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { AppHeaderCard, InputApp } from "../../../components";
import { LayoutApp } from "../../../layouts";

const Warga = ({ masjids, rts, errors }) => {
  const [form, setForm] = useState(() => {
    return {
      name: "",
      rt_id: rts[0]?.id,
      masjid_id: masjids[0]?.id,
    };
  });

  const onSubmit = (e) => {
    e.preventDefault();
    router.post("/apps/wargas", form, {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Rt saved successfully.",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
      },
    });
  };

  return (
    <>
      <Head>
        <title>Tambah Warga - Takjil Ramadhan</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border border-top-purple rounded-3 shadow">
                  <AppHeaderCard title="TAMBAH WARGA" icon="fa fa-folder" />
                  <div className="card-body">
                    <form onSubmit={onSubmit}>
                      <InputApp
                        name="name"
                        type="text"
                        placeholder="Nama Warga"
                        label="Warga"
                        onChange={(e) =>
                          setForm({
                            ...form,
                            name: e.target.value,
                          })
                        }
                        isError={errors?.name}
                      />

                      <div className="mb-3">
                        <label htmlFor="" className="fw-bold">
                          RT
                        </label>
                        <select
                          className="form-select"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              rt_id: e.target.value,
                            })
                          }
                        >
                          {rts?.map((rt) => (
                            <option value={rt?.id}>
                              RT {rt?.name} - RW {rt?.rw?.name} (
                              {rt?.rw?.dusun?.name},{" "}
                              {rt?.rw?.dusun?.kelurahan?.name},{" "}
                              {rt?.rw?.dusun?.kelurahan?.kecamatan?.name})
                            </option>
                          ))}
                        </select>

                        {errors?.rt_id && (
                          <div className="alert alert-danger mt-3">
                            {errors?.rt_id}
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

export default Warga;
