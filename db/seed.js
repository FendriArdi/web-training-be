const db = require("../db");
const { hashPassword } = require("../helpers/bcrypt");

const accounts = [
  {
    username: "hrdmwt",
    password: "mwthrd01",
    departement: "HRD",
    role: "ADMIN",
  },
  {
    username: "mktmwt",
    password: "mwtmkt02",
    departement: "Marketing",
    role: "USER",
  },
  {
    username: "pchmwt",
    password: "mwtpch03",
    departement: "Purchasing",
    role: "USER",
  },
  {
    username: "qmsmwt",
    password: "mwtqms04",
    departement: "QMS",
    role: "USER",
  },
  {
    username: "prdmwt",
    password: "mwtprd05",
    departement: "Produksi",
    role: "USER",
  },
  {
    username: "ppicmwt",
    password: "mwtppic06",
    departement: "PPIC",
    role: "USER",
  },
  {
    username: "qcmwt",
    password: "mwtqc07",
    departement: "Quality Control",
    role: "USER",
  },
  {
    username: "engmwt",
    password: "mwteng08",
    departement: "Engineering",
    role: "USER",
  },
  {
    username: "gamwt",
    password: "mwtga09",
    departement: "General Affair",
    role: "USER",
  },
  {
    username: "rmmwt",
    password: "mwtrm10",
    departement: "Repair & Maintanance",
    role: "USER",
  },
];

const hashedAccounts = accounts.map((account) => {
  return {
    ...account,
    password: hashPassword(account.password),
  };
});

async function main() {
  await db.user.createMany({
    data: hashedAccounts,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
