const retrieveData = async (id) => {
	try {
		const data = await axios.get(`/getStorageData/${id}`);
		return data.data;
	} catch (err) {
		console.log(err);
	}
};

export { retrieveData };
