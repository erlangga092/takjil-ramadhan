import { AppHeaderCard } from "@/components";
import { LayoutApp } from "@/layouts";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Import = ({ errors }) => {
  const [form, setForm] = useState(() => {
    return {
      file: "",
    };
  });

  const onSubmit = (e) => {
    e.preventDefault();
    router.post("/apps/wargas/import/store", form, {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Data Warga Berhasil Diimport!",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
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
    });
  };

  return (
    <>
      <Head>
        <title>Import Data Warga - Takjil Ramadhan</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border border-top-purple rounded-3 shadow">
                  <AppHeaderCard
                    title="IMPORT DATA WARGA"
                    icon="fa fa-folder"
                  />
                  <div className="card-body">
                    <div>
                      <a
                        href="/assets/excel/questions.xls"
                        target="__blank"
                        className="btn btn-md btn-primary border-0 mb-3 rounded-sm shadow-sm"
                        type="button"
                      >
                        <i className="fa fa-file-excel me-2"></i> Contoh Format
                      </a>
                    </div>

                    <form onSubmit={onSubmit}>
                      <div className="mb-3">
                        <label htmlFor="">File Excel</label>
                        <input
                          type="file"
                          className="form-control"
                          onInput={(e) =>
                            setForm({
                              ...form,
                              file: e.target.files[0],
                            })
                          }
                        />

                        {errors?.file && (
                          <div className="alert alert-danger mt-2">
                            {errors?.file}
                          </div>
                        )}
                        {errors[0] && (
                          <div className="alert alert-danger mt-2">
                            {errors[0]}
                          </div>
                        )}
                      </div>

                      <div className="row">
                        <div className="col-12">
                          <button className="btn btn-primary shadow-sm rounded-sm">
                            SUBMIT
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

export default Import;
