require('dotenv').config();
const mongoose = require('mongoose');
const RequestType = require('../src/models/RequestType');

const data = [
  {
    code: 'TECH_ISSUE',
    name: 'Problème technique',
    description: 'Problème technique signalé par un utilisateur',
    priority: 'high',
    category: 'technical',
    estimatedResponseTime: 4
  },
  {
    code: 'BILLING_QUESTION',
    name: 'Question de facturation',
    description: 'Question relative à la facturation',
    priority: 'medium',
    category: 'billing',
    estimatedResponseTime: 24
  },
  {
    code: 'ACCOUNT_CHANGE',
    name: 'Demande de modification de compte',
    description: "Modification d'information du compte utilisateur",
    priority: 'low',
    category: 'account',
    estimatedResponseTime: 48
  },
  {
    code: 'FEATURE_REQUEST',
    name: 'Demande de fonctionnalité',
    description: 'Proposition ou demande de nouvelle fonctionnalité',
    priority: 'medium',
    category: 'product',
    estimatedResponseTime: 168
  },
  {
    code: 'COMPLAINT',
    name: 'Réclamation',
    description: 'Client mécontent',
    priority: 'critical',
    category: 'support',
    estimatedResponseTime: 2
  }
];

const run = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/support-api';
  await mongoose.connect(mongoUri);
  await RequestType.deleteMany({});
  await RequestType.insertMany(data);
  console.log('Seed complete');
  process.exit(0);
};

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
