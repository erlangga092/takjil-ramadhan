import { AppHeaderCard, FormSearch, Pagination } from "@/components";
import { LayoutApp } from "@/layouts";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Show = ({ errors, petugas, piket, tanggal_piket }) => {
  const [search, setSearch] = useState(
    "" || new URL(window.document.location).searchParams.get("q")
  );

  const [form, setForm] = useState({
    piket_id: piket?.id,
    tanggal_piket_id: tanggal_piket?.id,
    petugas_id: [],
  });

  const onSearch = (e) => {
    e.preventDefault();
    router.get(
      `/apps/pikets/${piket.id}/tanggal-pikets/${tanggal_piket.id}/create`,
      {
        q: search,
      }
    );
  };

  const onReset = (e) => {
    e.preventDefault();
    router.get(
      `/apps/pikets/${piket.id}/tanggal-pikets/${tanggal_piket.id}/create`,
      {
        q: "",
      }
    );
  };

  const onCheck = (e) => {
    setForm({
      ...form,
      petugas_id:
        [...form.petugas_id].indexOf(e.target.value) < 0
          ? [...form.petugas_id, e.target.value]
          : [...form.petugas_id.filter((v) => v != e.target.value)],
    });
  };

  const onCheckAll = (e) => {
    if (e.target.checked) {
      const allPetugasID = petugas?.data?.map((v) => v.id);
      setForm(() => {
        const enrolleNode = window.document.querySelectorAll(".check-enrolle");

        for (const node of enrolleNode) {
          node.checked = true;
        }

        return {
          ...form,
          petugas_id: allPetugasID,
        };
      });
    } else {
      setForm(() => {
        const enrolleNode = window.document.querySelectorAll(".check-enrolle");

        for (const node of enrolleNode) {
          node.checked = false;
        }

        return {
          ...form,
          petugas_id: [],
        };
      });
    }
  };

  const onEnrolle = (e) => {
    console.log(form);
    e.preventDefault();
    router.post(
      `/apps/pikets/${piket.id}/tanggal-pikets/${tanggal_piket.id}/store`,
      {
        piket_id: form.piket_id,
        tanggal_piket_id: form.tanggal_piket_id,
        petugas_id: form.petugas_id,
      },
      {
        onSuccess: () => {
          Swal.fire({
            title: "Success!",
            text: "Data Warga Berhasil Dienrolle!",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          });
        },
        onError: (errors) => {
          console.log(errors);
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
        <title>Enrolle Warga - piket Ramadhan</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border-0 rounded-3 shadow border-top-purple">
                  <AppHeaderCard title="ENROLLE WARGA" icon="fa fa-folder" />
                  <div className="card-body">
                    <FormSearch
                      placeholder="search by name..."
                      onChange={(e) => setSearch(e.target.value)}
                      onSearch={onSearch}
                      onReset={onReset}
                      onEnrolle={(e) => onEnrolle(e)}
                      isError={errors?.petugas}
                      onBack={`/apps/pikets/${piket.id}/tanggal-pikets/${tanggal_piket.id}`}
                    />
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">
                              <input
                                type="checkbox"
                                className="form-check check-enrolle"
                                onChange={(e) => onCheckAll(e)}
                              />
                            </th>
                            <th scope="col">Nama</th>
                            <th scope="col">RT</th>
                            <th scope="col">RW</th>
                          </tr>
                        </thead>
                        <tbody>
                          {petugas?.data?.map((v, i) => {
                            return (
                              <tr key={i}>
                                <td>
                                  <input
                                    type="checkbox"
                                    className="form-check check-enrolle"
                                    id={v.id}
                                    onChange={(e) => onCheck(e)}
                                    value={v.id}
                                  />
                                </td>
                                <td>{v?.name}</td>
                                <td>{v?.rt?.name}</td>
                                <td>{v?.rt?.rw?.name}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      <Pagination links={petugas.links} />
                    </div>
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

export default Show;
