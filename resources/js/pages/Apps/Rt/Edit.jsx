import { AppHeaderCard, InputApp } from "@/components";
import { LayoutApp } from "@/layouts";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Edit = ({ rt, rws, errors }) => {
  const [form, setForm] = useState(() => {
    return {
      name: rt?.name,
      rw_id: rt?.rw_id,
    };
  });

  const onSubmit = (e) => {
    e.preventDefault();
    router.post(
      `/apps/rts/${rt?.id}`,
      {
        _method: "PUT",
        name: form?.name,
        rw_id: form?.rw_id,
      },
      {
        onSuccess: () => {
          Swal.fire({
            title: "Success!",
            text: "RT Updated Successfully.",
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
        <title>Edit RT - Takjil Ramadhan</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border border-top-purple rounded-3 shadow">
                  <AppHeaderCard title="EDIT RT" icon="fa fa-folder" />
                  <div className="card-body">
                    <form onSubmit={onSubmit}>
                      <InputApp
                        value={form.name}
                        name="name"
                        type="text"
                        placeholder="Nama RT"
                        label="RT"
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
                          RW
                        </label>
                        <select
                          className="form-select"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              rw_id: e.target.value,
                            })
                          }
                        >
                          {rws?.map((rw) => (
                            <option
                              key={rw?.id}
                              value={rw.id}
                              selected={form?.rw_id == rw?.id}
                            >
                              {rw?.name}
                            </option>
                          ))}
                        </select>

                        {errors?.rw_id && (
                          <div className="alert alert-danger mt-3">
                            {errors?.rw_id}
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
