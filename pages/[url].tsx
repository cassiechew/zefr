import type {NextPage} from 'next';
import { useRouter } from 'next/router';
import {useEffect} from 'react';

const ToRedirect: NextPage = () => {
	const router = useRouter();

	useEffect(() => {
		if(!router.isReady) return;
		const { url } = router.query;

		fetch('/api/' + url, { method: 'GET', redirect: 'follow'})
		.then(res => {
			return res.json();
		})
		.then(red => {
			window.location.href = red.new;
		})
	});
	return(<div></div>);
};

export default ToRedirect;
