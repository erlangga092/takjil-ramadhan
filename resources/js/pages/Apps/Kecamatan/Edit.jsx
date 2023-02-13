import { AppHeaderCard, InputApp } from "@/components";
import { LayoutApp } from "@/layouts";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Edit = ({ kecamatan, kabupatens, errors }) => {
  const [form, setForm] = useState(() => {
    return {
      name: kecamatan?.name,
      kabupaten_id: kecamatan?.kabupaten_id,
    };
  });

  const onSubmit = (e) => {
    e.preventDefault();
    router.post(
      `/apps/kecamatans/${kecamatan?.id}`,
      {
        _method: "PUT",
        name: form.name,
        kabupaten_id: form.kabupaten_id,
      },
      {
        onSuccess: () => {
          Swal.fire({
            title: "Success!",
            text: "Kecamatan updated successfully.",
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
        <title>Edit Kabupaten - Takjil Ramadhan</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border border-top-purple rounded-3 shadow">
                  <AppHeaderCard title="EDIT KABUPATEN" icon="fa fa-folder" />
                  <div className="card-body">
                    <form onSubmit={onSubmit}>
                      <InputApp
                        value={form.name}
                        name="name"
                        type="text"
                        placeholder="Nama kecamatan"
                        label="Kecamatan"
                        onChange={(e) =>
                          setForm({
                            ...form,
                            name: e.target.value,
                          })
                        }
                        isError={errors?.name}
                      />

                      <div className="mb-3">
                        <label htmlFor="">Kabupaten</label>
                        <select
                          className="form-select"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              kabupaten_id: e.target.value,
                            })
                          }
                        >
                          {kabupatens?.map((kabupaten, i) => (
                            <option
                              key={kabupaten?.id}
                              value={kabupaten?.id}
                              selected={form?.kabupaten_id == kabupaten?.id}
                            >
                              {kabupaten?.name}
                            </option>
                          ))}
                        </select>

                        {errors?.kabupaten_id && (
                          <div className="alert alert-danger mt-2">
                            {errors?.kabupaten_id}
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
