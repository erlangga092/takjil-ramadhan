import { AppHeaderCard, FormSearch, Pagination } from "@/components";
import { LayoutApp } from "@/layouts";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Show = ({ errors, wargas, takjil, tanggal_ramadhan }) => {
  const [search, setSearch] = useState(
    "" || new URL(window.document.location).searchParams.get("q")
  );

  const [form, setForm] = useState({
    takjil_id: takjil?.id,
    tanggal_ramadhan_id: tanggal_ramadhan?.id,
    warga_id: [],
  });

  const onSearch = (e) => {
    e.preventDefault();
    router.get(
      `/apps/takjils/${takjil.id}/tanggal-ramadhans/${tanggal_ramadhan.id}/create`,
      {
        q: search,
      }
    );
  };

  const onReset = (e) => {
    e.preventDefault();
    router.get(
      `/apps/takjils/${takjil.id}/tanggal-ramadhans/${tanggal_ramadhan.id}/create`,
      {
        q: "",
      }
    );
  };

  const onCheck = (e) => {
    setForm({
      ...form,
      warga_id:
        [...form.warga_id].indexOf(e.target.value) < 0
          ? [...form.warga_id, e.target.value]
          : [...form.warga_id.filter((v) => v != e.target.value)],
    });
  };

  const onCheckAll = (e) => {
    if (e.target.checked) {
      const allWargaID = wargas?.data?.map((v) => v.id);
      setForm(() => {
        const enrolleNode = window.document.querySelectorAll(".check-enrolle");

        for (const node of enrolleNode) {
          node.checked = true;
        }

        return {
          ...form,
          warga_id: allWargaID,
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
          warga_id: [],
        };
      });
    }
  };

  const onEnrolle = (e) => {
    e.preventDefault();
    router.post(
      `/apps/takjils/${takjil.id}/tanggal-ramadhans/${tanggal_ramadhan.id}/store`,
      {
        takjil_id: form.takjil_id,
        tanggal_ramadhan_id: form.tanggal_ramadhan_id,
        warga_id: form.warga_id,
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
        <title>Enrolle Warga - Takjil Ramadhan</title>
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
                      isError={errors?.warga_id}
                      onBack={`/apps/takjils/${takjil.id}/tanggal-ramadhans/${tanggal_ramadhan.id}`}
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
                          {wargas?.data?.map((warga, i) => (
                            <tr key={i}>
                              <td>
                                <input
                                  type="checkbox"
                                  className="form-check check-enrolle"
                                  id={warga.id}
                                  onChange={(e) => onCheck(e)}
                                  value={warga.id}
                                />
                              </td>
                              <td>{warga?.name}</td>
                              <td>{warga?.rt?.name}</td>
                              <td>{warga?.rt?.rw?.name}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <Pagination links={wargas.links} />
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
