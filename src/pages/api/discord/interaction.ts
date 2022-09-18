import { NextRequest } from 'next/server';
export const config = {
	runtime: 'experimental-edge',
};

export default (req: NextRequest) => {
	console.log(req);
	return new Response('Hello, world!   '.trim());
};
