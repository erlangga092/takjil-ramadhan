import { AppHeaderCard, InputApp } from "@/components";
import { LayoutApp } from "@/layouts";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Edit = ({ kelurahan, kecamatans, errors }) => {
  const [form, setForm] = useState(() => {
    return {
      name: kelurahan.name,
      kecamatan_id: kelurahan?.kecamatan_id,
    };
  });

  const onSubmit = (e) => {
    e.preventDefault();
    router.post(
      `/apps/kelurahans/${kelurahan?.id}`,
      {
        _method: "PUT",
        name: form?.name,
        kecamatan_id: form?.kecamatan_id,
      },
      {
        onSuccess: () => {
          Swal.fire({
            title: "Success!",
            text: "Kelurahan updated successfully.",
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
        <title>Edit Kelurahan - Takjil Ramadhan</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border border-top-purple rounded-3 shadow">
                  <AppHeaderCard title="EDIT KELURAHAN" icon="fa fa-folder" />
                  <div className="card-body">
                    <form onSubmit={onSubmit}>
                      <InputApp
                        value={form.name}
                        name="name"
                        type="text"
                        placeholder="Nama kelurahan"
                        label="Kelurahan"
                        onChange={(e) =>
                          setForm({
                            ...form,
                            name: e.target.value,
                          })
                        }
                        isError={errors?.name}
                      />

                      <div className="mb-3">
                        <label htmlFor="">Kecamatan</label>
                        <select
                          className="form-select"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              kecamatan_id: e.target.value,
                            })
                          }
                        >
                          {kecamatans?.map((kecamatan, i) => (
                            <option
                              key={kecamatan?.id}
                              value={kecamatan?.id}
                              selected={form.kecamatan_id == kecamatan?.id}
                            >
                              {kecamatan?.name}
                            </option>
                          ))}
                        </select>

                        {errors?.kecamatan_id && (
                          <div className="alert alert-danger mt-2">
                            {errors?.kecamatan_id}
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
