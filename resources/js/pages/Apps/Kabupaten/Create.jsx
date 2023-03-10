import { AppHeaderCard, InputApp } from "@/components";
import { LayoutApp } from "@/layouts";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Create = ({ errors }) => {
  const [form, setForm] = useState(() => {
    return {
      name: "",
    };
  });

  const onSubmit = (e) => {
    e.preventDefault();
    router.post("/apps/kabupatens", form, {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Kabupaten saved successfully.",
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
    });
  };

  return (
    <>
      <Head>
        <title>Tambah Kabupaten - Takjil Ramadhan</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border border-top-purple rounded-3 shadow">
                  <AppHeaderCard title="TAMBAH KABUPATEN" icon="fa fa-folder" />
                  <div className="card-body">
                    <form onSubmit={onSubmit}>
                      <InputApp
                        name="name"
                        type="text"
                        placeholder="Nama kabupaten"
                        label="Nama Kabupaten"
                        onChange={(e) =>
                          setForm({
                            ...form,
                            name: e.target.value,
                          })
                        }
                        isError={errors?.name}
                      />

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
