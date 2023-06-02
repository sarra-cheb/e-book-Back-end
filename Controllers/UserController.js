const user = require('../Models/UserModel');

exports.getuser = async (req, res) => {
  try {
    const users = await user.find()
    res.status(200).send({ message: 'list of users', users })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.getClient = async (req, res) => {
  try {
    const users = await user.find()
    const clients = await users.filter(element => element.role === 'client')
    res.status(200).send({ message: 'list of clients', clients })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'error server' })
  }
}
exports.updateuser = async (req, res) => {
  try {
    await user.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).send({ message: 'user updated' })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.deleteuser = async (req, res) => {
  try {
    await user.findByIdAndDelete(req.params.id)
    res.status(200).send({ message: 'user deleted succefully' })
  } catch (error) {
    res.status(500).send({ message: 'error server' })
  }
}
exports.updateUserClienttoAbonne = async (req, res) => {
  try {
    const found = await user.findById(req.params.id);
    if (found.role === 'client') {
      await user.findByIdAndUpdate(req.params.id, { $set: { typeofclient: 'abonné' } });
      res.status(200).send({ message: 'type of client updated succefully' });
    } else {
      res.status(400).send({ message: 'only users with type client' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'error server' });
  }
}
exports.getListOfClients = async (req, res) => {
  try {
    const users = await user.find();
    const clientsAbonné = users.filter(element => element.typeofclient === 'abonné');
    const clientsNormal = users.filter(element => element.typeofclient === 'normal');

    const clientsData = [
      { type: 'abonné', clients: clientsAbonné, total: clientsAbonné.length },
      { type: 'normal', clients: clientsNormal, total: clientsNormal.length }
    ];

    res.status(200).send({ message: 'Liste des clients', clientsData });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Erreur serveur' });
  }
};
exports.getData = async (req, res) => {
  try {
    const users = await user.find();
    const clients = users.filter(element => element.role === 'client');
    const admins = users.filter(element => element.role === 'admin');
    const totalClients = clients.length;
    const totalAdmins = admins.length;
    const totalUsers = totalClients + totalAdmins;
    const percentageClients = (totalClients / totalUsers) * 100;
    const percentageAdmins = (totalAdmins / totalUsers) * 100;

    const data = [
      { type: 'clients', users: clients, total: totalClients, percentage: percentageClients },
      { type: 'admins', users: admins, total: totalAdmins, percentage: percentageAdmins }
    ];

    res.status(200).send({ message: 'Données des utilisateurs', data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Erreur serveur' });
  }
};
