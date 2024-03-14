var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// ../../../sites/common_site_config.json
var require_common_site_config = __commonJS({
  "../../../sites/common_site_config.json"(exports, module) {
    module.exports = {
      background_workers: 1,
      developer_mode: 1,
      file_watcher_port: 6787,
      frappe_user: "frappe",
      gunicorn_workers: 9,
      ignore_csrf: 1,
      live_reload: true,
      rebase_on_pull: false,
      redis_cache: "redis://127.0.0.1:13000",
      redis_queue: "redis://127.0.0.1:11000",
      restart_supervisor_on_update: true,
      restart_systemd_on_update: false,
      serve_default_site: true,
      shallow_clone: true,
      socketio_port: 9e3,
      use_redis_auth: false,
      webserver_port: 8e3,
      allow_cors: "*"
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
    target: `http://localhost:8000`,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vc2l0ZXMvY29tbW9uX3NpdGVfY29uZmlnLmpzb24iLCAidml0ZS5jb25maWcuanMiLCAicHJveHlPcHRpb25zLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJ7XG4gICAgXCJiYWNrZ3JvdW5kX3dvcmtlcnNcIjogMSxcbiAgICBcImRldmVsb3Blcl9tb2RlXCI6IDEsXG4gICAgXCJmaWxlX3dhdGNoZXJfcG9ydFwiOiA2Nzg3LFxuICAgIFwiZnJhcHBlX3VzZXJcIjogXCJmcmFwcGVcIixcbiAgICBcImd1bmljb3JuX3dvcmtlcnNcIjogOSxcbiAgICBcImlnbm9yZV9jc3JmXCI6IDEsXG4gICAgXCJsaXZlX3JlbG9hZFwiOiB0cnVlLFxuICAgIFwicmViYXNlX29uX3B1bGxcIjogZmFsc2UsXG4gICAgXCJyZWRpc19jYWNoZVwiOiBcInJlZGlzOi8vMTI3LjAuMC4xOjEzMDAwXCIsXG4gICAgXCJyZWRpc19xdWV1ZVwiOiBcInJlZGlzOi8vMTI3LjAuMC4xOjExMDAwXCIsXG4gICAgXCJyZXN0YXJ0X3N1cGVydmlzb3Jfb25fdXBkYXRlXCI6IHRydWUsXG4gICAgXCJyZXN0YXJ0X3N5c3RlbWRfb25fdXBkYXRlXCI6IGZhbHNlLFxuICAgIFwic2VydmVfZGVmYXVsdF9zaXRlXCI6IHRydWUsXG4gICAgXCJzaGFsbG93X2Nsb25lXCI6IHRydWUsXG4gICAgXCJzb2NrZXRpb19wb3J0XCI6IDkwMDAsXG4gICAgXCJ1c2VfcmVkaXNfYXV0aFwiOiBmYWxzZSxcbiAgICBcIndlYnNlcnZlcl9wb3J0XCI6IDgwMDAsXG4gICAgXCJhbGxvd19jb3JzXCI6IFwiKlwiXG59IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9mcmFwcGUvZnJhcHBlLWJlbmNoL2FwcHMvbm92ZWxpdGUvY2xpZW50LWRhc2hib2FyZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvZnJhcHBlL2ZyYXBwZS1iZW5jaC9hcHBzL25vdmVsaXRlL2NsaWVudC1kYXNoYm9hcmQvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvZnJhcHBlL2ZyYXBwZS1iZW5jaC9hcHBzL25vdmVsaXRlL2NsaWVudC1kYXNoYm9hcmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMvcHJvbWlzZXMnO1xyXG5pbXBvcnQgc3ZnciBmcm9tICdAc3Znci9yb2xsdXAnO1xyXG5pbXBvcnQgcHJveHlPcHRpb25zIGZyb20gJy4vcHJveHlPcHRpb25zJztcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgICBwb3J0OiA4MDgwLFxyXG4gICAgICAgIHByb3h5OiBwcm94eU9wdGlvbnNcclxuICAgIH0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgYWxpYXM6IHtcclxuICAgICAgICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLCAvLyBmcm9tIGNvbmZpZzFcclxuICAgICAgICAgICAgc3JjOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLCAvLyBmcm9tIGNvbmZpZzJcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIGVzYnVpbGQ6IHtcclxuICAgICAgICBsb2FkZXI6ICdqc3gnLFxyXG4gICAgICAgIGluY2x1ZGU6IC9zcmNcXC8uKlxcLmpzeD8kLyxcclxuICAgICAgICBleGNsdWRlOiBbXSxcclxuICAgIH0sXHJcbiAgICBvcHRpbWl6ZURlcHM6IHtcclxuICAgICAgICBlc2J1aWxkT3B0aW9uczoge1xyXG4gICAgICAgICAgICBsb2FkZXI6IHtcclxuICAgICAgICAgICAgICAgICcuanMnOiAnanN4JyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdsb2FkLWpzLWZpbGVzLWFzLWpzeCcsXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dXAoYnVpbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGQub25Mb2FkKHsgZmlsdGVyOiAvc3JjXFxcXC4qXFwuanMkLyB9LCBhc3luYyAoYXJncykgPT4gKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRlcjogJ2pzeCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50czogYXdhaXQgZnMucmVhZEZpbGUoYXJncy5wYXRoLCAndXRmOCcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBbc3ZncigpLCByZWFjdCgpXSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgb3V0RGlyOiAnLi4vbm92ZWxpdGUvcHVibGljL2NsaWVudC1kYXNoYm9hcmQnLFxyXG4gICAgICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxyXG4gICAgICAgIHRhcmdldDogJ2VzMjAxNScsXHJcbiAgICB9LFxyXG59KTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9mcmFwcGUvZnJhcHBlLWJlbmNoL2FwcHMvbm92ZWxpdGUvY2xpZW50LWRhc2hib2FyZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvZnJhcHBlL2ZyYXBwZS1iZW5jaC9hcHBzL25vdmVsaXRlL2NsaWVudC1kYXNoYm9hcmQvcHJveHlPcHRpb25zLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2ZyYXBwZS9mcmFwcGUtYmVuY2gvYXBwcy9ub3ZlbGl0ZS9jbGllbnQtZGFzaGJvYXJkL3Byb3h5T3B0aW9ucy5qc1wiO2NvbnN0IGNvbW1vbl9zaXRlX2NvbmZpZyA9IHJlcXVpcmUoJy4uLy4uLy4uL3NpdGVzL2NvbW1vbl9zaXRlX2NvbmZpZy5qc29uJyk7XHJcbmNvbnN0IHsgd2Vic2VydmVyX3BvcnQgfSA9IGNvbW1vbl9zaXRlX2NvbmZpZztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuXHQnXi8oYXBwfGFwaXxhc3NldHN8ZmlsZXN8cHJpdmF0ZSknOiB7XHJcblx0XHR0YXJnZXQ6IGBodHRwOi8vbG9jYWxob3N0OjgwMDBgLFxyXG5cdFx0d3M6IHRydWUsXHJcblx0XHRyb3V0ZXI6IGZ1bmN0aW9uKHJlcSkge1xyXG5cdFx0XHRjb25zdCBzaXRlX25hbWUgPSByZXEuaGVhZGVycy5ob3N0LnNwbGl0KCc6JylbMF07XHJcblx0XHRcdHJldHVybiBgaHR0cDovLyR7c2l0ZV9uYW1lfToke3dlYnNlcnZlcl9wb3J0fWA7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUNJLG9CQUFzQjtBQUFBLE1BQ3RCLGdCQUFrQjtBQUFBLE1BQ2xCLG1CQUFxQjtBQUFBLE1BQ3JCLGFBQWU7QUFBQSxNQUNmLGtCQUFvQjtBQUFBLE1BQ3BCLGFBQWU7QUFBQSxNQUNmLGFBQWU7QUFBQSxNQUNmLGdCQUFrQjtBQUFBLE1BQ2xCLGFBQWU7QUFBQSxNQUNmLGFBQWU7QUFBQSxNQUNmLDhCQUFnQztBQUFBLE1BQ2hDLDJCQUE2QjtBQUFBLE1BQzdCLG9CQUFzQjtBQUFBLE1BQ3RCLGVBQWlCO0FBQUEsTUFDakIsZUFBaUI7QUFBQSxNQUNqQixnQkFBa0I7QUFBQSxNQUNsQixnQkFBa0I7QUFBQSxNQUNsQixZQUFjO0FBQUEsSUFDbEI7QUFBQTtBQUFBOzs7QUNuQjBWLFNBQVMsb0JBQW9CO0FBQ3ZYLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxRQUFRO0FBQ2YsT0FBTyxVQUFVOzs7QUNKMlUsSUFBTSxxQkFBcUI7QUFDdlgsSUFBTSxFQUFFLGVBQWUsSUFBSTtBQUUzQixJQUFPLHVCQUFRO0FBQUEsRUFDZCxvQ0FBb0M7QUFBQSxJQUNuQyxRQUFRO0FBQUEsSUFDUixJQUFJO0FBQUEsSUFDSixRQUFRLFNBQVMsS0FBSztBQUNyQixZQUFNLFlBQVksSUFBSSxRQUFRLEtBQUssTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUMvQyxhQUFPLFVBQVUsU0FBUyxJQUFJLGNBQWM7QUFBQSxJQUM3QztBQUFBLEVBQ0Q7QUFDRDs7O0FEWkEsSUFBTSxtQ0FBbUM7QUFRekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsUUFBUTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLEVBQ1g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNILEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUE7QUFBQSxNQUM3QixLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBO0FBQUEsSUFDakM7QUFBQSxFQUNKO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixTQUFTO0FBQUEsSUFDVCxTQUFTLENBQUM7QUFBQSxFQUNkO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDVixnQkFBZ0I7QUFBQSxNQUNaLFFBQVE7QUFBQSxRQUNKLE9BQU87QUFBQSxNQUNYO0FBQUEsTUFDQSxTQUFTO0FBQUEsUUFDTDtBQUFBLFVBQ0ksTUFBTTtBQUFBLFVBQ04sTUFBTSxPQUFPO0FBQ1Qsa0JBQU0sT0FBTyxFQUFFLFFBQVEsZUFBZSxHQUFHLE9BQU8sVUFBVTtBQUFBLGNBQ3RELFFBQVE7QUFBQSxjQUNSLFVBQVUsTUFBTSxHQUFHLFNBQVMsS0FBSyxNQUFNLE1BQU07QUFBQSxZQUNqRCxFQUFFO0FBQUEsVUFDTjtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQSxFQUNBLFNBQVMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0FBQUEsRUFDekIsT0FBTztBQUFBLElBQ0gsUUFBUTtBQUFBLElBQ1IsYUFBYTtBQUFBLElBQ2IsUUFBUTtBQUFBLEVBQ1o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
