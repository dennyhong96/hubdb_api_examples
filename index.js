require("dotenv").config();
const axios = require("axios");
const fs = require("fs").promises;

const API = "https://api.hubapi.com/cms/v3/hubdb/tables";
const API_KEY = process.env.HS_API_KEY;

const getAllLiveTables = async () => {
	try {
		const { data } = await axios.get(`${API}?hapikey=${API_KEY}&sort="name"`);

		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
// getAllLiveTables();

const createTable = async () => {
	try {
		const newTable = {
			dynamicMetaTags: {},
			allowPublicApiAccess: true,
			useForPages: false,
			columns: [
				{
					name: "top_speed",
					label: "Top Speed",
					archived: false,
					type: "TEXT",
				},
			],
			name: "racecars",
			enableChildTablePages: false,
			label: "Racecars",
			allowChildTables: true,
		};

		const { data } = await axios.post(`${API}?hapikey=${API_KEY}`, newTable);

		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
// createTable();

const listDraftTables = async () => {
	try {
		const { data } = await axios.get(`${API}/draft?hapikey=${API_KEY}`);

		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
// listDraftTables();

const getLiveTableDetail = async () => {
	try {
		const { data } = await axios.get(`${API}/racecars?hapikey=${API_KEY}`);

		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
// getLiveTableDetail();

const updateTableStatus = async () => {
	try {
		const updateObj = { archived: false, label: "Racecars", name: "racecars" };
		const { data } = await axios.patch(
			`${API}/racecars?hapikey=${API_KEY}&archived=true`,
			updateObj
		);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
// updateTableStatus();

const getDraftTableDetail = async () => {
	try {
		const { data } = await axios.get(
			`${API}/racecars/draft?hapikey=${API_KEY}`
		);

		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
// getDraftTableDetail();

const archiveTable = async () => {
	try {
		await axios.delete(`${API}/racecars?hapikey=${API_KEY}`);
		console.log("Table deleted.");
	} catch (error) {
		console.error(error);
	}
};
// archiveTable();

const updateTable = async () => {
	try {
		const updateObj = {
			allowPublicApiAccess: true,
			columns: [
				{
					name: "top_speed",
					label: "Top Speed",
					archived: false,
					type: "TEXT",
				},
				{
					name: "make",
					label: "Make",
					archived: false,
					type: "TEXT",
				},
			],
		};

		const { data } = await axios.patch(
			`${API}/racecars/draft?hapikey=${API_KEY}`,
			updateObj
		);

		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
// updateTable();

const exportDraftTable = async () => {
	try {
		const { data } = await axios.get(
			`${API}/racecars/draft/export?hapikey=${API_KEY}`
		);

		// Writes to file system
		await fs.writeFile("./racecar.csv", data, { encoding: "utf8" });

		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
// exportDraftTable();

const publishTableToLive = async () => {
	try {
		// Can't get v3 to work, v2 needs table id instead of name
		const { data } = await axios.put(
			`https://api.hubapi.com/hubdb/api/v2/tables/3202445/publish?hapikey=${API_KEY}`
		);

		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
// publishTableToLive();

const ressetDraftTable = async () => {
	try {
		const { data } = await axios.post(
			`${API}/racecars/draft/reset?hapikey=${API_KEY}`
		);

		console.log(data);

		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
// ressetDraftTable();

const exportPublishedTable = async () => {
	try {
		const { data } = await axios.get(
			`${API}/racecars/export?hapikey=${API_KEY}`
		);

		// Writes to file system
		await fs.writeFile("./racecar_published.csv", data, { encoding: "utf8" });

		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
// exportPublishedTable();

// -------------------------------------- Table Rows --------------------------------------
const createTableRow = async () => {
	try {
		const body = {
			values: {
				4: "200mph",
				5: "Tesla",
			},
		};

		const { data } = await axios.post(
			`${API}/racecars/rows?hapikey=${API_KEY}`,
			body
		);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
// createTableRow();

const listLiveTableRows = async () => {
	try {
		const { data } = await axios.get(`${API}/racecars/rows?hapikey=${API_KEY}`);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
// listLiveTableRows();

const listDraftTableRows = async () => {
	try {
		const { data } = await axios.get(
			`${API}/racecars/rows/draft?hapikey=${API_KEY}`
		);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
// listDraftTableRows();

const getLiveTableRow = async () => {
	try {
		const { data } = await axios.get(
			`${API}/racecars/rows/38099322684?hapikey=${API_KEY}`
		);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
// getLiveTableRow();

const getDraftTableRow = async () => {
	try {
		const { data } = await axios.get(
			`${API}/racecars/rows/38099322684/draft?hapikey=${API_KEY}`
		);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
// getDraftTableRow();

const updateTableRow = async () => {
	try {
		const body = {
			values: {
				top_speed: "210mph",
				make: "Mustang",
			},
		};

		const { data } = await axios.patch(
			`${API}/racecars/rows/38099322684/draft?hapikey=${API_KEY}`,
			body
		);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
// updateTableRow();

const replaceTableRow = async () => {
	try {
		const body = {
			values: {
				top_speed: "212mph",
				make: "Rocket",
			},
		};

		const { data } = await axios.put(
			`${API}/racecars/rows/38099322684/draft?hapikey=${API_KEY}`,
			body
		);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
// replaceTableRow();

const deleteTableRow = async () => {
	try {
		await axios.delete(
			`${API}/racecars/rows/38099322685/draft?hapikey=${API_KEY}`
		);
	} catch (error) {
		console.error(error);
	}
};
// deleteTableRow();

const cloneTableRow = async () => {
	try {
		const headers = {
			"Content-Type": "application/json",
		};

		const { data } = await axios.post(
			`${API}/racecars/rows/38099322683/draft/clone?hapikey=${API_KEY}`,
			{},
			{ headers }
		);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
// cloneTableRow();

// -------------------------------------- Table Rows Batch --------------------------------------
const batchGetLiveRows = async () => {
	try {
		const body = { inputs: [38099322683, 38099635440] };

		const { data } = await axios.post(
			`${API}/racecars/rows/batch/read?hapikey=${API_KEY}`,
			body
		);

		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
// batchGetLiveRows();

const batchCloneRows = async () => {
	try {
		const body = { inputs: [38099322683, 38099635440] };

		const { data } = await axios.post(
			`${API}/racecars/rows/draft/batch/clone?hapikey=${API_KEY}`,
			body
		);

		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
// batchCloneRows();

const batchCreateTableRow = async () => {
	try {
		const body = {
			inputs: [
				{
					values: {
						4: "201mph",
						5: "BMW",
					},
				},
			],
		};

		const { data } = await axios.post(
			`${API}/racecars/rows/draft/batch/create?hapikey=${API_KEY}`,
			body
		);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
// batchCreateTableRow();

const batchDeleteRows = async () => {
	try {
		const body = { inputs: [38099322683, 38099635440] };

		await axios.post(
			`${API}/racecars/rows/draft/batch/purge?hapikey=${API_KEY}`,
			body
		);
	} catch (error) {
		console.error(error);
	}
};
// batchDeleteRows();

const batchGetDraftRows = async () => {
	try {
		const body = { inputs: [38099322683, 38099635440] };

		const { data } = await axios.post(
			`${API}/racecars/rows/draft/batch/read?hapikey=${API_KEY}`,
			body
		);

		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
// batchGetDraftRows();

const batchReplaceRows = async () => {
	try {
		const body = {
			inputs: [
				{
					values: {
						4: "211mph",
						5: "Dongfeng",
					},
					id: 38099714222,
				},
				{
					values: {
						4: "222mph",
						5: "Xiaokang",
					},
					id: 38099714223,
				},
			],
		};

		const { data } = await axios.post(
			`${API}/racecars/rows/draft/batch/replace?hapikey=${API_KEY}`,
			body
		);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
// batchReplaceRows();

const batchUpdateRows = async () => {
	try {
		const body = {
			inputs: [
				{
					values: {
						make: "Dongfeng222",
					},
					id: 38099714222,
				},
				{
					values: {
						make: "Xiaokang222",
					},
					id: 38099714223,
				},
			],
		};

		const { data } = await axios.post(
			`${API}/racecars/rows/draft/batch/update?hapikey=${API_KEY}`,
			body
		);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
};
// batchUpdateRows();
