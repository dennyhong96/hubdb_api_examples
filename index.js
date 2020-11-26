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
exportPublishedTable();
