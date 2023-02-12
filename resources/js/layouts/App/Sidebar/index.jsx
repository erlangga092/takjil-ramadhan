import { Link, usePage } from "@inertiajs/react";
import React from "react";
import {
  CategorySVG,
  CustomerSVG,
  DashboardSVG,
  PermissionSVG,
  ProductSVG,
  ProfitSVG,
  RoleSVG,
  SalesSVG,
  TransactionSVG,
  UserSVG,
} from "../../../components";

const LayoutSidebar = () => {
  const { auth } = usePage().props;
  const appsURL = usePage().url;

  function hasAnyPermission(permissions) {
    let allPermissions = auth.permissions;
    let hasPermission = false;

    permissions.forEach((v) => {
      if (allPermissions[v]) {
        hasPermission = true;
      }
    });

    return hasPermission;
  }

  return (
    <>
      <ul className="c-sidebar-nav">
        {hasAnyPermission(["dashboard.index"]) && (
          <li className="c-sidebar-nav-item">
            <Link
              className={`c-sidebar-nav-link ${
                appsURL.startsWith("/apps/dashboard") ? "active" : ""
              }`}
              href="/apps/dashboard"
            >
              <DashboardSVG />
              <span className="ms-2">Dashboard</span>
            </Link>
          </li>
        )}

        {/* {hasAnyPermission([
          "categories.index",
          "products.index",
          "customers.index",
        ]) && <li className="c-sidebar-nav-title">MASTER</li>}

        {hasAnyPermission(["categories.index"]) && (
          <li className="c-sidebar-nav-item">
            <Link
              className={`c-sidebar-nav-link ${
                appsURL.startsWith("/apps/categories") ? "active" : ""
              }`}
              href="/apps/categories"
            >
              <CategorySVG />
              <span className="ms-2">Categories</span>
            </Link>
          </li>
        )} */}

        <li className="c-sidebar-nav-title">WILAYAH</li>

        <li className="c-sidebar-nav-item">
          <Link
            className={`c-sidebar-nav-link ${
              appsURL.startsWith("/apps/kabupatens") ? "active" : ""
            }`}
            href="/apps/kabupatens"
          >
            <CategorySVG />
            <span className="ms-2">Kabupaten</span>
          </Link>
        </li>

        <li className="c-sidebar-nav-item">
          <Link
            className={`c-sidebar-nav-link ${
              appsURL.startsWith("/apps/kecamatans") ? "active" : ""
            }`}
            href="/apps/kecamatans"
          >
            <CategorySVG />
            <span className="ms-2">Kecamatan</span>
          </Link>
        </li>

        <li className="c-sidebar-nav-item">
          <Link
            className={`c-sidebar-nav-link ${
              appsURL.startsWith("/apps/kelurahans") ? "active" : ""
            }`}
            href="/apps/kelurahans"
          >
            <CategorySVG />
            <span className="ms-2">Kelurahan</span>
          </Link>
        </li>

        <li className="c-sidebar-nav-item">
          <Link
            className={`c-sidebar-nav-link ${
              appsURL.startsWith("/apps/dusuns") ? "active" : ""
            }`}
            href="/apps/dusuns"
          >
            <CategorySVG />
            <span className="ms-2">Dusun</span>
          </Link>
        </li>

        <li className="c-sidebar-nav-item">
          <Link
            className={`c-sidebar-nav-link ${
              appsURL.startsWith("/apps/rws") ? "active" : ""
            }`}
            href="/apps/rws"
          >
            <CategorySVG />
            <span className="ms-2">RW</span>
          </Link>
        </li>

        <li className="c-sidebar-nav-item">
          <Link
            className={`c-sidebar-nav-link ${
              appsURL.startsWith("/apps/rts") ? "active" : ""
            }`}
            href="/apps/rts"
          >
            <CategorySVG />
            <span className="ms-2">RT</span>
          </Link>
        </li>

        <li className="c-sidebar-nav-item">
          <Link
            className={`c-sidebar-nav-link ${
              appsURL.startsWith("/apps/masjids") ? "active" : ""
            }`}
            href="/apps/masjids"
          >
            <CategorySVG />
            <span className="ms-2">Masjid</span>
          </Link>
        </li>

        <li className="c-sidebar-nav-item">
          <Link
            className={`c-sidebar-nav-link ${
              appsURL.startsWith("/apps/wargas") ? "active" : ""
            }`}
            href="/apps/wargas"
          >
            <CustomerSVG />
            <span className="ms-2">Warga</span>
          </Link>
        </li>

        <li className="c-sidebar-nav-title">TRANSACTIONS</li>

        <li className="c-sidebar-nav-item">
          <Link
            className={`c-sidebar-nav-link ${
              appsURL.startsWith("/apps/transactions") ? "active" : ""
            }`}
            href="/apps/transactions"
          >
            <TransactionSVG />
            <span className="ms-2">Transactions</span>
          </Link>
        </li>

        <li className="c-sidebar-nav-title">REPORTS</li>

        <li className="c-sidebar-nav-item">
          <Link
            className={`c-sidebar-nav-link ${
              appsURL.startsWith("/apps/sales") ? "active" : ""
            }`}
            href="/apps/sales"
          >
            <SalesSVG />
            <span className="ms-2">Report Sales</span>
          </Link>
        </li>

        <li className="c-sidebar-nav-item">
          <Link
            className={`c-sidebar-nav-link ${
              appsURL.startsWith("/apps/profits") ? "active" : ""
            }`}
            href="/apps/profits"
          >
            <ProfitSVG />
            <span className="ms-2">Report Profits</span>
          </Link>
        </li>

        <li className="c-sidebar-nav-title">USER MANAGEMENT</li>

        <li className="c-sidebar-nav-item">
          <Link
            className={`c-sidebar-nav-link ${
              appsURL.startsWith("/apps/roles") ? "active" : ""
            }`}
            href="/apps/roles"
          >
            <RoleSVG />
            <span className="ms-2">Roles</span>
          </Link>
        </li>

        <li className="c-sidebar-nav-item">
          <Link
            className={`c-sidebar-nav-link ${
              appsURL.startsWith("/apps/permissions") ? "active" : ""
            }`}
            href="/apps/permissions"
          >
            <PermissionSVG />
            <span className="ms-2">Permissions</span>
          </Link>
        </li>

        <li className="c-sidebar-nav-item">
          <Link
            className={`c-sidebar-nav-link ${
              appsURL.startsWith("/apps/users") ? "active" : ""
            }`}
            href="/apps/users"
          >
            <UserSVG />
            <span className="ms-2">Users</span>
          </Link>
        </li>

        <div className="pb-5">
          <li className="c-sidebar-nav-divider"></li>
        </div>
      </ul>
    </>
  );
};

export default LayoutSidebar;
