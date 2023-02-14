import { AppHeaderCard, FormSearch, Pagination } from "@/components";
import { LayoutApp } from "@/layouts";
import { Head, router } from "@inertiajs/react";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Show = ({ tanggal_ramadhan, takjil }) => {
  const [form, setForm] = useState({
    takjil_group_id: "",
  });

  const onDeleteAll = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        router.post(
          `/apps/takjils/${takjil.id}/tanggal-ramadhans/${tanggal_ramadhan?.id}/destroy-all`,
          {
            _method: "DELETE",
            takjil_group_id: form.takjil_group_id,
          },
          {
            onSuccess: () => {
              const node = window.document.querySelector(".check-all");
              node.checked = false;

              Swal.fire({
                title: "Deleted!",
                text: "Data Warga Berhasil Dihapus!",
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
          }
        );
      }
    });
  };

  const onCheck = (e) => {
    setForm({
      ...form,
      takjil_group_id:
        [...form.takjil_group_id].indexOf(e.target.value) < 0
          ? [...form.takjil_group_id, e.target.value]
          : [...form.takjil_group_id.filter((v) => v != e.target.value)],
    });
  };

  const onCheckAll = (e) => {
    if (e.target.checked) {
      const allTakjilGroupID = tanggal_ramadhan?.takjil_groups?.data?.map(
        (v) => v.id
      );
      setForm(() => {
        const enrolleNode = window.document.querySelectorAll(".check-derolle");

        for (const node of enrolleNode) {
          node.checked = true;
        }

        return {
          ...form,
          takjil_group_id: allTakjilGroupID,
        };
      });
    } else {
      setForm(() => {
        const enrolleNode = window.document.querySelectorAll(".check-derolle");

        for (const node of enrolleNode) {
          node.checked = false;
        }

        return {
          ...form,
          takjil_group_id: [],
        };
      });
    }
  };

  const onDestroy = (e, ID) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        router.post(
          `/apps/takjils/${takjil.id}/tanggal-ramadhans/${tanggal_ramadhan?.id}/${ID}/destroy`,
          {
            _method: "DELETE",
          },
          {
            onSuccess: () => {
              Swal.fire({
                title: "Deleted!",
                text: "Data Warga Berhasil Dihapus!",
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
          }
        );
      }
    });
  };

  return (
    <>
      <Head>
        <title>Takjil - Takjil Ramadhan</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border-0 rounded-3 shadow border-top-purple">
                  <AppHeaderCard title="TAKJIL" icon="fa fa-folder" />
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-centered rounded">
                        <tbody>
                          <tr>
                            <td className="fw-bold" style={{ width: "30%" }}>
                              Tanggal Ramadhan
                            </td>
                            <td>{tanggal_ramadhan?.tanggal}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Tahun Ramadhan</td>
                            <td>
                              {tanggal_ramadhan?.takjil?.tahun_ramadhan?.name}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card border-0 rounded-3 shadow border-top-purple">
                  <AppHeaderCard title="ENROLLE WARGA" icon="fa fa-folder" />
                  <div className="card-body">
                    <FormSearch
                      placeholder="search by rt name..."
                      onChange={(e) => setData("search", e.target.value)}
                      addLink={`/apps/takjils/${takjil.id}/tanggal-ramadhans/${tanggal_ramadhan.id}/create`}
                      onDeleteAll={onDeleteAll}
                      onBack={`/apps/takjils/${takjil.id}`}
                    />
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">
                              <input
                                type="checkbox"
                                className="form-check check-derolle check-all pe-auto"
                                onChange={(e) => onCheckAll(e)}
                              />
                            </th>
                            <th scope="col">Nama</th>
                            <th scope="col">RT</th>
                            <th scope="col">RW</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tanggal_ramadhan?.takjil_groups?.data?.map(
                            (v, i) => (
                              <tr key={v.id}>
                                <td>
                                  <input
                                    type="checkbox"
                                    className="form-check check-derolle"
                                    onChange={(e) => onCheck(e)}
                                  />
                                </td>
                                <td>{v?.warga?.name}</td>
                                <td>{v?.warga?.rt?.name}</td>
                                <td>{v?.warga?.rt?.rw?.name}</td>
                                <td className="text-center">
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={(e) => onDestroy(e, v?.id)}
                                  >
                                    <i className="fa fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>

                      <Pagination
                        links={tanggal_ramadhan?.takjil_groups?.links}
                      />
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
