import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// export const config = {
// 	runtime: 'experimental-edge',
// };

export default async (req: NextApiRequest, res: NextApiResponse) => {
	console.log(req.body);

	console.log(req.body.options._hoistedOptions);

	return res.status(200).json({});
};
