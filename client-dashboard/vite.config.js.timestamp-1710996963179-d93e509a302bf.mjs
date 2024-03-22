var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// ../../../sites/common_site_config.json
var require_common_site_config = __commonJS({
  "../../../sites/common_site_config.json"(exports, module) {
    module.exports = {
      allow_cors: "*",
      ignore_csrf: 1,
      background_workers: 1,
      developer_mode: 1,
      file_watcher_port: 6787,
      frappe_user: "frappe",
      gunicorn_workers: 9,
      live_reload: true,
      maintenance_mode: 1,
      pause_scheduler: 1,
      rebase_on_pull: false,
      redis_cache: "redis://127.0.0.1:13000",
      redis_queue: "redis://127.0.0.1:11000",
      redis_socketio: "redis://127.0.0.1:13000",
      restart_supervisor_on_update: true,
      restart_systemd_on_update: false,
      serve_default_site: true,
      shallow_clone: true,
      socketio_port: 9e3,
      use_redis_auth: false,
      webserver_port: 8e3
    };
  }
});

// vite.config.js
import { defineConfig } from "file:///home/frappe/frappe-bench/apps/novelite/client-dashboard/node_modules/vite/dist/node/index.js";
import react from "file:///home/frappe/frappe-bench/apps/novelite/client-dashboard/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import fs from "fs/promises";
import svgr from "file:///home/frappe/frappe-bench/apps/novelite/client-dashboard/node_modules/@svgr/rollup/dist/index.js";

// proxyOptions.js
var common_site_config = require_common_site_config();
var { webserver_port } = common_site_config;
var proxyOptions_default = {
  "^/(app|api|assets|files|private)": {
    target: `http://localhost:80`,
    ws: true,
    router: function(req) {
      const site_name = req.headers.host.split(":")[0];
      return `http://${site_name}:${webserver_port}`;
    }
  }
};

// vite.config.js
var __vite_injected_original_dirname = "/home/frappe/frappe-bench/apps/novelite/client-dashboard";
var vite_config_default = defineConfig({
  server: {
    port: 8080,
    proxy: proxyOptions_default
  },
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src"),
      // from config1
      src: resolve(__vite_injected_original_dirname, "src")
      // from config2
    }
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx"
      },
      plugins: [
        {
          name: "load-js-files-as-jsx",
          setup(build) {
            build.onLoad({ filter: /src\\.*\.js$/ }, async (args) => ({
              loader: "jsx",
              contents: await fs.readFile(args.path, "utf8")
            }));
          }
        }
      ]
    }
  },
  plugins: [svgr(), react()],
  build: {
    outDir: "../novelite/public/client-dashboard",
    emptyOutDir: true,
    target: "es2015"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc2l0ZXMvY29tbW9uX3NpdGVfY29uZmlnLmpzb24iLCAidml0ZS5jb25maWcuanMiLCAicHJveHlPcHRpb25zLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJ7XG4gXCJhbGxvd19jb3JzXCI6IFwiKlwiLFxuIFwiaWdub3JlX2NzcmZcIjogMSxcbiBcImJhY2tncm91bmRfd29ya2Vyc1wiOiAxLFxuIFwiZGV2ZWxvcGVyX21vZGVcIjogMSxcbiBcImZpbGVfd2F0Y2hlcl9wb3J0XCI6IDY3ODcsXG4gXCJmcmFwcGVfdXNlclwiOiBcImZyYXBwZVwiLFxuIFwiZ3VuaWNvcm5fd29ya2Vyc1wiOiA5LFxuIFwibGl2ZV9yZWxvYWRcIjogdHJ1ZSxcbiBcIm1haW50ZW5hbmNlX21vZGVcIjogMSxcbiBcInBhdXNlX3NjaGVkdWxlclwiOiAxLFxuIFwicmViYXNlX29uX3B1bGxcIjogZmFsc2UsXG4gXCJyZWRpc19jYWNoZVwiOiBcInJlZGlzOi8vMTI3LjAuMC4xOjEzMDAwXCIsXG4gXCJyZWRpc19xdWV1ZVwiOiBcInJlZGlzOi8vMTI3LjAuMC4xOjExMDAwXCIsXG4gXCJyZWRpc19zb2NrZXRpb1wiOiBcInJlZGlzOi8vMTI3LjAuMC4xOjEzMDAwXCIsXG4gXCJyZXN0YXJ0X3N1cGVydmlzb3Jfb25fdXBkYXRlXCI6IHRydWUsXG4gXCJyZXN0YXJ0X3N5c3RlbWRfb25fdXBkYXRlXCI6IGZhbHNlLFxuIFwic2VydmVfZGVmYXVsdF9zaXRlXCI6IHRydWUsXG4gXCJzaGFsbG93X2Nsb25lXCI6IHRydWUsXG4gXCJzb2NrZXRpb19wb3J0XCI6IDkwMDAsXG4gXCJ1c2VfcmVkaXNfYXV0aFwiOiBmYWxzZSxcbiBcIndlYnNlcnZlcl9wb3J0XCI6IDgwMDBcbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL2ZyYXBwZS9mcmFwcGUtYmVuY2gvYXBwcy9ub3ZlbGl0ZS9jbGllbnQtZGFzaGJvYXJkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9mcmFwcGUvZnJhcHBlLWJlbmNoL2FwcHMvbm92ZWxpdGUvY2xpZW50LWRhc2hib2FyZC92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9mcmFwcGUvZnJhcHBlLWJlbmNoL2FwcHMvbm92ZWxpdGUvY2xpZW50LWRhc2hib2FyZC92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCBmcyBmcm9tICdmcy9wcm9taXNlcyc7XHJcbmltcG9ydCBzdmdyIGZyb20gJ0BzdmdyL3JvbGx1cCc7XHJcbmltcG9ydCBwcm94eU9wdGlvbnMgZnJvbSAnLi9wcm94eU9wdGlvbnMnO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICAgIHBvcnQ6IDgwODAsXHJcbiAgICAgICAgcHJveHk6IHByb3h5T3B0aW9uc1xyXG4gICAgfSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgICBhbGlhczoge1xyXG4gICAgICAgICAgICAnQCc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksIC8vIGZyb20gY29uZmlnMVxyXG4gICAgICAgICAgICBzcmM6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksIC8vIGZyb20gY29uZmlnMlxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgZXNidWlsZDoge1xyXG4gICAgICAgIGxvYWRlcjogJ2pzeCcsXHJcbiAgICAgICAgaW5jbHVkZTogL3NyY1xcLy4qXFwuanN4PyQvLFxyXG4gICAgICAgIGV4Y2x1ZGU6IFtdLFxyXG4gICAgfSxcclxuICAgIG9wdGltaXplRGVwczoge1xyXG4gICAgICAgIGVzYnVpbGRPcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGxvYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgJy5qcyc6ICdqc3gnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2xvYWQtanMtZmlsZXMtYXMtanN4JyxcclxuICAgICAgICAgICAgICAgICAgICBzZXR1cChidWlsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWlsZC5vbkxvYWQoeyBmaWx0ZXI6IC9zcmNcXFxcLipcXC5qcyQvIH0sIGFzeW5jIChhcmdzKSA9PiAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGVyOiAnanN4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRzOiBhd2FpdCBmcy5yZWFkRmlsZShhcmdzLnBhdGgsICd1dGY4JyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtzdmdyKCksIHJlYWN0KCldLFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgICBvdXREaXI6ICcuLi9ub3ZlbGl0ZS9wdWJsaWMvY2xpZW50LWRhc2hib2FyZCcsXHJcbiAgICAgICAgZW1wdHlPdXREaXI6IHRydWUsXHJcbiAgICAgICAgdGFyZ2V0OiAnZXMyMDE1JyxcclxuICAgIH0sXHJcbn0pO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL2ZyYXBwZS9mcmFwcGUtYmVuY2gvYXBwcy9ub3ZlbGl0ZS9jbGllbnQtZGFzaGJvYXJkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9mcmFwcGUvZnJhcHBlLWJlbmNoL2FwcHMvbm92ZWxpdGUvY2xpZW50LWRhc2hib2FyZC9wcm94eU9wdGlvbnMuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvZnJhcHBlL2ZyYXBwZS1iZW5jaC9hcHBzL25vdmVsaXRlL2NsaWVudC1kYXNoYm9hcmQvcHJveHlPcHRpb25zLmpzXCI7Y29uc3QgY29tbW9uX3NpdGVfY29uZmlnID0gcmVxdWlyZSgnLi4vLi4vLi4vc2l0ZXMvY29tbW9uX3NpdGVfY29uZmlnLmpzb24nKTtcclxuY29uc3QgeyB3ZWJzZXJ2ZXJfcG9ydCB9ID0gY29tbW9uX3NpdGVfY29uZmlnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG5cdCdeLyhhcHB8YXBpfGFzc2V0c3xmaWxlc3xwcml2YXRlKSc6IHtcclxuXHRcdHRhcmdldDogYGh0dHA6Ly9sb2NhbGhvc3Q6ODBgLFxyXG5cdFx0d3M6IHRydWUsXHJcblx0XHRyb3V0ZXI6IGZ1bmN0aW9uKHJlcSkge1xyXG5cdFx0XHRjb25zdCBzaXRlX25hbWUgPSByZXEuaGVhZGVycy5ob3N0LnNwbGl0KCc6JylbMF07XHJcblx0XHRcdHJldHVybiBgaHR0cDovLyR7c2l0ZV9uYW1lfToke3dlYnNlcnZlcl9wb3J0fWA7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUNDLFlBQWM7QUFBQSxNQUNkLGFBQWU7QUFBQSxNQUNmLG9CQUFzQjtBQUFBLE1BQ3RCLGdCQUFrQjtBQUFBLE1BQ2xCLG1CQUFxQjtBQUFBLE1BQ3JCLGFBQWU7QUFBQSxNQUNmLGtCQUFvQjtBQUFBLE1BQ3BCLGFBQWU7QUFBQSxNQUNmLGtCQUFvQjtBQUFBLE1BQ3BCLGlCQUFtQjtBQUFBLE1BQ25CLGdCQUFrQjtBQUFBLE1BQ2xCLGFBQWU7QUFBQSxNQUNmLGFBQWU7QUFBQSxNQUNmLGdCQUFrQjtBQUFBLE1BQ2xCLDhCQUFnQztBQUFBLE1BQ2hDLDJCQUE2QjtBQUFBLE1BQzdCLG9CQUFzQjtBQUFBLE1BQ3RCLGVBQWlCO0FBQUEsTUFDakIsZUFBaUI7QUFBQSxNQUNqQixnQkFBa0I7QUFBQSxNQUNsQixnQkFBa0I7QUFBQSxJQUNuQjtBQUFBO0FBQUE7OztBQ3RCMFYsU0FBUyxvQkFBb0I7QUFDdlgsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUN4QixPQUFPLFFBQVE7QUFDZixPQUFPLFVBQVU7OztBQ0oyVSxJQUFNLHFCQUFxQjtBQUN2WCxJQUFNLEVBQUUsZUFBZSxJQUFJO0FBRTNCLElBQU8sdUJBQVE7QUFBQSxFQUNkLG9DQUFvQztBQUFBLElBQ25DLFFBQVE7QUFBQSxJQUNSLElBQUk7QUFBQSxJQUNKLFFBQVEsU0FBUyxLQUFLO0FBQ3JCLFlBQU0sWUFBWSxJQUFJLFFBQVEsS0FBSyxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQy9DLGFBQU8sVUFBVSxTQUFTLElBQUksY0FBYztBQUFBLElBQzdDO0FBQUEsRUFDRDtBQUNEOzs7QURaQSxJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixRQUFRO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsRUFDWDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQTtBQUFBLE1BQzdCLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUE7QUFBQSxJQUNqQztBQUFBLEVBQ0o7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFNBQVM7QUFBQSxJQUNULFNBQVMsQ0FBQztBQUFBLEVBQ2Q7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNWLGdCQUFnQjtBQUFBLE1BQ1osUUFBUTtBQUFBLFFBQ0osT0FBTztBQUFBLE1BQ1g7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNMO0FBQUEsVUFDSSxNQUFNO0FBQUEsVUFDTixNQUFNLE9BQU87QUFDVCxrQkFBTSxPQUFPLEVBQUUsUUFBUSxlQUFlLEdBQUcsT0FBTyxVQUFVO0FBQUEsY0FDdEQsUUFBUTtBQUFBLGNBQ1IsVUFBVSxNQUFNLEdBQUcsU0FBUyxLQUFLLE1BQU0sTUFBTTtBQUFBLFlBQ2pELEVBQUU7QUFBQSxVQUNOO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBLEVBQ0EsU0FBUyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7QUFBQSxFQUN6QixPQUFPO0FBQUEsSUFDSCxRQUFRO0FBQUEsSUFDUixhQUFhO0FBQUEsSUFDYixRQUFRO0FBQUEsRUFDWjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
