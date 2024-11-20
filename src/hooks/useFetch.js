import { useEffect } from 'react';
import { useState } from 'react';

export const useFetch = (postsUrl) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [url, setUrl] = useState(postsUrl);

	useEffect(() => {
		fetch(url)
			.then((response) => response.json())
			.then((posts) => setData(posts))
			.catch((e) => setError(e))
			.finally(setIsLoading(false));
	}, [url]);

	const refetch = ({ params }) => {
		let paramsString = [];
		for (let i = 0; i < Object.keys(params).length; i++) {
			paramsString.push(Object.keys(params)[i] + '=' + Object.values(params)[i]);
		}
		paramsString = paramsString.join('&');
		setUrl(`${url}?${paramsString}`);
	};

	return {
		data,
		error,
		isLoading,
		refetch,
	};
};
