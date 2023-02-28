import { AppHeaderCard } from "@/components";
import { LayoutApp } from "@/layouts";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";

const Create = ({ piket, errors }) => {
  const [form, setForm] = useState(() => {
    return {
      tanggal: new Date(),
      piket_id: piket.id,
    };
  });

  const onSubmit = (e) => {
    e.preventDefault();
    router.post(`/apps/pikets/${piket.id}/tanggal-pikets/store`, form, {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Tanggal ramadhan saved successfully.",
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
    });
  };

  return (
    <>
      <Head>
        <title>Tambah Tanggal Piket - Takjil Ramadhan</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border border-top-purple rounded-3 shadow">
                  <AppHeaderCard title="TANGGAL PIKET" icon="fa fa-folder" />
                  <div className="card-body">
                    <form onSubmit={onSubmit}>
                      <div className="mb-3">
                        <label htmlFor="">Tanggal</label>
                        <DatePicker
                          className="form-control"
                          selected={form.tanggal}
                          timeFormat="HH:mm"
                          dateFormat="MM/dd/yyyy"
                          onChange={(date) =>
                            setForm({
                              ...form,
                              tanggal: date,
                            })
                          }
                        />
                        {errors?.tanggal && (
                          <div className="alert alert-danger mt-2">
                            {errors.tanggal}
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
