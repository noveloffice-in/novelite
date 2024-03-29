const common_site_config = require('../../../sites/common_site_config.json');
const { webserver_port } = common_site_config;

export default {
	'^/(app|api|assets|files|private)': {
		target: `https://localhost:80`,
		ws: true,
		router: function(req) {
			const site_name = req.headers.host.split(':')[0];
			return `https://${site_name}:${webserver_port}`;
		}
	}
};
