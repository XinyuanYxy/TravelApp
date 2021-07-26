const retrieveData = async () => {
	try {
		console.log('im in retrieveing data funciton clientside');
		const data = await axios.get('/getStorageData');
		return data.data;
	} catch (err) {
		console.log(err);
	}
};

export { retrieveData };
