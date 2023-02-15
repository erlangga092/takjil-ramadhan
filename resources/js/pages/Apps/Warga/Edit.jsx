import { AppHeaderCard, InputApp } from "@/components";
import { LayoutApp } from "@/layouts";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Edit = ({ rts, masjids, warga, errors }) => {
  const [form, setForm] = useState(() => {
    return {
      name: warga?.name,
      rt_id: warga?.rt_id,
      masjid_id: warga?.masjid_id,
    };
  });

  const onSubmit = (e) => {
    e.preventDefault();
    router.post(
      `/apps/wargas/${warga?.id}`,
      {
        _method: "PUT",
        name: form?.name,
        rt_id: form?.rt_id,
        masjid_id: form?.masjid_id,
      },
      {
        onSuccess: () => {
          Swal.fire({
            title: "Success!",
            text: "Warga updated successfully.",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
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
  };

  return (
    <>
      <Head>
        <title>Edit Warga - Takjil Ramadhan</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border border-top-purple rounded-3 shadow">
                  <AppHeaderCard title="EDIT WARGA" icon="fa fa-folder" />
                  <div className="card-body">
                    <form onSubmit={onSubmit}>
                      <InputApp
                        value={form.name}
                        name="name"
                        type="text"
                        placeholder="Nama Warga"
                        label="Nama Warga"
                        onChange={(e) =>
                          setForm({
                            ...form,
                            name: e.target.value,
                          })
                        }
                        isError={errors?.name}
                      />

                      <div className="mb-3">
                        <label htmlFor="">RT</label>
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
                            <option
                              value={rt?.id}
                              selected={form?.rt_id == rt?.id}
                            >
                              {rt?.name}
                            </option>
                          ))}
                        </select>

                        {errors?.rt_id && (
                          <div className="alert alert-danger">
                            {errors?.rt_id}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="">MASJID</label>
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
                              {masjid?.name}
                            </option>
                          ))}
                        </select>

                        {errors?.masjid_id && (
                          <div className="alert alert-danger">
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
