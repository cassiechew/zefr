import type {NextPage} from 'next';
import { useRouter } from 'next/router';
import {useEffect} from 'react';

const ToRedirect: NextPage = () => {
	const router = useRouter();

	useEffect(() => {
		if(!router.isReady) return;
		const { url } = router.query;

		fetch('/api/' + url, { method: 'GET', redirect: 'follow'})
	});
	return(<div></div>);
};

export default ToRedirect;
