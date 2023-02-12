import { AppHeaderCard, InputApp } from "@/components";
import { LayoutApp } from "@/layouts";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Edit = ({ dusun, kelurahans, errors }) => {
  const [form, setForm] = useState(() => {
    return {
      name: dusun?.name,
      kelurahan_id: dusun?.kelurahan_id,
    };
  });

  const onSubmit = (e) => {
    e.preventDefault();
    router.post(
      `/apps/dusuns/${dusun?.id}`,
      {
        _method: "PUT",
        name: form.name,
        kelurahan_id: form.kelurahan_id,
      },
      {
        onSuccess: () => {
          Swal.fire({
            title: "Success!",
            text: "Dusun updated successfully.",
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
        <title>Edit Dusun - Takjil Ramadhan</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border border-top-purple rounded-3 shadow">
                  <AppHeaderCard title="EDIT DUSUN" icon="fa fa-folder" />
                  <div className="card-body">
                    <form onSubmit={onSubmit}>
                      <InputApp
                        value={form.name}
                        name="name"
                        type="text"
                        placeholder="Nama dusun"
                        label="Nama Dusun"
                        onChange={(e) =>
                          setForm({
                            ...form,
                            name: e.target.value,
                          })
                        }
                        isError={errors?.name}
                      />

                      <div className="mb-3">
                        <label htmlFor="">Nama Kelurahan</label>
                        <select
                          value={form.kelurahan_id}
                          className="form-select"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              kelurahan_id: e.target.value,
                            })
                          }
                        >
                          {kelurahans?.map((kelurahan, i) => (
                            <option key={kelurahan?.id} value={kelurahan?.id}>
                              {kelurahan?.name}
                            </option>
                          ))}
                        </select>

                        {errors?.kelurahan_id && (
                          <div className="alert alert-danger mt-2">
                            {errors?.kelurahan_id}
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
