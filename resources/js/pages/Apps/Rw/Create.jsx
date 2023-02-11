import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { AppHeaderCard, InputApp } from "../../../components";
import { LayoutApp } from "../../../layouts";

const Create = ({ dusuns, errors }) => {
  const [form, setForm] = useState(() => {
    return {
      name: "",
      dusun_id: dusuns[0]?.id,
    };
  });

  const onSubmit = (e) => {
    e.preventDefault();
    router.post("/apps/rws", form, {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Dusun saved successfully.",
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
        <title>Tambah RW - Takjil Ramadhan</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border border-top-purple rounded-3 shadow">
                  <AppHeaderCard title="TAMBAH RW" icon="fa fa-folder" />
                  <div className="card-body">
                    <form onSubmit={onSubmit}>
                      <InputApp
                        name="name"
                        type="text"
                        placeholder="Nama RW"
                        label="Dusun"
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
                          Dusun
                        </label>
                        <select
                          className="form-select"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              dusun_id: e.target.value,
                            })
                          }
                        >
                          {dusuns?.map((dusun) => (
                            <option value={dusun.id}>{dusun?.name}</option>
                          ))}
                        </select>

                        {errors?.dusun_id && (
                          <div className="alert alert-danger mt-3">
                            {errors?.dusun_id}
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
