import { ImpairedData } from '../models';

module.exports = {
	show(req, res) {
		return ImpairedData.find({ where: { gaugeId: req.body.gaugeId } })
			.then((ImpairedData) => res.status(200).send(ImpairedData))
			.catch((err) => res.status(400).send(err));
	},
};
